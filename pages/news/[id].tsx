// pages/posts/[id].jsx
import React from "react";
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
} from "lucide-react";
import CopyLinkButton from "components/CopyLinkButton";
import Layout from "components/layout/Landing";
import RelatedPosts from "components/RelatedPosts";
import BlogSchemaJsonLd from "components/BlogSchemaJsonLd";
import BreadcrumbSchemaJsonLd from "components/BreadcrumbSchemaJsonLd"; // Import the new component
import { convertDate, estimateReadingTime } from "lib/functions";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import DisqusThread from "components/DisqusThread";
// import AdSense from "components/AdSense";

// Improved TOC Component with smooth scrolling
function TOC({ headings }) {
  if (!headings || headings.length < 3) return null;

  const handleClick = (e, slug) => {
    e.preventDefault();
    const element = document.getElementById(slug);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });

      // Highlight the section briefly
      element.classList.add("highlight-section");
      setTimeout(() => {
        element.classList.remove("highlight-section");
      }, 1500);
    }
  };

  return (
    <div className="toc-container bg-gray-50 dark:bg-gray-800 rounded-lg p-4 my-6 sticky top-24 max-h-[80vh] overflow-y-auto border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-bold mb-4 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
        Contents
      </h3>
      <ul className="space-y-2">
        {headings.map((heading, index) => (
          <li
            key={index}
            className={`
              toc-item
              ${heading.level === 2 ? "font-medium" : "text-sm opacity-90"}
              hover:text-blue-600 dark:hover:text-blue-400
              transition-colors
            `}
            style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
          >
            <a
              href={`#${heading.slug}`}
              onClick={(e) => handleClick(e, heading.slug)}
              className="block py-1 border-l-2 border-transparent hover:border-blue-500 pl-2"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
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
        href="/posts"
      >
        Blog
      </Link>
      <ChevronRight className="w-4 h-4" />
      <span className="font-semibold truncate max-w-[200px]">{postTitle}</span>
    </nav>
  );
};

function Post({ postData, slug }) {
  // Generate a random background image URL from Lorem Picsum
  const backgroundImageUrl = `https://picsum.photos/seed/${slug}/800/450`;

  // Reading time calculation
  const readingTime = estimateReadingTime(
    postData.contentHtml.replace(/<[^>]*>/g, "")
  );

  return (
    <>
      <NextSeo
        title={`${postData.title} | Million Candles`}
        description={postData.desc}
        openGraph={{
          title: postData.title,
          description: postData.desc,
          url: `https://www.codeverta.com/posts/${slug}`,
          siteName: "Million Candles",
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
      {/* Add the BlogSchemaJsonLd component */}
      <BlogSchemaJsonLd
        post={postData}
        baseUrl="https://codeverta.com"
        author={{
          name: postData.author || "Rabih Utomo",
          url: "https://codeverta.com/about",
        }}
      />

      {/* Add the BreadcrumbSchemaJsonLd component */}
      <BreadcrumbSchemaJsonLd slug={slug} postTitle={postData.title} />

      <main className="relative min-h-screen bg-cover bg-center bg-no-repeat transition-colors duration-300 max-w-[1200px] mx-auto my-4">
        <div className="">
          <article
            className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-xl 
            overflow-hidden p-6 sm:p-8 md:p-12 border border-gray-200 dark:border-gray-700"
          >
            {/* Breadcrumb */}
            <Breadcrumb postTitle={postData.title} slug={slug} />
            {/* Header Image */}
            <div className="w-full h-64 md:h-96 overflow-hidden rounded-lg mb-8">
              {postData.image ? (
                <img
                  src={postData.image}
                  alt={`${postData.title} header image`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              ) : (
                <img
                  src={backgroundImageUrl}
                  alt={`${postData.title} header image`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              )}
            </div>
            {/* Header Section */}
            <header className="mb-10 border-b pb-6 dark:border-gray-700 relative">
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-gray-100 
                leading-tight mb-6 transition-colors duration-300 relative"
              >
                <span className="block">{postData.title}</span>
              </h1>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{postData.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>Million Candles 👨‍💻</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  <span>{readingTime} min read</span>
                </div>

                {/* Copy Link Button */}
                <CopyLinkButton />

                {/* Tags */}
                {postData.tags && postData.tags.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <Tag className="w-5 h-5" />
                    <div className="flex space-x-2">
                      {postData.tags.split(",").map((tag) => (
                        <span
                          key={tag}
                          className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </header>

            {/* Content Section */}
            <TOC headings={postData.headings} />
            <div
              className="prose text-base md:text-md dark:prose-invert prose-lg max-w-none 
              prose-headings:text-gray-900 dark:prose-headings:text-gray-100
              prose-a:text-blue-600 dark:prose-a:text-blue-400
              prose-strong:text-gray-900 dark:prose-strong:text-gray-100
              prose-code:text-gray-800 dark:prose-code:text-gray-200
              prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800
              selection:bg-blue-100 dark:selection:bg-blue-900"
              dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
            />
            <DisqusThread
              url={"https://www.codeverta.com/posts/" + slug}
              identifier={slug}
              title={postData.title}
            />
          </article>

          {/* Related Posts - Using our new component */}
          {postData.relatedPosts && postData.relatedPosts.length > 0 && (
            <RelatedPosts posts={postData.relatedPosts} />
          )}
        </div>

        {/* <AdSense adType={1} /> */}
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
  const postData = await getPostData(slug, "tutorials");
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
  const postIds = getAllPostIds('news');
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
