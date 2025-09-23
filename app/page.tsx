'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/AuthContext';
import { FaRocket, FaSignInAlt } from 'react-icons/fa';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    if (user) router.push('/dashboard');
  }, [user]);

  return (
    <main className="relative min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-100 px-6 py-16 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute -z-10 top-[-100px] left-[-100px] w-[400px] h-[400px] bg-purple-300 opacity-30 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute -z-10 bottom-[-80px] right-[-80px] w-[400px] h-[400px] bg-blue-300 opacity-20 rounded-full blur-[100px] animate-pulse" />

      {/* Left Section: Info */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full md:w-1/2 flex justify-center items-center"
      >
        <div className="w-full max-w-md bg-white/90 backdrop-blur-md border border-gray-200 shadow-2xl rounded-3xl p-8 md:p-10 space-y-7">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600"
          >
            Welcome to{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 font-extrabold">
              Intelli<span className="italic text-blue-600">Voice</span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-700 text-[16px] leading-relaxed"
          >
            Your AI-powered assistant for confidence, clarity, and career success.
          </motion.p>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-800 list-disc pl-5 space-y-1 text-[15px] font-medium"
          >
            <li>🧠 Mock Interview Practice</li>
            <li>📚 Lecture-Based Learning</li>
            <li>❓ Real-Time Doubt Solving</li>
            <li>🧘 Guided Focus Sessions</li>
          </motion.ul>

          <div className="flex flex-col space-y-4 pt-4">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => router.push('/signin')}
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white text-lg py-3 rounded-xl shadow-md font-semibold flex items-center justify-center gap-2 transition-all duration-300"
            >
              <FaSignInAlt /> Sign In
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => router.push('/signup')}
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white text-lg py-3 rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2 transition-all duration-300 ring-1 ring-indigo-400"
            >
              <FaRocket /> Get Started / Sign Up
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Right Section: Demo Video */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="w-full md:w-1/2 flex justify-center items-center mt-12 md:mt-0"
      >
        <div className="relative w-full max-w-xl aspect-video rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
          {playVideo ? (
            <video
              autoPlay
              controls
              className="w-full h-full object-cover"
              onEnded={() => setPlayVideo(false)}
            >
              <source src="/demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div
              onClick={() => setPlayVideo(true)}
              className="relative group cursor-pointer"
            >
              <img
                src="/demo-preview.jpg"
                alt="Demo Preview"
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 flex items-center justify-center transition-colors">
                <div className="bg-white text-blue-600 px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:scale-105 transition-transform">
                  ▶️ Watch Demo
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </main>
  );
}
