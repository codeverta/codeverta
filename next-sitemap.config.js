// next-sitemap.config.js
const { i18n } = require("./next-i18next.config");

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://codeverta.com",
  generateRobotsTxt: true,
  // Generate a sitemap for each language
  generateIndexSitemap: false,
  alternateRefs: i18n.locales.map((locale) => ({
    href: `${process.env.SITE_URL || "https://codeverta.com"}/${locale}`,
    hreflang: locale,
  })),
  transform: async (config, path) => {
    // Custom transform function to add alternate links for each page

    // Skip if it's a non-page path
    if (
      path.includes("/_next/") ||
      path.includes("/api/") ||
      path.includes(".xml") ||
      path.includes(".txt")
    ) {
      return null;
    }

    // Extract path without locale prefix
    const pathWithoutLocale = i18n.locales.some(
      (locale) => path.startsWith(`/${locale}/`) || path === `/${locale}`
    )
      ? path.split("/").slice(2).join("/")
      : path;

    // Create alternate refs for all languages
    const alternateRefs = i18n.locales.map((locale) => ({
      href: `${config.siteUrl}/${locale}${
        pathWithoutLocale ? `/${pathWithoutLocale}` : ""
      }`,
      hreflang: locale,
    }));

    // Return the transformed path with language alternatives
    return {
      loc: path,
      alternateRefs,
      // You can also customize lastmod, changefreq, priority here
      changefreq: "daily",
      priority: 0.7,
    };
  },
  // Create a sitemap per language
  sitemapSize: 5000,
};
