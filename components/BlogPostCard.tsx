import React from "react";
import Link from "next/link";
import Image from "next/image";

/**
 * BlogPostCard Component
 * Displays a single blog post preview with image, title, excerpt, and metadata
 */
export const BlogPostCard = ({
  title,
  excerpt,
  publishDate,
  author,
  tags,
  imageUrl,
  slug,
  readTime,
}) => {
  // Format the date for display
  const formattedDate = new Date(publishDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="blog-card bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <Link href={slug} className="block">
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl}
            alt={`Cover image for ${title}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority={false}
          />
        </div>
      </Link>

      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.length &&
            tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full"
              >
                {tag}
              </span>
            ))}
        </div>

        <Link href={slug} className="block">
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
            {title}
          </h3>
        </Link>

        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {excerpt}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>{formattedDate}</span>
          <span>{readTime} min read</span>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            By {author}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;
