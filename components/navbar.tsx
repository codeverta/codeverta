import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Zap, ChevronDown, ChevronRight } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search } from "lucide-react";
import {
  Bell,
  BookmarkPlus,
  Clock,
  FlameIcon,
  Heart,
  MessageSquare,
  Share2,
  ThumbsUp,
  User,
  X,
} from "lucide-react";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "/news", name: "All News" },
    { id: "/ai", name: "AI" },
    { id: "/startups", name: "Startups" },
    { id: "/gadget", name: "Gadget" },
    { id: "/tutorials", name: "Tutorials" },
    { id: "/about", name: "About" },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [mobileOpenSections, setMobileOpenSections] = useState({});

  const toggleMobileSection = (label) => {
    setMobileOpenSections((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };
  const breakingNews = [
    "New AI breakthrough could revolutionize healthcare industry",
    "Global tech leaders announce climate initiative at summit",
    "SpaceX successfully launches next-generation satellite network",
  ];
  // Integrated mega menu data
  const mainNavItems = [
    // {
    //   label: "Learning",
    //   mobileClosed: true,
    //   megaMenu: [
    //     {
    //       title: "Tutorials",
    //       links: [
    //         {
    //           title: "Frontend Development",
    //           description: "HTML, CSS, JavaScript, and modern frameworks",
    //           href: "/frontend",
    //           icon: "heroicons:code-bracket",
    //         },
    //         {
    //           title: "Backend Development",
    //           description: "Node.js, Python, PHP, and database technologies",
    //           href: "/backend",
    //           icon: "heroicons:server",
    //         },
    //         {
    //           title: "Mobile Development",
    //           description: "React Native, Flutter, and native app development",
    //           href: "/mobile",
    //           icon: "heroicons:device-phone-mobile",
    //         },
    //         {
    //           title: "Cyber Security",
    //           description: "Belajar mengenai keamanan cyber",
    //           href: "/cyber-security",
    //           icon: "heroicons:device-phone-mobile",
    //         },
    //       ],
    //     },
    //     {
    //       title: "Courses",
    //       links: [
    //         {
    //           title: "Web Development Bootcamp",
    //           description: "Complete guide to modern web development",
    //           href: "/courses/web-bootcamp",
    //           icon: "heroicons:academic-cap",
    //         },
    //         {
    //           title: "Data Structures & Algorithms",
    //           description: "Master coding interviews and problem solving",
    //           href: "/courses/dsa",
    //           icon: "heroicons:chart-bar",
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   label: "Tools & Resources",
    //   mobileClosed: true,
    //   megaMenu: [
    //     {
    //       title: "Developer Tools",
    //       links: [
    //         {
    //           title: "Code Playground",
    //           description: "Interactive environment to test your code",
    //           href: "/tools/playground",
    //           icon: "heroicons:beaker",
    //         },
    //         {
    //           title: "AI Code Assistant",
    //           description: "Get suggestions and help with your code",
    //           href: "/tools/ai-assistant",
    //           icon: "heroicons:cpu-chip",
    //         },
    //         {
    //           title: "Code Formatter",
    //           description: "Format your code with best practices",
    //           href: "/tools/formatter",
    //           icon: "heroicons:wrench-screwdriver",
    //         },
    //       ],
    //     },
    //     {
    //       title: "Resources",
    //       links: [
    //         {
    //           title: "Cheat Sheets",
    //           description: "Quick reference guides for developers",
    //           href: "/resources/cheat-sheets",
    //           icon: "heroicons:document-text",
    //         },
    //         {
    //           title: "Roadmaps",
    //           description: "Learning paths for different tech stacks",
    //           href: "/resources/roadmaps",
    //           icon: "heroicons:map",
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   label: "Community",
    //   mobileClosed: true,
    //   megaMenu: [
    //     {
    //       title: "Connect",
    //       links: [
    //         {
    //           title: "Forums",
    //           description: "Discuss with fellow developers",
    //           href: "/community/forums",
    //           icon: "heroicons:chat-bubble-left-right",
    //         },
    //         {
    //           title: "Events",
    //           description: "Webinars, workshops, and meetups",
    //           href: "/community/events",
    //           icon: "heroicons:calendar",
    //         },
    //         {
    //           title: "Discord Server",
    //           description: "Join our active developer community",
    //           href: "/community/discord",
    //           icon: "heroicons:users",
    //         },
    //       ],
    //     },
    //     {
    //       title: "Contribute",
    //       links: [
    //         {
    //           title: "Become an Author",
    //           description: "Share your knowledge with tutorials",
    //           href: "/contribute/author",
    //           icon: "heroicons:pencil-square",
    //         },
    //         {
    //           title: "Open Source",
    //           description: "Contribute to our projects on GitHub",
    //           href: "/contribute/opensource",
    //           icon: "heroicons:code-bracket-square",
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   label: "Blog",
    //   mobileClosed: true,
    //   megaMenu: [
    //     {
    //       title: "Latest",
    //       links: [
    //         {
    //           title: "Tech News",
    //           description: "Updates from the tech world",
    //           href: "/blog/tech-news",
    //           icon: "heroicons:newspaper",
    //         },
    //         {
    //           title: "Tutorials",
    //           description: "Step-by-step guides for developers",
    //           href: "/blog/tutorials",
    //           icon: "heroicons:book-open",
    //         },
    //         {
    //           title: "Case Studies",
    //           description: "Real-world projects and solutions",
    //           href: "/blog/case-studies",
    //           icon: "heroicons:clipboard-document-list",
    //         },
    //       ],
    //     },
    //     {
    //       title: "Topics",
    //       links: [
    //         {
    //           title: "Web Development",
    //           href: "/blog/web-dev",
    //           icon: "heroicons:globe-alt",
    //         },
    //         {
    //           title: "DevOps & Cloud",
    //           href: "/blog/devops",
    //           icon: "heroicons:cloud",
    //         },
    //         {
    //           title: "Artificial Intelligence",
    //           href: "/blog/ai",
    //           icon: "heroicons:brain",
    //         },
    //         {
    //           title: "Others",
    //           href: "/blog/others",
    //           icon: "heroicons:sparkles",
    //         },
    //       ],
    //     },
    //   ],
    // },
    // Added News link without megaMenu
    {
      label: "AI",
      href: "/ai",
      mobileClosed: true,
    },
    {
      label: "Startup",
      href: "/startups",
      mobileClosed: true,
    },
    {
      label: "News",
      href: "/news",
      mobileClosed: true,
    },
    {
      label: "Gadget",
      href: "/gadget",
      mobileClosed: true,
    },
    {
      label: "Tutorials",
      href: "/tutorials",
      mobileClosed: true,
    },
    {
      label: "About Us",
      href: "/about",
      mobileClosed: true,
    },
  ];


  return (
    <header className="sticky top-0 z-50 border-b bg-white dark:bg-gray-950 dark:border-gray-800">
      <div className="container mx-auto">
        {/* Top bar with logo, search and user actions */}
        <div className="flex items-center justify-between py-4 px-4">
          <div className="flex items-center space-x-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  {categories.map((category) => (
                    <Link key={category.id} href={category.id}>
                      <div className="px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
                        {category.name}
                      </div>
                    </Link>
                  ))}
                  <Separator />
                  <Link href="#">
                    <div className="px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
                      Video Hub
                    </div>
                  </Link>
                  <Link href="#">
                    <div className="px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
                      Podcasts
                    </div>
                  </Link>
                  <Link href="#">
                    <div className="px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
                      Newsletters
                    </div>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>

            <Link
              href="/"
              className="flex items-center text-xl md:text-2xl font-bold text-[#0a9e01] hover:opacity-80 transition-opacity duration-200"
            >
              <span className="bg-[#0a9e01] text-white px-3 py-1 rounded-md mr-2 text-xl md:text-2xl font-extrabold">
                CV
              </span>
              <span className="tracking-tight">Codeverta</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {categories.map((category) => (
              <Link href={category.id} key={category.id}>
                <Button
                  variant={
                    selectedCategory === category.id ? "default" : "ghost"
                  }
                  className="rounded-md text-sm"
                >
                  {category.name}
                </Button>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            {isSearchOpen ? (
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
                <Input
                  type="search"
                  placeholder="Search news..."
                  className="border-0 focus-visible:ring-0"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[300px]">
                <div className="p-2">
                  <h4 className="font-semibold mb-2">Notifications</h4>
                  <div className="space-y-2">
                    {breakingNews.map((news, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                      >
                        <Badge variant="destructive" className="mt-1">
                          Breaking
                        </Badge>
                        <p className="text-sm">{news}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              {isDarkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="5"></circle>
                  <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                </svg>
              )}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <User className="h-4 w-4 mr-2" /> My Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BookmarkPlus className="h-4 w-4 mr-2" /> Saved Articles
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  Account Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );

  // return (
  //   <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
  //     <div className="container flex h-16 items-center">
  //       <div className="flex items-center gap-2 mr-4">
  //         <Link
  //           href="/"
  //           className="flex items-center space-x-2"
  //           aria-label="Enterprise AI Homepage"
  //         >
  //           <span className="text-2xl font-bold">Codeverta</span>
  //         </Link>
  //       </div>

  //       {/* Desktop Navigation with Mega Menu */}
  //       <nav
  //         className="hidden md:flex gap-6 items-center justify-center flex-1"
  //         aria-label="Main Navigation"
  //       >
  //         {mainNavItems.map((item, index) => (
  //           <div
  //             key={index}
  //             className="relative group"
  //             onMouseEnter={() =>
  //               item.megaMenu && setActiveMegaMenu(item.label)
  //             }
  //           >
  //             {item.megaMenu ? (
  //               <button
  //                 className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary"
  //                 aria-expanded={activeMegaMenu === item.label}
  //                 aria-controls={`megamenu-${index}`}
  //               >
  //                 {item.label}
  //                 <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
  //               </button>
  //             ) : (
  //               <Link
  //                 href={item.href}
  //                 className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary"
  //               >
  //                 {item.label}
  //               </Link>
  //             )}
  //           </div>
  //         ))}
  //       </nav>

  //       <div className="flex items-center gap-4 ml-auto">
  //         <ThemeToggle />

  //         {/* Mobile Navigation */}
  //         <Sheet open={isOpen} onOpenChange={setIsOpen}>
  //           <SheetTrigger asChild className="md:hidden">
  //             <Button variant="outline" size="icon" aria-label="Open Menu">
  //               <Menu className="h-5 w-5" />
  //               <span className="sr-only">Toggle menu</span>
  //             </Button>
  //           </SheetTrigger>
  //           <SheetContent
  //             side="right"
  //             className="w-full max-w-sm overflow-y-auto"
  //           >
  //             <nav
  //               className="flex flex-col gap-2 mt-8"
  //               aria-label="Mobile Navigation"
  //             >
  //               {mainNavItems.map((item, index) =>
  //                 item.megaMenu ? (
  //                   <Collapsible
  //                     key={index}
  //                     open={mobileOpenSections[item.label]}
  //                     onOpenChange={() => toggleMobileSection(item.label)}
  //                     className="w-full"
  //                   >
  //                     <CollapsibleTrigger className="w-full flex justify-between items-center py-2 text-lg font-medium">
  //                       <span>{item.label}</span>
  //                       <ChevronRight
  //                         className={`h-5 w-5 transition-transform ${
  //                           mobileOpenSections[item.label] ? "rotate-90" : ""
  //                         }`}
  //                       />
  //                     </CollapsibleTrigger>
  //                     <CollapsibleContent className="pl-4 space-y-4 mt-2">
  //                       {item.megaMenu.map((section, sectionIndex) => (
  //                         <div key={sectionIndex} className="space-y-2">
  //                           <h3 className="font-medium text-base">
  //                             {section.title}
  //                           </h3>
  //                           <ul className="space-y-2">
  //                             {section.links.map((link, linkIndex) => (
  //                               <li key={linkIndex}>
  //                                 <Link
  //                                   href={link.href}
  //                                   className="flex items-center gap-2 py-2 hover:text-primary transition-colors"
  //                                   onClick={() => setIsOpen(false)}
  //                                 >
  //                                   <span className="text-sm">
  //                                     {link.title}
  //                                   </span>
  //                                 </Link>
  //                               </li>
  //                             ))}
  //                           </ul>
  //                         </div>
  //                       ))}
  //                     </CollapsibleContent>
  //                   </Collapsible>
  //                 ) : (
  //                   <Link
  //                     key={index}
  //                     href={item.href}
  //                     className="py-2 text-lg font-medium hover:text-primary transition-colors"
  //                     onClick={() => setIsOpen(false)}
  //                   >
  //                     {item.label}
  //                   </Link>
  //                 )
  //               )}
  //               <div className="flex items-center gap-4 mt-6"></div>
  //             </nav>
  //           </SheetContent>
  //         </Sheet>
  //       </div>
  //     </div>

  //     {/* Mega menu container that stays open when hovered */}
  //     <div
  //       className={`absolute left-0 right-0 w-full border-b bg-background shadow-lg transition-all duration-200 z-10 ${
  //         activeMegaMenu ? "opacity-100 visible" : "opacity-0 invisible"
  //       }`}
  //       onMouseEnter={() => activeMegaMenu && setActiveMegaMenu(activeMegaMenu)}
  //       onMouseLeave={() => setActiveMegaMenu(null)}
  //     >
  //       {mainNavItems.map(
  //         (item, index) =>
  //           item.megaMenu &&
  //           activeMegaMenu === item.label && (
  //             <div key={index} className="container mx-auto p-6">
  //               <div
  //                 className="grid gap-6"
  //                 style={{
  //                   gridTemplateColumns: `repeat(${item.megaMenu.length}, minmax(0, 1fr))`,
  //                 }}
  //               >
  //                 {item.megaMenu.map((section, sectionIndex) => (
  //                   <div key={sectionIndex} className="space-y-4">
  //                     <h3 className="font-medium text-lg">{section.title}</h3>
  //                     <ul className="space-y-4">
  //                       {section.links.map((link, linkIndex) => (
  //                         <li key={linkIndex}>
  //                           <Link
  //                             href={link.href}
  //                             className="group/link flex items-start gap-3 rounded-lg hover:bg-muted p-3 transition-colors"
  //                           >
  //                             {renderIcon(link.icon)}
  //                             <div className="space-y-1">
  //                               <div className="font-medium group-hover/link:text-primary transition-colors">
  //                                 {link.title}
  //                               </div>
  //                               {link.description && (
  //                                 <p className="text-sm text-muted-foreground line-clamp-2">
  //                                   {link.description}
  //                                 </p>
  //                               )}
  //                             </div>
  //                           </Link>
  //                         </li>
  //                       ))}
  //                     </ul>
  //                   </div>
  //                 ))}
  //               </div>
  //             </div>
  //           )
  //       )}
  //     </div>

  //     {/* Overlay when mega menu is open */}
  //     {activeMegaMenu && (
  //       <div
  //         className="fixed inset-0 bg-black/40 transition-opacity duration-200 z-0"
  //         style={{ top: "64px" }}
  //         onClick={() => setActiveMegaMenu(null)}
  //       />
  //     )}
  //   </header>
  // );
}
