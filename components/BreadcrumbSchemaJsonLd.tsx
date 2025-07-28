// components/BreadcrumbSchemaJsonLd.jsx
import React from "react";
import Head from "next/head";

const BreadcrumbSchemaJsonLd = ({ slug, postTitle }) => {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://bikinwebsitejogja.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://bikinwebsitejogja.com/posts",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: postTitle,
        item: `https://bikinwebsitejogja.com/posts/${slug}`,
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
