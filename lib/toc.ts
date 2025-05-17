// lib/toc.js - Fix heading ID generation

export function extractHeadings(markdown) {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const slug = generateSlug(text);

    headings.push({
      level,
      text,
      slug,
    });
  }

  return headings;
}

// Generate consistent slugs for headings
export function generateSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/--+/g, "-") // Replace multiple hyphens with single hyphen
    .trim();
}

// Add IDs to HTML headings for anchor links
export function addIdsToHeadings(html, headings) {
  let modifiedHtml = html;

  headings.forEach((heading) => {
    const headingTag = `h${heading.level}`;
    const headingRegex = new RegExp(
      `<${headingTag}>(${escapeRegExp(heading.text)})</${headingTag}>`,
      "g"
    );
    modifiedHtml = modifiedHtml.replace(
      headingRegex,
      `<${headingTag} id="${heading.slug}">${heading.text}</${headingTag}>`
    );
  });

  return modifiedHtml;
}

// Helper function to escape special characters for RegExp
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Optional: Insert table of contents in markdown
export function insertTableOfContents(markdown, language = "en") {
  // ... existing implementation ...
  return markdown;
}
