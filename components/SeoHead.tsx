import Head from "next/head";
import { useRouter } from "next/router";

const SITE_URL = "https://www.codeverta.com";
const SUPPORTED_LOCALES = [
  "id",
  "en-US",
  "en-GB",
  "zh",
  "ja",
  "ko",
  "ms",
  "de",
  "fr",
  "es",
  "ar",
  "hi",
  "th",
  "vi",
  "ru",
];

const LOCALE_TO_OG_LOCALE = {
  id: "id_ID",
  "en-US": "en_US",
  "en-GB": "en_GB",
  zh: "zh_CN",
  ja: "ja_JP",
  ko: "ko_KR",
  ms: "ms_MY",
  de: "de_DE",
  fr: "fr_FR",
  es: "es_ES",
  ar: "ar",
  hi: "hi_IN",
  th: "th_TH",
  vi: "vi_VN",
  ru: "ru_RU",
};

function getLocalizedUrl(locale: string, path: string) {
  const cleanPath = path.split("?")[0].replace(/^\/+/, "");
  return `${SITE_URL}/${locale}${cleanPath ? `/${cleanPath}` : ""}`;
}

export default function SeoHead({
  title = "Codeverta – Solusi Digital Bisnis Anda",
  description = "Platform profesional untuk pembuatan E-commerce, ERP, POS, HRMS, dan sistem digital lainnya.",
  url,
  image = "https://codeverta.com/og-image.png",
  keywords = "",
}) {
  const router = useRouter();
  const locale = router.locale || "id";
  const path = router.asPath || "/";
  const canonicalUrl = url || getLocalizedUrl(locale, path);

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <meta httpEquiv="content-language" content={locale} />

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />
      {SUPPORTED_LOCALES.map((supportedLocale) => (
        <link
          key={supportedLocale}
          rel="alternate"
          hrefLang={supportedLocale}
          href={getLocalizedUrl(supportedLocale, path)}
        />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={getLocalizedUrl("id", path)}
      />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Codeverta" />
      <meta
        property="og:locale"
        content={LOCALE_TO_OG_LOCALE[locale] || locale}
      />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Robots */}
      <meta name="robots" content="index, follow" />
    </Head>
  );
}
