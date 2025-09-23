'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/lib/AuthContext';
import { Button } from '@/components/ui/button';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);

  const getLinkClasses = (href: string) => {
    const isActive = pathname === href;
    return `relative block text-base transition duration-300 after:content-[''] after:absolute after:w-0 after:h-[2px] after:-bottom-1 after:left-0 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full ${
      isActive
        ? 'text-blue-600 dark:text-blue-400 font-semibold after:w-full'
        : 'text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'
    }`;
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 font-[Poppins]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="IntelliVoice Logo"
              width={40}
              height={40}
            />
            <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
              IntelliVoice
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={getLinkClasses(link.href)}
              >
                {link.label}
              </Link>
            ))}

            {user ? (
              <Button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                🔓 Logout
              </Button>
            ) : (
              <Link href="/signin">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  🔐 Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden flex items-center">
           <button
  onClick={() => setMenuOpen((prev) => !prev)}
  className="text-gray-800 dark:text-white focus:outline-none"
  aria-label="Toggle Navigation"
>
  {menuOpen ? (
    <svg
      key="close-icon"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  ) : (
    <svg
      key="menu-icon"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  )}
</button>

          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        ref={menuRef}
        className={`md:hidden transition-all duration-300 ease-in-out ${
          menuOpen
            ? 'opacity-100 max-h-[500px] mt-2'
            : 'opacity-0 max-h-0 overflow-hidden'
        }`}
      >
        <div className="bg-white dark:bg-gray-800 shadow-lg mx-4 rounded-xl px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={getLinkClasses(link.href)}
            >
              {link.label}
            </Link>
          ))}

          {user ? (
            <Button
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
              className="w-full border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition duration-200"
            >
              🔓 Logout
            </Button>
          ) : (
            <Link href="/signin" onClick={() => setMenuOpen(false)}>
              <Button className="w-full border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition duration-200">
                🔐 Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
