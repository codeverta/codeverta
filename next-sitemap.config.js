// next-sitemap.config.js
// Updated: adds dynamic path-specific hreflang alternate links for Next.js i18n
const nextI18nConfig = require("./next-i18next.config");

const siteUrl = process.env.SITE_URL || "https://codeverta.com";

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: siteUrl,
  generateRobotsTxt: true,
  sitemapSize: 5000,

  // Priority and changefreq for different content types + dynamic hreflang generator
  transform: async (config, path) => {
    // Default priority
    let priority = 0.7;
    let changefreq = "monthly";

    // Homepage
    if (path === "/") {
      priority = 1.0;
      changefreq = "weekly";
    }
    // Product pages
    else if (path.startsWith("/produk")) {
      priority = 0.9;
      changefreq = "weekly";
    }
    // Industry pages
    else if (path.startsWith("/industry")) {
      priority = 0.8;
      changefreq = "monthly";
    }
    // Blog/tutorial articles
    else if (path.startsWith("/tutorials") || path.startsWith("/blog")) {
      priority = 0.8;
      changefreq = "weekly";
    }
    // News articles
    else if (path.startsWith("/news")) {
      priority = 0.6;
      changefreq = "daily";
    }

    // Ensure clean path starting with /
    const cleanPath = path.startsWith("/") ? path : `/${path}`;

    // Extract raw route without locale prefix if present
    let routePath = cleanPath;
    for (const loc of nextI18nConfig.i18n.locales) {
      if (
        loc !== nextI18nConfig.i18n.defaultLocale &&
        (routePath === `/${loc}` || routePath.startsWith(`/${loc}/`))
      ) {
        routePath = routePath.substring(loc.length + 1) || "/";
        break;
      }
    }

    // Generate alternateRefs using siteUrl + locale path
    const alternateRefs = nextI18nConfig.i18n.locales.map((locale) => {
      const isDefault = locale === nextI18nConfig.i18n.defaultLocale;
      const localePath = isDefault
        ? routePath
        : `/${locale}${routePath === "/" ? "" : routePath}`;
      return {
        href: `${siteUrl}${localePath}`,
        hreflang: locale,
        hrefIsAbsolute: true,
      };
    });

    // Add x-default
    alternateRefs.push({
      href: `${siteUrl}${routePath}`,
      hreflang: "x-default",
      hrefIsAbsolute: true,
    });

    return {
      loc: cleanPath,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
      alternateRefs,
    };
  },

  // Exclude admin/internal pages from sitemap
  exclude: [
    "/blog-form",
    "/short",
    "/picker",
    "/qr",
    "/editor",
    "/gallery",
    "/download",
    "/image/*",
    "/pdf/*",
    "/games/*",
    "/whatsappRedirect",
  ],
};
