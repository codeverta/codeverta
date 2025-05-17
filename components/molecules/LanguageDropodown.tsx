import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { ChevronDown, Globe } from "lucide-react";
import { i18n } from "next-i18next";

// Define available languages
const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "ar", name: "Standard Arabic", flag: "🇸🇦" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "bn", name: "Bengali", flag: "🇧🇩" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "id", name: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "kr", name: "한국어", flag: "🇰🇷" },
  { code: "th", name: "ภาษาไทย", flag: "🇹🇭" },
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "ms", name: "Bahasa Melayu", flag: "🇲🇾" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
];

export default function LanguageDropdown() {
  const router = useRouter();
  const { locale } = router;
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(
    languages.find((lang) => lang.code === locale) || languages[0]
  );
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const changeLanguage = (locale) => {
    router.push(router.pathname, router.asPath, { locale });
    i18n?.changeLanguage(locale);
  };

  const handleLanguageChange = (lang) => {
    setCurrentLang(lang);
    setIsOpen(false);
    changeLanguage(lang.code);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 font-medium rounded-lg text-sm px-3 py-2 flex items-center transition-colors"
        aria-expanded={isOpen}
      >
        <Globe className="w-5 h-5 mr-1" />
        <span className="mr-1">{currentLang.flag}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 z-10">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center ${
                currentLang.code === lang.code
                  ? "bg-gray-50 dark:bg-gray-700"
                  : ""
              }`}
            >
              <span className="mr-2">{lang.flag}</span>
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
