"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/AuthContext";
import { FaRocket, FaSignInAlt } from "react-icons/fa";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/dashboard");
  }, [user]);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-100 px-6 py-20 overflow-hidden">

      {/* Background Blobs */}
      <div className="absolute -z-10 top-[-100px] left-[-120px] w-[450px] h-[450px] bg-purple-300 opacity-30 rounded-full blur-[110px] animate-pulse" />
      <div className="absolute -z-10 bottom-[-120px] right-[-120px] w-[450px] h-[450px] bg-blue-300 opacity-20 rounded-full blur-[120px] animate-pulse" />

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-2xl bg-white/90 backdrop-blur-lg border border-gray-200 shadow-2xl rounded-3xl p-10 md:p-12 space-y-7"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="text-5xl font-extrabold leading-tight text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600"
        >
          Welcome to{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 font-extrabold">
            Intelli<span className="italic text-blue-600">Voice</span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-gray-700 text-[17px] leading-relaxed text-center max-w-md mx-auto"
        >
          Your AI-powered platform for speaking confidently, learning deeper, and preparing smarter.
        </motion.p>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="text-gray-800 list-disc pl-6 space-y-2 text-[16px] font-medium"
        >
          <li>🧠 Mock Interviews with Real-Time AI Feedback</li>
          <li>📚 Lecture-Based AI Learning Assistant</li>
          <li>❓ Ask Questions & Get Contextual Answers</li>
          <li>🧘 Focus Mode with Voice Guidance</li>
        </motion.ul>

        <div className="flex flex-col space-y-5 pt-4">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/signin")}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-lg py-3 rounded-xl shadow-md font-semibold flex items-center justify-center gap-2 transition-all"
          >
            <FaSignInAlt /> Sign In
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/signup")}
            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white text-lg py-3 rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2 transition-all ring-1 ring-indigo-400"
          >
            <FaRocket /> Get Started / Sign Up
          </motion.button>
          {/* ⭐ NEW — Guest Mode */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/guest")}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 text-lg py-3 rounded-xl font-semibold shadow flex items-center justify-center gap-2 transition-all"
          >
            👤 Continue as Guest
          </motion.button>
        </div>
      </motion.div>
    </main>
  );
}
