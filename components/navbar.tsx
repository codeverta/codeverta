"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import projects from "../projects.json";
import { Languages, Check } from "lucide-react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

// Import ikon yang Anda gunakan (asumsi dari 'lucide-react')
// PERHATIAN: Pastikan semua ikon ini sudah diimpor dari library ikon yang benar (misalnya lucide-react)
import {
  // Mengganti 'Smile' dengan 'FileText' untuk PDF agar lebih relevan
  ChevronDown, // Tambahan untuk dropdown menu
  // Jika Anda menggunakan ikon lain, pastikan untuk mengimpornya di sini
} from "lucide-react";
import { getCategories, getMegaMenuData } from "@/lib/data";

const languages = [
  { code: "id", name: "Indonesia", flag: "🇮🇩" },
  { code: "en-US", name: "English", flag: "🇺🇸" },
];

// Responsive Navbar Component
const Navbar = () => {
  const { t } = useTranslation("common");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { locale, locales, push, pathname, asPath, query } = router;
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const lang = locale;
  const megaMenuData = getMegaMenuData(t, projects);
  // --- Kategori Navigasi Utama yang Diperbarui ---
  const categories = getCategories(t);

  const hiddenMenu = []; // Tetap kosong, atau isi jika ada menu yang mau disembunyikan

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

  const handleMegaMenuEnter = (categoryId) => {
    if (megaMenuData[categoryId]) {
      setActiveMegaMenu(categoryId);
    }
  };

  const handleMegaMenuLeave = () => {
    setActiveMegaMenu(null);
  };
  const changeLanguage = (newLocale) => {
    push({ pathname, query }, asPath, { locale: newLocale });
  };
  const LanguageSwitcher = ({ isMobile = false }) => (
    <div className="relative">
      <button
        onClick={() => setLangDropdownOpen(!langDropdownOpen)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <Languages className="w-5 h-5 text-muted-foreground" />
        <span className="text-xs font-bold uppercase">{locale}</span>
        <ChevronDown
          className={`w-3 h-3 transition-transform ${
            langDropdownOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {langDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={`absolute ${
              isMobile ? "bottom-full mb-2" : "top-full mt-2"
            } right-0 w-40 bg-background border rounded-xl shadow-xl z-[60] overflow-hidden`}
          >
            {languages.map((l) => (
              <Link
                href="/"
                locale={l.code}
                key={l.code}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-accent transition-colors text-sm"
                onClick={() => {
                  setLangDropdownOpen(false);
                }}
              >
                <div className="flex items-center gap-3">
                  <span>{l.flag}</span>
                  <span className={lang === l.code ? "font-bold" : ""}>
                    {l.name}
                  </span>
                </div>
                {lang === l.code && <Check className="w-4 h-4 text-primary" />}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  // MegaMenu Component
  const MegaMenu = ({ categoryId, data }) => (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b shadow-xl z-50"
      onMouseEnter={() => setActiveMegaMenu(categoryId)}
      onMouseLeave={handleMegaMenuLeave}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Menggunakan grid 3 kolom jika ada, atau 2 kolom jika hanya 2 */}
        <div
          className={`grid gap-8 ${
            data.columns.length === 2 ? "grid-cols-2" : "grid-cols-3"
          } ${data.columns.length === 1 ? "grid-cols-1 md:grid-cols-2" : ""}`}
        >
          {data.columns.map((column, columnIndex) => (
            <div key={columnIndex} className="space-y-4">
              <h3 className="font-semibold text-lg text-foreground border-b border-border pb-2">
                {column.title}
              </h3>
              <div className="space-y-3">
                {column.items.map((item, itemIndex) => (
                  <Link
                    key={itemIndex}
                    href={item.href}
                    className="block group p-3 rounded-lg hover:bg-accent transition-colors duration-200"
                    onClick={() => {
                      setActiveMegaMenu(null);
                      setMobileMenuOpen(false);
                    }}
                  >
                    <div className="font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                      {item.name}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {item.description}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  // Mobile Dropdown Component (untuk menu baru yang tidak punya mega menu)
  const MobileDropdown = ({ title, items, isExpanded }) => (
    <AnimatePresence>
      {isExpanded && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0 }}
          transition={{ duration: 0.2 }}
          className="ml-4 mt-2 space-y-2 overflow-hidden"
        >
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-3 pt-2">
            {title}
          </div>
          <div className="space-y-1">
            {items.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="block text-sm text-muted-foreground hover:text-foreground py-1 px-3 rounded transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // State untuk melacak menu dropdown mobile yang terbuka
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);

  const toggleMobileDropdown = (categoryId) => {
    setActiveMobileDropdown(
      activeMobileDropdown === categoryId ? null : categoryId
    );
  };

  // ------------------------------------------------------------------------------------------------

  return (
    <header
      className={`print:hidden sticky top-0 z-50 w-full backdrop-blur-lg transition-all duration-300 ${
        isScrolled ? "bg-background/80 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href={"/"}
            className="hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg cursor-pointer flex items-center gap-2 font-bold flex-shrink-0"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground">
              CV
            </div>
            <span className="hidden sm:block">Codeverta</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-6 xl:gap-8 relative py-2">
            {categories.map((category) => {
              const hasMegaMenu = megaMenuData[category.id];

              return (
                <div
                  key={category.id}
                  className="relative"
                  onMouseEnter={() => handleMegaMenuEnter(category.id)}
                  onMouseLeave={() => !activeMegaMenu || handleMegaMenuLeave()}
                >
                  <Link
                    href={hasMegaMenu ? "#" : category.id} // Tautan non-klik untuk dropdown
                    onClick={(e) => hasMegaMenu && e.preventDefault()}
                    className={cn(
                      `text-sm font-medium text-muted-foreground transition-colors hover:text-foreground cursor-pointer relative flex items-center gap-1 py-8 ${
                        !hiddenMenu.includes(category.name.toLowerCase())
                          ? ""
                          : "hidden"
                      } ${activeMegaMenu === category.id ? "text-primary" : ""}`
                    )}
                  >
                    {category.name.includes("Produk Kami") && (
                      <span className="absolute -top-1 -right-2 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                      </span>
                    )}
                    {category.name}
                    {hasMegaMenu && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeMegaMenu === category.id ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* Mobile Menu Button and Theme Toggle */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle (Dapat ditambahkan di sini jika Anda ingin) */}
            <div className="hidden lg:block">
              <LanguageSwitcher />
            </div>
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

      {/* Mega Menu Desktop */}
      <AnimatePresence>
        {activeMegaMenu && megaMenuData[activeMegaMenu] && (
          <MegaMenu
            categoryId={activeMegaMenu}
            data={megaMenuData[activeMegaMenu]}
          />
        )}
      </AnimatePresence>

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
                  <div key={category.id}>
                    <button
                      className={cn(
                        `text-sm font-medium text-muted-foreground transition-colors hover:text-foreground py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 relative flex items-center justify-between w-full text-left ${
                          !hiddenMenu.includes(category.name.toLowerCase())
                            ? ""
                            : "hidden"
                        }`
                      )}
                      onClick={
                        () =>
                          megaMenuData[category.id]
                            ? toggleMobileDropdown(category.id)
                            : setMobileMenuOpen(false) // Jika bukan dropdown, tutup menu
                      }
                    >
                      <Link
                        href={megaMenuData[category.id] ? "#" : category.id}
                        className="flex items-center w-full"
                        onClick={(e) => {
                          if (!megaMenuData[category.id]) {
                            setMobileMenuOpen(false);
                          } else {
                            e.preventDefault(); // Mencegah navigasi jika ada mega menu
                            toggleMobileDropdown(category.id);
                          }
                        }}
                      >
                        {category.name.includes("Produk Kami") && (
                          <span className="absolute -top-1 -right-1 flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                          </span>
                        )}
                        {category.name}
                      </Link>

                      {megaMenuData[category.id] && (
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            activeMobileDropdown === category.id
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                      )}
                    </button>

                    {/* Mobile Mega Menu Content (menggunakan komponen MobileDropdown) */}
                    {megaMenuData[category.id] && (
                      <AnimatePresence>
                        {activeMobileDropdown === category.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-4 mt-2 space-y-2 overflow-hidden"
                          >
                            <div className="container mx-auto px-4 py-6 space-y-4">
                              {megaMenuData[category.id].columns.map(
                                (column, columnIndex) => (
                                  <div key={columnIndex} className="space-y-1">
                                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-3">
                                      {column.title}
                                    </div>
                                    {column.items.map((item, itemIndex) => (
                                      <Link
                                        key={itemIndex}
                                        href={item.href}
                                        className="block text-sm text-muted-foreground hover:text-foreground py-1 px-3 rounded transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                                        onClick={() => setMobileMenuOpen(false)}
                                      >
                                        {item.name}
                                      </Link>
                                    ))}
                                  </div>
                                )
                              )}
                              <div className="pt-4 border-t flex items-center justify-between">
                                <span className="text-sm text-muted-foreground font-medium">
                                  Pilih Bahasa / Language
                                </span>
                                <LanguageSwitcher isMobile={true} />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
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
