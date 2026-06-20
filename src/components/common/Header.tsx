"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "جستجو" },
    { href: "/compare-prices", label: "مقایسه قیمت" },
    { href: "/dashboard", label: "داشبورد" },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          ✈️ FlyCompare
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-gray-600 hover:text-blue-600 transition-colors ${
                pathname === item.href ? "text-blue-600 font-semibold" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Auth buttons */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-700">{user?.name}</span>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                خروج
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                ورود
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                ثبت نام
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}; 
