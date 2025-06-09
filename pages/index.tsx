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
  headlines,
}: {
  allPostsData: PostMeta[];
  featuredPosts: PostMeta[];
  headlines: PostMeta[];
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "/news", name: "News" },
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
                      <Link href={`/news/${item.id}`} className="relative">
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
                      </Link>
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
                    {featuredPosts.map((item, index) => (
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
                            {item.desc}
                          </p>
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback>
                                  {item.image}
                                </AvatarFallback>
                              </Avatar>
                              <span>{item.author}</span>
                              <span className="text-gray-400">•</span>
                              <span className="flex items-center text-gray-400">
                                <Clock className="h-3 w-3 mr-1" /> 5 min read
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
                    {headlines.map((headline, index) => (
                      <li
                        key={index}
                        className="pb-3 border-b border-gray-200 dark:border-gray-700 last:border-0"
                      >
                        <Link href={`/news/${headline.id}`} className="flex group">
                          <span className="text-[#0a9e01] font-bold mr-2">
                            ■
                          </span>
                          <span className="font-medium group-hover:text-[#0a9e01] transition-colors">
                            {headline.title}
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
            </div>
          </div>
        </div>
      </main>
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
      featuredPosts: allPostsData.splice(0, 3),
      headlines: allPostsData.splice(0, 5),
    },
  };
}
