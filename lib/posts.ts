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
  insertProductCta,
  parseFAQSection,
  parseHowToSection,
} from "./parser";
import {
  extractHeadings,
  insertTableOfContents,
  addIdsToHeadings,
} from "./toc";
import { SUPPORTED_LOCALES } from "./seo";

// Base blog directory
const blogBaseDirectory = path.join(process.cwd(), "blog");

function normalizeLocale(locale = "id") {
  return locale === "kr" ? "ko" : locale;
}

function getContentDirectories(folder = "blog", locale = "id") {
  const normalizedLocale = normalizeLocale(locale);
  const baseLocale = normalizedLocale.split("-")[0];
  const folderDirectory = path.join(blogBaseDirectory, folder);
  const candidates = [
    path.join(folderDirectory, normalizedLocale),
    normalizedLocale === "en-GB" ? path.join(folderDirectory, "en-US") : "",
    path.join(folderDirectory, baseLocale),
    folderDirectory,
  ].filter(Boolean);

  return [...new Set(candidates)].filter((dir) => fs.existsSync(dir));
}

function getMarkdownFileNames(directory) {
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((dirent) => dirent.isFile() && dirent.name.endsWith(".md"))
    .map((dirent) => dirent.name);
}

// Get all supported languages
export function getSupportedLanguages() {
  // Read all directories under /blog
  return fs
    .readdirSync(blogBaseDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}

// Get posts for a specific language
export function getSortedPostsData(folder = "blog", locale = "id") {
  const directories = getContentDirectories(folder, locale);

  if (!directories.length) {
    return [];
  }

  const postsById = new Map();
  const translatedSourceIds = new Set();
  const fileNames = getMarkdownFileNames(directories[directories.length - 1]);

  directories.forEach((directory) => {
    getMarkdownFileNames(directory).forEach((fileName) => {
      if (!fileNames.includes(fileName)) {
        fileNames.push(fileName);
      }
    });
  });

  const allPostsData = fileNames
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, "");
      const directory =
        directories.find((candidate) =>
          fs.existsSync(path.join(candidate, fileName))
        ) || directories[directories.length - 1];
      const fullPath = path.join(directory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const matterResult = matter(fileContents);
      const usedLocale =
        path.basename(directory) === folder ? "id" : path.basename(directory);

      if (matterResult.data.translationOf) {
        translatedSourceIds.add(matterResult.data.translationOf);
      }

      return {
        id,
        lang: usedLocale,
        category: folder,
        ...matterResult.data,
      };
    })
    .filter((post) => post.lang !== "id" || !translatedSourceIds.has(post.id));

  allPostsData.forEach((post) => postsById.set(post.id, post));

  return Array.from(postsById.values()).sort((a, b) => {
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

export function getAllPostIds(folder = "tutorials") {
  let allPostIds = [];
  const folderDirectory = path.join(blogBaseDirectory, folder);

  if (!fs.existsSync(folderDirectory)) {
    console.warn(`Content directory not found: ${folderDirectory}`);
    return allPostIds;
  }

  const contentDirectories = [
    { locale: "id", directory: folderDirectory },
    ...fs
      .readdirSync(folderDirectory, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => ({
        locale: dirent.name,
        directory: path.join(folderDirectory, dirent.name),
      })),
  ];

  contentDirectories.forEach(({ locale, directory }) => {
    const fileNames = getMarkdownFileNames(directory);

    const langPostData = fileNames.map((fileName) => {
      const id = fileName.replace(/\.md$/, "");
      const fullPath = path.join(directory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const matterResult = matter(fileContents);

      return {
        params: {
          id,
        },
        locale,
        date: matterResult.data.date,
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

function readPostFrontMatter(directory, fileName) {
  const fullPath = path.join(directory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  return matter(fileContents).data;
}

function getAllPostRecords(folder = "blog") {
  const folderDirectory = path.join(blogBaseDirectory, folder);

  if (!fs.existsSync(folderDirectory)) {
    return [];
  }

  const contentDirectories = [
    { locale: "id", directory: folderDirectory },
    ...fs
      .readdirSync(folderDirectory, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => ({
        locale: normalizeLocale(dirent.name),
        directory: path.join(folderDirectory, dirent.name),
      })),
  ];

  return contentDirectories.flatMap(({ locale, directory }) =>
    getMarkdownFileNames(directory).map((fileName) => {
      const id = fileName.replace(/\.md$/, "");
      const data = readPostFrontMatter(directory, fileName);

      return {
        id,
        locale,
        translationKey: data.translationOf || id,
      };
    })
  );
}

export function getLocalizedPostPaths(id, folder = "blog") {
  const records = getAllPostRecords(folder);
  const currentRecord = records.find((record) => record.id === id);
  const translationKey = currentRecord?.translationKey || id;
  const translationRecords = records.filter(
    (record) =>
      record.id === translationKey || record.translationKey === translationKey
  );
  const pathsByLocale = {};

  SUPPORTED_LOCALES.forEach((locale) => {
    const targetRecord =
      translationRecords.find((record) => record.locale === locale) ||
      (locale === "en-GB"
        ? translationRecords.find((record) => record.locale === "en-US")
        : undefined) ||
      translationRecords.find(
        (record) => record.locale === locale.split("-")[0]
      ) ||
      translationRecords.find((record) => record.locale === "id");

    if (targetRecord) {
      pathsByLocale[locale] = `/${folder}/${targetRecord.id}`;
    }
  });

  return pathsByLocale;
}

export async function getPostData(id, folder = "blog", locale = "id") {
  let fileContents;
  let usedLanguage = normalizeLocale(locale);
  let fullPath;

  for (const directory of getContentDirectories(folder, locale)) {
    fullPath = path.join(directory, `${id}.md`);
    if (fs.existsSync(fullPath)) {
      fileContents = fs.readFileSync(fullPath, "utf8");
      usedLanguage =
        path.basename(directory) === folder ? "id" : path.basename(directory);
      break;
    }
  }

  if (!fileContents) {
    throw new Error(`Post ${id} not found in ${folder} for locale ${locale}`);
  }

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Extract front matter and content
  const { data: frontMatter, content: markdownContent } = matterResult;

  // Check if user wants to generate table of contents from frontmatter
  const shouldGenerateTOC = true;
  // frontMatter.toc !== false; // Generate TOC by default unless explicitly disabled

  // Get all posts in the same language to find related content
  const allPosts = getSortedPostsData(folder, usedLanguage);

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

  // Insert contextual CTA block based on article tags
  enhancedContent = insertProductCta(enhancedContent, frontMatter.tags);

  // // Insert contextual links within the content
  // enhancedContent = insertContextualLinks(enhancedContent, allPosts, id);

  // // Insert related posts section
  // enhancedContent = insertRelatedPostLinks(
  //   enhancedContent,
  //   relatedPosts,
  //   usedLanguage
  // );

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
