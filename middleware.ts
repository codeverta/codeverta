import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const DEFAULT_LOCALE_PREFIX = "/id";
const DEFAULT_LOCALE = "id";
const LOCALE_COOKIE = "NEXT_LOCALE";
const CANONICAL_HOST = "www.codeverta.com";
const PRODUCTION_HOSTS = new Set(["codeverta.com", CANONICAL_HOST]);
const DEFAULT_ONLY_SECTIONS = new Set([
  "news",
  "cybersecurity",
  "ai",
  "gadget",
  "startups",
  "tutorials",
  "gallery",
  "app",
  "pdf",
  "course",
  "jasa-pembuatan-website-event",
]);
const PRODUCT_INDEX_LOCALES = new Set([
  "id",
  "en",
  "zh",
  "ja",
  "ko",
  "de",
  "fr",
  "es",
  "th",
]);

const SUPPORTED_LOCALES = new Set([
  "id",
  "en",
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
  "nl",
]);

const COUNTRY_LOCALES: Record<string, string> = {
  ID: "id",
  US: "en",
  GB: "en",
  IE: "en",
  CN: "zh",
  HK: "zh",
  MO: "zh",
  TW: "zh",
  JP: "ja",
  KR: "ko",
  MY: "ms",
  DE: "de",
  AT: "de",
  FR: "fr",
  ES: "es",
  MX: "es",
  AR: "es",
  SA: "ar",
  AE: "ar",
  QA: "ar",
  EG: "ar",
  IN: "hi",
  TH: "th",
  VN: "vi",
  RU: "ru",
  NL: "nl",
};

const EUROPEAN_COUNTRIES = new Set([
  "AL",
  "AD",
  "AM",
  "AT",
  "AZ",
  "BY",
  "BE",
  "BA",
  "BG",
  "HR",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "FR",
  "GE",
  "DE",
  "GR",
  "HU",
  "IS",
  "IE",
  "IT",
  "XK",
  "LV",
  "LI",
  "LT",
  "LU",
  "MT",
  "MD",
  "MC",
  "ME",
  "NL",
  "MK",
  "NO",
  "PL",
  "PT",
  "RO",
  "SM",
  "RS",
  "SK",
  "SI",
  "ES",
  "SE",
  "CH",
  "TR",
  "UA",
  "GB",
  "VA",
]);

const LANGUAGE_LOCALES: Record<string, string> = {
  id: "id",
  en: "en",
  zh: "zh",
  ja: "ja",
  ko: "ko",
  ms: "ms",
  de: "de",
  fr: "fr",
  es: "es",
  ar: "ar",
  hi: "hi",
  th: "th",
  vi: "vi",
  ru: "ru",
  nl: "nl",
};

function getCountry(request: NextRequest) {
  const country =
    request.headers.get("cf-ipcountry") ||
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cloudfront-viewer-country") ||
    request.headers.get("x-country-code");

  return country?.trim().toUpperCase() || null;
}

function getBrowserLocale(acceptLanguage: string | null) {
  if (!acceptLanguage) return null;

  const languages = acceptLanguage
    .split(",")
    .map((entry) => {
      const [tag, ...parameters] = entry.trim().split(";");
      const qualityParameter = parameters.find((value) =>
        value.trim().startsWith("q=")
      );
      const quality = qualityParameter
        ? Number.parseFloat(qualityParameter.trim().slice(2))
        : 1;
      return { tag, quality: Number.isNaN(quality) ? 0 : quality };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const { tag } of languages) {
    const normalizedTag = tag.toLowerCase();
    if (
      normalizedTag === "en" ||
      normalizedTag.startsWith("en-") ||
      normalizedTag.startsWith("en_")
    ) {
      return "en";
    }

    const language = normalizedTag.split("-")[0];
    if (LANGUAGE_LOCALES[language]) return LANGUAGE_LOCALES[language];
  }

  return null;
}

function detectLocale(request: NextRequest) {
  const savedLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (savedLocale && SUPPORTED_LOCALES.has(savedLocale)) return savedLocale;

  // Region is intentionally checked before Accept-Language: changing the VPN
  // or proxy region should affect first-time visitors even when the browser's
  // language remains set to Indonesian.
  const country = getCountry(request);
  if (country) {
    if (COUNTRY_LOCALES[country]) return COUNTRY_LOCALES[country];
    if (EUROPEAN_COUNTRIES.has(country)) return "en";
    if (country !== "XX" && country !== "T1") return "en";
  }

  return (
    getBrowserLocale(request.headers.get("accept-language")) || DEFAULT_LOCALE
  );
}

export function middleware(request: NextRequest) {
  // Use the standard URL implementation so query mutations are reflected in
  // the redirect target consistently across standalone/proxied deployments.
  const url = new URL(request.url);
  let normalizedPath = url.pathname;
  const forwardedHost = request.headers.get("x-forwarded-host");
  const hostHeader = forwardedHost || request.headers.get("host");
  const hostname = (hostHeader || url.hostname).split(":")[0].toLowerCase();
  let shouldRedirect = false;

  // Cloudflare Tunnel terminates HTTPS before this request reaches Next.js.
  // Only normalize the public hostname here; forcing the internal HTTP hop to
  // HTTPS causes an infinite redirect loop behind the tunnel.
  if (PRODUCTION_HOSTS.has(hostname)) {
    if (hostname !== CANONICAL_HOST) {
      url.hostname = CANONICAL_HOST;
      url.port = "";
      shouldRedirect = true;
    }
  }

  if (
    normalizedPath === "/en-US" ||
    normalizedPath.startsWith("/en-US/") ||
    normalizedPath === "/en-GB" ||
    normalizedPath.startsWith("/en-GB/")
  ) {
    normalizedPath = normalizedPath.replace(/^\/en-(?:US|GB)/, "/en");
    shouldRedirect = true;
  }

  if (
    normalizedPath === DEFAULT_LOCALE_PREFIX ||
    normalizedPath.startsWith(`${DEFAULT_LOCALE_PREFIX}/`)
  ) {
    normalizedPath = normalizedPath.replace(DEFAULT_LOCALE_PREFIX, "") || "/";
    shouldRedirect = true;
  }

  // Consolidate the former Indonesian route name in the same redirect hop.
  normalizedPath = normalizedPath.replace(
    /^(\/(?:en|zh|ja|ko|ms|de|fr|es|ar|hi|th|vi|ru|nl))?\/produk(?=\/|$)/,
    "$1/products"
  );
  if (normalizedPath !== url.pathname) shouldRedirect = true;

  const legacyToolPath = normalizedPath
    .replace(
      /\/image\/image-remove-background(?=\/|$)/,
      "/image/image-background-remover"
    )
    .replace(/\/image\/(?:image-editor|image-watermark)(?=\/|$)/, "/image")
    .replace(/\/image\/image-blur-face(?=\/|$)/, "/app/face-detection")
    .replace(
      /\/products\/coffee-shop-erp(?=\/|$)/,
      "/products/coffee-shop-pos-management-system"
    );
  if (legacyToolPath !== normalizedPath) {
    normalizedPath = legacyToolPath;
    shouldRedirect = true;
  }

  // Editorial sections currently contain Indonesian-only content. Locale
  // prefixes therefore point to the same document and must not be indexable.
  const pathSegments = normalizedPath.split("/").filter(Boolean);
  if (
    pathSegments.length === 2 &&
    SUPPORTED_LOCALES.has(pathSegments[0]) &&
    pathSegments[1] === "products" &&
    !PRODUCT_INDEX_LOCALES.has(pathSegments[0])
  ) {
    normalizedPath = "/products";
    shouldRedirect = true;
  }

  if (
    pathSegments.length >= 2 &&
    SUPPORTED_LOCALES.has(pathSegments[0]) &&
    DEFAULT_ONLY_SECTIONS.has(pathSegments[1])
  ) {
    normalizedPath = `/${pathSegments.slice(1).join("/")}`;
    shouldRedirect = true;
  }

  // Route-template URLs can leak from structured data or copied previews.
  normalizedPath =
    normalizedPath.replace(/\/(?:%5B[^/]+%5D|\[[^/]+\])\/?$/i, "") || "/";
  if (normalizedPath !== url.pathname) shouldRedirect = true;
  url.pathname = normalizedPath;

  // This legacy parameter is ignored by the page and only creates duplicates.
  if (url.searchParams.has("tag")) {
    url.searchParams.delete("tag");
    shouldRedirect = true;
  }

  // Remove the structured-data template URL previously crawled by Google.
  if (url.searchParams.has("s")) {
    url.searchParams.delete("s");
    shouldRedirect = true;
  }

  if (shouldRedirect) {
    const redirectOrigin = PRODUCTION_HOSTS.has(hostname)
      ? `https://${CANONICAL_HOST}`
      : url.origin;
    const redirectUrl = new URL(url.pathname, redirectOrigin);
    redirectUrl.search = url.searchParams.toString();
    return NextResponse.redirect(redirectUrl, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    { source: "/", locale: false },
    {
      source:
        "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
      locale: false,
    },
  ],
};
