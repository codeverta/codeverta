// components/PostSchemaJsonLd.jsx
import React from "react";
import Head from "next/head";

const PostSchemaJsonLd = ({
  post,
  slug,
  baseUrl = "https://bikinwebsitejogja.com",
  author = {
    name: "Rabih Utomo",
    url: "https://bikinwebsitejogja.com/about",
  },
}) => {
  // Blog article schema
  const articleData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/posts/${slug}`,
    },
    headline: post.title,
    description: post.desc,
    image: post.image || `https://picsum.photos/seed/${slug}/1200/630`,
    author: {
      "@type": "Person",
      name: post.author || author.name,
      url: author.url,
    },
    publisher: {
      "@type": "Organization",
      name: "Codeverta",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
        width: 192,
        height: 192,
      },
    },
    datePublished: post.date,
    dateModified: post.updated || post.date,
    keywords: post.tags ? post.tags.split(",").join(", ") : "",
  };

  // Breadcrumb schema
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${baseUrl}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${baseUrl}/posts`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${baseUrl}/posts/${slug}`,
      },
    ],
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
    </Head>
  );
};

export default PostSchemaJsonLd;
