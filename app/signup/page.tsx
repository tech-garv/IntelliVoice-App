'use client';

import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaUserPlus } from 'react-icons/fa';

export default function Signup() {
  const { login } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok && data.token) {
      login(data.token);
      router.push('/dashboard');
    } else {
      setError(data.error || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-200 via-white to-blue-200 flex items-center justify-center p-4">
      <motion.form
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-gray-300 space-y-6"
      >
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 drop-shadow-lg">
            <FaUserPlus className="inline-block text-3xl mr-2 align-middle" />
            Sign Up to{' '}
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600">
              Intelli<span className="italic text-blue-600">Voice</span>
            </span>
          </h2>
          <p className="mt-2 text-base text-gray-600">Create your AI-powered experience ✨</p>
        </motion.div>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-sm text-center shadow">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div className="relative">
            <FaUser className="absolute top-3.5 left-4 text-gray-400" />
            <input
              type="text"
              placeholder="First Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
              required
            />
          </div>
          <div className="relative">
            <FaUser className="absolute top-3.5 left-4 text-gray-400" />
            <input
              type="text"
              placeholder="Last Name"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
              required
            />
          </div>
          <div className="relative">
            <FaEnvelope className="absolute top-3.5 left-4 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
              required
            />
          </div>
          <div className="relative">
            <FaLock className="absolute top-3.5 left-4 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
              required
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white py-3 rounded-xl text-lg font-semibold shadow-lg transition-all duration-300"
        >
          🚀 Create Account
        </motion.button>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <span
            onClick={() => router.push('/signin')}
            className="text-indigo-600 hover:underline cursor-pointer font-medium"
          >
            Sign In
          </span>
        </p>
      </motion.form>
    </div>
  );
}
