// pages/posts/[id].jsx
import React, { useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { getPostData, getAllPostIds, getSortedPostsData } from "lib/posts";
import {
  Calendar,
  User,
  Tag,
  Home,
  ChevronRight,
  BookOpen,
  ExternalLink,
  Code,
  FileText,
  Heart,
} from "lucide-react";
import CopyLinkButton from "@/components/CopyLinkButton";
import Layout from "components/layout/Landing";
import RelatedPosts from "@/components/RelatedPosts";
import BlogSchemaJsonLd from "components/BlogSchemaJsonLd";
import BreadcrumbSchemaJsonLd from "components/BreadcrumbSchemaJsonLd";
import { convertDate, estimateReadingTime } from "lib/functions";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import DisqusThread from "components/DisqusThread";
import ScrollIndicator from "@/components/ScrollIndicator";
import AdSense from "components/AdSense"; // Ensure this path is correct

// --- Helper Components ---

const RelatedSites = () => {
  const sites = [
    {
      name: "Bikin Website Jogja",
      url: "https://bikinwebsitejogja.com",
      description: "Jasa pembuatan website profesional",
      icon: <Code className="w-5 h-5" />,
      color: "blue",
    },
    {
      name: "NSC Bantu Perizinan",
      url: "https://nscbantuperizinan.com",
      description: "Layanan konsultasi perizinan usaha",
      icon: <FileText className="w-5 h-5" />,
      color: "green",
    },
    // {
    //   name: "Tips Sehat Alami",
    //   url: "https://tipssehatalami.com",
    //   description: "Informasi kesehatan & tips hidup",
    //   icon: <Heart className="w-5 h-5" />,
    //   color: "red",
    // },
  ];

  const colorClasses = {
    blue: "hover:border-blue-500 hover:shadow-blue-100",
    green: "hover:border-green-500 hover:shadow-green-100",
    red: "hover:border-red-500 hover:shadow-red-100",
  };

  return (
    <div className="mt-8 mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
        <ExternalLink className="w-5 h-5" />
        Partner Sites
      </h3>
      <div className="grid gap-3">
        {sites.map((site) => (
          <a
            key={site.url}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`block p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 
            transition-all duration-300 ${
              colorClasses[site.color]
            } hover:shadow-md group`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg bg-${site.color}-50 dark:bg-${site.color}-900/20 text-${site.color}-600`}
              >
                {site.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm truncate text-gray-900 dark:text-gray-100 group-hover:text-blue-600">
                  {site.name}
                </h4>
                <p className="text-xs text-gray-500 truncate">
                  {site.description}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

const OtherPostsWidget = ({ posts, currentPostId }) => {
  // Filter postingan saat ini & ambil 5 teratas
  const filteredPosts = posts
    .filter((post) => post.id !== currentPostId)
    .slice(0, 5);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
      <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-800 pb-2">
        Other Posts
      </h3>
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.id}`}
            className="group block"
          >
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                {post.category || "Blog"}
              </span>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-relaxed">
                {post.title}
              </h4>
              <span className="text-xs text-gray-400">{post.date}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

// Logic to inject ads INSIDE the HTML content
const ContentWithAds = ({ contentHtml }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (!contentRef.current) return;

    // 1. Get all paragraphs
    const paragraphs = contentRef.current.querySelectorAll("p");

    // 2. Insert an ad placeholder after every 3rd paragraph
    let adCount = 0;
    paragraphs.forEach((p, index) => {
      // Logic: After 3rd, 6th, 9th paragraph...
      if ((index + 1) % 3 === 0) {
        adCount++;
        const adId = `ad-inject-${adCount}`;

        // Prevent duplicate injection if React re-renders
        if (p.nextSibling && p.nextSibling.id === adId) return;

        const adDiv = document.createElement("div");
        adDiv.id = adId;
        adDiv.className = "my-8 min-h-[100px] flex justify-center";
        adDiv.innerHTML = `
          <ins class="adsbygoogle"
               style="display:block; text-align:center; width: 100%;"
               data-ad-layout="in-article"
               data-ad-format="fluid"
               data-ad-client="ca-pub-2242816010232507"
               data-ad-slot="1387120353"></ins>
        `;

        p.parentNode.insertBefore(adDiv, p.nextSibling);

        // Trigger AdSense
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
          console.error("Ad injection error", e);
        }
      }
    });
  }, [contentHtml]);

  return (
    <div
      ref={contentRef}
      className="prose text-base md:text-md dark:prose-invert prose-lg max-w-none 
      prose-headings:text-gray-900 dark:prose-headings:text-gray-100
      prose-a:text-blue-600 dark:prose-a:text-blue-400
      prose-strong:text-gray-900 dark:prose-strong:text-gray-100
      prose-img:rounded-xl prose-img:shadow-lg prose-p:leading-loose prose-li:leading-loose
      selection:bg-blue-100 dark:selection:bg-blue-900"
      dangerouslySetInnerHTML={{ __html: contentHtml }}
    />
  );
};

function TOC({ headings }) {
  if (!headings || headings.length < 3) return null;

  const handleClick = (e, slug) => {
    e.preventDefault();
    const element = document.getElementById(slug);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      element.classList.add("highlight-section");
      setTimeout(() => element.classList.remove("highlight-section"), 1500);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <BookOpen className="w-5 h-5" />
        Table of Contents
      </h3>
      <ul className="space-y-2.5">
        {headings.map((heading, index) => (
          <li
            key={index}
            style={{ paddingLeft: `${(heading.level - 2) * 0.8}rem` }}
          >
            <a
              href={`#${heading.slug}`}
              onClick={(e) => handleClick(e, heading.slug)}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors block border-l-2 border-transparent hover:border-blue-500 pl-2"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

const Breadcrumb = ({ postTitle }) => (
  <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-6 overflow-hidden">
    <Link href="/" className="hover:text-blue-600 flex items-center shrink-0">
      <Home className="w-4 h-4 mr-1" /> Home
    </Link>
    <ChevronRight className="w-4 h-4 shrink-0" />
    <Link href="/posts" className="hover:text-blue-600 shrink-0">
      Blog
    </Link>
    <ChevronRight className="w-4 h-4 shrink-0" />
    <span className="truncate font-medium text-gray-900 dark:text-gray-100">
      {postTitle}
    </span>
  </nav>
);

// --- Main Component ---

function Post({ postData, slug, allPostsData }) {
  const backgroundImageUrl = `https://picsum.photos/seed/${slug}/800/450`;
  const readingTime = estimateReadingTime(
    postData.contentHtml.replace(/<[^>]*>/g, "")
  );
  return (
    <>
      <ScrollIndicator />
      <NextSeo
        title={`${postData.title} | Million Candles`}
        description={postData.desc}
        openGraph={{
          title: postData.title,
          description: postData.desc,
          url: `https://www.souvenirlilin.id/posts/${slug}`,
          siteName: "Million Candles",
          images: [
            {
              url: postData.image || backgroundImageUrl,
              width: 1200,
              height: 630,
              alt: postData.title,
            },
          ],
          type: "article",
        }}
      />
      <BlogSchemaJsonLd
        post={postData}
        baseUrl="https://souvenirlilin.id"
        author={{
          name: postData.author || "Rabih Utomo",
          url: "https://souvenirlilin.id/about",
        }}
      />
      <BreadcrumbSchemaJsonLd slug={slug} postTitle={postData.title} />

      <main className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-12">
        {/* Top Ad Banner - High Visibility */}
        <div className="max-w-[1200px] mx-auto pt-4 px-4">
          <AdSense type="display" className="mb-4" />
        </div>

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb postTitle={postData.title} />

          {/* Grid Layout: Main Content (Left) + Sidebar (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* LEFT COLUMN: Article Content (8 cols) */}
            <article className="lg:col-span-8 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 md:p-8 overflow-hidden">
              {/* Header Image */}
              <div className="w-full aspect-video rounded-xl overflow-hidden mb-8 bg-gray-200">
                <img
                  src={postData.image || backgroundImageUrl}
                  alt={postData.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Title Section */}
              <header className="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
                <div className="flex gap-2 mb-4">
                  {postData.tags?.split(",").map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
                  {postData.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" /> {postData.date}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" /> {readingTime} min read
                  </div>
                  <CopyLinkButton />
                </div>
              </header>

              {/* Ad below Title - Very High CTR */}
              <AdSense type="in-article" className="mb-8" />
              {/* Main Content with Injected Ads */}
              <ContentWithAds contentHtml={postData.contentHtml} />

              {/* Bottom Section */}
              <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
                {/* Matched Content / Feed Ad */}
                <AdSense type="feed" className="mb-8" />

                <DisqusThread
                  url={"https://www.souvenirlilin.id/posts/" + slug}
                  identifier={slug}
                  title={postData.title}
                />
              </div>
            </article>

            {/* RIGHT COLUMN: Sidebar (4 cols) - Sticky */}
            <aside className="lg:col-span-4 space-y-8">
              {/* Sticky Container */}
              <div className="sticky top-24">
                {/* Table of Contents */}
                <TOC headings={postData.headings} />

                {/* Sidebar Ad - Sticky below TOC */}
                <div className="mt-8">
                  {/* <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 text-center">
                    Advertisement
                  </div> */}
                  <AdSense type="display" style={{ minHeight: "250px" }} />
                </div>
                <div className="mt-8">
                  <OtherPostsWidget posts={allPostsData} currentPostId={slug} />
                </div>
                {/* Related Sites Widget */}
                <RelatedSites />
              </div>
            </aside>
          </div>

          {/* Related Posts */}
          {postData.relatedPosts?.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Related Articles
              </h2>
              <RelatedPosts posts={postData.relatedPosts} />
            </section>
          )}
        </div>
      </main>
    </>
  );
}

Post.getLayout = function (page) {
  return <Layout>{page}</Layout>;
};

export default Post;

// ... keep getStaticProps and getStaticPaths as they were ...
export async function getStaticProps({ params, locale }) {
  const slug = params.id;
  const postData = await getPostData(slug, "ai");
  const allPostsData = getSortedPostsData(locale).splice(0, 6);

  return {
    props: {
      allPostsData,
      postData,
      slug,
      locale,
      ...(await serverSideTranslations(locale, ["common", "order"])),
    },
  };
}

// getStaticPaths replaces generateStaticParams - they're functionally similar
export async function getStaticPaths({ locales }) {
  const postIds = getAllPostIds("ai");
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
