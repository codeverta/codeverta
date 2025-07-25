"use client"
import Link from "next/link";
import React, { useState } from "react";

const Banner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null; // Don't render if not visible
  }

  return (
    <div className="relative bg-blue-700/90 text-gray-100 p-4 flex items-center justify-between text-sm">
      <div className="flex m-auto items-center space-x-3">
        <span className="bg-blue-200 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
          New
        </span>
        <span>Lihat Seluruh Produk yang Kami Tawarkan</span>
        <Link
          href="/produk"
          className="text-yellow-400 hover:text-yellow-300 flex items-center space-x-1"
        >
          <span>Disini</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            ></path>
          </svg>
        </Link>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="text-gray-400 hover:text-white focus:outline-none"
        aria-label="Close banner"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default Banner;
