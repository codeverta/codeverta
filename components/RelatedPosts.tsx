// components/RelatedPosts.jsx
import React from "react";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Utility function to convert date
const convertDate = (date) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString(undefined, options);
};

// Category badges with corresponding colors
const categoryColors = {
  technology: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  lifestyle: "bg-green-100 text-green-800 hover:bg-green-200",
  travel: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  health: "bg-purple-100 text-purple-800 hover:bg-purple-200",
  finance: "bg-pink-100 text-pink-800 hover:bg-pink-200",
  education: "bg-red-100 text-red-800 hover:bg-red-200",
  entertainment: "bg-indigo-100 text-indigo-800 hover:bg-indigo-200",
};

const RelatedPosts = ({ posts }) => {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="my-12 mx-4 md:mx-0 pt-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
          <span>Artikel Terkait</span>
          <Badge
            variant="outline"
            className="ml-2 bg-yellow-100 text-yellow-800 border-yellow-200"
          >
            ✨ Rekomendasi
          </Badge>
        </h3>
        <Button
          variant="ghost"
          size="sm"
          className="text-sm text-blue-600 dark:text-blue-400"
        >
          Lihat Semua
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      <Separator className="mb-6" />

      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post, index) => {
          // Assuming each post has a category, or assign a default one
          const category =
            post.category ||
            Object.keys(categoryColors)[
              index % Object.keys(categoryColors).length
            ];
          const colorClass =
            categoryColors[category] || categoryColors.technology;

          return (
            <Card
              key={post.id}
              className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <CardHeader className="p-0">
                <div className="relative h-40 bg-gray-200 dark:bg-gray-700">
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <span className="text-4xl">📄</span>
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <Badge className={colorClass}>{category}</Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-4">
                <Link href={`/posts/${post.id}`} className="block group">
                  <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                    {post.desc}
                  </p>
                </Link>
              </CardContent>

              <CardFooter className="flex items-center justify-between pt-0">
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <Calendar className="w-4 h-4 mr-2" />
                  {post.date}
                </div>
                <Button
                  variant="link"
                  size="sm"
                  className="text-blue-600 dark:text-blue-400 p-0"
                  asChild
                >
                  <Link href={`/posts/${post.id}`}>
                    Baca
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default RelatedPosts;
