"use client";

import Link from "next/link";
import { useState } from "react";
import SearchBar from "./SearchBar"; // Single import

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-5 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent hover:from-cyan-300 hover:to-purple-300 transition-all duration-300">
          Souvenir
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 items-center">
          {/* Desktop SearchBar */}
          <SearchBar />

          <Link href="/" className="text-slate-300 hover:text-cyan-300 font-medium px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-105">
            Home
          </Link>
          <Link href="/products" className="text-slate-300 hover:text-cyan-300 font-medium px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-105">
            Products
          </Link>
          <Link href="/gifts" className="text-slate-300 hover:text-cyan-300 font-medium px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-105">
            Gifts
          </Link>
          <Link
            href="/custom-gifts"
            className="text-slate-300 hover:text-cyan-300 font-medium px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-105"
          >
            Customized Gifts
          </Link>
          <Link
            href="/login"
            className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-cyan-500/30 hover:scale-110 transition-all duration-300"
          >
            Login
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 transition-all duration-300"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6 text-cyan-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden px-6 py-6 space-y-4 bg-gradient-to-b from-slate-900 to-purple-900/90 backdrop-blur-lg border-t border-cyan-500/20">
          {/* Mobile SearchBar - same component with isMobile prop */}
          <SearchBar isMobile={true} onCloseMobile={() => setIsOpen(false)} />

          <Link
            href="/"
            className="block text-slate-300 hover:text-cyan-300 font-medium py-4 px-6 rounded-xl hover:bg-white/10 transition-all duration-300 text-center"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/products"
            className="block text-slate-300 hover:text-cyan-300 font-medium py-4 px-6 rounded-xl hover:bg-white/10 transition-all duration-300 text-center"
            onClick={() => setIsOpen(false)}
          >
            Products
          </Link>
          <Link
            href="/gifts"
            className="block text-slate-300 hover:text-cyan-300 font-medium py-4 px-6 rounded-xl hover:bg-white/10 transition-all duration-300 text-center"
            onClick={() => setIsOpen(false)}
          >
            Gifts
          </Link>
          <Link
            href="/custom-gifts"
            className="block text-slate-300 hover:text-cyan-300 font-medium py-4 px-6 rounded-xl hover:bg-white/10 transition-all duration-300 text-center"
            onClick={() => setIsOpen(false)}
          >
            Customized Gifts
          </Link>
          <Link
            href="/login"
            className="block bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold py-4 px-6 rounded-full text-center shadow-lg hover:shadow-cyan-500/30 hover:scale-105 transition-all duration-300 mt-6"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}