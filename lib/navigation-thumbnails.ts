import thumbnails from "./navigation-thumbnails.json";

/** Return a precompressed menu image when one is available. */
export function getNavigationThumbnail(image?: string) {
  if (!image) return image;
  return thumbnails[image as keyof typeof thumbnails] || image;
}
