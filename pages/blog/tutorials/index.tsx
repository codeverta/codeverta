import Head from "next/head";
import Layout from "components/layout/Landing";
import { getSortedPostsData } from "lib/posts";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

// Shadcn UI components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Icons - using Lucide React
import {
  Search,
  Calendar,
  Bookmark,
  Share2,
  Clock,
  ArrowLeft,
  ArrowRight,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  AlertCircle,
  Code,
  Terminal,
  Cpu,
  Database,
  Globe,
  Layers,
  ShieldCheck,
  MonitorSmartphone,
} from "lucide-react";

interface PostMeta {
  id: string;
  date: string;
  title: string;
  desc: string;
  image: string;
  category?: string;
  readTime?: string;
  author?: string;
  authorImage?: string;
}

const POSTS_PER_PAGE = 9;

const TechIcon = ({ category }: { category: string }) => {
  switch (category?.toLowerCase()) {
    case "javascript":
      return <Code className="h-4 w-4" />;
    case "backend":
      return <Server className="h-4 w-4" />;
    case "devops":
      return <Terminal className="h-4 w-4" />;
    case "ai & ml":
      return <Cpu className="h-4 w-4" />;
    case "databases":
      return <Database className="h-4 w-4" />;
    case "web":
      return <Globe className="h-4 w-4" />;
    case "architecture":
      return <Layers className="h-4 w-4" />;
    case "security":
      return <ShieldCheck className="h-4 w-4" />;
    case "mobile":
      return <MonitorSmartphone className="h-4 w-4" />;
    default:
      return <Terminal className="h-4 w-4" />;
  }
};

export default function Home({ allPostsData }: { allPostsData: PostMeta[] }) {
  const router = useRouter();
  const { search, category } = router.query;
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<PostMeta[]>(allPostsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState("all");
  const { t } = useTranslation("common");

  // Extract unique categories from posts
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    allPostsData.forEach((post) => {
      if (post.category) uniqueCategories.add(post.category);
    });
    return Array.from(uniqueCategories);
  }, [allPostsData]);

  // Update search term and category when URL query changes
  useEffect(() => {
    if (search && typeof search === "string") {
      setSearchTerm(search);
    } else {
      setSearchTerm("");
    }

    if (category && typeof category === "string") {
      setSelectedCategory(category);
      setActiveTab(category.toLowerCase());
    } else {
      setSelectedCategory(null);
      setActiveTab("all");
    }

    // Reset to first page when search or category changes
    setCurrentPage(1);
  }, [search, category]);

  // Filter posts based on search term and category
  useEffect(() => {
    let filtered = [...allPostsData];

    // Filter by search term
    if (searchTerm.trim() !== "") {
      const lowercaseSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(lowercaseSearch) ||
          post.desc.toLowerCase().includes(lowercaseSearch)
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    setFilteredPosts(filtered);
  }, [searchTerm, selectedCategory, allPostsData]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  // Get meta description
  const metaDescription = useMemo(() => {
    if (searchTerm) {
      return `Search results for "${searchTerm}" on our tech tutorial blog. Find interesting tutorials about coding, programming, and technology.`;
    }
    return allPostsData.length > 0
      ? allPostsData[0].desc
      : "Discover coding tutorials, tech guides, and programming tips for developers of all levels.";
  }, [searchTerm, allPostsData]);

  // Format date function
  const formatPostDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "long",
        year: "numeric",
      };
      return date.toLocaleDateString("en-US", options);
    } catch (error) {
      return dateString;
    }
  };

  // Handle search input change and form submission
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL with search parameter
    router.push({
      pathname: router.pathname,
      query: {
        ...(searchTerm ? { search: searchTerm } : {}),
        ...(selectedCategory ? { category: selectedCategory } : {}),
      },
    });
  };

  // Handle category selection
  const handleCategorySelect = (category: string) => {
    const newCategory = selectedCategory === category ? null : category;
    setSelectedCategory(newCategory);
    setActiveTab(newCategory?.toLowerCase() || "all");

    router.push({
      pathname: router.pathname,
      query: {
        ...(searchTerm ? { search: searchTerm } : {}),
        ...(newCategory ? { category: newCategory } : {}),
      },
    });
  };

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === "all") {
      setSelectedCategory(null);
      router.push({
        pathname: router.pathname,
        query: {
          ...(searchTerm ? { search: searchTerm } : {}),
        },
      });
    } else {
      const matchingCategory = categories.find(
        (cat) => cat.toLowerCase() === value
      );
      if (matchingCategory) {
        handleCategorySelect(matchingCategory);
      }
    }
  };

  // Share functionality
  const handleShare = (platform: string, postId: string) => {
    const postUrl = `${
      typeof window !== "undefined" ? window.location.origin : ""
    }/tutorials/${postId}`;
    const post = allPostsData.find((p) => p.id === postId);
    const title = post?.title || "Tech Tutorial";
    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(postUrl);

    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case "copy":
        if (typeof navigator !== "undefined") {
          navigator.clipboard.writeText(postUrl).then(() => {
            setCopiedLink(true);
            setTimeout(() => setCopiedLink(false), 2000);
          });
        }
        break;
    }

    if (shareUrl && typeof window !== "undefined") {
      window.open(shareUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Layout>
      <Head>
        <title>
          {searchTerm
            ? `Search Results for "${searchTerm}" - Codeverta Tutorials`
            : selectedCategory
            ? `${selectedCategory} - Codeverta Tutorials`
            : "Codeverta - Programming & Technology Tutorials"}
        </title>
        <meta name="description" content={metaDescription} />
      </Head>
      <main className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 min-h-screen pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <section className="container mx-auto px-4 py-12 text-center space-y-6">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mb-2">
              <Code className="w-4 h-4 mr-1" /> Coding & Tech Tutorials
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl lg:text-6xl dark:text-white mb-4">
              Codeverta {" "}
              <span className="text-blue-600 dark:text-blue-400">
                Tutorials
              </span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
              {t(
                "blog.description",
                "Learn to code with our comprehensive tutorials. From beginner to advanced, discover the latest in programming, web development, and tech."
              )}
            </p>

            {/* Search form */}
            <form
              onSubmit={handleSearchSubmit}
              className="max-w-md mx-auto mb-8 relative"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search tutorials..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-10 pr-24 h-12 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-full"
                />
                <Button
                  type="submit"
                  className="absolute right-0 top-0 h-full rounded-r-full px-5"
                >
                  Search
                </Button>
              </div>
            </form>

            {/* Categories Tabs */}
            <Tabs
              defaultValue="all"
              value={activeTab}
              onValueChange={handleTabChange}
              className="w-full max-w-4xl mx-auto"
            >
              <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 h-auto bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                <TabsTrigger value="all" className="rounded-md">
                  All
                </TabsTrigger>
                {categories
                  .slice(0, activeTab === "all" ? 9 : 4)
                  .map((category) => (
                    <TabsTrigger
                      key={category}
                      value={category.toLowerCase()}
                      className="rounded-md flex items-center gap-1"
                    >
                      <TechIcon category={category} />
                      <span className="hidden sm:inline">{category}</span>
                    </TabsTrigger>
                  ))}
                {categories.length > 9 && activeTab === "all" && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <TabsTrigger value="more" className="rounded-md">
                        More
                      </TabsTrigger>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {categories.slice(9).map((category) => (
                        <DropdownMenuItem
                          key={category}
                          onClick={() =>
                            handleTabChange(category.toLowerCase())
                          }
                        >
                          <TechIcon category={category} />
                          <span className="ml-2">{category}</span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </TabsList>
            </Tabs>

            {/* Show search results info if searching */}
            {(searchTerm || selectedCategory) && (
              <div className="w-full max-w-4xl mx-auto mt-6">
                {filteredPosts.length > 0 ? (
                  <Alert
                    variant="default"
                    className="bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200 border-blue-200 dark:border-blue-800"
                  >
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Found {filteredPosts.length} results
                      {searchTerm && (
                        <span className="font-medium"> for "{searchTerm}"</span>
                      )}
                      {selectedCategory && (
                        <span className="font-medium">
                          {" "}
                          in category "{selectedCategory}"
                        </span>
                      )}
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Alert
                    variant="destructive"
                    className="bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800"
                  >
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      No results found
                      {searchTerm && <span> for "{searchTerm}"</span>}
                      {selectedCategory && (
                        <span> in category "{selectedCategory}"</span>
                      )}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}
          </section>

          {filteredPosts.length > 0 ? (
            <>
              {/* Featured Tutorial */}
              {currentPage === 1 && currentPosts.length > 0 && (
                <div className="mb-16">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      Featured Tutorial
                    </h2>
                    <Link href="/blog/tutorials">
                      <Button
                        variant="link"
                        className="text-blue-600 dark:text-blue-400 p-0"
                      >
                        View All <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>

                  <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-slate-900">
                    <div className="md:grid md:grid-cols-5">
                      <div className="col-span-2 h-56 md:h-auto overflow-hidden relative">
                        <img
                          src={
                            currentPosts[0]?.image ||
                            `https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1200&auto=format`
                          }
                          alt={currentPosts[0].title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-blue-600 hover:bg-blue-700 text-white rounded-md">
                            {currentPosts[0].category || "Programming"}
                          </Badge>
                        </div>
                      </div>
                      <div className="col-span-3 p-6 md:p-8 flex flex-col">
                        <div className="flex items-center space-x-4 mb-4">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={
                                currentPosts[0].authorImage ||
                                "https://github.com/shadcn.png"
                              }
                            />
                            <AvatarFallback>
                              {currentPosts[0].author?.[0] || "CD"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                              {currentPosts[0].author || "Codeverta Team"}
                            </p>
                            <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                              <Calendar className="h-3 w-3 mr-1" />
                              {formatPostDate(currentPosts[0].date)}
                              <span className="mx-2">•</span>
                              <Clock className="h-3 w-3 mr-1" />
                              {currentPosts[0].readTime || "5 min read"}
                            </div>
                          </div>
                        </div>

                        <Link href={`/tutorials/${currentPosts[0].id}`}>
                          <h3 className="text-2xl font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 mb-4">
                            {currentPosts[0].title}
                          </h3>
                        </Link>

                        <p className="text-slate-600 dark:text-slate-300 mb-6 flex-grow">
                          {currentPosts[0].desc}
                        </p>

                        <div className="flex justify-between items-center mt-auto">
                          <Link href={`/tutorials/${currentPosts[0].id}`}>
                            <Button variant="default" size="sm">
                              Read Tutorial
                            </Button>
                          </Link>

                          <div className="flex space-x-1">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                  >
                                    <Bookmark className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Save tutorial</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <DropdownMenu>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                      >
                                        <Share2 className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                  </TooltipTrigger>
                                  <TooltipContent>Share</TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleShare("facebook", currentPosts[0].id)
                                  }
                                >
                                  <Facebook className="h-4 w-4 mr-2 text-blue-600" />
                                  Facebook
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleShare("twitter", currentPosts[0].id)
                                  }
                                >
                                  <Twitter className="h-4 w-4 mr-2 text-blue-400" />
                                  Twitter
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleShare("linkedin", currentPosts[0].id)
                                  }
                                >
                                  <Linkedin className="h-4 w-4 mr-2 text-blue-700" />
                                  LinkedIn
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleShare("copy", currentPosts[0].id)
                                  }
                                >
                                  <Copy className="h-4 w-4 mr-2" />
                                  Copy Link
                                  {copiedLink && (
                                    <span className="ml-2 text-xs text-green-600">
                                      Copied!
                                    </span>
                                  )}
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {/* Regular Tutorials Grid */}
              <div className="space-y-10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {selectedCategory
                      ? `${selectedCategory} Tutorials`
                      : "Latest Tutorials"}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {(currentPage === 1
                    ? currentPosts.slice(1)
                    : currentPosts
                  ).map((post) => (
                    <Card
                      key={post.id}
                      className="overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all duration-300 h-full flex flex-col"
                    >
                      <div className="relative h-48">
                        <img
                          src={
                            post.image ||
                            `https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format`
                          }
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-2 py-1 text-xs">
                            <TechIcon category={post.category || ""} />
                            <span className="ml-1">{post.category}</span>
                          </Badge>
                        </div>
                      </div>

                      <CardContent className="p-5 flex-grow flex flex-col">
                        <div className="flex items-center space-x-4 mb-3">
                          <Avatar className="h-6 w-6">
                            <AvatarImage
                              src={
                                post.authorImage ||
                                "https://github.com/shadcn.png"
                              }
                            />
                            <AvatarFallback>
                              {post.author?.[0] || "CD"}
                            </AvatarFallback>
                          </Avatar>
                          <p className="text-xs text-slate-600 dark:text-slate-400">
                            {post.author || "Codeverta Team"}
                          </p>
                        </div>

                        <Link href={`/tutorials/${post.id}`}>
                          <h3 className="font-bold text-lg text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 mb-2 line-clamp-2">
                            {post.title}
                          </h3>
                        </Link>

                        <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-3 flex-grow">
                          {post.desc}
                        </p>

                        <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mt-auto pt-3 border-t border-slate-100 dark:border-slate-800">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {formatPostDate(post.date)
                              .split(" ")
                              .slice(0, 2)
                              .join(" ")}
                          </div>

                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {post.readTime || "3 min read"}
                          </div>
                        </div>
                      </CardContent>

                      <CardFooter className="px-5 py-3 bg-slate-50 dark:bg-slate-800/50 flex justify-between">
                        <Link href={`/tutorials/${post.id}`}>
                          <Button
                            variant="link"
                            className="p-0 h-auto text-blue-600 dark:text-blue-400 text-sm"
                          >
                            Read Tutorial
                          </Button>
                        </Link>

                        <div className="flex space-x-1">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                >
                                  <Bookmark className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Save tutorial</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <DropdownMenu>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8"
                                    >
                                      <Share2 className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                </TooltipTrigger>
                                <TooltipContent>Share</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => handleShare("facebook", post.id)}
                              >
                                <Facebook className="h-4 w-4 mr-2 text-blue-600" />
                                Facebook
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleShare("twitter", post.id)}
                              >
                                <Twitter className="h-4 w-4 mr-2 text-blue-400" />
                                Twitter
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleShare("linkedin", post.id)}
                              >
                                <Linkedin className="h-4 w-4 mr-2 text-blue-700" />
                                LinkedIn
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleShare("copy", post.id)}
                              >
                                <Copy className="h-4 w-4 mr-2" />
                                Copy Link
                                {copiedLink && (
                                  <span className="ml-2 text-xs text-green-600">
                                    Copied!
                                  </span>
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="rounded-xl bg-white dark:bg-slate-900 shadow-md p-12 text-center my-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 mb-6">
                <Search className="h-10 w-10" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                {t("blog.not_found.title", "No tutorials found")}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-md mx-auto">
                {t(
                  "blog.not_found.description",
                  "We couldn't find any tutorials matching your search criteria. Try adjusting your search terms or browse our categories."
                )}
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory(null);
                  router.push("/");
                }}
              >
                View All Tutorials
              </Button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="mt-16">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage((prev) => Math.max(prev - 1, 1));
                    }}
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem
                      key={page}
                      className="hidden md:inline-block"
                    >
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(page);
                        }}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </main>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  // Get posts and add sample categories and read times
  const allPostsData = getSortedPostsData("tutorials").map((post, index) => {
    // Add sample categories and read times (in a real app, these would come from the actual data)
    const categories = [
      "Sejarah Lilin",
      "Tutorial",
      "Tips & Trik",
      "Ulasan Produk",
      "Inspirasi",
      "Edukasi",
      "Lilin Ibadah",
      "Aromaterapi",
      "Lilin Taper",
      "Lilin Kristal",
    ];
    const readTimes = [
      "3 min read",
      "5 min read",
      "7 min read",
      "4 min read",
      "6 min read",
    ];

    return {
      ...post,
      category: categories[index % categories.length],
      readTime: readTimes[index % readTimes.length],
    };
  });

  return {
    props: {
      allPostsData,
      ...(await serverSideTranslations(locale, ["common", "order"])),
    },
  };
}
