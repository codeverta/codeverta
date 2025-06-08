import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Layout from "@/components/layout/Landing";
import Link from "next/link";
import Image from "next/image";
import {
  Bell,
  BookmarkPlus,
  ChevronRight,
  Clock,
  FlameIcon,
  Heart,
  Menu,
  MessageSquare,
  Search,
  Share2,
  ThumbsUp,
  User,
  X,
} from "lucide-react";
import { getSortedPostsData } from "@/lib/posts";
import { PostMeta } from "next";

function EnhancedNewsLandingPage({
  allPostsData,
  featuredPosts,
}: {
  allPostsData: PostMeta[];
  featuredPosts: PostMeta[]
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "/news", name: "All News" },
    { id: "/ai", name: "AI" },
    { id: "/startups", name: "Startups" },
    { id: "/tutorials", name: "Tutorials" },
    { id: "/about", name: "About" },
  ];

  const trendingTopics = [
    "AI",
    "Climate Change",
    "Space Exploration",
    "Quantum Computing",
    "Remote Work",
    "Metaverse",
    "Cybersecurity",
    "Cryptocurrencies",
    "Clean Energy",
  ];

  const breakingNews = [
    "New AI breakthrough could revolutionize healthcare industry",
    "Global tech leaders announce climate initiative at summit",
    "SpaceX successfully launches next-generation satellite network",
  ];
  console.log(allPostsData);
  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDarkMode ? "dark bg-gray-900 text-white" : "bg-gray-50"
      }`}
    >
      {/* Breaking News Ticker */}
      <div className="bg-red-600 text-white py-2 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center">
            <Badge variant="outline" className="text-white border-white mr-3">
              BREAKING
            </Badge>
            <ScrollArea className="whitespace-nowrap">
              <div className="animate-marquee inline-block">
                {breakingNews.map((item, idx) => (
                  <span key={idx} className="mx-6">
                    {item}
                  </span>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Articles - 8/12 width on desktop */}
            <div className="lg:col-span-8 space-y-8">
              {/* Featured Article Carousel */}
              <Carousel className="w-full">
                <CarouselContent>
                  {featuredPosts.map((item, index) => (
                    <CarouselItem key={index}>
                      <div className="relative">
                        <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-lg">
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={1200}
                            height={600}
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                          <div className="absolute top-4 left-4 bg-[#0a9e01] text-white text-xs px-2 py-1 rounded"></div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                          <h1 className="text-2xl md:text-4xl font-bold mb-2">
                            {item.title}
                          </h1>
                          <div className="flex items-center text-sm mt-4">
                            <span>{item.author}</span>
                            <span className="mx-2">•</span>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="hidden md:block">
                  <CarouselPrevious className="left-4" />
                  <CarouselNext className="right-4" />
                </div>
              </Carousel>

              {/* Tabs for News Categories */}
              <Tabs defaultValue="featured" className="w-full">
                <TabsList className="w-full justify-start mb-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-md overflow-x-auto">
                  <TabsTrigger value="featured">Featured</TabsTrigger>
                  <TabsTrigger value="latest">Latest</TabsTrigger>
                  <TabsTrigger value="popular">Most Read</TabsTrigger>
                  <TabsTrigger value="tech">Technology</TabsTrigger>
                  <TabsTrigger value="business">Business</TabsTrigger>
                </TabsList>

                <TabsContent value="featured" className="space-y-6">
                  {/* Featured Articles Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        title:
                          "Tesla's New Battery Tech Promises 500-Mile Range",
                        category: "Startups",
                        author: "Sarah Lee",
                        authorImg: "S",
                        time: "8 hours ago",
                        image: "https://picsum.photos/seed/tesla/800/450",
                        excerpt:
                          "Tesla has unveiled a new battery technology that could extend the range of its electric vehicles to over 500 miles on a single charge.",
                      },
                      {
                        title:
                          "Startup Raises $50M to Revolutionize Remote Work",
                        category: "Venture",
                        author: "Mark Wilson",
                        authorImg: "M",
                        time: "12 hours ago",
                        image: "https://picsum.photos/seed/startup/800/450",
                        excerpt:
                          "A new startup has secured $50 million in Series A funding to build tools that could change how remote teams collaborate.",
                      },
                      {
                        title:
                          "Major Security Flaw Found in Popular Banking Apps",
                        category: "Security",
                        author: "Priya Sharma",
                        authorImg: "P",
                        time: "5 hours ago",
                        image: "https://picsum.photos/seed/security/800/450",
                        excerpt:
                          "Researchers have discovered a critical vulnerability affecting several major banking applications used by millions worldwide.",
                      },
                      {
                        title: "Apple's Next Big Thing: What to Expect in 2025",
                        category: "Apps",
                        author: "James Chen",
                        authorImg: "J",
                        time: "24 hours ago",
                        image: "https://picsum.photos/seed/apple/800/450",
                        excerpt:
                          "Industry insiders reveal details about Apple's upcoming product lineup and strategy for the next year.",
                      },
                    ].map((item, index) => (
                      <Card
                        key={index}
                        className="overflow-hidden transition-all hover:shadow-lg"
                      >
                        <div className="relative h-48">
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={400}
                            height={200}
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute top-2 left-2">
                            <Badge className="bg-[#0a9e01]">
                              {item.category}
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h2 className="text-lg font-bold mb-2 line-clamp-2">
                            {item.title}
                          </h2>
                          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-3">
                            {item.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback>
                                  {item.authorImg}
                                </AvatarFallback>
                              </Avatar>
                              <span>{item.author}</span>
                              <span className="text-gray-400">•</span>
                              <span className="flex items-center text-gray-400">
                                <Clock className="h-3 w-3 mr-1" /> {item.time}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <Share2 className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <BookmarkPlus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="latest" className="space-y-4">
                  {/* Latest News List Format */}
                  {[1, 2, 3, 4, 5].map((item) => (
                    <Card key={item} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="relative md:w-1/3 h-48 md:h-auto">
                          <Image
                            src={`https://picsum.photos/seed/latest${item}/800/450`}
                            alt={`Latest article ${item}`}
                            width={400}
                            height={200}
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute top-2 left-2">
                            <Badge className="bg-blue-600">Just In</Badge>
                          </div>
                        </div>
                        <CardContent className="p-4 md:w-2/3 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>{item * 10} minutes ago</span>
                            </div>
                            <h2 className="text-xl font-bold mb-2">
                              {
                                [
                                  "Breaking: Tech Giant Announces Major Layoffs",
                                  "Global Markets React to Central Bank Decision",
                                  "Scientists Discover New Potential Treatment for Cancer",
                                  "Historic Climate Agreement Reached at Summit",
                                  "Sports Legend Announces Retirement After 20-Year Career",
                                ][item - 1]
                              }
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                              {
                                [
                                  "One of the world's largest tech companies has announced it will cut 10% of its workforce...",
                                  "Financial markets worldwide showed significant volatility following the unexpected decision...",
                                  "A breakthrough study published today reveals promising results for a novel approach to treating...",
                                  "After weeks of tense negotiations, world leaders have finally reached a consensus on...",
                                  "In an emotional press conference earlier today, the sports icon confirmed rumors about...",
                                ][item - 1]
                              }
                            </p>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback>
                                  {["RJ", "LM", "AK", "CT", "BP"][item - 1]}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm">
                                {
                                  [
                                    "Rebecca Johnson",
                                    "Luke Miller",
                                    "Anita Karim",
                                    "Carlos Torres",
                                    "Ben Phillips",
                                  ][item - 1]
                                }
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="flex items-center space-x-1"
                              >
                                <MessageSquare className="h-4 w-4" />
                                <span>{item * 8}</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="flex items-center space-x-1"
                              >
                                <Share2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                  <Button variant="outline" className="w-full">
                    Load More
                  </Button>
                </TabsContent>

                {/* Other tab contents would be similar structures */}
                <TabsContent value="popular">
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold">
                      Most Read Articles This Week
                    </h2>
                    {/* Popular content would go here */}
                  </div>
                </TabsContent>
              </Tabs>

              {/* Video Section */}
              <div className="pt-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">Featured Videos</h2>
                  <Button variant="link" className="text-[#0a9e01]">
                    View All <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2].map((item) => (
                    <Card key={item} className="overflow-hidden">
                      <div className="relative">
                        <div className="relative aspect-video">
                          <Image
                            src={`https://picsum.photos/seed/video${item}/800/450`}
                            alt={`Video ${item}`}
                            width={800}
                            height={450}
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <div className="rounded-full bg-white/80 p-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="#0a9e01"
                                stroke="none"
                              >
                                <polygon points="5 3 19 12 5 21 5 3"></polygon>
                              </svg>
                            </div>
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            {item === 1 ? "8:42" : "12:15"}
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold text-lg mb-2">
                          {item === 1
                            ? "Inside the World's Most Advanced AI Research Lab"
                            : "How Electric Vehicles Are Changing the Auto Industry"}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <span>
                            {item === 1 ? "Tech Insights" : "Future Trends"}
                          </span>
                          <span className="mx-2">•</span>
                          <span>
                            {item === 1 ? "2 days ago" : "1 week ago"}
                          </span>
                          <span className="mx-2">•</span>
                          <span className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="mr-1"
                            >
                              <path d="M3 3v18h18"></path>
                              <path d="m19 9-5 5-4-4-3 3"></path>
                            </svg>
                            {item === 1 ? "32K views" : "189K views"}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar - 4/12 width on desktop */}
            <div className="lg:col-span-4 space-y-8">
              {/* Top Headlines */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-bold text-[#0a9e01]">
                    Top Headlines
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-4">
                    {[
                      "Microsoft unveils new AI tools for Office suite",
                      "Crypto market rebounds as Bitcoin surges past $60K",
                      "Amazon's drone delivery service expands to 5 new cities",
                      "Meta's AR glasses prototype leaked ahead of announcement",
                      "Twitter alternative gains 10M users in just one week",
                    ].map((headline, index) => (
                      <li
                        key={index}
                        className="pb-3 border-b border-gray-200 dark:border-gray-700 last:border-0"
                      >
                        <Link href="#" className="flex group">
                          <span className="text-[#0a9e01] font-bold mr-2">
                            ■
                          </span>
                          <span className="font-medium group-hover:text-[#0a9e01] transition-colors">
                            {headline}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="link" className="text-[#0a9e01] w-full">
                    View All Headlines
                  </Button>
                </CardFooter>
              </Card>

              {/* Newsletter Signup */}
              <Card className="bg-[#0a9e01] text-white overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    Stay ahead of the curve
                  </h3>
                  <p className="mb-4">
                    Get the latest tech news delivered to your inbox daily
                  </p>
                  <div className="space-y-3">
                    <Input
                      type="email"
                      placeholder="Your email address"
                      className="bg-white text-black border-0"
                    />
                    <Button className="w-full bg-black hover:bg-gray-800 text-white">
                      Subscribe
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Live Updates */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-xl font-bold">
                    <span className="inline-block w-2 h-2 bg-red-600 rounded-full mr-2 animate-pulse"></span>
                    Live Updates
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="relative">
                    <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                    <div className="space-y-4 pt-2">
                      {[
                        {
                          time: "11:45 AM",
                          content:
                            "Tech conference keynote speech begins with surprise announcements",
                        },
                        {
                          time: "11:32 AM",
                          content:
                            "Markets react to quarterly earnings report from leading chip manufacturer",
                        },
                        {
                          time: "11:15 AM",
                          content:
                            "Breaking: Major acquisition in the fintech sector announced",
                        },
                        {
                          time: "10:58 AM",
                          content:
                            "New climate data released shows concerning trends in Arctic ice melt",
                        },
                        {
                          time: "10:42 AM",
                          content:
                            "Government officials announce new cybersecurity initiative for critical infrastructure",
                        },
                      ].map((update, index) => (
                        <div key={index} className="relative pl-6 pb-6">
                          <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-[#0a9e01] border-2 border-white dark:border-gray-900"></div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                            {update.time}
                          </div>
                          <p className="text-sm">{update.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full text-sm">
                    Load Previous Updates
                  </Button>
                </CardFooter>
              </Card>

              {/* Popular Tags */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-bold">
                    Popular Tags
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Technology",
                      "AI",
                      "Business",
                      "Climate",
                      "Startups",
                      "Politics",
                      "Health",
                      "Science",
                      "Sports",
                      "Entertainment",
                      "Markets",
                      "Cybersecurity",
                    ].map((tag, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="text-sm cursor-pointer hover:bg-[#0a9e01] hover:text-white transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Featured Opinion */}
              <Card className="bg-gray-50 dark:bg-gray-800 border-t-4 border-t-[#0a9e01]">
                <CardHeader>
                  <Badge variant="outline" className="w-fit mb-2">
                    Opinion
                  </Badge>
                  <CardTitle className="text-lg font-bold">
                    The Future of Work Is Not What We Expected
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3 mb-3">
                    <Avatar>
                      <AvatarImage src="https://picsum.photos/seed/author/100/100" />
                      <AvatarFallback>EW</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Emma Williams</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Technology Analyst
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    "The pandemic accelerated remote work adoption, but the
                    emerging hybrid models pose challenges we hadn't
                    anticipated..."
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="link" className="text-[#0a9e01] px-0">
                    Read Full Opinion
                  </Button>
                </CardFooter>
              </Card>

              {/* Upcoming Events */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-bold">
                    Upcoming Tech Events
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {[
                      {
                        date: "Jun 15",
                        title: "Global Tech Summit 2025",
                        location: "San Francisco, CA",
                      },
                      {
                        date: "Jun 22",
                        title: "AI Developer Conference",
                        location: "Virtual Event",
                      },
                      {
                        date: "Jul 05",
                        title: "Annual Cybersecurity Forum",
                        location: "London, UK",
                      },
                    ].map((event, idx) => (
                      <div
                        key={idx}
                        className="flex items-start space-x-3 pb-3 border-b border-gray-200 dark:border-gray-700 last:border-0"
                      >
                        <div className="bg-gray-100 dark:bg-gray-800 rounded p-2 text-center min-w-[50px]">
                          <span className="block text-sm font-bold text-[#0a9e01]">
                            {event.date.split(" ")[0]}
                          </span>
                          <span className="block text-xs">
                            {event.date.split(" ")[1]}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium">{event.title}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="mr-1"
                            >
                              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                              <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            {event.location}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Most Shared Content */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-bold flex items-center">
                    <Share2 className="h-5 w-5 mr-2" /> Most Shared
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {[
                      {
                        title: "10 Ways AI Will Change Your Life in 2025",
                        shares: "45.2K",
                      },
                      {
                        title: "The Complete Guide to Electric Vehicles",
                        shares: "32.7K",
                      },
                      {
                        title:
                          "Inside Look: How Tech Giants Build Their Products",
                        shares: "28.3K",
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-700 last:border-0"
                      >
                        <h4 className="font-medium flex-1">{item.title}</h4>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">
                          <Share2 className="h-3 w-3 mr-1" /> {item.shares}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Featured Stories Section */}
          <div className="mt-12 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Featured Stories</h2>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title:
                    "The Rise of Sustainable Tech: How Companies Are Going Green",
                  category: "Environment",
                  author: "Maya Peterson",
                  time: "2 days ago",
                  image: "https://picsum.photos/seed/green/800/450",
                  excerpt:
                    "From carbon-neutral data centers to recyclable components, tech companies are leading the environmental revolution.",
                },
                {
                  title: "Digital Nomads: Redefining the Modern Workplace",
                  category: "Lifestyle",
                  author: "Jason Roberts",
                  time: "3 days ago",
                  image: "https://picsum.photos/seed/nomad/800/450",
                  excerpt:
                    "Meet the professionals who turned the world into their office and how they're reshaping corporate culture.",
                },
                {
                  title: "Quantum Computing: What It Means for Cybersecurity",
                  category: "Security",
                  author: "Lena Kim",
                  time: "4 days ago",
                  image: "https://picsum.photos/seed/quantum/800/450",
                  excerpt:
                    "As quantum computers become more powerful, security experts are preparing for a new era of threats and defenses.",
                },
              ].map((story, idx) => (
                <Card
                  key={idx}
                  className="overflow-hidden transition-all hover:shadow-lg"
                >
                  <div className="relative h-48">
                    <Image
                      src={story.image}
                      alt={story.title}
                      width={400}
                      height={200}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge>{story.category}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h2 className="text-lg font-bold mb-2">{story.title}</h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                      {story.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm">
                        <span>{story.author}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-400">{story.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Podcast Section */}
          <div className="my-12 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Featured Podcasts</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Listen to the latest episodes from our tech podcast network
                </p>
              </div>
              <Button className="bg-[#0a9e01] hover:bg-[#088c01] mt-3 md:mt-0">
                Subscribe
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Tech This Week",
                  episode: "The Future of AI in Healthcare",
                  host: "Dr. Sarah Chen",
                  duration: "45 min",
                  image: "https://picsum.photos/seed/podcast1/300/300",
                },
                {
                  title: "Startup Stories",
                  episode:
                    "From Garage to IPO: The Journey of Quantum Computing",
                  host: "Mike Rivera",
                  duration: "38 min",
                  image: "https://picsum.photos/seed/podcast2/300/300",
                },
                {
                  title: "Digital Futures",
                  episode: "Web3 and the Next Internet Revolution",
                  host: "Amara Washington",
                  duration: "52 min",
                  image: "https://picsum.photos/seed/podcast3/300/300",
                },
              ].map((podcast, idx) => (
                <Card key={idx} className="overflow-hidden">
                  <div className="flex p-3">
                    <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={podcast.image}
                        alt={podcast.title}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="ml-3 flex-1">
                      <Badge variant="outline" className="mb-1">
                        {podcast.title}
                      </Badge>
                      <h3 className="font-medium text-sm line-clamp-2">
                        {podcast.episode}
                      </h3>
                      <div className="flex items-center justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>{podcast.host}</span>
                        <span>{podcast.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 p-2 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          stroke="none"
                        >
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      </Button>
                      <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded-full w-24 relative">
                        <div
                          className={`absolute left-0 top-0 bottom-0 bg-[#0a9e01] rounded-full w-${
                            idx + 2
                          }/12`}
                        ></div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
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
                      >
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                      </svg>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Cookie Consent Banner */}
      <AlertDialog>
        <AlertDialogContent className="max-w-screen-sm bottom-0 top-auto translate-y-0 rounded-b-none fixed mb-0">
          <AlertDialogHeader>
            <AlertDialogTitle>Cookie Consent</AlertDialogTitle>
            <AlertDialogDescription>
              We use cookies to enhance your browsing experience, serve
              personalized ads or content, and analyze our traffic. By clicking
              "Accept All", you consent to our use of cookies.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Customize</AlertDialogCancel>
            <AlertDialogAction className="bg-[#0a9e01] hover:bg-[#088c01]">
              Accept All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

EnhancedNewsLandingPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default EnhancedNewsLandingPage;


export async function getStaticProps({ locale }) {
  // Get posts and add sample categories and read times
  const allPostsData = getSortedPostsData("news").map((post, index) => {
    const readTimes = [
      "3 min read",
      "5 min read",
      "7 min read",
      "4 min read",
      "6 min read",
    ];

    return {
      ...post,
      category: "news",
      readTime: readTimes[index % readTimes.length],
    };
  });

  return {
    props: {
      allPostsData,
      featuredPosts: allPostsData.splice(0, 3)
    },
  };
}
