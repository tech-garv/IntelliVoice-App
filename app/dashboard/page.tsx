'use client';

import { useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Feature from '@/components/dashboard/feature';

export default function DashboardPage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

useEffect(() => {
  if (!loading) {
    const token = localStorage.getItem("token");

    // ⭐ Allow Guest Login
    if (token === "guest_token_123") return;

    // ⭐ Normal Redirect
    if (!user) {
      router.push("/signin");
    }
  }
}, [user, loading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 dark:text-white">Loading...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen px-4 py-8 bg-white dark:bg-black flex justify-center">
      <div className="w-full max-w-6xl space-y-10">
        {/* 🔓 Top Section with Logout */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            👋 Welcome, <span className="text-indigo-600">{user?.name||"Guest User"}</span>
          </h1>

        </div>

        {/* Mobile Warning */}
        <div className="block md:hidden bg-yellow-100 dark:bg-yellow-300 text-yellow-900 p-4 rounded-lg shadow-md">
          <h2 className="text-base font-semibold mb-1">⚠️ Use Chrome on Mobile</h2>
          <p className="text-sm leading-relaxed">
            For the <strong>best experience</strong>, please open this website
            on a <strong>desktop browser</strong>. If you're using a phone, make
            sure to use the <strong>Google Chrome</strong> browser only. Other
            mobile browsers like Safari or in-app browsers may not work properly.
          </p>
        </div>

        {/* Dashboard Content */}
        <Feature />
      </div>
    </div>
  );
}
