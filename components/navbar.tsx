"use client";

import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, Languages } from "lucide-react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { getNavigationThumbnail } from "@/lib/navigation-thumbnails";
import idNavigation from "../public/locales/id/navigation.json";
import englishNavigation from "../public/locales/en/navigation.json";

import { getCategories, getMegaMenuData } from "@/lib/data";

const languages = [
  { code: "id", name: "Indonesia", flag: "🇮🇩" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "ms", name: "Melayu", flag: "🇲🇾" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "th", name: "ไทย", flag: "🇹🇭" },
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "nl", name: "Nederlands", flag: "🇳🇱" },
];

type NavigationProjectData = {
  name: string;
  product: {
    id: string;
    name: string;
    description: string;
    image?: string;
  };
};
type NavigationData = { projects: NavigationProjectData[] };
type NavigationCategory = {
  id: string;
  name: string;
  children?: {
    id: string;
    name: string;
    description?: string;
    external?: boolean;
  }[];
};
type MegaMenuData = {
  columns: {
    title: string;
    items: {
      name: string;
      href: string;
      image?: string;
      description?: string;
    }[];
  }[];
};

const navigationCache = new Map<string, NavigationData>([
  ["id", idNavigation],
  ["en", englishNavigation],
]);

const LanguageSwitcher = memo(function LanguageSwitcher({
  isMobile = false,
  langDropdownOpen,
  setLangDropdownOpen,
  mounted,
  locale,
  availableLanguages,
  t,
  onChangeLanguage,
  onPrefetchLanguage,
}: {
  isMobile?: boolean;
  langDropdownOpen: boolean;
  setLangDropdownOpen: (open: boolean) => void;
  mounted: boolean;
  locale?: string;
  availableLanguages: typeof languages;
  t: (key: string) => any;
  onChangeLanguage: (locale: string) => void;
  onPrefetchLanguage: (locale: string) => void;
}) {
  return (
    <div className={isMobile ? "" : "relative"}>
      <button
        onClick={() => setLangDropdownOpen(!langDropdownOpen)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-expanded={langDropdownOpen}
      >
        <Languages className="w-5 h-5 text-muted-foreground" />
        <span className="text-xs font-bold uppercase">{locale}</span>
        <ChevronDown
          className={`w-3 h-3 transition-transform ${
            langDropdownOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isMobile ? (
        mounted &&
        typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {langDropdownOpen && (
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.12, ease: "easeOut" }}
                className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
                onClick={() => setLangDropdownOpen(false)}
              >
                <m.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.12, ease: "easeOut" }}
                  role="dialog"
                  aria-modal="true"
                  aria-label={t("ui.chooseLanguage")}
                  className="flex max-h-[calc(100dvh-2rem)] w-full max-w-md flex-col overflow-hidden rounded-2xl border bg-background p-4 shadow-2xl"
                  onClick={(event) => event.stopPropagation()}
                >
                  <div className="mb-3 flex flex-shrink-0 items-center justify-between border-b pb-3">
                    <span className="text-base font-bold text-foreground">
                      {t("ui.chooseLanguage")}
                    </span>
                    <button
                      onClick={() => setLangDropdownOpen(false)}
                      className="p-1 text-sm text-muted-foreground hover:text-foreground"
                    >
                      {t("ui.close")}
                    </button>
                  </div>
                  <div className="grid min-h-0 grid-cols-2 gap-1 overflow-y-auto overscroll-contain">
                    {availableLanguages.map((language) => (
                      <button
                        type="button"
                        key={language.code}
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors hover:bg-accent ${
                          locale === language.code ? "bg-accent font-bold" : ""
                        }`}
                        onMouseEnter={() => onPrefetchLanguage(language.code)}
                        onFocus={() => onPrefetchLanguage(language.code)}
                        onTouchStart={() => onPrefetchLanguage(language.code)}
                        onClick={() => {
                          onChangeLanguage(language.code);
                          setLangDropdownOpen(false);
                        }}
                      >
                        <span>{language.flag}</span>
                        <span className="truncate">{language.name}</span>
                        {locale === language.code && (
                          <Check className="ml-auto h-4 w-4 flex-shrink-0 text-primary" />
                        )}
                      </button>
                    ))}
                  </div>
                </m.div>
              </m.div>
            )}
          </AnimatePresence>,
          document.body
        )
      ) : (
        <AnimatePresence>
          {langDropdownOpen && (
            <m.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.12, ease: "easeOut" }}
              className="absolute right-0 top-full z-[60] mt-2 max-h-[70vh] w-72 overflow-y-auto rounded-xl border bg-background shadow-xl"
            >
              <div className="flex flex-col py-1">
                {availableLanguages.map((language) => (
                  <button
                    type="button"
                    key={language.code}
                    className="w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-accent flex items-center justify-between"
                    onMouseEnter={() => onPrefetchLanguage(language.code)}
                    onFocus={() => onPrefetchLanguage(language.code)}
                    onClick={() => {
                      onChangeLanguage(language.code);
                      setLangDropdownOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span>{language.flag}</span>
                      <span
                        className={locale === language.code ? "font-bold" : ""}
                      >
                        {language.name}
                      </span>
                    </div>
                    {locale === language.code && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </m.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
});

const MegaMenu = memo(function MegaMenu({
  categoryId,
  data,
  productHref,
  onClose,
  onLeave,
  onEnter,
}: {
  categoryId: string;
  data: MegaMenuData;
  productHref: string;
  onClose: () => void;
  onLeave: () => void;
  onEnter: (categoryId: string) => void;
}) {
  return (
    <m.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b shadow-xl z-50"
      onMouseEnter={() => onEnter(categoryId)}
      onMouseLeave={onLeave}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                {column.items.map((item, itemIndex) => {
                  const isProductsIndex = item.href === "/products";
                  const ItemTag = isProductsIndex ? "a" : Link;

                  return (
                    <ItemTag
                      key={itemIndex}
                      href={isProductsIndex ? productHref : item.href}
                      className="group flex gap-3 rounded-xl p-2 transition-colors duration-200 hover:bg-accent"
                      onClick={onClose}
                    >
                      {item.image && (
                        <div className="relative h-16 w-24 flex-none overflow-hidden rounded-lg border bg-muted">
                          <img
                            src={getNavigationThumbnail(item.image)}
                            alt=""
                            width={96}
                            height={64}
                            decoding="async"
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="min-w-0 py-0.5">
                        <div className="font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                          {item.name}
                        </div>
                        <div className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                          {item.description}
                        </div>
                      </div>
                    </ItemTag>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </m.div>
  );
});

const SimpleDropdown = memo(function SimpleDropdown({
  category,
  isOpen,
  onOpen,
  onClose,
  onSelect,
}: {
  category: NavigationCategory & {
    children: NonNullable<NavigationCategory["children"]>;
  };
  isOpen: boolean;
  onOpen: (categoryId: string) => void;
  onClose: () => void;
  onSelect: () => void;
}) {
  return (
    <div
      className="relative"
      onMouseEnter={() => onOpen(category.id)}
      onMouseLeave={onClose}
    >
      <button
        className={cn(
          "relative flex cursor-pointer items-center gap-1 py-8 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground after:absolute after:bottom-5 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-primary after:transition-transform after:duration-300 hover:after:scale-x-100",
          isOpen && "text-primary after:scale-x-100"
        )}
      >
        {category.name}
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-1/2 -translate-x-1/2 min-w-[220px] bg-background border rounded-2xl shadow-xl z-[60] py-2 overflow-hidden"
          >
            {category.children.map((child) => {
              const isExt = child.external || child.id.startsWith("http");
              const Tag = isExt ? "a" : Link;
              return (
                <Tag
                  key={child.id}
                  href={child.id}
                  target={isExt ? "_blank" : undefined}
                  rel={isExt ? "noopener noreferrer" : undefined}
                  onClick={onSelect}
                  className="flex flex-col px-4 py-3 hover:bg-accent transition-colors group"
                >
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {child.name}
                  </span>
                  {child.description && (
                    <span className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {child.description}
                    </span>
                  )}
                </Tag>
              );
            })}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
});

// Responsive Navbar Component
const Navbar = ({
  localizedPaths,
}: {
  localizedPaths?: Record<string, string>;
}) => {
  const { t } = useTranslation("common");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [activeSimpleDropdown, setActiveSimpleDropdown] = useState<
    string | null
  >(null);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<
    string | null
  >(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const {
    locale,
    locales,
    defaultLocale,
    push,
    prefetch,
    pathname,
    asPath,
    query,
  } = router;
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const lang = locale;
  const [localizedProjects, setLocalizedProjects] = useState<NavigationData>(
    () => navigationCache.get(locale || "id") || englishNavigation
  );
  const megaMenuData = useMemo(
    () => getMegaMenuData(t, localizedProjects),
    [t, localizedProjects]
  );
  const menusByCategory = megaMenuData as Record<string, MegaMenuData>;
  const availableLanguages = useMemo(
    () =>
      languages.filter(
        (language) => !locales || locales.includes(language.code)
      ),
    [locales]
  );
  const categories = useMemo(() => getCategories(t), [t]);
  const productHref =
    locale && locale !== defaultLocale ? `/${locale}/products` : "/products";

  const hiddenMenu = []; // Tetap kosong, atau isi jika ada menu yang mau disembunyikan

  useEffect(() => {
    setMounted(true);
    let previousScrolled = false;
    const handleScroll = () => {
      const nextScrolled = window.scrollY > 10;
      if (nextScrolled === previousScrolled) return;
      previousScrolled = nextScrolled;
      setIsScrolled(nextScrolled);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    let cancelled = false;
    const localeCandidates = [locale, locale?.split("-")[0]].filter(
      (candidate): candidate is string => Boolean(candidate)
    );
    const cachedData = localeCandidates
      .map((candidate) => navigationCache.get(candidate))
      .find((data): data is NavigationData => Boolean(data));
    if (cachedData) setLocalizedProjects(cachedData);
    if (localeCandidates.every((candidate) => navigationCache.has(candidate))) {
      return;
    }

    async function loadLocalizedNavigation() {
      for (const candidate of localeCandidates) {
        try {
          const response = await fetch(
            "/locales/" + encodeURIComponent(candidate) + "/navigation.json",
            { cache: "force-cache" }
          );
          if (!response.ok) continue;

          const localizedData = await response.json();
          if (!Array.isArray(localizedData.projects)) continue;
          navigationCache.set(candidate, localizedData);
          if (!cancelled) setLocalizedProjects(localizedData);
          return;
        } catch {
          continue;
        }
      }

      if (!cancelled) {
        setLocalizedProjects(navigationCache.get("id") || englishNavigation);
      }
    }

    void loadLocalizedNavigation();

    return () => {
      cancelled = true;
    };
  }, [locale]);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((open) => !open);
  }, []);

  const handleMegaMenuEnter = useCallback(
    (categoryId: string) => {
      if (menusByCategory[categoryId]) setActiveMegaMenu(categoryId);
      else setActiveMegaMenu(null);
    },
    [menusByCategory]
  );
  const handleMegaMenuLeave = useCallback(() => setActiveMegaMenu(null), []);
  const handleSimpleDropdownOpen = useCallback((categoryId: string) => {
    setActiveSimpleDropdown(categoryId);
    setActiveMegaMenu(null);
  }, []);
  const handleSimpleDropdownLeave = useCallback(
    () => setActiveSimpleDropdown(null),
    []
  );
  const closeMegaMenu = useCallback(() => {
    setActiveMegaMenu(null);
    setMobileMenuOpen(false);
  }, []);
  const closeSimpleDropdown = useCallback(
    () => setActiveSimpleDropdown(null),
    []
  );
  const changeLanguage = useCallback(
    (newLocale: string) => {
      if (newLocale === locale) return;

      // Keep an explicit choice above automatic browser/region detection.
      document.cookie = `NEXT_LOCALE=${encodeURIComponent(
        newLocale
      )}; Path=/; Max-Age=31536000; SameSite=Lax`;
      const targetPath = localizedPaths?.[newLocale];

      if (targetPath) {
        push(targetPath, targetPath, { locale: newLocale });
        return;
      }

      push({ pathname, query }, asPath, { locale: newLocale });
    },
    [localizedPaths, push, pathname, query, asPath, locale]
  );
  const prefetchLanguage = useCallback(
    (newLocale: string) => {
      if (newLocale === locale) return;

      const targetPath = localizedPaths?.[newLocale];
      if (targetPath) {
        void prefetch(targetPath, targetPath, { locale: newLocale });
        return;
      }

      void prefetch({ pathname, query }, asPath, { locale: newLocale });
    },
    [localizedPaths, prefetch, pathname, query, asPath, locale]
  );

  // A document navigation prevents the top-level dynamic short-link route
  // (`/[shortCode]`) from taking over `/products` during a client transition.
  // State untuk melacak menu dropdown mobile yang terbuka
  const toggleMobileDropdown = useCallback((categoryId: string) => {
    setActiveMobileDropdown((active) =>
      active === categoryId ? null : categoryId
    );
  }, []);

  // ------------------------------------------------------------------------------------------------

  return (
    <LazyMotion features={domAnimation}>
      <header
        className={`print:hidden sticky top-0 w-full backdrop-blur-lg transition-all duration-300 ${
          mobileMenuOpen ? "z-[100]" : "z-50"
        } ${isScrolled ? "bg-background/80 shadow-sm" : "bg-transparent"}`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between relative">
            {/* Logo */}
            <Link
              href={"/"}
              className="min-w-0 flex-shrink z-10 hover:bg-gray-50 dark:hover:bg-gray-800 p-1 sm:p-2 rounded-lg cursor-pointer flex items-center gap-2 font-bold"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center overflow-hidden flex-shrink-0">
                <img
                  src="/assets/images/icon.png"
                  alt="Logo"
                  className="size-full object-cover"
                />
              </div>
              <div className="flex min-w-0 flex-col leading-tight">
                <span className="text-sm sm:text-base">Codeverta</span>
                <span className="truncate text-[8px] min-[360px]:text-[9px] sm:text-[10px] font-medium text-gray-500 tracking-tighter uppercase">
                  {locale === "id"
                    ? "PT Zenit Technology Solution"
                    : "Zenit Technology Solution Pte. Ltd."}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex gap-6 xl:gap-8 absolute left-1/2 -translate-x-1/2 items-center">
              {categories.map((category) => {
                // Grouped dropdown (children array)
                if (category.children && category.children.length > 0) {
                  return (
                    <SimpleDropdown
                      key={category.id}
                      category={
                        category as NavigationCategory & {
                          children: NonNullable<NavigationCategory["children"]>;
                        }
                      }
                      isOpen={activeSimpleDropdown === category.id}
                      onOpen={handleSimpleDropdownOpen}
                      onClose={handleSimpleDropdownLeave}
                      onSelect={closeSimpleDropdown}
                    />
                  );
                }

                // Legacy: mega menu
                const hasMegaMenu = Boolean(
                  category.isDropdown && menusByCategory[category.id]
                );
                const isExternal = category.id.startsWith("http");
                const isProductsIndex = category.id === "/products";
                const Tag = isExternal || isProductsIndex ? "a" : Link;

                return (
                  <div
                    key={category.id}
                    className="relative"
                    onMouseEnter={() => handleMegaMenuEnter(category.id)}
                  >
                    <Tag
                      href={isProductsIndex ? productHref : category.id}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className={cn(
                        `text-sm font-medium text-muted-foreground transition-colors hover:text-foreground cursor-pointer relative flex items-center gap-1 py-8 after:absolute after:bottom-5 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-primary after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                          !hiddenMenu.includes(category.name.toLowerCase())
                            ? ""
                            : "hidden"
                        } ${
                          activeMegaMenu === category.id
                            ? "text-primary after:scale-x-100"
                            : ""
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
                      {hasMegaMenu && (
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            activeMegaMenu === category.id ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </Tag>
                  </div>
                );
              })}
            </nav>

            {/* Mobile Menu Button and Theme Toggle */}
            <div className="flex items-center gap-2 z-10">
              {/* Theme Toggle (Dapat ditambahkan di sini jika Anda ingin) */}
              <div className="hidden lg:block">
                <LanguageSwitcher
                  langDropdownOpen={langDropdownOpen}
                  setLangDropdownOpen={setLangDropdownOpen}
                  mounted={mounted}
                  locale={locale}
                  availableLanguages={availableLanguages}
                  t={t}
                  onChangeLanguage={changeLanguage}
                  onPrefetchLanguage={prefetchLanguage}
                />
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
          {activeMegaMenu && menusByCategory[activeMegaMenu] && (
            <MegaMenu
              key={activeMegaMenu}
              categoryId={activeMegaMenu}
              data={menusByCategory[activeMegaMenu]}
              productHref={productHref}
              onClose={closeMegaMenu}
              onLeave={handleMegaMenuLeave}
              onEnter={handleMegaMenuEnter}
            />
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <m.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-x-0 top-16 z-50 h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t bg-background shadow-xl lg:hidden"
            >
              <div className="container mx-auto min-h-full space-y-3 px-4 py-3 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                <div className="flex flex-col space-y-1">
                  {categories.map((category) => {
                    // ── Grouped children dropdown ──────────────────
                    if (category.children && category.children.length > 0) {
                      const isOpen = activeMobileDropdown === category.id;
                      return (
                        <div key={category.id} className="rounded-lg">
                          <button
                            type="button"
                            onClick={() => toggleMobileDropdown(category.id)}
                            className="w-full flex items-center justify-between text-sm font-medium text-muted-foreground hover:text-foreground py-2.5 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                            aria-expanded={isOpen}
                          >
                            <span>{category.name}</span>
                            <ChevronDown
                              className={`w-4 h-4 transition-transform ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          <AnimatePresence>
                            {isOpen && (
                              <m.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.18 }}
                                className="overflow-hidden"
                              >
                                <div className="mt-1 rounded-xl border bg-muted/20 p-2 space-y-0.5">
                                  {category.children.map((child) => {
                                    const isExt =
                                      child.external ||
                                      child.id.startsWith("http");
                                    const Tag = isExt ? "a" : Link;
                                    return (
                                      <Tag
                                        key={child.id}
                                        href={child.id}
                                        target={isExt ? "_blank" : undefined}
                                        rel={
                                          isExt
                                            ? "noopener noreferrer"
                                            : undefined
                                        }
                                        onClick={() => {
                                          setActiveMobileDropdown(null);
                                          setMobileMenuOpen(false);
                                        }}
                                        className="flex flex-col rounded-lg px-3 py-2.5 hover:bg-background transition-colors"
                                      >
                                        <span className="text-sm font-medium text-foreground">
                                          {child.name}
                                        </span>
                                        {child.description && (
                                          <span className="mt-0.5 text-xs leading-relaxed text-muted-foreground line-clamp-1">
                                            {child.description}
                                          </span>
                                        )}
                                      </Tag>
                                    );
                                  })}
                                </div>
                              </m.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    }

                    // ── Legacy mega menu ───────────────────────────
                    const isExternal = category.id.startsWith("http");
                    const hasMegaMenu =
                      category.isDropdown && menusByCategory[category.id];
                    const Tag = isExternal ? "a" : Link;

                    if (hasMegaMenu) {
                      const isOpen = activeMobileDropdown === category.id;

                      return (
                        <div key={category.id} className="rounded-lg">
                          <button
                            type="button"
                            onClick={() => toggleMobileDropdown(category.id)}
                            className="w-full flex items-center justify-between text-sm font-medium text-muted-foreground hover:text-foreground py-2.5 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                            aria-expanded={isOpen}
                          >
                            <span>{category.name}</span>
                            <ChevronDown
                              className={`w-4 h-4 transition-transform ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          <AnimatePresence>
                            {isOpen && (
                              <m.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.18 }}
                                className="overflow-hidden"
                              >
                                <div className="mt-1 space-y-3 rounded-xl border border-border/70 bg-muted/30 p-2.5">
                                  {menusByCategory[category.id].columns.map(
                                    (column, columnIndex) => (
                                      <div
                                        key={columnIndex}
                                        className="space-y-1.5"
                                      >
                                        <p className="px-2 pb-0.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                                          {column.title}
                                        </p>
                                        {column.items.map((item, itemIndex) => {
                                          const isProductsIndex =
                                            item.href === "/products";
                                          const ItemTag = isProductsIndex
                                            ? "a"
                                            : Link;

                                          return (
                                            <ItemTag
                                              key={itemIndex}
                                              href={
                                                isProductsIndex
                                                  ? productHref
                                                  : item.href
                                              }
                                              onClick={() => {
                                                setActiveMobileDropdown(null);
                                                setMobileMenuOpen(false);
                                              }}
                                              className="flex items-start gap-3 rounded-lg bg-background/70 p-2 transition-colors hover:bg-background"
                                            >
                                              {item.image && (
                                                <img
                                                  src={getNavigationThumbnail(
                                                    item.image
                                                  )}
                                                  alt=""
                                                  width={80}
                                                  height={56}
                                                  decoding="async"
                                                  className="h-14 w-20 flex-none rounded-lg border bg-muted object-cover"
                                                  loading="lazy"
                                                />
                                              )}
                                              <span className="min-w-0">
                                                <span className="line-clamp-2 block text-sm font-semibold leading-snug text-foreground">
                                                  {item.name}
                                                </span>
                                                <span className="mt-1 block max-h-10 overflow-hidden text-xs leading-relaxed text-muted-foreground">
                                                  {item.description}
                                                </span>
                                              </span>
                                            </ItemTag>
                                          );
                                        })}
                                      </div>
                                    )
                                  )}
                                </div>
                              </m.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    }

                    // ── Plain link ─────────────────────────────────
                    return (
                      <Tag
                        key={category.id}
                        href={category.id}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-sm font-medium text-muted-foreground hover:text-foreground py-2.5 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 block"
                      >
                        {category.name}
                      </Tag>
                    );
                  })}
                </div>

                <div className="pt-4 border-t flex items-center justify-between">
                  <span className="text-sm text-muted-foreground font-medium">
                    Bahasa
                  </span>
                  <LanguageSwitcher
                    isMobile
                    langDropdownOpen={langDropdownOpen}
                    setLangDropdownOpen={setLangDropdownOpen}
                    mounted={mounted}
                    locale={locale}
                    availableLanguages={availableLanguages}
                    t={t}
                    onChangeLanguage={changeLanguage}
                    onPrefetchLanguage={prefetchLanguage}
                  />
                </div>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </header>
    </LazyMotion>
  );
};

export default Navbar;
