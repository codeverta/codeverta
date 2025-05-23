import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

// Dynamic Breadcrumb Component
const Breadcrumb = ({ postTitle, slug }) => {
  return (
    <nav
      className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-6"
      aria-label="Breadcrumb"
    >
      <Link
        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center"
        href="/"
      >
        <Home className="w-4 h-4 mr-1" />
        Home
      </Link>
      <ChevronRight className="w-4 h-4" />
      <Link
        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        href="/ai"
      >
        AI
      </Link>
      <ChevronRight className="w-4 h-4" />
      <span className="font-semibold truncate max-w-[200px]">{postTitle}</span>
    </nav>
  );
};

export default Breadcrumb;