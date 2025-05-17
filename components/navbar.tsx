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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [mobileOpenSections, setMobileOpenSections] = useState({});

  const toggleMobileSection = (label) => {
    setMobileOpenSections((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  // Integrated mega menu data
  const mainNavItems = [
    {
      label: "Learning",
      mobileClosed: true,
      megaMenu: [
        {
          title: "Tutorials",
          links: [
            {
              title: "Frontend Development",
              description: "HTML, CSS, JavaScript, and modern frameworks",
              href: "/tutorials/frontend",
              icon: "heroicons:code-bracket",
            },
            {
              title: "Backend Development",
              description: "Node.js, Python, PHP, and database technologies",
              href: "/tutorials/backend",
              icon: "heroicons:server",
            },
            {
              title: "Mobile Development",
              description: "React Native, Flutter, and native app development",
              href: "/tutorials/mobile",
              icon: "heroicons:device-phone-mobile",
            },
          ],
        },
        {
          title: "Courses",
          links: [
            {
              title: "Web Development Bootcamp",
              description: "Complete guide to modern web development",
              href: "/courses/web-bootcamp",
              icon: "heroicons:academic-cap",
            },
            {
              title: "Data Structures & Algorithms",
              description: "Master coding interviews and problem solving",
              href: "/courses/dsa",
              icon: "heroicons:chart-bar",
            },
          ],
        },
      ],
    },
    {
      label: "Tools & Resources",
      mobileClosed: true,
      megaMenu: [
        {
          title: "Developer Tools",
          links: [
            {
              title: "Code Playground",
              description: "Interactive environment to test your code",
              href: "/tools/playground",
              icon: "heroicons:beaker",
            },
            {
              title: "AI Code Assistant",
              description: "Get suggestions and help with your code",
              href: "/tools/ai-assistant",
              icon: "heroicons:cpu-chip",
            },
            {
              title: "Code Formatter",
              description: "Format your code with best practices",
              href: "/tools/formatter",
              icon: "heroicons:wrench-screwdriver",
            },
          ],
        },
        {
          title: "Resources",
          links: [
            {
              title: "Cheat Sheets",
              description: "Quick reference guides for developers",
              href: "/resources/cheat-sheets",
              icon: "heroicons:document-text",
            },
            {
              title: "Roadmaps",
              description: "Learning paths for different tech stacks",
              href: "/resources/roadmaps",
              icon: "heroicons:map",
            },
          ],
        },
      ],
    },
    {
      label: "Community",
      mobileClosed: true,
      megaMenu: [
        {
          title: "Connect",
          links: [
            {
              title: "Forums",
              description: "Discuss with fellow developers",
              href: "/community/forums",
              icon: "heroicons:chat-bubble-left-right",
            },
            {
              title: "Events",
              description: "Webinars, workshops, and meetups",
              href: "/community/events",
              icon: "heroicons:calendar",
            },
            {
              title: "Discord Server",
              description: "Join our active developer community",
              href: "/community/discord",
              icon: "heroicons:users",
            },
          ],
        },
        {
          title: "Contribute",
          links: [
            {
              title: "Become an Author",
              description: "Share your knowledge with tutorials",
              href: "/contribute/author",
              icon: "heroicons:pencil-square",
            },
            {
              title: "Open Source",
              description: "Contribute to our projects on GitHub",
              href: "/contribute/opensource",
              icon: "heroicons:code-bracket-square",
            },
          ],
        },
      ],
    },
    {
      label: "Blog",
      mobileClosed: true,
      megaMenu: [
        {
          title: "Latest",
          links: [
            {
              title: "Tech News",
              description: "Updates from the tech world",
              href: "/blog/tech-news",
              icon: "heroicons:newspaper",
            },
            {
              title: "Tutorials",
              description: "Step-by-step guides for developers",
              href: "/blog/tutorials",
              icon: "heroicons:book-open",
            },
            {
              title: "Case Studies",
              description: "Real-world projects and solutions",
              href: "/blog/case-studies",
              icon: "heroicons:clipboard-document-list",
            },
          ],
        },
        {
          title: "Topics",
          links: [
            {
              title: "Web Development",
              href: "/blog/topics/web-dev",
              icon: "heroicons:globe-alt",
            },
            {
              title: "DevOps & Cloud",
              href: "/blog/topics/devops",
              icon: "heroicons:cloud",
            },
            {
              title: "Artificial Intelligence",
              href: "/blog/topics/ai",
              icon: "heroicons:brain",
            },
          ],
        },
      ],
    },
    // Added News link without megaMenu
    {
      label: "News",
      href: "/news",
      mobileClosed: true,
    },
  ];

  // Helper function to render megamenu icon
  const renderIcon = (iconName) => {
    // This is a simplified approach. In a real application,
    // you would likely import icons from a library or use a component
    return (
      <div className="w-8 h-8 rounded-md bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
        <span className="text-blue-600 dark:text-blue-300 text-lg">
          {iconName.includes("code") && "< >"}
          {iconName.includes("server") && "⚙️"}
          {iconName.includes("phone") && "📱"}
          {iconName.includes("academic") && "🎓"}
          {iconName.includes("chart") && "📊"}
          {iconName.includes("beaker") && "🧪"}
          {iconName.includes("cpu") && "🤖"}
          {iconName.includes("wrench") && "🔧"}
          {iconName.includes("document") && "📄"}
          {iconName.includes("map") && "🗺️"}
          {iconName.includes("chat") && "💬"}
          {iconName.includes("calendar") && "📅"}
          {iconName.includes("users") && "👥"}
          {iconName.includes("pencil") && "✏️"}
          {iconName.includes("bracket-square") && "🔄"}
          {iconName.includes("newspaper") && "📰"}
          {iconName.includes("book") && "📚"}
          {iconName.includes("clipboard") && "📋"}
          {iconName.includes("globe") && "🌐"}
          {iconName.includes("cloud") && "☁️"}
          {iconName.includes("brain") && "🧠"}
        </span>
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-2 mr-4">
          <Link
            href="/"
            className="flex items-center space-x-2"
            aria-label="Enterprise AI Homepage"
          >
            <span className="text-2xl font-bold">Codeverta</span>
          </Link>
        </div>

        {/* Desktop Navigation with Mega Menu */}
        <nav
          className="hidden md:flex gap-6 items-center justify-center flex-1"
          aria-label="Main Navigation"
        >
          {mainNavItems.map((item, index) => (
            <div
              key={index}
              className="relative group"
              onMouseEnter={() =>
                item.megaMenu && setActiveMegaMenu(item.label)
              }
            >
              {item.megaMenu ? (
                <button
                  className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary"
                  aria-expanded={activeMegaMenu === item.label}
                  aria-controls={`megamenu-${index}`}
                >
                  {item.label}
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                </button>
              ) : (
                <Link
                  href={item.href}
                  className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-4 ml-auto">
          <ThemeToggle />

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon" aria-label="Open Menu">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full max-w-sm overflow-y-auto"
            >
              <nav
                className="flex flex-col gap-2 mt-8"
                aria-label="Mobile Navigation"
              >
                {mainNavItems.map((item, index) =>
                  item.megaMenu ? (
                    <Collapsible
                      key={index}
                      open={mobileOpenSections[item.label]}
                      onOpenChange={() => toggleMobileSection(item.label)}
                      className="w-full"
                    >
                      <CollapsibleTrigger className="w-full flex justify-between items-center py-2 text-lg font-medium">
                        <span>{item.label}</span>
                        <ChevronRight
                          className={`h-5 w-5 transition-transform ${
                            mobileOpenSections[item.label] ? "rotate-90" : ""
                          }`}
                        />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pl-4 space-y-4 mt-2">
                        {item.megaMenu.map((section, sectionIndex) => (
                          <div key={sectionIndex} className="space-y-2">
                            <h3 className="font-medium text-base">
                              {section.title}
                            </h3>
                            <ul className="space-y-2">
                              {section.links.map((link, linkIndex) => (
                                <li key={linkIndex}>
                                  <Link
                                    href={link.href}
                                    className="flex items-center gap-2 py-2 hover:text-primary transition-colors"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    <span className="text-sm">
                                      {link.title}
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <Link
                      key={index}
                      href={item.href}
                      className="py-2 text-lg font-medium hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )
                )}
                <div className="flex items-center gap-4 mt-6"></div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Mega menu container that stays open when hovered */}
      <div
        className={`absolute left-0 right-0 w-full border-b bg-background shadow-lg transition-all duration-200 z-10 ${
          activeMegaMenu ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onMouseEnter={() => activeMegaMenu && setActiveMegaMenu(activeMegaMenu)}
        onMouseLeave={() => setActiveMegaMenu(null)}
      >
        {mainNavItems.map(
          (item, index) =>
            item.megaMenu &&
            activeMegaMenu === item.label && (
              <div key={index} className="container mx-auto p-6">
                <div
                  className="grid gap-6"
                  style={{
                    gridTemplateColumns: `repeat(${item.megaMenu.length}, minmax(0, 1fr))`,
                  }}
                >
                  {item.megaMenu.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="space-y-4">
                      <h3 className="font-medium text-lg">{section.title}</h3>
                      <ul className="space-y-4">
                        {section.links.map((link, linkIndex) => (
                          <li key={linkIndex}>
                            <Link
                              href={link.href}
                              className="group/link flex items-start gap-3 rounded-lg hover:bg-muted p-3 transition-colors"
                            >
                              {renderIcon(link.icon)}
                              <div className="space-y-1">
                                <div className="font-medium group-hover/link:text-primary transition-colors">
                                  {link.title}
                                </div>
                                {link.description && (
                                  <p className="text-sm text-muted-foreground line-clamp-2">
                                    {link.description}
                                  </p>
                                )}
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )
        )}
      </div>

      {/* Overlay when mega menu is open */}
      {activeMegaMenu && (
        <div
          className="fixed inset-0 bg-black/40 transition-opacity duration-200 z-0"
          style={{ top: "64px" }}
          onClick={() => setActiveMegaMenu(null)}
        />
      )}
    </header>
  );
}
