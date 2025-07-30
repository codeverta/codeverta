// lib/posts.js - Updated for multilingual support and table of contents

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";
import { insertContextualLinks, findRelatedPosts } from "./functions";
import {
  insertRelatedPostLinks,
  parseFAQSection,
  parseHowToSection,
} from "./parser";
import {
  extractHeadings,
  insertTableOfContents,
  addIdsToHeadings,
} from "./toc";

// Base blog directory
const blogBaseDirectory = path.join(process.cwd(), "blog");

// Get all supported languages
export function getSupportedLanguages() {
  // Read all directories under /blog
  return fs
    .readdirSync(blogBaseDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}

// Get posts for a specific language
export function getSortedPostsData(lang = "en") {
  const langDirectory = path.join(blogBaseDirectory, lang);

  // Check if language directory exists
  if (!fs.existsSync(langDirectory)) {
    return [];
  }

  // Get file names under /blog/[lang]
  const fileNames = fs.readdirSync(langDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(langDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id and language
    return {
      id,
      lang,
      ...matterResult.data,
    };
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// Get all posts across all languages
export function getAllPostsData() {
  const languages = getSupportedLanguages();
  let allPosts = [];

  languages.forEach((lang) => {
    const langPosts = getSortedPostsData(lang);
    allPosts = [...allPosts, ...langPosts];
  });

  return allPosts;
}

export function getAllPostIds(folder = 'tutorials') {
  const languages = [folder]; // Assuming 'folder' directly corresponds to a language directory
  let allPostIds = [];

  languages.forEach((lang) => {
    const langDirectory = path.join(blogBaseDirectory, lang);

    // Check if the language directory exists
    if (!fs.existsSync(langDirectory)) {
      console.warn(`Language directory not found: ${langDirectory}`);
      return; // Skip this language if directory doesn't exist
    }

    const fileNames = fs.readdirSync(langDirectory);

    const langPostData = fileNames.map((fileName) => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, "");

      // Read markdown file as string to get date from front matter
      const fullPath = path.join(langDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const matterResult = matter(fileContents);

      return {
        params: {
          lang,
          id,
        },
        date: matterResult.data.date, // Extract the date
      };
    });

    allPostIds = [...allPostIds, ...langPostData];
  });

  // Sort posts by date in descending order (newest first)
  allPostIds.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else if (a.date > b.date) {
      return -1;
    } else {
      return 0;
    }
  });

  return allPostIds;
}

export async function getPostData(id, lang = "en") {
  // Define the fallback language order
  const languageFallbacks = [
    lang,
    ...getSupportedLanguages().filter((l) => l !== lang),
  ];

  let fileContents;
  let usedLanguage = lang;
  let fullPath;

  // Try each language in the fallback sequence
  for (const currentLang of languageFallbacks) {
    try {
      fullPath = path.join(blogBaseDirectory, currentLang, `${id}.md`);
      fileContents = fs.readFileSync(fullPath, "utf8");
      usedLanguage = currentLang; // Store which language was successfully found
      break; // Exit the loop if file is found
    } catch (error) {
      if (error.code === "ENOENT") {
        continue; // Try next language
      } else {
        throw error; // Rethrow if it's a different error
      }
    }
  }

  // If file is still not found after all fallbacks
  if (!fileContents) {
    throw new Error(
      `Post ${id} not found in any language: ${languageFallbacks.join(", ")}`
    );
  }

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Extract front matter and content
  const { data: frontMatter, content: markdownContent } = matterResult;

  // Check if user wants to generate table of contents from frontmatter
  const shouldGenerateTOC = true;
  // frontMatter.toc !== false; // Generate TOC by default unless explicitly disabled

  // Get all posts in the same language to find related content
  const allPosts = getSortedPostsData(usedLanguage);

  // Find related posts based on tags and content
  const relatedPosts = findRelatedPosts(id, frontMatter.tags, allPosts);

  // Parse FAQ and HowTo sections from content
  const faq = parseFAQSection(markdownContent);
  const howTo = parseHowToSection(markdownContent);

  // Extract headings for TOC and to add IDs later
  const headings = extractHeadings(markdownContent);

  // Generate table of contents if needed
  let enhancedContent = markdownContent;
  if (shouldGenerateTOC && headings.length >= 3) {
    enhancedContent = insertTableOfContents(enhancedContent, usedLanguage);
  }

  // Insert contextual links within the content
  enhancedContent = insertContextualLinks(enhancedContent, allPosts, id);

  // Insert related posts section
  enhancedContent = insertRelatedPostLinks(
    enhancedContent,
    relatedPosts,
    usedLanguage
  );

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .use(gfm)
    .process(enhancedContent);

  // Get the HTML content
  let contentHtml = processedContent.toString();

  // Add IDs to headings in the HTML for anchor links
  contentHtml = addIdsToHeadings(contentHtml, headings);

  // Combine the data with the id, language, and contentHtml
  return {
    id,
    lang: usedLanguage, // Return the language that was actually used
    contentHtml,
    headings, // Include headings for potential client-side TOC rendering
    ...frontMatter,
    relatedPosts,
    faq,
    howTo,
    // translatedFrom: usedLanguage !== lang ? usedLanguage : undefined, // Indicate if content was from a fallback language
  };
}
