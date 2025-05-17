// scripts/enhance-markdown.js
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const slugify = require("slugify"); // You'll need to install this package

const postsDirectory = path.join(process.cwd(), "blog");

// Extract keywords from content using simple frequency analysis
function extractKeywords(content, title) {
  // Remove markdown syntax and convert to lowercase
  const cleanContent = content.replace(/[#*`_\[\]()]/g, "").toLowerCase();

  // Count word frequency (excluding common words)
  const words = cleanContent.split(/\s+/);
  const wordCount = {};
  const commonWords = new Set([
    "dan",
    "itu",
    "ke",
    "sebuah",
    "dari",
    "untuk",
    "di",
    "adalah",
    "pada",
    "bahwa",
    "oleh",
    "ini",
    "dengan",
    "saya",
    "kamu",
    "itu",
    "tidak",
    "atau",
    "jadi",
    "adalah",
    "dari",
    "di",
    "sebagai",
    "punya",
    "memiliki",
    "lebih",
    "sebuah",
    "adalah",
    "kami",
    "akan",
    "bisa",
    "semua",
    "mereka",
    "milik mereka",
    "telah",
    "mungkin",
    "akan",
    "tentang",
    "bagaimana",
  ]);

  words.forEach((word) => {
    if (word.length > 3 && !commonWords.has(word)) {
      wordCount[word] = (wordCount[word] || 0) + 1;
    }
  });

  // Sort by frequency
  const sortedWords = Object.entries(wordCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map((entry) => entry[0]);

  // Add title words as keywords too
  const titleWords = title
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 3 && !commonWords.has(word));

  // Combine and remove duplicates
  return [...new Set([...titleWords, ...sortedWords])];
}

// Generate a good meta description from the content
function generateDescription(content, maxLength = 160) {
  // Find the first substantial paragraph
  const paragraphs = content.split("\n\n");
  let firstParagraph = "";

  for (const paragraph of paragraphs) {
    // Skip headings, code blocks, etc.
    if (
      !paragraph.startsWith("#") &&
      !paragraph.startsWith("```") &&
      !paragraph.startsWith("---") &&
      paragraph.length > 40
    ) {
      firstParagraph = paragraph;
      break;
    }
  }

  // Clean up markdown syntax
  const cleaned = firstParagraph
    .replace(/[#*`_\[\]()]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  // Truncate to desired length
  if (cleaned.length <= maxLength) {
    return cleaned;
  }

  // Find a good breaking point
  const truncated = cleaned.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");

  return truncated.substring(0, lastSpace) + "...";
}

// Enhance a single markdown file
function enhanceMarkdownFile(filePath) {
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  // Check if we need to update
  let needsUpdate = false;
  const updatedData = { ...data };

  // Ensure we have a title
  if (!updatedData.title) {
    // Extract title from first heading
    const titleMatch = content.match(/^#\s+(.+)$/m);
    if (titleMatch) {
      updatedData.title = titleMatch[1];
      needsUpdate = true;
    }
  }

  // Ensure we have a date
  if (!updatedData.date) {
    updatedData.date = new Date().toISOString().split("T")[0];
    needsUpdate = true;
  }

  // Generate slug if not present
  if (!updatedData.slug) {
    updatedData.slug = slugify(
      updatedData.title || path.basename(filePath, ".md"),
      {
        lower: true,
        strict: true,
      }
    );
    needsUpdate = true;
  }

  // Add description if missing
  if (!updatedData.desc) {
    updatedData.desc = generateDescription(content);
    needsUpdate = true;
  }

  // Add keywords if missing
  if (!updatedData.keywords) {
    const keywords = extractKeywords(content, updatedData.title || "");
    updatedData.keywords = keywords.join(", ");
    needsUpdate = true;
  }

  // Add tags if missing (using top 3 keywords)
  if (!updatedData.tags) {
    const keywords = updatedData.keywords.split(", ");
    updatedData.tags = keywords.slice(0, 3).join(", ");
    needsUpdate = true;
  }

  // Update the file if needed
  if (needsUpdate) {
    const updatedFileContent = matter.stringify(content, updatedData);
    fs.writeFileSync(filePath, updatedFileContent);
    return true;
  }

  return false;
}

// Process all markdown files
function enhanceAllMarkdownFiles() {
  const fileNames = fs.readdirSync(postsDirectory);
  let updatedCount = 0;

  fileNames.forEach((fileName) => {
    if (fileName.endsWith(".md")) {
      const filePath = path.join(postsDirectory, fileName);
      const updated = enhanceMarkdownFile(filePath);
      if (updated) updatedCount++;
    }
  });
}

// Run the enhancement
enhanceAllMarkdownFiles();
