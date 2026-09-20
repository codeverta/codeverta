// components/NewsSchemaJsonLd.jsx
import React from "react";
import Head from "next/head";

const NewsSchemaJsonLd = ({
  post,
  baseUrl,
  url,
  author,
  publisher,
  category = "Technology",
  keywords = "",
}) => {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.desc || post.title,
    image: post.image ? [new URL(post.image, baseUrl).toString()] : undefined,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: {
      "@type": "Person",
      name: author.name,
      url: author.url,
    },
    publisher: {
      "@type": "Organization",
      name: publisher.name,
      url: publisher.url,
      logo: {
        "@type": "ImageObject",
        url: publisher.logo,
        width: 200,
        height: 60,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    articleSection: category,
    keywords: keywords
      ? keywords
          .split(",")
          .map((tag) => tag.trim())
          .join(", ")
      : "",
    wordCount: post.contentHtml
      ? post.contentHtml.replace(/<[^>]*>/g, "").split(" ").length
      : 0,
    url,
    isAccessibleForFree: true,
    inLanguage: post.lang || "id",
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
    </Head>
  );
};

export default NewsSchemaJsonLd;
