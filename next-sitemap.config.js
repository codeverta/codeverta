// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://bikinwebsitejogja.com",
  generateRobotsTxt: true,
  // Create a sitemap per language
  sitemapSize: 5000,
};
