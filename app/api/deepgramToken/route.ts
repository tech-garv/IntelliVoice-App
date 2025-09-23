import { NextResponse } from "next/server";

export async function GET() {
  const key = process.env.DEEPGRAM_API_KEY;

  if (!key) {
    return NextResponse.json({ error: "API key not set" }, { status: 500 });
  }

  return NextResponse.json({ key });
}
