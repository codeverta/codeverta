// Google Analytics 4. Configure NEXT_PUBLIC_GA_ID with the existing web stream
// ID; no property or stream is created by the application.

import { useEffect } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const SAFE_ROUTE_SEGMENT = new RegExp("^[\\p{L}\\p{N}._~-]+$", "u");

export const ANALYTICS_PRODUCTS = [
  "erp",
  "wms",
  "pos",
  "gym_management",
  "event_website",
  "custom_software",
] as const;

export type AnalyticsProduct = (typeof ANALYTICS_PRODUCTS)[number];
export type AnalyticsIntent = "demo" | "general";
export type AnalyticsCta = "request_demo" | "pricing_scope" | "contact";

const LOCALES = [
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
] as const;

const STATIC_ROUTE_ROOTS = new Set([
  "500",
  "_offline",
  "about",
  "app",
  "article",
  "blog",
  "blog-form",
  "careers",
  "contact",
  "course",
  "cybersecurity",
  "editor",
  "faq",
  "favicon-generator",
  "games",
  "image",
  "industry",
  "invoice-generator",
  "jasa-pembuatan-website-event",
  "pdf",
  "pelatihan",
  "picker",
  "posts",
  "privacy-policy",
  "products",
  "prompting",
  "qr",
  "short",
  "terms",
  "tutorials",
  "whatsappredirect",
]);

export function isAnalyticsProduct(value: unknown): value is AnalyticsProduct {
  return (
    typeof value === "string" &&
    ANALYTICS_PRODUCTS.includes(value as AnalyticsProduct)
  );
}

export function isAnalyticsIntent(value: unknown): value is AnalyticsIntent {
  return value === "demo" || value === "general";
}

function getPathname(path?: string) {
  if (typeof window === "undefined" && !path) return "/";
  try {
    return new URL(path || window.location.pathname, "https://codeverta.com")
      .pathname;
  } catch {
    return "/";
  }
}

export function getAnalyticsProductFromPath(
  path?: string
): AnalyticsProduct | undefined {
  const pathname = getPathname(path).toLowerCase();
  const pathSegments = pathname.split("/").filter(Boolean);
  if (
    pathSegments.length > 0 &&
    LOCALES.includes(pathSegments[0] as (typeof LOCALES)[number])
  ) {
    pathSegments.shift();
  }

  const productIndex = pathSegments.indexOf("products");
  const productSlug =
    productIndex >= 0 ? pathSegments[productIndex + 1] || "" : "";
  if (
    productSlug.includes("enterprise-erp-system") ||
    productSlug === "erp" ||
    productSlug.includes("custom-erp")
  ) {
    return "erp";
  }
  if (
    productSlug.includes("warehouse-management-system") ||
    productSlug.includes("warehouse-inventory-control")
  ) {
    return "wms";
  }
  if (productSlug.includes("point-of-sale")) return "pos";
  if (productSlug.includes("gym-management-system")) return "gym_management";

  const blogIndex = pathSegments.indexOf("blog");
  const blogSlug = blogIndex >= 0 ? pathSegments[blogIndex + 1] || "" : "";
  if (blogSlug.includes("erp")) return "erp";
  if (/warehouse|\bwms\b|gudang|inventory|stock-opname|fefo/.test(blogSlug)) {
    return "wms";
  }

  if (pathSegments.includes("jasa-pembuatan-website-event")) {
    return "event_website";
  }
  return undefined;
}

export function getAnalyticsProductFromLabel(
  label?: string
): AnalyticsProduct | undefined {
  const normalized = label?.toLowerCase() || "";
  if (/\bwms\b|warehouse|gudang/.test(normalized)) return "wms";
  if (/\berp\b|enterprise resource planning/.test(normalized)) return "erp";
  if (/point of sale|\bpos\b|kasir/.test(normalized)) return "pos";
  if (/gym|fitness/.test(normalized)) return "gym_management";
  if (/event|acara/.test(normalized)) return "event_website";
  return undefined;
}

export function getAnalyticsLocale(locale?: string | null) {
  const candidate =
    locale ||
    (typeof document !== "undefined" ? document.documentElement.lang : "id");
  return LOCALES.includes(candidate as (typeof LOCALES)[number])
    ? candidate
    : "id";
}

/** Keep public slugs for reports while removing queries and PII-like segments. */
export function getSafeAnalyticsSource(path?: string) {
  const incomingSegments = getPathname(path).split("/").filter(Boolean);
  const hasLocalePrefix =
    incomingSegments.length > 0 &&
    LOCALES.includes(incomingSegments[0] as (typeof LOCALES)[number]);
  const localePrefix = hasLocalePrefix ? incomingSegments.shift() : undefined;
  const routeRoot = incomingSegments[0]?.toLowerCase();

  // Next.js has a catch-all [shortCode] page. Unknown roots can be arbitrary
  // codes or visitor-provided values, so don't send those segments to GA.
  if (routeRoot && !STATIC_ROUTE_ROOTS.has(routeRoot)) {
    return `/${localePrefix ? `${localePrefix}/` : ""}:route`;
  }

  const safeSegments = incomingSegments.map((segment) => {
    let decoded = segment;
    try {
      decoded = decodeURIComponent(segment);
    } catch {
      // Retain the encoded route value if it cannot be decoded.
    }
    if (
      decoded.length > 120 ||
      /@|\d{6,}/.test(decoded) ||
      !SAFE_ROUTE_SEGMENT.test(decoded)
    ) {
      return ":redacted";
    }
    return decoded.toLowerCase();
  });
  const allSegments = localePrefix
    ? [localePrefix, ...safeSegments]
    : safeSegments;
  return `/${allSegments.join("/")}`.slice(0, 200) || "/";
}

function safeEventParams(params: Record<string, string | number>) {
  const safe: Record<string, string | number> = {};
  const allowedValues: Record<string, readonly string[]> = {
    method: ["contact_form", "cta", "floating_button", "faq"],
    product: ANALYTICS_PRODUCTS,
    intent: ["demo", "general"],
    cta: ["request_demo", "pricing_scope", "contact"],
    service: ["web", "mobile", "system", "erp", "wms", "uiux", "unspecified"],
    transport_type: ["beacon"],
  };

  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "number" && Number.isFinite(value)) {
      if (key === "value") safe[key] = value;
      continue;
    }
    if (typeof value !== "string") continue;
    if (key === "source" || key === "page_path") {
      safe[key] = getSafeAnalyticsSource(value);
    } else if (key === "page_location") {
      safe[key] = `${window.location.origin}${getSafeAnalyticsSource(value)}`;
    } else if (allowedValues[key]?.includes(value)) {
      safe[key] = value;
    }
  }
  return safe;
}

export function trackEvent(
  action: string,
  params: Record<string, string | number> = {},
  locale?: string | null
) {
  if (typeof window === "undefined" || !(window as any).gtag) return;

  const source = getSafeAnalyticsSource();
  const product = getAnalyticsProductFromPath();
  const eventContext = {
    source,
    page_path: source,
    page_location: `${window.location.origin}${source}`,
    locale: getAnalyticsLocale(locale),
    ...(product ? { product } : {}),
  };
  (window as any).gtag("event", action, {
    ...eventContext,
    ...safeEventParams(params),
  });
}

export function GAScript() {
  useEffect(() => {
    if (!GA_ID || typeof window === "undefined") return;

    const dataLayer = ((window as any).dataLayer =
      (window as any).dataLayer || []);
    (window as any).gtag =
      (window as any).gtag ||
      function gtag() {
        // Keep the queue format identical to Google's official snippet.
        dataLayer.push(arguments);
      };

    const gtag = (window as any).gtag as (...args: any[]) => void;
    gtag("js", new Date());
    // Keep the existing automatic initial and history-based page views.
    gtag("config", GA_ID);

    if (!document.querySelector(`script[data-codeverta-ga="${GA_ID}"]`)) {
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      script.dataset.codevertaGa = GA_ID;
      document.head.appendChild(script);
    }
  }, []);

  return null;
}
