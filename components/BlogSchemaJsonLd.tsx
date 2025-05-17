// components/BlogSchemaJsonLd.js
import React from "react";
import Head from "next/head";

const BlogSchemaJsonLd = ({
  post,
  baseUrl,
  author = {
    name: "Rabih Utomo",
    url: "https://souvenirlilin.id/about",
  },
}: any) => {
  if (!post) return null;

  // Base article schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description || post.excerpt || "",
    image: post.featuredImage
      ? `${baseUrl}${post.featuredImage}`
      : `${baseUrl}/Million-Candles/Lilin-Gelas-Biru/1.png`,
    datePublished: post.date,
    dateModified: post.modified || post.date,
    author: {
      "@type": "Person",
      name: author.name,
      url: author.url,
    },
    publisher: {
      "@type": "Organization",
      name: "UD Million Candles",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/Million-Candles/Lilin-Gelas-Biru/1.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/posts/${post.id}`,
    },
  };

  // FAQ Schema (parse from content if available)
  const faqSchema = post.faq
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }
    : null;

  // HowTo Schema (parse from content if available)
  const howToSchema = post.howTo
    ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: post.howTo.title || post.title,
        description: post.howTo.description || post.description || "",
        image:
          post.howTo.image ||
          (post.featuredImage
            ? `${baseUrl}${post.featuredImage}`
            : `${baseUrl}/images/default-featured.jpg`),
        estimatedCost: post.howTo.estimatedCost
          ? {
              "@type": "MonetaryAmount",
              currency: "IDR",
              value: post.howTo.estimatedCost,
            }
          : undefined,
        totalTime: post.howTo.totalTime || "PT30M",
        supply: (post.howTo.supplies || []).map((supply) => ({
          "@type": "HowToSupply",
          name: supply,
        })),
        tool: (post.howTo.tools || []).map((tool) => ({
          "@type": "HowToTool",
          name: tool,
        })),
        step: post.howTo.steps.map((step, index) => ({
          "@type": "HowToStep",
          url: `${baseUrl}/posts/${post.id}#step-${index + 1}`,
          name: step.name || `Step ${index + 1}`,
          itemListElement: {
            "@type": "HowToDirection",
            text: step.text,
          },
          image: step.image ? `${baseUrl}${step.image}` : undefined,
        })),
      }
    : null;

  // Combine all schemas into an array
  const schemas = [
    articleSchema,
    ...(faqSchema ? [faqSchema] : []),
    ...(howToSchema ? [howToSchema] : []),
  ];

  return (
    <Head>
      {schemas.map((schema, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </Head>
  );
};

export default BlogSchemaJsonLd;
