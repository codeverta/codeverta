import Head from "next/head";
import { useRouter } from "next/router";
import { buildSeoMeta, getAlternateLinks, SITE_NAME } from "@/lib/seo";

export default function SeoHead({
  title = "Codeverta – Solusi Digital Bisnis Anda",
  description = "Platform profesional untuk pembuatan E-commerce, ERP, POS, HRMS, dan sistem digital lainnya.",
  url,
  image = "https://codeverta.com/og-image.png",
  keywords = "",
}) {
  const router = useRouter();
  const seo = buildSeoMeta({
    locale: router.locale,
    path: router.asPath,
    title,
    description,
    keywords,
    image,
    canonical: url,
  });

  return (
    <Head>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      {seo.keywords ? <meta name="keywords" content={seo.keywords} /> : null}
      <meta httpEquiv="content-language" content={seo.locale} />

      {/* Canonical */}
      <link rel="canonical" href={seo.canonical} />
      {getAlternateLinks(seo.path).map((link) => (
        <link
          key={link.hrefLang}
          rel={link.rel}
          hrefLang={link.hrefLang}
          href={link.href}
        />
      ))}

      {/* Open Graph */}
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={seo.ogLocale} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      {/* Robots */}
      <meta name="robots" content="index, follow" />
    </Head>
  );
}
