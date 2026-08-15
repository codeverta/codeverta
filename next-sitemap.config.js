// next-sitemap.config.js
// Updated: adds dynamic path-specific hreflang alternate links for Next.js i18n
const nextI18nConfig = require("./next-i18next.config");
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const siteUrl = process.env.SITE_URL || "https://www.codeverta.com";
const defaultLocale = nextI18nConfig.i18n.defaultLocale;
const productLocales = nextI18nConfig.i18n.locales;
const defaultOnlySections = new Set([
  "news",
  "cybersecurity",
  "ai",
  "gadget",
  "startups",
  "tutorials",
  "gallery",
  "app",
  "pdf",
  "course",
  "jasa-pembuatan-website-event",
]);

function splitLocalePath(inputPath) {
  const cleanPath = inputPath.startsWith("/") ? inputPath : `/${inputPath}`;
  const segments = cleanPath.split("/").filter(Boolean);
  const locale = nextI18nConfig.i18n.locales.includes(segments[0])
    ? segments.shift()
    : defaultLocale;
  return { locale, routePath: `/${segments.join("/")}` || "/" };
}

function getAvailableLocales(routePath) {
  const segments = routePath.split("/").filter(Boolean);
  const section = segments[0] || "";
  if (section === "products") {
    return segments[1]
      ? getAvailableProductLocales(segments[1])
      : productLocales;
  }
  if (defaultOnlySections.has(section)) return [defaultLocale];
  return nextI18nConfig.i18n.locales;
}

let productIdsByLocale;
function getAvailableProductLocales(productId) {
  if (!productIdsByLocale) {
    productIdsByLocale = new Map();
    for (const locale of productLocales) {
      const file =
        locale === defaultLocale
          ? path.join(process.cwd(), "projects.json")
          : path.join(
              process.cwd(),
              "public",
              "locales",
              locale,
              "projects.json"
            );
      if (!fs.existsSync(file)) continue;
      const projects = JSON.parse(fs.readFileSync(file, "utf8")).projects || [];
      productIdsByLocale.set(
        locale,
        new Set(projects.map((project) => project?.product?.id).filter(Boolean))
      );
    }
  }
  return productLocales.filter((locale) =>
    productIdsByLocale.get(locale)?.has(productId)
  );
}

function getAlternateRefs(routePath) {
  const alternateRefs = getAvailableLocales(routePath).map((locale) => {
    const localePath =
      locale === defaultLocale
        ? routePath
        : `/${locale}${routePath === "/" ? "" : routePath}`;
    return {
      href: `${siteUrl}${localePath}`,
      hreflang: locale,
      hrefIsAbsolute: true,
    };
  });
  alternateRefs.push({
    href: `${siteUrl}${routePath}`,
    hreflang: "x-default",
    hrefIsAbsolute: true,
  });
  return alternateRefs;
}

function markdownSlugs(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs
    .readdirSync(directory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}

function getBlogTranslationGroups() {
  const blogDirectory = path.join(process.cwd(), "blog", "blog");
  const sources = [
    { locale: defaultLocale, directory: blogDirectory },
    ...nextI18nConfig.i18n.locales
      .filter((locale) => locale !== defaultLocale)
      .map((locale) => ({
        locale,
        directory: path.join(blogDirectory, locale),
      })),
  ];
  const groups = new Map();

  for (const source of sources) {
    for (const slug of markdownSlugs(source.directory)) {
      const file = path.join(source.directory, `${slug}.md`);
      const frontMatter = matter(fs.readFileSync(file, "utf8")).data;
      const translationKey = frontMatter.translationOf || slug;
      const group = groups.get(translationKey) || [];
      group.push({ locale: source.locale, slug, file });
      groups.set(translationKey, group);
    }
  }
  return groups;
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: siteUrl,
  generateRobotsTxt: true,
  sitemapSize: 5000,

  additionalPaths: async () => {
    const entries = [];
    const contentSections = [
      "news",
      "cybersecurity",
      "ai",
      "gadget",
      "startups",
      "tutorials",
    ];

    for (const section of contentSections) {
      const directory = path.join(process.cwd(), "blog", section);
      for (const slug of markdownSlugs(directory)) {
        const routePath = `/${section}/${slug}`;
        entries.push({
          loc: routePath,
          changefreq: section === "news" ? "daily" : "weekly",
          priority: 0.8,
          lastmod: fs
            .statSync(path.join(directory, `${slug}.md`))
            .mtime.toISOString(),
          alternateRefs: getAlternateRefs(routePath),
        });
      }
    }

    for (const records of getBlogTranslationGroups().values()) {
      const uniqueRecords = [
        ...new Map(records.map((record) => [record.locale, record])).values(),
      ];
      const defaultRecord =
        uniqueRecords.find((record) => record.locale === defaultLocale) ||
        uniqueRecords[0];
      const alternateRefs = uniqueRecords.map((record) => ({
        href: `${siteUrl}${
          record.locale === defaultLocale ? "" : `/${record.locale}`
        }/blog/${record.slug}`,
        hreflang: record.locale,
        hrefIsAbsolute: true,
      }));
      alternateRefs.push({
        href: `${siteUrl}${
          defaultRecord.locale === defaultLocale
            ? ""
            : `/${defaultRecord.locale}`
        }/blog/${defaultRecord.slug}`,
        hreflang: "x-default",
        hrefIsAbsolute: true,
      });

      for (const record of uniqueRecords) {
        entries.push({
          loc: `${
            record.locale === defaultLocale ? "" : `/${record.locale}`
          }/blog/${record.slug}`,
          changefreq: "weekly",
          priority: 0.8,
          lastmod: fs.statSync(record.file).mtime.toISOString(),
          alternateRefs,
        });
      }
    }

    const productFiles = [
      {
        locale: defaultLocale,
        file: path.join(process.cwd(), "projects.json"),
      },
      ...productLocales
        .filter((locale) => locale !== defaultLocale)
        .map((locale) => ({
          locale,
          file: path.join(
            process.cwd(),
            "public",
            "locales",
            locale,
            "projects.json"
          ),
        })),
    ];

    for (const { locale, file } of productFiles) {
      if (!fs.existsSync(file)) continue;
      const projects = JSON.parse(fs.readFileSync(file, "utf8")).projects || [];
      for (const project of projects) {
        const id = project?.product?.id;
        if (!id) continue;
        const routePath = `/products/${id}`;
        entries.push({
          loc: locale === defaultLocale ? routePath : `/${locale}${routePath}`,
          changefreq: "weekly",
          priority: 0.9,
          lastmod: fs.statSync(file).mtime.toISOString(),
          alternateRefs: getAlternateRefs(routePath),
        });
      }
    }

    return entries;
  },

  // Priority and changefreq for different content types + dynamic hreflang generator
  transform: async (config, path) => {
    // Default priority
    let priority = 0.7;
    let changefreq = "monthly";

    // Homepage
    if (path === "/") {
      priority = 1.0;
      changefreq = "weekly";
    }
    // Product pages
    else if (path.startsWith("/products")) {
      priority = 0.9;
      changefreq = "weekly";
    }
    // Industry pages
    else if (path.startsWith("/industry")) {
      priority = 0.8;
      changefreq = "monthly";
    }
    // Blog/tutorial articles
    else if (path.startsWith("/tutorials") || path.startsWith("/blog")) {
      priority = 0.8;
      changefreq = "weekly";
    }
    // News articles
    else if (path.startsWith("/news")) {
      priority = 0.6;
      changefreq = "daily";
    }

    // Ensure clean path starting with /
    const cleanPath = path.startsWith("/") ? path : `/${path}`;

    if (cleanPath.includes("[") || cleanPath.includes("]")) return null;

    const { locale, routePath } = splitLocalePath(cleanPath);
    if (!getAvailableLocales(routePath).includes(locale)) return null;

    const alternateRefs = getAlternateRefs(routePath);

    return {
      loc: cleanPath,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
      alternateRefs,
    };
  },

  // Exclude admin/internal pages from sitemap
  exclude: [
    "/blog-form",
    "/short",
    "/picker",
    "/qr",
    "/editor",
    "/gallery",
    "/download",
    "/image/*",
    "/pdf/*",
    "/games/*",
    "/whatsappRedirect",
    "/[shortCode]",
  ],
};
