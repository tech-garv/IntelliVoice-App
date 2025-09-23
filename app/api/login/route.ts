import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const users: any[] = []; // shared memory array
const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  const user = users.find((u) => u.email === email);
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 400 });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return NextResponse.json({ error: 'Wrong password' }, { status: 401 });

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
  return NextResponse.json({ token });
}
