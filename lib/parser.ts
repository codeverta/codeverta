import { convertToISO8601Duration } from "./functions";

// Parse FAQ sections from markdown content
export function parseFAQSection(content) {
  // First, find the FAQ section
  const faqSectionRegex = /##\s+(FAQ|Frequently Asked Questions|关于)/i;
  const faqSectionMatch = content.match(faqSectionRegex);

  if (!faqSectionMatch) return null;

  // Get the starting index of the FAQ section
  const faqStartIndex = faqSectionMatch.index;

  // Find the next section heading (if any)
  const nextSectionRegex = /\n##\s+/g;
  nextSectionRegex.lastIndex = faqStartIndex + faqSectionMatch[0].length;
  const nextSectionMatch = nextSectionRegex.exec(content);

  // Get the content between FAQ heading and next section (or end of string)
  const endIndex = nextSectionMatch ? nextSectionMatch.index : content.length;
  const faqSection = content.substring(faqStartIndex, endIndex);

  // Now extract questions and answers
  const items = [];
  const qaRegex = /###\s*(.*?)\s*\n([\s\S]*?)(?=###|##|$)/g;
  let qaMatch;

  while ((qaMatch = qaRegex.exec(faqSection)) !== null) {
    // Skip the first match if it's just the "## FAQ" heading with no content
    if (qaMatch[1].match(/^\s*(FAQ|Frequently Asked Questions)\s*$/i)) continue;

    const question = qaMatch[1].trim().replace(/^Q:\s*/i, "");
    const answer = qaMatch[2].trim();

    if (question && answer) {
      items.push({ question, answer });
    }
  }

  return items.length > 0 ? items : null;
}
// Parse HowTo sections from markdown content
export function parseHowToSection(content: string) {
  // Look for sections that start with ## How to
  const howToRegex = /## (?:How to|Cara) (.*?)(?=##|$)/i;
  const howToMatch = content.match(howToRegex);

  if (!howToMatch) return null;

  const howToTitle = howToMatch[1].trim();
  const howToContent = howToMatch[0].trim();

  // Extract description (first paragraph after title)
  const descriptionMatch = howToContent.match(
    /## How to .*?\n\n(.*?)(?=\n\n|$)/
  );
  const description = descriptionMatch ? descriptionMatch[1].trim() : "";

  // Extract steps - assuming they start with "### Langkah X:" or "### X."
  const steps = [];
  const stepRegex = /### (?:Langkah )?(\d+)[:.](.*?)(?=### (?:Step )?|$)/gs;
  let stepMatch;

  while ((stepMatch = stepRegex.exec(howToContent)) !== null) {
    const stepName = stepMatch[2].trim().split("\n")[0];
    const stepText = stepMatch[2].trim().split("\n").slice(1).join("\n").trim();

    // Extract image if there's any in markdown format
    const imageMatch = stepText.match(/!\[.*?\]\((.*?)\)/);
    const image = imageMatch ? imageMatch[1] : null;

    steps.push({
      name: stepName,
      text: stepText,
      image,
    });
  }

  // Look for supplies/tools sections
  const suppliesMatch = howToContent.match(
    /### (?:Supplies|Materials) Needed:?\n([\s\S]*?)(?=###|$)/i
  );
  const supplies = suppliesMatch
    ? suppliesMatch[1]
        .trim()
        .split("\n")
        .filter(
          (line) => line.trim().startsWith("*") || line.trim().startsWith("-")
        )
        .map((line) => line.replace(/^\s*[*-]\s*/, "").trim())
    : [];

  const toolsMatch = howToContent.match(
    /### Tools Needed:?\n([\s\S]*?)(?=###|$)/i
  );
  const tools = toolsMatch
    ? toolsMatch[1]
        .trim()
        .split("\n")
        .filter(
          (line) => line.trim().startsWith("*") || line.trim().startsWith("-")
        )
        .map((line) => line.replace(/^\s*[*-]\s*/, "").trim())
    : [];

  // Look for time estimation
  const timeMatch = howToContent.match(/Time: (.*?)(?=\n|$)/i);
  const time = timeMatch ? convertToISO8601Duration(timeMatch[1].trim()) : null;

  // This is what we'll return if we found steps
  if (steps.length > 0) {
    return {
      title: `How to ${howToTitle}`,
      description,
      steps,
      supplies,
      tools,
      totalTime: time,
    };
  }

  return null;
}

// Map of tag keywords -> product slugs (so CTAs link to relevant products)
const PRODUCT_TAG_MAP: Record<string, string> = {
  gym: "/products/gym-management-system",
  "manajemen gym": "/products/gym-management-system",
  "software gym": "/products/gym-management-system",
  "sistem gym": "/products/gym-management-system",
  "gym management": "/products/gym-management-system",
  laundry: "/products/laundry-management-system",
  "manajemen laundry": "/products/laundry-management-system",
  kontraktor: "/products/project-management-system",
  konstruksi: "/products/project-management-system",
  "manajemen proyek": "/products/project-management-system",
  "software kontraktor": "/products/project-management-system",
  "coffee shop": "/products/coffee-shop-erp",
  coffeeshop: "/products/coffee-shop-erp",
  kasir: "/products/point-of-sale",
  pos: "/products/point-of-sale",
  "point of sale": "/products/point-of-sale",
  "aplikasi kasir": "/products/point-of-sale",
  retail: "/products/point-of-sale",
  hotel: "/products/hotel-management-system",
  penginapan: "/products/hotel-management-system",
  "manajemen hotel": "/products/hotel-management-system",
  rental: "/products/rental-management-system",
  "rental motor": "/products/rental-management-system",
  "rental mobil": "/products/rental-management-system",
  warehouse: "/products/warehouse-management-system",
  gudang: "/products/warehouse-management-system",
  "manajemen gudang": "/products/warehouse-management-system",
  catering: "/products/food-beverage-management",
  "makanan dan minuman": "/products/food-beverage-management",
  kesehatan: "/products/rme-hospital-management-system",
  "rumah sakit": "/products/rme-hospital-management-system",
  "rekam medis": "/products/rme-hospital-management-system",
  ecommerce: "/products/ecommerce-platform",
  "e-commerce": "/products/ecommerce-platform",
  event: "/products/ticketing-system",
  ticketing: "/products/ticketing-system",
  undangan: "/products/digital-invitation",
  pernikahan: "/products/digital-invitation",
};

// Auto-insert CTA block at end of article based on tags
export function insertProductCta(content: string, tags?: string): string {
  if (!tags) return content;

  const tagList = tags
    .toLowerCase()
    .split(",")
    .map((t) => t.trim());
  let productUrl = "";
  let productName = "";

  for (const tag of tagList) {
    for (const [key, url] of Object.entries(PRODUCT_TAG_MAP)) {
      if (tag.includes(key)) {
        productUrl = url;
        // Derive friendly name from URL
        productName = url
          .replace("/products/", "")
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");
        break;
      }
    }
    if (productUrl) break;
  }

  if (!productUrl) return content;

  // Only inject if no existing CTA block
  if (content.includes("<!--CTA:")) return content;

  const ctaBlock = `\n\n---\n\n<!--CTA:${productUrl}-->\n\n### 🚀 Butuh Sistem Serupa?\n\nKami dari **Codeverta** bisa bantu bangunkan sistem [${productName}](${productUrl}) yang sesuai dengan kebutuhan bisnis Anda.\n\n👉 **[Konsultasi Gratis →](https://wa.me/62881011692615?text=Halo%20Codeverta%2C%20saya%20tertarik%20dengan%20${encodeURIComponent(
    productName
  )}%20setelah%20membaca%20artikel.)**\n\nTim teknis kami siap mendiskusikan kebutuhan Anda tanpa biaya.\n`;

  return content + ctaBlock;
}

// Insert suggestion to read related articles
export function insertRelatedPostLinks(content, relatedPosts, lang) {
  if (!relatedPosts || relatedPosts.length === 0) return content;

  // Create markdown for related posts section - adjust heading based on language
  let heading = "### Related Articles";
  if (lang === "id") heading = "### Artikel Terkait";
  if (lang === "zh") heading = "### 相关文章";

  let relatedLinksMarkdown = `\n\n${heading}\n`;
  relatedPosts.forEach((post) => {
    relatedLinksMarkdown += `* [${post.title}](/${post.lang}/posts/${post.id})\n`;
  });

  // Add a horizontal rule before recommended posts
  relatedLinksMarkdown = "\n\n---" + relatedLinksMarkdown;

  // Find a good place to insert links - before the last paragraph or at the end
  const paragraphs = content.split("\n\n");

  if (paragraphs.length > 3) {
    // Insert before the last paragraph (which might be a conclusion)
    const insertPosition = paragraphs.length - 1;
    paragraphs.splice(insertPosition, 0, relatedLinksMarkdown);
    return paragraphs.join("\n\n");
  } else {
    // If post is short, just append at the end
    return content + relatedLinksMarkdown;
  }
}
