// pages/posts/[id].jsx
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { getPostData, getAllPostIds } from "lib/posts";
import {
  Calendar,
  User,
  Tag,
  Home,
  ChevronRight,
  BookOpen,
  Share2,
  Bookmark,
  Eye,
  ThumbsUp,
  MessageCircle,
  ArrowUp,
  Clock,
  Zap,
  Code,
  Star,
  TrendingUp,
  Coffee,
  Github,
  Twitter,
  Linkedin,
  Facebook,
  Heart,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Target,
  Award,
  Users,
  Download,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
} from "lucide-react";
import CopyLinkButton from "components/CopyLinkButton";
import Layout from "components/layout/Landing";
import RelatedPosts from "components/RelatedPosts";
import NewsSchemaJsonLd from "components/NewsSchemaJsonLd";
import BreadcrumbSchemaJsonLd from "components/BreadcrumbSchemaJsonLd";
import { convertDate, estimateReadingTime } from "lib/functions";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import DisqusThread from "components/DisqusThread";
import Breadcrumb from "@/components/Breadcrumb";
import TOC from "@/components/TOC";

function Post({ postData, slug }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(
      50
  );
  const [viewCount, setViewCount] = useState(
    1000
  );
  const [showShareModal, setShowShareModal] = useState(false);
  const [showTableOfContents, setShowTableOfContents] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [showQuickActions, setShowQuickActions] = useState(false);

  // Generate a random background image URL from Lorem Picsum
  const backgroundImageUrl = `https://picsum.photos/seed/${slug}/800/450`;

  // Reading time calculation
  const readingTime = estimateReadingTime(
    postData.contentHtml.replace(/<[^>]*>/g, "")
  );

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      setShowScrollTop(window.scrollY > 400);
      setShowQuickActions(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-increment view count on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setViewCount((prev) => prev + 1);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const shareUrl = `https://www.bikinwebsitejogja.com/posts/${slug}`;
  const shareText = `Check out this amazing article: ${postData.title}`;

  const shareOptions = [
    {
      name: "Twitter",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareText
      )}&url=${encodeURIComponent(shareUrl)}`,
      color: "text-blue-400",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        shareUrl
      )}`,
      color: "text-blue-600",
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`,
      color: "text-blue-500",
    },
  ];

  // Simulate article stats
  const articleStats = {
    difficulty: "Intermediate",
    category: "Gadget",
    lastUpdated: postData.date,
    contributors: 1,
    codeExamples: Math.floor(Math.random() * 10) + 3,
    references: Math.floor(Math.random() * 15) + 5,
  };

  return (
    <>
      <NextSeo
        title={`${postData.title} | Codeverta`}
        description={postData.desc}
        openGraph={{
          title: postData.title,
          description: postData.desc,
          url: `https://www.bikinwebsitejogja.com/posts/${slug}`,
          siteName: "Codeverta",
          images: [
            {
              url: postData.image || backgroundImageUrl,
              width: 1200,
              height: 630,
              alt: postData.title,
            },
          ],
          locale: "en_US",
          type: "article",
        }}
        twitter={{
          card: "summary_large_image",
          title: postData.title,
          description: postData.desc,
          creator: "@souvenirlilin",
          images: [postData.image || backgroundImageUrl],
        }}
      />

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Quick Actions */}
      {showQuickActions && (
        <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 space-y-3">
          <div className="bg-white dark:bg-gray-800 rounded-full shadow-lg p-2 border border-gray-200 dark:border-gray-600">
            <button
              onClick={() => setShowTableOfContents(!showTableOfContents)}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              title="Table of Contents"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-full shadow-lg p-2 border border-gray-200 dark:border-gray-600">
            <button
              onClick={handleLike}
              className={`p-2 transition-colors ${
                isLiked
                  ? "text-red-500"
                  : "text-gray-600 dark:text-gray-300 hover:text-red-500"
              }`}
              title="Like Article"
            >
              <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-full shadow-lg p-2 border border-gray-200 dark:border-gray-600">
            <button
              onClick={handleBookmark}
              className={`p-2 transition-colors ${
                isBookmarked
                  ? "text-yellow-500"
                  : "text-gray-600 dark:text-gray-300 hover:text-yellow-500"
              }`}
              title="Bookmark"
            >
              <Bookmark
                className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`}
              />
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-full shadow-lg p-2 border border-gray-200 dark:border-gray-600">
            <button
              onClick={() => setShowShareModal(true)}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              title="Share"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Table of Contents */}
      {showTableOfContents && (
        <div className="fixed right-20 top-1/2 transform -translate-y-1/2 z-30 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-600 max-h-96 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                Contents
              </h3>
              <button
                onClick={() => setShowTableOfContents(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <TOC headings={postData.headings} />
          </div>
        </div>
      )}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-40 group"
          title="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
        </button>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Share Article
              </h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              {shareOptions.map((option) => (
                <a
                  key={option.name}
                  href={option.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => setShowShareModal(false)}
                >
                  <option.icon className={`w-5 h-5 ${option.color}`} />
                  <span className="text-gray-700 dark:text-gray-300">
                    Share on {option.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      <NewsSchemaJsonLd
        post={postData}
        baseUrl="https://bikinwebsitejogja.com"
        author={{
          name: postData.author || "Rabih Utomo",
          url: "https://bikinwebsitejogja.com/about",
        }}
        publisher={{
          name: "Codeverta",
          url: "https://bikinwebsitejogja.com",
          logo: "https://bikinwebsitejogja.com/logo.png",
        }}
        category={articleStats.category}
        keywords={postData.tags}
      />

      <BreadcrumbSchemaJsonLd slug={slug} postTitle={postData.title} />

      <main className="relative min-h-screen bg-cover bg-center bg-no-repeat transition-colors duration-300 max-w-[1200px] mx-auto my-4">
        <div className="">
          <article
            className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-2xl rounded-xl 
            overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            {/* Article Hero Section */}
            <div className="relative">
              {/* Header Image */}
              <div className="w-full h-64 md:h-96 overflow-hidden relative">
                {postData.image ? (
                  <img
                    src={postData.image}
                    alt={`${postData.title} header image`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={backgroundImageUrl}
                    alt={`${postData.title} header image`}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Floating Article Stats */}
                <div className="absolute top-4 right-4 space-y-2">
                  <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg px-3 py-2 text-sm">
                    <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                      <Eye className="w-4 h-4" />
                      <span className="font-medium">
                        {viewCount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg px-3 py-2 text-sm">
                    <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                      <Heart
                        className={`w-4 h-4 ${
                          isLiked ? "text-red-500 fill-current" : ""
                        }`}
                      />
                      <span className="font-medium">{likeCount}</span>
                    </div>
                  </div>
                </div>

                {/* Difficulty Badge */}
                <div className="absolute top-4 left-4">
                  <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    <div className="flex items-center space-x-1">
                      <Target className="w-4 h-4" />
                      <span>{articleStats.difficulty}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Header Content */}
              <div className="p-6 sm:p-8 md:p-12">
                <Breadcrumb postTitle={postData.title} slug={slug} />

                {/* Category Badge */}
                <div className="mb-4">
                  <span className="inline-flex items-center space-x-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                    <Zap className="w-4 h-4" />
                    <span>{articleStats.category}</span>
                  </span>
                </div>

                {/* Title */}
                <header className="mb-8">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight mb-6">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {postData.title}
                    </span>
                  </h1>

                  {/* Article Description */}
                  {postData.desc && (
                    <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                      {postData.desc}
                    </p>
                  )}

                  {/* Enhanced Metadata */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <Calendar className="w-5 h-5" />
                      <div>
                        <div className="text-sm">Published</div>
                        <div className="font-medium">{postData.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <Clock className="w-5 h-5" />
                      <div>
                        <div className="text-sm">Reading Time</div>
                        <div className="font-medium">
                          {readingTime} min read
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <Users className="w-5 h-5" />
                      <div>
                        <div className="text-sm">Contributors</div>
                        <div className="font-medium">
                          {articleStats.contributors}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Author and Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        C
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-gray-100">
                          Codeverta Team 👨‍💻
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Tech Content Creator
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button
                        onClick={handleLike}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all ${
                          isLiked
                            ? "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                            : "border-gray-300 dark:border-gray-600 hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                        }`}
                      >
                        <Heart
                          className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`}
                        />
                        <span className="text-sm font-medium">{likeCount}</span>
                      </button>

                      <button
                        onClick={handleBookmark}
                        className={`p-2 rounded-lg border transition-all ${
                          isBookmarked
                            ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400"
                            : "border-gray-300 dark:border-gray-600 hover:border-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
                        }`}
                      >
                        <Bookmark
                          className={`w-4 h-4 ${
                            isBookmarked ? "fill-current" : ""
                          }`}
                        />
                      </button>

                      <CopyLinkButton />

                      <button
                        onClick={() => setShowShareModal(true)}
                        className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Tags */}
                  {postData.tags && postData.tags.length > 0 && (
                    <div className="flex items-center space-x-2 mt-6">
                      <Tag className="w-5 h-5 text-gray-500" />
                      <div className="flex flex-wrap gap-2">
                        {postData.tags.split(",").map((tag, index) => (
                          <span
                            key={tag}
                            className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium hover:shadow-md transition-shadow cursor-pointer"
                          >
                            #{tag.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </header>
              </div>
            </div>

            {/* Article Highlights Section */}
            <div className="px-6 sm:px-8 md:px-12 pb-8">
              <TOC headings={postData.headings} />
            </div>

            {/* Content Section */}
            <div className="px-6 sm:px-8 md:px-12 pb-8">
              <div
                className="prose text-base md:text-lg dark:prose-invert prose-lg max-w-none 
                prose-headings:text-gray-900 dark:prose-headings:text-gray-100
                prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900 dark:prose-strong:text-gray-100
                prose-code:text-gray-800 dark:prose-code:text-gray-200 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-700 prose-pre:rounded-lg
                prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-900/20 prose-blockquote:p-4 prose-blockquote:rounded-r-lg
                selection:bg-blue-100 dark:selection:bg-blue-900
                prose-img:rounded-lg prose-img:shadow-lg
                leading-relaxed"
                dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
              />

              {/* Article Footer Actions */}
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-600 dark:text-gray-400">
                      Was this helpful?
                    </span>
                    <div className="flex space-x-2">
                      <button className="flex items-center space-x-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all">
                        <ThumbsUp className="w-4 h-4" />
                        <span className="text-sm">Yes</span>
                      </button>
                      <button className="flex items-center space-x-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
                        <ThumbsUp className="w-4 h-4 rotate-180" />
                        <span className="text-sm">No</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Share this article:
                    </span>
                    {shareOptions.map((option) => (
                      <a
                        key={option.name}
                        href={option.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:border-current transition-all ${option.color}`}
                      >
                        <option.icon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              <div className="mt-12">
                <DisqusThread
                  url={"https://www.bikinwebsitejogja.com/posts/" + slug}
                  identifier={slug}
                  title={postData.title}
                />
              </div>
            </div>
          </article>

          {/* Related Posts */}
          {postData.relatedPosts && postData.relatedPosts.length > 0 && (
            <div className="mt-8">
              <RelatedPosts posts={postData.relatedPosts} />
            </div>
          )}

          {/* Newsletter Signup */}
          <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">
                Stay Updated with Latest Tech Trends
              </h3>
              <p className="text-blue-100 mb-6">
                Get weekly insights, tutorials, and industry news delivered to
                your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 border-0 focus:ring-2 focus:ring-white"
                />
                <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

Post.getLayout = function (page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

export default Post;

// In Pages Router, we use getStaticProps instead of directly fetching data in component
export async function getStaticProps({ params, locale }) {
  const slug = params.id;
  const postData = await getPostData(slug, "gadget");
  return {
    props: {
      postData,
      slug,
      locale,
      ...(await serverSideTranslations(locale, ["common", "order"])),
    },
  };
}

// getStaticPaths replaces generateStaticParams - they're functionally similar
export async function getStaticPaths({ locales }) {
  const postIds = getAllPostIds("gadget");
  const paths: {
    params: {
      id: string;
    };
    locale: string;
  }[] = [];

  postIds.forEach((postId) => {
    for (const locale of locales) {
      paths.push({
        params: {
          id: postId.params.id,
        },
        locale,
      });
    }
  });

  return {
    paths,
    fallback: false,
  };
}
