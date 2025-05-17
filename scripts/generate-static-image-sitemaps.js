// Then create this file as a standalone generator for static builds:
// scripts/generate-static-sitemaps.js
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://souvenirlilin.rabihutomo.com/api/v1";
const API_KEY = process.env.API_KEY;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://souvenirlilin.id";

// Check if a path is an image file
const isImageFile = (filePath) => {
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
  return imageExtensions.some((ext) => filePath.toLowerCase().includes(ext));
};

// Generate individual image sitemap
async function generateImageSitemap() {
  try {
    // Create headers if needed
    const headers = API_KEY ? { Authorization: `Bearer ${API_KEY}` } : {};

    // Fetch data from API
    const response = await axios.get(`${API_URL}/documents`, { headers });

    // Filter for images only
    const imageFiles = response.data.data.filter((file) =>
      isImageFile(file.attributes.filename)
    );

    // Create the XML structure
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${SITE_URL}/gallery</loc>`;

    // Add each image
    for (const file of imageFiles) {
      const imageUrl = file.attributes.filename;
      const imageTitle = file.attributes.name || "Gallery image";

      xml += `
    <image:image>
      <image:loc>${imageUrl}</image:loc>
      <image:title>${imageTitle}</image:title>
    </image:image>`;
    }

    // Close the tags
    xml += `
  </url>
</urlset>`;

    return xml;
  } catch (error) {
    console.error("Error generating image sitemap:", error);
    throw error;
  }
}

// Generate main sitemap that includes reference to image sitemap
function generateMainSitemap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/image-sitemap.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
  <!-- Add other sitemaps here if needed -->
</sitemapindex>`;
}

async function run() {
  try {
    // Directory to save the sitemaps
    const publicDir = path.join(process.cwd(), "public");

    // Ensure the directory exists
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Generate and save the image sitemap
    const imageSitemap = await generateImageSitemap();
    fs.writeFileSync(path.join(publicDir, "image-sitemap.xml"), imageSitemap);
    console.log("Generated image-sitemap.xml");

    // Generate and save the main sitemap
    const mainSitemap = generateMainSitemap();
    fs.writeFileSync(path.join(publicDir, "sitemap.xml"), mainSitemap);
    console.log("Generated sitemap.xml");

    console.log("Sitemap generation complete!");
  } catch (error) {
    console.error("Error during sitemap generation:", error);
    process.exit(1);
  }
}

// Run the script
run();
