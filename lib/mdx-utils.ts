import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

// Root directory for content
const contentDirectory = path.join(process.cwd(), "blog");

/**
 * Get all MDX files from a specific directory
 * @param {string} dir - Directory path (relative to content folder)
 * @returns {Promise<string[]>} Array of filenames
 */
export async function getMdxFiles(dir) {
  const fullPath = path.join(contentDirectory, dir);
  const files = await fs.readdir(fullPath);
  return files.filter((file) => file.endsWith(".mdx"));
}

/**
 * Extract metadata from an MDX file
 * @param {string} filePath - Path to the MDX file (relative to content folder)
 * @returns {Promise<Object>} Post metadata
 */
export async function getPostMetadata(filePath) {
  const fullPath = path.join(contentDirectory, filePath);
  const fileContents = await fs.readFile(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const { data, content } = matter(fileContents);

  // Calculate approximate word count for reading time estimation
  const wordCount = content.split(/\s+/).length;

  return {
    ...data,
    wordCount,
    filePath,
  };
}

/**
 * Get data for a single blog post
 * @param {string} slug - Post slug/filename without extension
 * @param {string} dir - Directory path (relative to content folder)
 * @returns {Promise<Object>} Post data with metadata and content
 */
export async function getPostBySlug(slug, dir) {
  const filePath = path.join(dir, `${slug}.mdx`);
  const fullPath = path.join(contentDirectory, filePath);

  const fileContents = await fs.readFile(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    content,
    ...data,
  };
}

/**
 * Get all blog posts with their metadata
 * @param {string} dir - Directory path (relative to content folder)
 * @returns {Promise<Object[]>} Array of post data objects
 */
export async function getAllPosts(dir) {
  const files = await getMdxFiles(dir);

  const posts = await Promise.all(
    files.map(async (filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const metadata = await getPostMetadata(path.join(dir, filename));

      return {
        slug,
        ...metadata,
      };
    })
  );

  // Sort posts by date (newest first)
  return posts.sort(
    (a, b) => new Date(b.publishDate) - new Date(a.publishDate)
  );
}
