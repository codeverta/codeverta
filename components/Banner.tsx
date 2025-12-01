"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Responsive Banner Component
const Banner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white shadow-lg">
      <div className="absolute inset-0 bg-black/10"></div>

      <div className="relative px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Mobile Layout */}
        <div className="flex items-center justify-between w-full md:hidden">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm border border-white/30 text-white">
              <svg
                className="w-3 h-3 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Terbaru
            </span>
            <p className="text-xs font-medium truncate">
              Produk berkualitas kami
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Link
              href="/produk"
              className="inline-flex items-center bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200"
            >
              <span>Lihat</span>
              <svg
                className="w-3 h-3 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>

            <button
              onClick={() => setIsVisible(false)}
              className="p-1 rounded-full hover:bg-white/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Tutup banner"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-center flex-1 space-x-4">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm border border-white/30 text-white">
              <svg
                className="w-3 h-3 mr-1.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Terbaru
            </span>

            <p className="text-sm font-medium">
              Jelajahi koleksi lengkap produk berkualitas kami
            </p>

            <Link
              href="/produk"
              className="inline-flex items-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg group"
            >
              <span>Lihat Sekarang</span>
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Desktop Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="hidden md:block ml-4 p-1.5 rounded-full hover:bg-white/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Tutup banner"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Banner;
