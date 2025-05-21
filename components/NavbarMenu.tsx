import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import LanguageDropdown from "./molecules/LanguageDropodown";
import { Moon, Sun, Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import MegaMenu from "./MegaMenu";

function NavbarMenu({ menus, handleOpenLogin, handleDrawer, open }) {
  const router = useRouter();
  const { t } = useTranslation("common");
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add event listener to close mega menu on scroll and track scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (megaMenuOpen) {
        setMegaMenuOpen(false);
      }

      // Add scrolled state to adjust transparency based on scroll position
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [megaMenuOpen]);

  // Main shop menu categories
  const shopCategories = [
    { id: "fragrance-oils", name: "Fragrance Oils" },
    { id: "essential-oils", name: "Essential Oils" },
    { id: "candle-making", name: "Candle Making" },
    { id: "flameless", name: "Flameless" },
    { id: "soap-making", name: "Soap Making" },
    { id: "learning", name: "Learning" },
    { id: "new-products", name: "New Products" },
    { id: "kits", name: "Kits" },
  ];

  const toggleMegaMenu = () => {
    setMegaMenuOpen(!megaMenuOpen);
  };

  const closeMegaMenu = () => {
    setMegaMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed w-full top-0 z-50 backdrop-filter backdrop-blur-md 
                   ${
                     scrolled
                       ? "bg-white/50 dark:bg-gray-800/90"
                       : "bg-white/30 dark:bg-gray-800/80"
                   } 
                   border-b border-gray-200/60 dark:border-gray-700/60 
                   px-4 lg:px-6 py-2.5 transition-all duration-200 print:hidden shadow-sm`}
      >
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link href="/" className="flex items-center">
            <img
              src="/logolilin.png"
              className="mr-3 rounded-full w-9 h-9 sm:w-12 sm:h-12 transition-transform hover:scale-105"
              alt="Codeverta Logo"
            />
            <div className="flex flex-col">
              <span className="self-center text-xl font-semibold whitespace-nowrap text-gray-800 dark:text-white">
                {t("brand", "Codeverta")}
              </span>
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {t("established", "Est. 2007")}
              </span>
            </div>
          </Link>

          <div className="flex items-center lg:order-3 space-x-2">
            {/* Language Selector */}
            <div className="hidden sm:block">
              <LanguageDropdown />
            </div>

            {/* Login Button */}
            <button
              onClick={handleOpenLogin}
              className="hidden sm:block text-gray-800 dark:text-white bg-transparent hover:bg-gray-50/80 dark:hover:bg-gray-700/80 focus:ring-4 focus:ring-blue-300/50 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 border border-gray-300/60 dark:border-gray-600/60 transition-colors"
            >
              {t("login", "Log in")}
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={handleDrawer}
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100/80 focus:outline-none focus:ring-2 focus:ring-gray-200/70 dark:text-gray-400 dark:hover:bg-gray-700/80 dark:focus:ring-gray-600/70"
              aria-controls="mobile-menu-2"
              aria-expanded={open.drawer}
            >
              <span className="sr-only">Toggle menu</span>
              {open.drawer ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Desktop Menu */}
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-2"
            id="desktop-menu"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {/* Original Menu Items */}
              {menus.map((menu, index) => {
                const isActive =
                  router.pathname === menu.url ||
                  (menu.url !== "/" && router.pathname.startsWith(menu.url));
                return (
                  <li key={index}>
                    <Link
                      href={menu.url}
                      className={`block py-2 pr-4 pl-3 border-b border-gray-100/60 hover:bg-gray-50/60 lg:hover:bg-transparent lg:border-0 lg:p-0 dark:hover:bg-gray-700/70 lg:dark:hover:bg-transparent dark:border-gray-700/60 transition-colors relative
                        ${
                          isActive
                            ? "text-blue-600 dark:text-white font-semibold after:absolute after:w-full after:h-0.5 after:bg-blue-600 after:dark:bg-white after:bottom-0 after:left-0"
                            : "text-gray-700 dark:text-gray-300 lg:hover:text-blue-600 dark:hover:text-white lg:dark:hover:text-white after:absolute after:w-0 after:h-0.5 after:bg-blue-600 after:dark:bg-white after:bottom-0 after:left-0 hover:after:w-full after:transition-all"
                        }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {menu.label}
                    </Link>
                  </li>
                );
              })}

              {/* Shop Menu with Dropdown */}
              {/* <li className="relative">
                <button
                  onClick={toggleMegaMenu}
                  className={`flex items-center py-2 pr-4 pl-3 border-b border-gray-100/60 hover:bg-gray-50/60 lg:hover:bg-transparent lg:border-0 lg:p-0 dark:hover:bg-gray-700/70 lg:dark:hover:bg-transparent dark:border-gray-700/60 transition-colors relative
                  ${
                    megaMenuOpen
                      ? "text-blue-600 dark:text-white font-semibold after:absolute after:w-full after:h-0.5 after:bg-blue-600 after:dark:bg-white after:bottom-0 after:left-0"
                      : "text-gray-700 dark:text-gray-300 lg:hover:text-blue-600 dark:hover:text-white lg:dark:hover:text-white after:absolute after:w-0 after:h-0.5 after:bg-blue-600 after:dark:bg-white after:bottom-0 after:left-0 hover:after:w-full after:transition-all"
                  }`}
                  aria-expanded={megaMenuOpen}
                >
                  Shop
                  {megaMenuOpen ? (
                    <ChevronUp className="w-4 h-4 ml-1" />
                  ) : (
                    <ChevronDown className="w-4 h-4 ml-1" />
                  )}
                </button>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>

      {/* Add padding to content below fixed navbar */}
      <div className="pt-16 sm:pt-20"></div>

      {/* Mega Menu */}
      <MegaMenu isOpen={megaMenuOpen} onClose={closeMegaMenu} />
    </>
  );
}

export default NavbarMenu;
