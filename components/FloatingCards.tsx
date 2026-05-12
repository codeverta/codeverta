import React from "react";
import { motion } from "framer-motion";

const FloatingCards = () => {
  const cards = [
    {
      src: "/assets/landing-page/staff-gudang.jpeg",

      style: "top-[10%] left-[5%] md:rotate-[-6deg]",
      anim: "animate-float-slow",
    },
    {
      src: "/assets/landing-page/cashier.jpeg",
      style: "top-[15%] right-[5%] md:rotate-[8deg]",
      anim: "animate-float-med",
    },
    {
      src: "/assets/landing-page/chef.jpeg",
      style: "bottom-[20%] left-[8%] md:rotate-[-4deg]",
      anim: "animate-float-fast",
    },
    {
      src: "/assets/landing-page/business-owner.jpeg",
      style: "bottom-[15%] right-[8%] md:rotate-[5deg]",
      anim: "animate-float-slow",
    },
  ];

  return (
    <div className="relative w-full h-full overflow-hidden">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`
            absolute 
            ${card.style} ${card.anim}
            /* Ukuran Mobile lebih kecil, Desktop lebih besar */
            w-32 h-24 md:w-48 md:h-36 lg:w-60 lg:h-44 
            bg-white dark:bg-zinc-900 
            p-1.5 md:p-2 rounded-xl md:rounded-2xl 
            shadow-2xl border border-gray-200/50 dark:border-zinc-800/50
            backdrop-blur-sm opacity-60 md:opacity-100
          `}
        >
          <div className="w-full h-full overflow-hidden rounded-xl bg-gray-100 dark:bg-zinc-800">
            <img
              src={card.src}
              alt="Preview"
              className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FloatingCards;
