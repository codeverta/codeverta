import React, { useEffect } from "react";
import { NextSeo } from "next-seo";
import Footer from "components/Footer";
import { useRouter } from "next/router";
import Navbar from "@/components/navbar";
import WhatsAppButton from "../WhatsappButton";
import Banner from "../Banner";
import Head from "next/head";

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
      seo?.ogTitle ||
      seo?.title ||
      "Codeverta | Jasa Pembuatan Website, Aplikasi, LMS, Sistem di Jogja",
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

  const ldJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.codeverta.com/#organization",
        name: "Codeverta",
        url: "https://www.codeverta.com/",
        logo: "https://www.codeverta.com/images/logo.png",
        sameAs: [
          "https://www.facebook.com/codeverta",
          "https://twitter.com/codeverta",
          "https://www.instagram.com/codeverta.id/",
          "https://www.linkedin.com/company/codeverta/",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+6285601347820",
          contactType: "Customer Service",
          areaServed: "ID",
          availableLanguage: "id",
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "Jl Kaliurang KM 9.3",
          addressLocality: "Ngaglik",
          addressRegion: "DIY",
          postalCode: "55581",
          addressCountry: "ID",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://www.codeverta.com/#website",
        url: "https://www.codeverta.com/",
        name: "Codeverta | Jasa Pembuatan Website, Aplikasi, LMS, Sistem di Jogja",
        description:
          "Codeverta menyediakan jasa pembuatan, perbaikan, pengembangan website profesional dan layanan IT untuk mendorong pertumbuhan bisnis Anda di era digital.",
        publisher: {
          "@id": "https://www.codeverta.com/#organization",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: "https://www.codeverta.com/?s={search_term_string}",
          queryInput: "required name=search_term_string",
        },
        inLanguage: "id-ID",
      },
      {
        "@type": "WebPage",
        "@id": "https://www.codeverta.com/#webpage",
        url: "https://www.codeverta.com/",
        name: "Jasa Pembuatan Website, Aplikasi & Layanan IT di Jogja | Codeverta",
        isPartOf: {
          "@id": "https://www.codeverta.com/#website",
        },
        about: {
          "@id": "https://www.codeverta.com/#organization",
        },
        description:
          "Temukan jasa pembuatan website, aplikasi, LMS, dan sistem IT terbaik di Yogyakarta. Codeverta menawarkan solusi digital profesional untuk UMKM hingga Enterprise. Konsultasi gratis, garansi, dan dukungan aftersales.",
        inLanguage: "id-ID",
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: "https://www.codeverta.com/images/og-default.jpg",
          width: 1200,
          height: 630,
          caption: "Dashboard layanan Codeverta",
        },
      },
      {
        "@type": "Service",
        "@id": "https://www.codeverta.com/#service-website-development",
        name: "Jasa Pembuatan Website Profesional",
        serviceType: "Web Development",
        description:
          "Kami merancang dan membangun website modern, responsif, dan SEO-friendly yang dioptimalkan untuk performa dan pengalaman pengguna di semua perangkat. Cocok untuk profil perusahaan, e-commerce, hingga sistem kustom.",
        provider: {
          "@id": "https://www.codeverta.com/#organization",
        },
        areaServed: {
          "@type": "Place",
          name: "Yogyakarta",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Yogyakarta",
            addressCountry: "ID",
          },
        },
        offers: {
          "@type": "Offer",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            priceType: "Estimate",
            priceCurrency: "IDR",
            minPrice: 1500000,
          },
          description: "Mulai dari Rp 1,5 Juta untuk paket basic.",
          url: "https://www.codeverta.com/#pricing",
        },
      },
      {
        "@type": "Service",
        "@id": "https://www.codeverta.com/#service-seo-optimization",
        name: "Optimasi SEO & Performa Website",
        serviceType: "SEO & Performance Optimization",
        description:
          "Tingkatkan peringkat website Anda di mesin pencari seperti Google, dan pastikan website Anda cepat, aman, serta memberikan pengalaman pengguna terbaik dengan optimasi teknis dan konten.",
        provider: {
          "@id": "https://www.codeverta.com/#organization",
        },
        areaServed: {
          "@type": "Place",
          name: "Indonesia",
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "IDR",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            priceType: "Estimate",
          },
        },
      },
      {
        "@type": "Service",
        "@id": "https://www.codeverta.com/#service-maintenance",
        name: "Perbaikan & Maintenance Website",
        serviceType: "Website Maintenance & Support",
        description:
          "Mengatasi bug, error, pembaruan rutin, backup data, dan monitoring keamanan untuk menjaga website Anda selalu berjalan optimal dan aman dari ancaman siber.",
        provider: {
          "@id": "https://www.codeverta.com/#organization",
        },
        areaServed: {
          "@type": "Place",
          name: "Indonesia",
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "IDR",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            priceType: "Estimate",
          },
        },
      },
      {
        "@type": "Service",
        "@id": "https://www.codeverta.com/#service-it-support",
        name: "Layanan IT Support",
        serviceType: "IT Support & Solutions",
        description:
          "Menyediakan solusi komprehensif untuk semua masalah teknis IT Anda, mulai dari troubleshooting hardware, manajemen jaringan, hingga konsultasi infrastruktur IT.",
        provider: {
          "@id": "https://www.codeverta.com/#organization",
        },
        areaServed: {
          "@type": "Place",
          name: "Yogyakarta",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Yogyakarta",
            addressCountry: "ID",
          },
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "IDR",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            priceType: "Estimate",
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Beranda",
            item: "https://www.codeverta.com/",
          },
        ],
      },
    ],
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
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
        />
      </Head>
      {/* <Banner /> */}
      <Navbar />
      {children}
      <WhatsAppButton />
      <Footer />
    </>
  );
}
