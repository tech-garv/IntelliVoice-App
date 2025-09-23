import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json({ error: "❌ Prompt is required." }, { status: 400 });
    }

    const openRouterRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3-8b-instruct", // ✅ Free model
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const result = await openRouterRes.json();

    const reply = result.choices?.[0]?.message?.content;

    if (!reply) {
      console.error("❌ AI returned no response:", result);
      return NextResponse.json({ error: "AI failed to respond." }, { status: 500 });
    }

    return NextResponse.json({ response: reply });
  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
