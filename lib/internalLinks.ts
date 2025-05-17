// lib/internalLinks.js
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "blog");

/**
 * Creates a map of keywords to post IDs
 * This helps us identify which posts to link to for specific topics
 */
export function buildKeywordPostMap() {
  const fileNames = fs.readdirSync(postsDirectory);
  const keywordMap = {};

  fileNames.forEach((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    // Use title, tags, and keywords for mapping
    const title = data.title || "";
    const tags = data.tags ? data.tags.split(",").map((tag) => tag.trim()) : [];
    const keywords = data.keywords
      ? data.keywords.split(",").map((kw) => kw.trim())
      : [];

    // Add title words (excluding common words)
    const titleWords = title
      .toLowerCase()
      .split(/\s+/)
      .filter((word) => word.length > 3)
      .filter(
        (word) =>
          !["dan", "cara", "dengan", "dari", "itu", "ini"].includes(word)
      );

    // Combine all potential keywords
    const allKeywords = [...titleWords, ...tags, ...keywords];

    // Add post ID to each keyword in the map
    allKeywords.forEach((keyword) => {
      if (!keywordMap[keyword]) {
        keywordMap[keyword] = [];
      }
      if (!keywordMap[keyword].includes(id)) {
        keywordMap[keyword].push(id);
      }
    });
  });

  return keywordMap;
}

/**
 * Process markdown content to add internal links
 * @param {string} content - The original markdown content
 * @param {string} currentPostId - The ID of the current post (to avoid self-linking)
 * @param {Object} allPosts - All posts data
 * @param {Object} keywordMap - Map of keywords to post IDs
 * @param {number} maxLinks - Maximum number of links to add
 */
export function addInternalLinks(
  content,
  currentPostId,
  allPosts,
  keywordMap,
  maxLinks = 3
) {
  let modifiedContent = content;
  const addedLinks = [];
  const paragraphs = content.split("\n\n");

  // Map of posts by ID for easier lookup
  const postsById = allPosts.reduce((acc, post) => {
    acc[post.id] = post;
    return acc;
  }, {});

  // Find potential keywords in the content
  const contentWords = new Set(
    content
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter((word) => word.length > 3)
  );

  // Find matching posts based on keywords
  const potentialLinks = [];
  contentWords.forEach((word) => {
    if (keywordMap[word]) {
      keywordMap[word].forEach((postId) => {
        if (postId !== currentPostId && !addedLinks.includes(postId)) {
          potentialLinks.push(postId);
        }
      });
    }
  });

  // Select up to maxLinks unique posts
  const uniquePostIds = [...new Set(potentialLinks)].slice(0, maxLinks);

  if (uniquePostIds.length === 0) {
    return content; // No relevant posts found
  }

  // Find a good paragraph to add the links
  // Typically after the first or second paragraph, or before the conclusion
  let targetParagraphIndex = Math.min(2, paragraphs.length - 1);

  // Create the "Related Articles" section
  let relatedLinksSection = "\n\n---\n\n**Baca juga artikel terkait:**\n\n";

  uniquePostIds.forEach((postId) => {
    if (postsById[postId]) {
      const post = postsById[postId];
      relatedLinksSection += `- [${post.title}](/posts/${postId})\n`;
      addedLinks.push(postId);
    }
  });

  relatedLinksSection += "\n---\n\n";

  // Insert the links section after the target paragraph
  paragraphs.splice(targetParagraphIndex + 1, 0, relatedLinksSection);
  modifiedContent = paragraphs.join("\n\n");

  return modifiedContent;
}

/**
 * Alternative approach: Add contextual inline links
 * This is more natural but more complex to implement correctly
 */
export function addContextualLinks(
  content,
  currentPostId,
  allPosts,
  keywordMap,
  maxLinks = 3
) {
  let modifiedContent = content;
  const addedLinks = [];

  // Map of posts by ID for easier lookup
  const postsById = allPosts.reduce((acc, post) => {
    acc[post.id] = post;
    return acc;
  }, {});

  // Get relevant keywords from other posts
  const relevantKeywords = Object.keys(keywordMap)
    .filter(
      (keyword) =>
        keyword.length > 3 &&
        keywordMap[keyword].some((id) => id !== currentPostId)
    )
    .sort((a, b) => b.length - a.length); // Sort by length (longer first)

  // Regular expression to find these keywords in content, ensuring we match whole words
  for (const keyword of relevantKeywords) {
    // Skip if we've already added maximum links
    if (addedLinks.length >= maxLinks) break;

    // Create regex to match the keyword as a whole word, case insensitive
    const regex = new RegExp(`\\b${keyword}\\b`, "i");

    // Find if this keyword exists in the content
    if (regex.test(modifiedContent)) {
      // Find a relevant post for this keyword
      const relevantPostIds = keywordMap[keyword].filter(
        (id) => id !== currentPostId
      );

      if (relevantPostIds.length > 0) {
        // Get first post that hasn't been linked yet
        const postId = relevantPostIds.find((id) => !addedLinks.includes(id));

        if (postId && postsById[postId]) {
          const post = postsById[postId];

          // Replace the first occurrence with a link
          modifiedContent = modifiedContent.replace(
            regex,
            `[${keyword}](/posts/${postId} "${post.title}")`
          );

          addedLinks.push(postId);
        }
      }
    }
  }

  // If we didn't add any contextual links, add a "Related Articles" section
  if (addedLinks.length === 0) {
    return addInternalLinks(
      content,
      currentPostId,
      allPosts,
      keywordMap,
      maxLinks
    );
  }

  return modifiedContent;
}
