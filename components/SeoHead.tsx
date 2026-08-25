import Head from "next/head";
import { useRouter } from "next/router";
import {
  buildSeoMeta,
  getAlternateLinks,
  isIndexableLocale,
  SITE_NAME,
  SITE_URL,
  type SupportedLocale,
} from "@/lib/seo";

type SeoHeadProps = {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  keywords?: string;
  includeOfficeLocation?: boolean;
  availableLocales?: readonly SupportedLocale[];
};

export default function SeoHead({
  title = "Codeverta – Solusi Digital Bisnis Anda",
  description = "Platform profesional untuk pembuatan E-commerce, ERP, POS, HRMS, dan sistem digital lainnya.",
  url,
  image = `${SITE_URL}/og-image.png`,
  keywords = "",
  includeOfficeLocation = true,
  availableLocales,
}: SeoHeadProps) {
  const router = useRouter();
  const seo = buildSeoMeta({
    locale: router.locale,
    path: router.asPath,
    title,
    description,
    keywords,
    image,
    canonical: url,
    includeOfficeLocation,
  });
  const indexable = isIndexableLocale(router.locale, router.asPath);

  return (
    <Head>
      <title>{seo.title}</title>
      <meta key="description" name="description" content={seo.description} />
      {seo.keywords ? (
        <meta key="keywords" name="keywords" content={seo.keywords} />
      ) : null}
      <meta
        key="content-language"
        httpEquiv="content-language"
        content={seo.locale}
      />

      {/* Canonical */}
      <link key="canonical" rel="canonical" href={seo.canonical} />
      {getAlternateLinks(seo.path, availableLocales).map((alternate) => (
        <link
          key={`alternate-${alternate.hrefLang}`}
          rel={alternate.rel}
          hrefLang={alternate.hrefLang}
          href={alternate.href}
        />
      ))}
      {/* Open Graph */}
      <meta key="og:title" property="og:title" content={seo.title} />
      <meta
        key="og:description"
        property="og:description"
        content={seo.description}
      />
      <meta key="og:image" property="og:image" content={seo.image} />
      <meta key="og:url" property="og:url" content={seo.canonical} />
      <meta key="og:type" property="og:type" content="website" />
      <meta key="og:site_name" property="og:site_name" content={SITE_NAME} />
      <meta key="og:locale" property="og:locale" content={seo.ogLocale} />

      {/* Twitter */}
      <meta
        key="twitter:card"
        name="twitter:card"
        content="summary_large_image"
      />
      <meta key="twitter:title" name="twitter:title" content={seo.title} />
      <meta
        key="twitter:description"
        name="twitter:description"
        content={seo.description}
      />
      <meta key="twitter:image" name="twitter:image" content={seo.image} />

      {/* Robots */}
      <meta
        key="robots"
        name="robots"
        content={indexable ? "index,follow" : "noindex,follow"}
      />
    </Head>
  );
}
