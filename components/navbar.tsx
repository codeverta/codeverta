"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion"; // Import AnimatePresence
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils"; // Assuming this is for TailwindCSS class merging


// Responsive Navbar Component
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  const categories = [
    { id: "/news", name: "News" },
    { id: "/startups", name: "Startups" },
    { id: "/gadget", name: "Gadget" },
    { id: "/tutorials", name: "Tutorials" },
    { id: "/course", name: "Kelas" },
    { id: "/ai", name: "AI" },
    { id: "/produk", name: "Produk Kami" },
    { id: "/#development", name: "Alur Kerja" },
    { id: "/#pricing", name: "Harga" },
    { id: "/#faq", name: "FAQ" },
    { id: "/article", name: "Artikel" },
    { id: "/about", name: "Tentang Kami" },
  ];

  const hiddenMenu = ["news", "ai", "startups", "gadget", "tutorials", "kelas"];

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full backdrop-blur-lg transition-all duration-300 ${
        isScrolled ? "bg-background/80 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href={"/"}
            className="hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg cursor-pointer flex items-center gap-2 font-bold flex-shrink-0"
          >
            <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground">
              CV
            </div>
            <span className="hidden sm:block">Codeverta</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-6 xl:gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={category.id}
                className={cn(
                  `text-sm font-medium text-muted-foreground transition-colors hover:text-foreground cursor-pointer relative flex items-center ${
                    !hiddenMenu.includes(category.name.toLowerCase())
                      ? ""
                      : "hidden"
                  }`
                )}
              >
                {category.name.includes("Produk Kami") && (
                  <span className="absolute -top-1 -right-2 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                )}
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button and Theme Toggle */}
          <div className="flex items-center gap-2">

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              <svg
                className={`w-6 h-6 transition-transform duration-200 ${
                  mobileMenuOpen ? "rotate-90" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute top-16 inset-x-0 bg-background/95 backdrop-blur-lg border-b shadow-lg"
          >
            <div className="container mx-auto px-4 sm:px-6 py-4">
              <div className="flex flex-col space-y-3">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={category.id}
                    className={cn(
                      `text-sm font-medium text-muted-foreground transition-colors hover:text-foreground py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 relative flex items-center ${
                        !hiddenMenu.includes(category.name.toLowerCase())
                          ? ""
                          : "hidden"
                      }`
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {category.name.includes("Produk Kami") && (
                      <span className="absolute -top-1 -right-1 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                      </span>
                    )}
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};


export default Navbar;