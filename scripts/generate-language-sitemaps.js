// scripts/generate-language-sitemaps.js
const fs = require("fs");
const path = require("path");
const { i18n } = require("../next-i18next.config");

// Read the main sitemap
const readSitemap = () => {
  const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml");
  const sitemapContent = fs.readFileSync(sitemapPath, "utf8");
  return sitemapContent;
};

// Create a sitemap directory if it doesn't exist
const sitemapDir = path.join(process.cwd(), "public", "sitemaps");
if (!fs.existsSync(sitemapDir)) {
  fs.mkdirSync(sitemapDir, { recursive: true });
}

// Generate language-specific sitemaps
const generateLanguageSitemaps = () => {
  const mainSitemap = readSitemap();

  // Generate a sitemap for each language
  i18n.locales.forEach((locale) => {
    // Create a sitemap that only includes URLs for this language
    let langSitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    langSitemap +=
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ';
    langSitemap += 'xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

    // Extract all URLs from the main sitemap
    const urlRegex = /<url>([\s\S]*?)<\/url>/g;
    let match;
    while ((match = urlRegex.exec(mainSitemap)) !== null) {
      const urlContent = match[1];

      // Check if this URL is for our current language
      if (
        urlContent.includes(`<loc>`) &&
        (urlContent.includes(`/${locale}/`) ||
          urlContent.includes(`/${locale}"`) ||
          urlContent.includes(`/${locale}<`))
      ) {
        langSitemap += `<url>${urlContent}</url>\n`;
      }
    }

    langSitemap += "</urlset>";

    // Write the language-specific sitemap
    fs.writeFileSync(
      path.join(sitemapDir, `sitemap-${locale}.xml`),
      langSitemap
    );

    console.log(`Generated sitemap for ${locale}`);
  });

  // Create a sitemap index file
  let sitemapIndex = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemapIndex +=
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Add each language sitemap to the index
  i18n.locales.forEach((locale) => {
    sitemapIndex += "  <sitemap>\n";
    sitemapIndex += `    <loc>${
      process.env.SITE_URL || "https://souvenirlilin.id"
    }/sitemaps/sitemap-${locale}.xml</loc>\n`;
    sitemapIndex += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
    sitemapIndex += "  </sitemap>\n";
  });

  sitemapIndex += "</sitemapindex>";

  // Write the sitemap index
  fs.writeFileSync(
    path.join(process.cwd(), "public", "sitemap-index.xml"),
    sitemapIndex
  );

  console.log("Generated sitemap index");
};

// Run the generation
generateLanguageSitemaps();
