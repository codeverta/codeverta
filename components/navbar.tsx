"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

// Import ikon yang Anda gunakan (asumsi dari 'lucide-react')
// PERHATIAN: Pastikan semua ikon ini sudah diimpor dari library ikon yang benar (misalnya lucide-react)
import {
  Newspaper,
  BrainCircuit,
  Rocket,
  Code,
  MessageSquare,
  ShieldCheck,
  BotMessageSquare,
  Eraser,
  FileText, // Mengganti 'Smile' dengan 'FileText' untuk PDF agar lebih relevan
  ChevronDown, // Tambahan untuk dropdown menu
  // Jika Anda menggunakan ikon lain, pastikan untuk mengimpornya di sini
} from "lucide-react";

// --- Data Kategori Tambahan ---
const newCategories = [
  {
    title: "News",
    description: "Berita terbaru seputar teknologi dan inovasi.",
    href: "/news",
    icon: <Newspaper className="h-8 w-8 text-blue-500" />,
    iconBgColor: "bg-blue-100 dark:bg-blue-900/50",
    group: "Artikel & Berita", // Grup baru
  },
  {
    title: "AI",
    description: "Jelajahi perkembangan terbaru dalam Kecerdasan Buatan.",
    href: "/ai",
    icon: <BrainCircuit className="h-8 w-8 text-purple-500" />,
    iconBgColor: "bg-purple-100 dark:bg-purple-900/50",
    group: "AI & Data", // Grup baru
  },
  {
    title: "Startups",
    description: "Kisah inspiratif dan strategi dari dunia startup.",
    href: "/startups",
    icon: <Rocket className="h-8 w-8 text-orange-500" />,
    iconBgColor: "bg-orange-100 dark:bg-orange-900/50",
    group: "Artikel & Berita",
  },
  {
    title: "Tutorials",
    description: "Panduan langkah demi langkah untuk membantu Anda belajar.",
    href: "/tutorials",
    icon: <Code className="h-8 w-8 text-green-500" />,
    iconBgColor: "bg-green-100 dark:bg-green-900/50",
    group: "Belajar & Panduan", // Grup baru
  },
  {
    title: "AI LLM (Large Language Models)",
    description:
      "Pelajari teknik prompting untuk Large Language Models dan AI.",
    href: "/course/prompting",
    icon: <MessageSquare className="h-8 w-8 text-indigo-500" />,
    iconBgColor: "bg-indigo-100 dark:bg-indigo-900/50",
    group: "Kelas & Pelatihan", // Grup baru
  },
  {
    title: "Artikel Cybersecurity Terupdate",
    description: "Jaga keamanan digital Anda dengan tips dan trik terbaru.",
    href: "/cybersecurity",
    icon: <ShieldCheck className="h-8 w-8 text-red-500" />,
    iconBgColor: "bg-red-100 dark:bg-red-900/50",
    group: "Artikel & Berita",
  },
  {
    title: "Cybersecurity Course",
    description: "Kelas cybersecurity terbaru.",
    href: "/course/cybersecurity",
    icon: <ShieldCheck className="h-8 w-8 text-red-500" />,
    iconBgColor: "bg-red-100 dark:bg-red-900/50",
    group: "Kelas & Pelatihan",
  },
  {
    title: "AI Engineer Course",
    description: "Artikel mendalam tentang AI dan model bahasa besar.",
    href: "/course/ai-engineer",
    icon: <BotMessageSquare className="h-8 w-8 text-sky-500" />,
    iconBgColor: "bg-sky-100 dark:bg-sky-900/50",
    group: "Kelas & Pelatihan",
  },
  // tambahkan image editor dan pdf editor
  {
    title: "Image Editor",
    description: "Edit gambar dengan berbagai tools seperti crop, resize, dll.",
    href: "/image",
    icon: <Eraser className="h-8 w-8 text-yellow-500" />,
    iconBgColor: "bg-yellow-100 dark:bg-yellow-900/50",
    group: "Produk Kami", // Grup baru
  },
  {
    title: "PDF Editor",
    description: "Edit dan konversi file PDF dengan mudah.",
    // Mengganti ikon Smile dengan FileText untuk relevansi yang lebih baik
    icon: <FileText className="h-8 w-8 text-teal-500" />,
    href: "/pdf",
    iconBgColor: "bg-teal-100 dark:bg-teal-900/50",
    group: "Produk Kami",
  },
];

// Mengelompokkan kategori baru berdasarkan properti 'group'
const groupedNewCategories = newCategories.reduce((acc, item) => {
  const groupName = item.group;
  if (!acc[groupName]) {
    acc[groupName] = [];
  }
  acc[groupName].push(item);
  return acc;
}, {});

// --- Struktur Mega Menu yang Diperbarui ---
const megaMenuData = {
  "/news": {
    title: "News",
    columns: [
      {
        title: "Tech News",
        items: [
          {
            name: "Breaking News",
            href: "/news/breaking",
            description: "Latest tech updates",
          },
          {
            name: "Industry Reports",
            href: "/news/industry",
            description: "Market analysis",
          },
          {
            name: "Company Updates",
            href: "/news/companies",
            description: "Business news",
          },
        ],
      },
      {
        title: "Categories",
        items: [
          {
            name: "Software",
            href: "/news/software",
            description: "Software developments",
          },
          {
            name: "Hardware",
            href: "/news/hardware",
            description: "Hardware innovations",
          },
          {
            name: "Mobile",
            href: "/news/mobile",
            description: "Mobile technology",
          },
        ],
      },
      {
        title: "Trending",
        items: [
          {
            name: "AI Revolution",
            href: "/news/ai-revolution",
            description: "AI developments",
          },
          {
            name: "Web3 Updates",
            href: "/news/web3",
            description: "Blockchain & crypto",
          },
          {
            name: "DevOps News",
            href: "/news/devops",
            description: "Development operations",
          },
        ],
      },
    ],
  },
  "/startups": {
    title: "Startups",
    columns: [
      {
        title: "Startup News",
        items: [
          {
            name: "Funding Rounds",
            href: "/startups/funding",
            description: "Investment updates",
          },
          {
            name: "New Launches",
            href: "/startups/launches",
            description: "Product launches",
          },
          {
            name: "Success Stories",
            href: "/startups/success",
            description: "Inspiring journeys",
          },
        ],
      },
      {
        title: "Resources",
        items: [
          {
            name: "Startup Guide",
            href: "/startups/guide",
            description: "How to start",
          },
          {
            name: "Investor Network",
            href: "/startups/investors",
            description: "Find investors",
          },
          {
            name: "Mentorship",
            href: "/startups/mentors",
            description: "Get guidance",
          },
        ],
      },
    ],
  },
  "/gadget": {
    title: "Gadget",
    columns: [
      {
        title: "Reviews",
        items: [
          {
            name: "Smartphones",
            href: "/gadget/smartphones",
            description: "Phone reviews",
          },
          {
            name: "Laptops",
            href: "/gadget/laptops",
            description: "Computer reviews",
          },
          {
            name: "Wearables",
            href: "/gadget/wearables",
            description: "Smart watches & more",
          },
        ],
      },
      {
        title: "Buying Guides",
        items: [
          {
            name: "Best Deals",
            href: "/gadget/deals",
            description: "Current promotions",
          },
          {
            name: "Comparisons",
            href: "/gadget/compare",
            description: "Product comparisons",
          },
          {
            name: "Recommendations",
            href: "/gadget/recommended",
            description: "Editor's choice",
          },
        ],
      },
    ],
  },
  "/tutorials": {
    title: "Tutorials",
    columns: [
      {
        title: "Web Development",
        items: [
          {
            name: "React Tutorials",
            href: "/tutorials/react",
            description: "Learn React.js",
          },
          {
            name: "Next.js Guide",
            href: "/tutorials/nextjs",
            description: "Full-stack React",
          },
          {
            name: "JavaScript Tips",
            href: "/tutorials/javascript",
            description: "JS best practices",
          },
        ],
      },
      {
        title: "Mobile Development",
        items: [
          {
            name: "React Native",
            href: "/tutorials/react-native",
            description: "Mobile apps",
          },
          {
            name: "Flutter",
            href: "/tutorials/flutter",
            description: "Cross-platform",
          },
          {
            name: "iOS Development",
            href: "/tutorials/ios",
            description: "Swift & Objective-C",
          },
        ],
      },
      {
        title: "Backend",
        items: [
          {
            name: "Node.js",
            href: "/tutorials/nodejs",
            description: "Server-side JS",
          },
          {
            name: "Python",
            href: "/tutorials/python",
            description: "Python programming",
          },
          {
            name: "Database",
            href: "/tutorials/database",
            description: "SQL & NoSQL",
          },
        ],
      },
    ],
  },
  "/ai": {
    title: "AI",
    columns: [
      {
        title: "AI News",
        items: [
          {
            name: "Machine Learning",
            href: "/ai/ml",
            description: "ML developments",
          },
          {
            name: "AI Tools",
            href: "/ai/tools",
            description: "Latest AI tools",
          },
          {
            name: "Research",
            href: "/ai/research",
            description: "Academic papers",
          },
        ],
      },
      {
        title: "Tutorials",
        items: [
          {
            name: "Getting Started",
            href: "/ai/getting-started",
            description: "AI basics",
          },
          {
            name: "Deep Learning",
            href: "/ai/deep-learning",
            description: "Neural networks",
          },
          {
            name: "AI Ethics",
            href: "/ai/ethics",
            description: "Responsible AI",
          },
        ],
      },
    ],
  },
  // Menambahkan entri untuk menu baru yang memiliki sub-menu
  "/kategori/artikel": {
    title: "Artikel & Berita",
    columns: [
      {
        title: "Berita Utama",
        items: [
          {
            name: "News (Tech & Inovasi)",
            href: "/news",
            description: "Berita terbaru seputar teknologi dan inovasi.",
          },
          {
            name: "Startups",
            href: "/startups",
            description: "Kisah inspiratif dan strategi dari dunia startup.",
          },
          {
            name: "Gadget Reviews",
            href: "/gadget",
            description: "Ulasan dan panduan pembelian gadget terbaru.",
          },
        ],
      },
      {
        title: "Isu Khusus",
        items: [
          {
            name: "Artikel Cybersecurity",
            href: "/cybersecurity",
            description:
              "Jaga keamanan digital Anda dengan tips dan trik terbaru.",
          },
          {
            name: "Semua Artikel",
            href: "/article",
            description: "Lihat semua artikel blog.",
          },
        ],
      },
    ],
  },
  "/kategori/belajar": {
    title: "Belajar & Panduan",
    columns: [
      {
        title: "Panduan",
        items: [
          {
            name: "Tutorials",
            href: "/tutorials",
            description:
              "Panduan langkah demi langkah untuk membantu Anda belajar.",
          },
        ],
      },
      {
        title: "Kelas",
        items: [
          {
            name: "Cybersecurity Course",
            href: "/course/cybersecurity",
            description: "Kelas cybersecurity terbaru.",
          },
          {
            name: "AI LLM Course",
            href: "/course/prompting",
            description: "Teknik prompting untuk Large Language Models.",
          },
          {
            name: "AI Engineer Course",
            href: "/course/ai-engineer",
            description: "Kelas mendalam tentang AI dan model bahasa besar.",
          },
        ],
      },
    ],
  },
  "/kategori/tools": {
    title: "Produk Kami",
    columns: [
      {
        title: "Produktivitas",
        items: [
          {
            name: "Image Editor",
            href: "/image",
            description:
              "Edit gambar dengan berbagai tools seperti crop, resize, dll.",
          },
          {
            name: "PDF Editor",
            href: "/pdf",
            description: "Edit dan konversi file PDF dengan mudah.",
          },
        ],
      },
      {
        title: "AI & Tools Lain",
        items: [
          {
            name: "AI (Artificial Intelligence)",
            href: "/ai",
            description:
              "Jelajahi perkembangan terbaru dalam Kecerdasan Buatan.",
          },
        ],
      },
    ],
  },
};

// Responsive Navbar Component
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // --- Kategori Navigasi Utama yang Diperbarui ---
  const categories = [
    { id: "/kategori/tools", name: "Produk Kami", isDropdown: true },
    { id: "/kategori/artikel", name: "Artikel & Berita", isDropdown: true },
    { id: "/kategori/belajar", name: "Kelas & Tutorial", isDropdown: true },
    { id: "/about", name: "Tentang Kami" },
  ];

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
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground">
              CV
            </div>
            <span className="hidden sm:block">Codeverta</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-6 xl:gap-8 relative">
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
                      `text-sm font-medium text-muted-foreground transition-colors hover:text-foreground cursor-pointer relative flex items-center gap-1 py-2 ${
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
