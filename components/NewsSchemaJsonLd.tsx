// components/NewsSchemaJsonLd.jsx
import React from "react";
import Head from "next/head";

const NewsSchemaJsonLd = ({
  post,
  baseUrl,
  author,
  publisher,
  category = "Technology",
  keywords = "",
}) => {
  const newsSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.desc || post.title,
    image: post.image
      ? [post.image]
      : [`https://picsum.photos/seed/${post.slug || "default"}/1200/630`],
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
      "@id": `${baseUrl}/posts/${post.slug || post.id}`,
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
    url: `${baseUrl}/posts/${post.slug || post.id}`,
    isAccessibleForFree: true,
    genre: "Technology News",
    articleBody: post.contentHtml
      ? post.contentHtml.replace(/<[^>]*>/g, "").substring(0, 500) + "..."
      : "",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".prose"],
    },
    backstory:
      post.desc || "Latest technology news and insights from Codeverta",
    dateline: `${new Date(post.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })} - Codeverta`,
    inLanguage: "en-US",
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(newsSchema, null, 2),
        }}
      />
    </Head>
  );
};

export default NewsSchemaJsonLd;
