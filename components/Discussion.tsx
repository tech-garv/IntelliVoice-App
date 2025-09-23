"use client";

import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Expertlist, CoachingExpert } from "@/components/dashboard/options";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Discussion = () => {
  const { id } = useParams();
  const wsRef = useRef<WebSocket | null>(null);
  const mediaStream = useRef<MediaStream | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const transcriptRef = useRef("");

  const [expert, setExpert] = useState<any>(null);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [initialAIDone, setInitialAIDone] = useState(false);
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const hasPromptedRef = useRef(false);
  const [chatHistory, setChatHistory] = useState<
    { sender: "ai" | "user"; text: string }[]
  >([]);
  const [sessionExpired, setSessionExpired] = useState(false);
  const isMobile =
    typeof window !== "undefined" &&
    /Mobi|Android|iPhone/i.test(navigator.userAgent);

  const DiscussionRoomData = useQuery(api.discussionRoom.GetDiscussionRoom, {
    id: id as Id<"DiscussionRoom">,
  });
  const router = useRouter();

  const endSession = () => {
    // Stop AI speech
    window.speechSynthesis.cancel();

    // Stop mic listening
    stopListening();

    // Set session as expired
    setSessionExpired(true);

    // Redirect to dashboard after a short delay
    setTimeout(() => {
      router.push("/dashboard");
    }, 500); // optional delay to allow cleanup
  };

  const pauseSpeech = () => {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const resumeSpeech = () => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const speakText = (text: string, onDone?: () => void) => {
    if (sessionExpired) return;

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.pitch = 1;
      utterance.rate = 1;

      utterance.onstart = () => setIsAISpeaking(true);
      utterance.onend = () => {
        setIsAISpeaking(false);
        if (!sessionExpired && typeof onDone === "function") onDone();
      };

      speechSynthesis.speak(utterance);
    } else {
      console.warn("Speech synthesis not supported.");
      if (!sessionExpired && onDone) onDone();
    }
  };

  const sendPromptToAI = async (prompt: string, isInitial: boolean = false) => {
    try {
      const res = await fetch("/api/aiResponse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      const finalReply =
        data.response ||
        data.choices?.[0]?.message?.content ||
        "⚠️ No reply received";

      setChatHistory((prev) => [...prev, { sender: "ai", text: finalReply }]);
      speakText(finalReply, () => {
        if (isInitial) setInitialAIDone(true);
        if (isInitial && !sessionExpired && !isListening) startListening();
      });
    } catch (error) {
      console.error("❌ AI error:", error);
      setChatHistory((prev) => [
        ...prev,
        { sender: "ai", text: "⚠️ AI failed to respond." },
      ]);
      if (isInitial) setInitialAIDone(true);
    }
  };

  useEffect(() => {
    if (
      !hasPromptedRef.current &&
      DiscussionRoomData?.topic &&
      DiscussionRoomData?.coachingOption
    ) {
      const foundExpert = CoachingExpert.find(
        (item) => item.name === DiscussionRoomData.expertName
      );
      setExpert(foundExpert);

      const foundOption = Expertlist.find(
        (item) => item.name === DiscussionRoomData.coachingOption
      );
      const basePrompt =
        foundOption?.prompt || "Explain ${user_topic} clearly.";
      const promptToSend = basePrompt.replace(
        "${user_topic}",
        DiscussionRoomData.topic
      );

      sendPromptToAI(promptToSend, true);
      hasPromptedRef.current = true;
    }
  }, [DiscussionRoomData?.topic, DiscussionRoomData?.coachingOption]);

  const startListening = async () => {
    if (sessionExpired) return;
    const res = await fetch("/api/deepgramToken");
    const { key } = await res.json();
    if (!key) return alert("❌ Missing Deepgram API Key");

    const socket = new WebSocket(
      `wss://api.deepgram.com/v1/listen?punctuate=true`,
      ["token", key]
    );
    wsRef.current = socket;

    socket.onopen = async () => {
      mediaStream.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      mediaRecorder.current = new MediaRecorder(mediaStream.current, {
        mimeType: "audio/webm",
      });
      mediaRecorder.current.ondataavailable = (event) => {
        if (socket.readyState === 1) socket.send(event.data);
      };
      mediaRecorder.current.start(500);
      setIsListening(true);
    };

    socket.onmessage = (message) => {
      const data = JSON.parse(message.data);
      const transcriptText = data.channel?.alternatives?.[0]?.transcript;
      if (transcriptText) {
        setTranscript((prev) => prev + " " + transcriptText + " ");
        transcriptRef.current += " " + transcriptText + " ";
      }
    };

    socket.onclose = stopListening;
    socket.onerror = (err) => {
      console.error("WebSocket error", err);
      stopListening();
    };
  };

  const stopListening = () => {
    mediaRecorder.current?.stop();
    mediaStream.current?.getTracks().forEach((t) => t.stop());
    wsRef.current?.close();
    setIsListening(false);

    const finalTranscript = transcriptRef.current.trim();
    if (finalTranscript && !sessionExpired) {
      setChatHistory((prev) => [
        ...prev,
        { sender: "user", text: finalTranscript },
      ]);
      sendPromptToAI(finalTranscript);
      setTranscript("");
      transcriptRef.current = "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white px-4 py-10 sm:px-6 lg:px-20">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-10">
        {DiscussionRoomData?.coachingOption || "Starting your session..."}
      </h1>

      <div className="grid md:grid-cols-[320px_1fr] gap-6 items-start">
        {/* Sidebar - Expert Panel */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-10 flex flex-col items-center text-center space-y-3">
          {expert?.avatar ? (
            <Image
              src={expert.avatar}
              alt={expert.name || "Expert"}
              width={90}
              height={90}
              className="rounded-full border-4 border-blue-200 shadow"
            />
          ) : (
            <div className="w-[90px] h-[90px] rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-500">
              No Photo
            </div>
          )}

          <h2 className="text-lg font-semibold text-gray-800">
            {expert?.name || "Expert Coach"}
          </h2>
          <p className="text-xs text-gray-500">AI Coaching Companion</p>

          <div className="text-sm mt-2">
            {sessionExpired ? (
              <span className="text-red-500">⏳ Session Ended</span>
            ) : !initialAIDone ? (
              <span className="text-gray-500 animate-pulse">
                🧠 Preparing session...
              </span>
            ) : isAISpeaking ? (
              <span className="text-blue-600">🎤 AI is speaking...</span>
            ) : isPaused ? (
              <span className="text-yellow-500">⏸️ Paused</span>
            ) : isListening ? (
              <span className="text-green-600">🎧 Listening...</span>
            ) : (
              <span className="text-gray-500">Waiting for your input</span>
            )}
          </div>

          <div className="flex flex-col gap-2 w-full mt-4">
            {!sessionExpired && (
              <>
                {!isListening ? (
                  <Button
                    className="w-full"
                    onClick={async () => {
                      try {
                        // Trigger permission request manually
                        const stream =
                          await navigator.mediaDevices.getUserMedia({
                            audio: true,
                          });
                        stream.getTracks().forEach((track) => track.stop()); // Close immediately

                        // Now start listening
                        startListening();
                      } catch (err) {
                        alert("🎙️ Please allow microphone access to continue.");
                        console.error("Microphone access denied:", err);
                      }
                    }}
                  >
                    🎤 Start Speaking
                  </Button>
                ) : (
                  <Button
                    variant="destructive"
                    onClick={stopListening}
                    className="w-full"
                  >
                    🛑 Stop Speaking
                  </Button>
                )}
                {!isMobile && (
                  <div className="flex gap-2">
                    <Button
                      onClick={pauseSpeech}
                      disabled={!isAISpeaking || isPaused}
                      className="flex-1"
                      variant="outline"
                    >
                      ⏸️ Pause
                    </Button>
                    <Button
                      onClick={resumeSpeech}
                      disabled={!isAISpeaking || !isPaused}
                      className="flex-1"
                      variant="outline"
                    >
                      ▶️ Resume
                    </Button>
                  </div>
                )}
                <Button
                  variant="outline"
                  onClick={endSession}
                  className="w-full mt-1"
                >
                  🔚 End Session
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Chat Window */}
        <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col justify-between h-full">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
            🧾 Conversation
          </h2>

          <div className="flex-1 space-y-3 max-h-[500px] overflow-y-auto pr-1 scroll-smooth">
            {chatHistory.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.sender === "ai" ? "justify-start" : "justify-end"
                } w-full`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 text-sm rounded-xl shadow-sm ${
                    msg.sender === "ai"
                      ? "bg-blue-100 text-gray-900 rounded-tl-none"
                      : "bg-green-100 text-gray-900 rounded-tr-none"
                  }`}
                >
                  <strong className="block mb-1">
                    {msg.sender === "ai" ? "🤖 AI" : "🧑 You"}
                  </strong>
                  <span className="whitespace-pre-line">{msg.text}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center text-xs text-gray-500 mt-6 border-t pt-4">
            📊 If you have any doubts, feel free to ask or speak.✅
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discussion;
