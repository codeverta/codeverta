import React, { useEffect } from "react";
import { NextSeo } from "next-seo";
import Footer from "components/Footer";
import { useRouter } from "next/router";
import Navbar from "@/components/navbar";
import WhatsAppButton from "../WhatsappButton";
import Banner from "../Banner";

const DOMAIN = "https://www.codeverta.com";

interface SEOProps {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: "summary" | "summary_large_image" | "app" | "player";
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  keywords?: string;
  author?: string;
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
  additionalMetaTags?: Array<{
    name?: string;
    property?: string;
    content: string;
  }>;
  additionalLinkTags?: Array<{
    rel: string;
    href: string;
    [key: string]: string;
  }>;
}

interface Props {
  children: React.ReactNode;
  seo?: SEOProps;
}

export default function Landing({ children, seo }: Props) {
  const router = useRouter();
  const canonicalUrl =
    seo?.canonical || `${DOMAIN}${router.asPath.split("?")[0]}`;

  // Default SEO values
  const defaultSEO = {
    title: "Codeverta | Jasa Pembuatan Website, Aplikasi, LMS, Sistem di Jogja",
    description:
      "Codeverta provides innovative digital solutions for your business needs. Expert web development, mobile apps, and digital transformation services.",
    ogTitle:
      seo?.ogTitle || seo?.title || "Codeverta | Jasa Pembuatan Website, Aplikasi, LMS, Sistem di Jogja",
    ogDescription:
      seo?.ogDescription ||
      seo?.description ||
      "Codeverta provides innovative digital solutions for your business needs. Expert web development, mobile apps, and digital transformation services.",
    ogImage: seo?.ogImage || `${DOMAIN}/images/og-default.jpg`,
    ogType: seo?.ogType || "website",
    twitterCard: seo?.twitterCard || "summary_large_image",
    twitterTitle:
      seo?.twitterTitle ||
      seo?.title ||
      "Codeverta | Jasa Pembuatan Website, Aplikasi, LMS, Sistem di Jogja",
    twitterDescription:
      seo?.twitterDescription ||
      seo?.description ||
      "Codeverta provides innovative digital solutions for your business needs.",
    twitterImage:
      seo?.twitterImage || seo?.ogImage || `${DOMAIN}/images/og-default.jpg`,
  };

  return (
    <>
      <NextSeo
        title={seo?.title || defaultSEO.title}
        description={seo?.description || defaultSEO.description}
        canonical={canonicalUrl}
        noindex={seo?.noindex || false}
        nofollow={seo?.nofollow || false}
        openGraph={{
          type: defaultSEO.ogType,
          url: canonicalUrl,
          title: defaultSEO.ogTitle,
          description: defaultSEO.ogDescription,
          images: [
            {
              url: defaultSEO.ogImage,
              width: 1200,
              height: 630,
              alt: defaultSEO.ogTitle,
            },
          ],
          site_name: "Codeverta",
        }}
        twitter={{
          handle: "@codeverta",
          site: "@codeverta",
          cardType: defaultSEO.twitterCard,
        }}
        additionalMetaTags={[
          {
            name: "viewport",
            content: "width=device-width, initial-scale=1",
          },
          {
            name: "keywords",
            content:
              seo?.keywords ||
              "web development, mobile apps, digital solutions, software development, codeverta",
          },
          {
            name: "author",
            content: seo?.author || "Codeverta Team",
          },
          {
            name: "robots",
            content: `${seo?.noindex ? "noindex" : "index"},${
              seo?.nofollow ? "nofollow" : "follow"
            }`,
          },
          ...(seo?.additionalMetaTags || []),
        ]}
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/favicon.ico",
          },
          {
            rel: "apple-touch-icon",
            href: "/apple-touch-icon.png",
            sizes: "180x180",
          },
          {
            rel: "manifest",
            href: "/site.webmanifest",
          },
          ...(seo?.additionalLinkTags || []),
        ]}
      />
      <Banner/>
      <Navbar />
      {children}
      <WhatsAppButton/>
      <Footer />
    </>
  );
}
