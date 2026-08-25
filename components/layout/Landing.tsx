import React, { useEffect } from "react";
import { NextSeo } from "next-seo";
import Footer from "components/Footer";
import { useRouter } from "next/router";
import Navbar from "@/components/navbar";
import WhatsAppButton from "../WhatsappButton";
import Banner from "../Banner";
import Head from "next/head";
import CookieConsent from "@/components/CookieConsent";
import {
  buildSeoMeta,
  getAlternateLinks,
  isIndexableLocale,
  SITE_NAME,
  SITE_URL,
  SupportedLocale,
} from "@/lib/seo";
import { getIndustryMarket } from "@/lib/industry-markets";

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
  localizedPaths?: Record<string, string>;
  availableLocales?: readonly SupportedLocale[];
}

export default function Landing({
  children,
  seo,
  localizedPaths,
  availableLocales,
}: Props) {
  const router = useRouter();
  const pageSEO = buildSeoMeta({
    locale: router.locale,
    path: router.asPath,
    title: seo?.title,
    description: seo?.description,
    keywords: seo?.keywords,
    image: seo?.ogImage || seo?.twitterImage,
    canonical: seo?.canonical,
  });
  const locale = pageSEO.locale;
  const market = getIndustryMarket(locale);
  const canonicalUrl = pageSEO.canonical;
  const indexableLocale = isIndexableLocale(router.locale, router.asPath);

  // Default SEO values
  const defaultSEO = {
    title: pageSEO.title,
    description: pageSEO.description,
    ogTitle: seo?.ogTitle || pageSEO.title,
    ogDescription: seo?.ogDescription || pageSEO.description,
    ogImage: seo?.ogImage || pageSEO.image,
    ogType: seo?.ogType || "website",
    twitterCard: seo?.twitterCard || "summary_large_image",
    twitterTitle: seo?.twitterTitle || pageSEO.title,
    twitterDescription: seo?.twitterDescription || pageSEO.description,
    twitterImage: seo?.twitterImage || seo?.ogImage || pageSEO.image,
  };

  const ldJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.codeverta.com/#organization",
        name: "Codeverta",
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/images/logo.png`,
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
          areaServed: market.countryCode,
          availableLanguage: locale,
        },
        areaServed: {
          "@type": "Country",
          name: market.country,
        },
        address:
          locale === "id"
            ? {
                "@type": "PostalAddress",
                streetAddress: "Jl Kaliurang KM 9.3",
                addressLocality: "Ngaglik",
                addressRegion: "DIY",
                postalCode: "55581",
                addressCountry: "ID",
              }
            : undefined,
      },
      {
        "@type": "WebSite",
        "@id": "https://www.codeverta.com/#website",
        url: `${SITE_URL}/`,
        name: pageSEO.title,
        description: pageSEO.description,
        publisher: {
          "@id": "https://www.codeverta.com/#organization",
        },
        inLanguage: locale,
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: pageSEO.title,
        isPartOf: {
          "@id": "https://www.codeverta.com/#website",
        },
        about: {
          "@id": "https://www.codeverta.com/#organization",
        },
        description: pageSEO.description,
        inLanguage: locale,
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: pageSEO.image,
          width: 1200,
          height: 630,
          caption: pageSEO.title,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: SITE_NAME,
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
        noindex={seo?.noindex || !indexableLocale}
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
          site_name: SITE_NAME,
          locale: pageSEO.ogLocale,
        }}
        twitter={{
          handle: "@codeverta",
          site: "@codeverta",
          cardType: defaultSEO.twitterCard,
        }}
        languageAlternates={getAlternateLinks(
          pageSEO.path,
          availableLocales,
          localizedPaths
        ).map(({ hrefLang, href }) => ({ hrefLang, href }))}
        additionalMetaTags={[
          {
            name: "viewport",
            content: "width=device-width, initial-scale=1",
          },
          {
            httpEquiv: "content-language",
            content: locale,
          } as any,
          {
            name: "keywords",
            content: pageSEO.keywords,
          },
          {
            name: "author",
            content: seo?.author || SITE_NAME,
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
          ...(seo?.additionalLinkTags || []).filter(
            (link) => link.rel !== "alternate"
          ),
        ]}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
        />
      </Head>
      {/* <Banner /> */}
      <Navbar localizedPaths={localizedPaths} />
      {children}
      <CookieConsent />
      <WhatsAppButton />
      <Footer />
    </>
  );
}
