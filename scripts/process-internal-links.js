// scripts/process-internal-links.js
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const postsDirectory = path.join(process.cwd(), "blog");

// Build keyword to post mapping
function buildKeywordPostMap() {
  const fileNames = fs.readdirSync(postsDirectory);
  const keywordMap = {};

  fileNames.forEach((fileName) => {
    if (!fileName.endsWith(".md")) return;

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
          !["dan", "itu", "dengan", "dari", "bahwa", "ini"].includes(word)
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

// Get all posts data
function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        id,
        ...data,
      };
    });
}

// Add related posts section
function addRelatedPostsSection(
  content,
  currentPostId,
  allPosts,
  keywordMap,
  maxLinks = 3
) {
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
        if (postId !== currentPostId) {
          potentialLinks.push(postId);
        }
      });
    }
  });

  // Count occurrences to find most relevant posts
  const postCounts = {};
  potentialLinks.forEach((postId) => {
    postCounts[postId] = (postCounts[postId] || 0) + 1;
  });

  // Sort by relevance and take top matches
  const relatedPostIds = Object.entries(postCounts)
    .sort((a, b) => b[1] - a[1])
    .map((entry) => entry[0])
    .slice(0, maxLinks);

  if (relatedPostIds.length === 0) {
    return content; // No related posts found
  }

  // Create the "Related Articles" section
  let relatedSection = "\n\n## Artikel Terkait\n\n";

  relatedPostIds.forEach((postId) => {
    if (postsById[postId]) {
      const post = postsById[postId];
      relatedSection += `- [${post.title}](/posts/${postId}) - ${
        post.desc ? post.desc.substring(0, 100) + "..." : ""
      }\n`;
    }
  });

  // Check if content already has a related section
  if (
    content.includes("## Artikel Terkait") ||
    content.includes("## Related Posts") ||
    content.includes("**Baca juga artikel terkait:**")
  ) {
    return content; // Don't add if already exists
  }

  // Append to the end of the content
  return content + relatedSection;
}

// Add contextual inline links
function addContextualLinks(
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

  // Only process paragraphs (not code blocks, headers, etc.)
  const segments = modifiedContent.split(/(\n```[\s\S]*?\n```|\n#+\s+.*)/g);
  const updatedSegments = segments.map((segment, index) => {
    // Skip code blocks and headers
    if (segment.startsWith("\n```") || segment.match(/\n#+\s+.*/)) {
      return segment;
    }

    let updatedSegment = segment;

    // Process only if we haven't reached max links
    if (addedLinks.length < maxLinks) {
      for (const keyword of relevantKeywords) {
        // Skip if we've already added maximum links
        if (addedLinks.length >= maxLinks) break;
        function escapeRegExp(string) {
          return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        }
        // Create regex to match the keyword as a whole word, case insensitive
        const escapedKeyword = escapeRegExp(keyword);
        const regex = new RegExp(`\\b${escapedKeyword}\\b`, "i");

        // Find if this keyword exists in the content
        if (regex.test(updatedSegment)) {
          // Find a relevant post for this keyword
          const relevantPostIds = keywordMap[keyword].filter(
            (id) => id !== currentPostId
          );

          if (relevantPostIds.length > 0) {
            // Get first post that hasn't been linked yet
            const postId = relevantPostIds.find(
              (id) => !addedLinks.includes(id)
            );

            if (postId && postsById[postId]) {
              const post = postsById[postId];

              // Replace the first occurrence with a link
              updatedSegment = updatedSegment.replace(
                regex,
                `[${keyword}](/posts/${postId} "Baca juga: ${post.title}")`
              );

              addedLinks.push(postId);
            }
          }
        }
      }
    }

    return updatedSegment;
  });

  modifiedContent = updatedSegments.join("");

  // If we added fewer than requested links, also add a related posts section
  if (addedLinks.length < maxLinks) {
    modifiedContent = addRelatedPostsSection(
      modifiedContent,
      currentPostId,
      allPosts,
      keywordMap,
      maxLinks - addedLinks.length
    );
  }

  return modifiedContent;
}

// Process all markdown files
function processAllFiles() {
  const allPosts = getAllPosts();
  const keywordMap = buildKeywordPostMap();
  let modifiedCount = 0;

  allPosts.forEach((post) => {
    const fullPath = path.join(postsDirectory, `${post.id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { content, data } = matter(fileContents);

    // Add both inline links and a related posts section
    const contentWithLinks = addContextualLinks(
      content,
      post.id,
      allPosts,
      keywordMap,
      2 // 2 inline links
    );

    // Update the file if content changed
    if (contentWithLinks !== content) {
      const updatedFileContent = matter.stringify(contentWithLinks, data);
      fs.writeFileSync(fullPath, updatedFileContent);
      modifiedCount++;
    }
  });

  console.log(
    `Added internal links to ${modifiedCount} of ${allPosts.length} files`
  );
}

// Run the script
processAllFiles();
