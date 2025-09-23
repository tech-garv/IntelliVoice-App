import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';

const JWT_SECRET = process.env.JWT_SECRET!;
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(req: Request) {
  const { name, lastName, email, password } = await req.json();

  if (!name || !lastName || !email || !password) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  try {
    // 1. Check if user already exists
    const existingUser = await convex.query(api.auth.getAuthUserByEmail, { email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // 2. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create new user in Convex
    await convex.mutation(api.auth.createAuthUser, {
      name,
      lastName,
      email,
      password: hashedPassword,
    });

    // 4. Generate JWT token
    const token = jwt.sign({ email, name, lastName }, JWT_SECRET, { expiresIn: '2h' });

    return NextResponse.json({ token });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Signup failed' }, { status: 500 });
  }
}
