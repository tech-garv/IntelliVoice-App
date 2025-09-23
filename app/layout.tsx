// app/layout.tsx
import { AuthProvider } from '@/lib/AuthContext';
import './globals.css';
import { Geist, Geist_Mono } from 'next/font/google';
import Navbar from '@/components/navbar';
import { type Metadata } from 'next';
import { Providers } from './providers';

// Fonts
const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'IntelliVoice',
  description: 'Smart, real-time discussions powered by Convex + Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white antialiased ${geistSans.variable} ${geistMono.variable}`}
      >
        <AuthProvider>
        <Providers>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
        </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
