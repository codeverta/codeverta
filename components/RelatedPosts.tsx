// components/RelatedPosts.jsx
import React from "react";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

// Utility function to convert date
const convertDate = (date) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString(undefined, options);
};

const RelatedPosts = ({ posts }) => {
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-red-500",
    "bg-indigo-500",
  ];
  if (!posts || posts.length === 0) return null;

  return (
    <section className="my-12 mx-4 md:mx-0 border-t pt-8 dark:border-gray-700">
      <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 flex items-center">
        <span>Artikel Terkait</span>
        <span className="ml-2 text-yellow-500">✨</span>
      </h3>

      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <div
            key={post.id}
            className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shadow-md 
                     transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            {/* Random background color for visual interest */}
            <div className={`h-2 ${colors[index]}`}></div>

            <div className="p-6">
              <Link className="block" href={`/posts/${post.id}`}>
                <h4
                  className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100 
                            hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {post.title}
                </h4>

                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                  {post.desc}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    {post.date}
                  </div>

                  <span className="text-blue-600 dark:text-blue-400 text-sm flex items-center">
                    Baca
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedPosts;
