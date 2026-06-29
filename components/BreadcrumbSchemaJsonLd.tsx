// components/BreadcrumbSchemaJsonLd.jsx
// Updated: corrects URLs to /tutorials/ instead of incorrect /posts/
// Also adds Article category context for better Google rich results
import React from "react";
import Head from "next/head";

const BLOG_PATHS: Record<string, string> = {
  tutorials: "Tutorial",
  news: "Berita",
  cybersecurity: "Cyber Security",
  startups: "Startup",
  gadget: "Gadget",
  ai: "AI",
  blog: "Blog",
};

interface BreadcrumbSchemaProps {
  slug: string;
  postTitle: string;
  category?: string;
}

const BreadcrumbSchemaJsonLd = ({
  slug,
  postTitle,
  category,
}: BreadcrumbSchemaProps) => {
  const pathType =
    slug.startsWith("0") || slug.match(/^[0-9]+-/) ? "tutorials" : "blog";
  const categoryLabel = BLOG_PATHS[pathType] || "Blog";

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Codeverta",
        item: "https://codeverta.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: categoryLabel,
        item: `https://codeverta.com/tutorials`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: postTitle,
        item: `https://codeverta.com/tutorials/${slug}`,
      },
    ],
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
    </Head>
  );
};

export default BreadcrumbSchemaJsonLd;
