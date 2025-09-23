import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const JWT_SECRET = process.env.JWT_SECRET!;
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  try {
    // 1. Fetch user by email
    const user = await convex.query(api.auth.getAuthUserByEmail, { email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    // 2. Compare passwords
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // 3. Generate token
    const token = jwt.sign({ email, name: user.name }, JWT_SECRET, { expiresIn: "2h" });

    return NextResponse.json({ token });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Login failed" }, { status: 500 });
  }
}
