"use client";

import { useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";

export default function GuestLogin() {
  const { login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Temporary guest user token
    const guestToken = "guest_token_123";

    // Store in localstorage using login()
    login(guestToken);

    router.push("/dashboard");
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-gray-700">Redirecting as Guest...</p>
    </div>
  );
}
