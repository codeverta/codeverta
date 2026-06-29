// next-sitemap.config.js
// Updated: adds hreflang alternate links + additional sitemap entries for blog articles
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://codeverta.com",
  generateRobotsTxt: true,
  sitemapSize: 5000,

  // Add alternate language refs for every page
  alternateRefs: [
    { href: "https://codeverta.com", hreflang: "id" },
    { href: "https://codeverta.com/en-US", hreflang: "en-US" },
    { href: "https://codeverta.com/en-GB", hreflang: "en-GB" },
    { href: "https://codeverta.com/zh", hreflang: "zh" },
    { href: "https://codeverta.com/ja", hreflang: "ja" },
    { href: "https://codeverta.com/ko", hreflang: "ko" },
    { href: "https://codeverta.com/ms", hreflang: "ms" },
    { href: "https://codeverta.com/de", hreflang: "de" },
    { href: "https://codeverta.com/fr", hreflang: "fr" },
    { href: "https://codeverta.com/es", hreflang: "es" },
    { href: "https://codeverta.com/ar", hreflang: "ar" },
    { href: "https://codeverta.com/hi", hreflang: "hi" },
    { href: "https://codeverta.com/th", hreflang: "th" },
    { href: "https://codeverta.com/vi", hreflang: "vi" },
    { href: "https://codeverta.com/ru", hreflang: "ru" },
    { href: "https://codeverta.com/nl", hreflang: "nl" },
    { href: "https://codeverta.com", hreflang: "x-default" },
  ],

  // Priority and changefreq for different content types
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
    // Blog/tutorial articles (problem-oriented content)
    else if (path.startsWith("/tutorials")) {
      priority = 0.8;
      changefreq = "weekly";
    }
    // News articles
    else if (path.startsWith("/news")) {
      priority = 0.6;
      changefreq = "daily";
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
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
