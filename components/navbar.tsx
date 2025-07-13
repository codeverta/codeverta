"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Check,
  ChevronRight,
  Menu,
  X,
  Moon,
  Sun,
  ArrowRight,
  Star,
  Zap,
  Shield,
  Users,
  BarChart,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "next-themes";

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const categories = [
    { id: "/news", name: "News" },
    { id: "/ai", name: "AI" },
    { id: "/startups", name: "Startups" },
    { id: "/gadget", name: "Gadget" },
    { id: "/tutorials", name: "Tutorials" },
    { id: "/course", name: "Kelas" },
    { id: "/portfolio", name: "Portfolio" },
    { id: "/about", name: "About" },
  ];
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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };


  return (
    <header
      className={`sticky top-0 z-50 w-full backdrop-blur-lg transition-all duration-300 ${
        isScrolled ? "bg-background/80 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link
          href={"/"}
          className="cursor-pointer flex items-center gap-2 font-bold"
        >
          <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground">
            CV
          </div>
          <span>Codeverta</span>
        </Link>
        <nav className="hidden md:flex gap-8">
          {categories.map((category) => (
            <Link
              href={category.id}
              className={`text-sm font-medium text-muted-foreground transition-colors hover:text-foreground ${
                ["about", "portfolio"].includes(category.name.toLowerCase())
                  ? ""
                  : "invisible"
              }`}
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </div>
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-16 inset-x-0 bg-background/95 backdrop-blur-lg border-b"
        >
          <div className="container py-4 flex flex-col gap-4">
            {categories.map((category) => (
              <Link
                href={category.id}
                className={`text-sm font-medium text-muted-foreground transition-colors hover:text-foreground ${
                  ["about", "portfolio"].includes(category.name.toLowerCase())
                    ? ""
                    : "invisible"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
}
