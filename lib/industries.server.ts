import fs from "fs";
import path from "path";
import baseIndustries from "../industries.json";
import { Industry, IndustryPageCopy } from "./industries";
import {
  ensureMarketContent,
  fillMarketTemplate,
  getIndustryMarket,
} from "./industry-markets";

const defaultCopy: IndustryPageCopy = {
  seo: {
    indexTitle: "Solutions for Every Industry | Codeverta",
    indexDescription:
      "From manufacturing plants to healthcare systems, Codeverta adapts to meet the unique demands of your industry.",
    indexKeywords:
      "industry software solutions, ERP by industry, business applications, Codeverta",
    detailTitleTemplate: "{{industry}} Software Solutions | Codeverta",
    detailDescriptionTemplate:
      "Explore Codeverta solutions for {{industry}} teams: operations, automation, reporting, integration, and scalable digital workflows.",
    detailKeywordsTemplate:
      "{{industry}} software, {{industry}} ERP, {{industry}} digital transformation, Codeverta",
  },
  index: {
    badge: "Industry Solutions",
    titlePrefix: "Solutions for",
    titleHighlight: "Every Industry",
    description:
      "From manufacturing plants to healthcare systems, Codeverta adapts to meet the unique demands of your industry. Simplify operations, optimize resources, and grow faster.",
    statLabel: "Industries Served",
    ctaEyebrow: "Don't see your industry?",
    ctaTitle: "Let's build your custom solution",
    ctaDescription:
      "Codeverta is highly configurable. Our team will work with you to tailor every module to your specific workflows and compliance requirements.",
    ctaButton: "Talk to our team",
  },
  detail: {
    breadcrumbHome: "Home",
    breadcrumbIndustries: "Industries",
    badge: "Industry Solution",
    primaryCta: "Get started",
    secondaryCta: "Request a demo",
    statNote: "Codeverta customer average",
    trustedBy: "Trusted by companies in",
    problemEyebrow: "The Problem",
    problemTitleTemplate: "Challenges {{industry}} teams face",
    solutionEyebrow: "What We Offer",
    solutionTitle: "How Codeverta solves it",
    moreEyebrow: "More Industries",
    moreTitle: "Explore our other solutions",
    viewAll: "View all industries",
    bottomTitleTemplate: "Ready to transform your {{industry}} operations?",
    bottomDescription:
      "Talk to a Codeverta specialist who understands your industry.",
    bottomCta: "Book a free consultation",
  },
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function deepMerge<T>(base: T, override: unknown): T {
  if (!isRecord(base) || !isRecord(override)) return (override ?? base) as T;

  const merged: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(override)) {
    merged[key] = isRecord(value)
      ? deepMerge(merged[key], value)
      : value ?? merged[key];
  }

  return merged as T;
}

function getIndustryLocaleFile(locale = "en") {
  const candidates = [locale, locale.split("-")[0]].filter(Boolean);

  for (const candidate of candidates) {
    const filePath = path.join(
      process.cwd(),
      "public",
      "locales",
      candidate,
      "industry.json"
    );
    if (fs.existsSync(filePath)) return filePath;
  }

  return null;
}

export function getIndustryPageCopy(locale = "en"): IndustryPageCopy {
  const filePath = getIndustryLocaleFile(locale);
  if (!filePath) return defaultCopy;

  try {
    const localizedCopy = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    return deepMerge(defaultCopy, localizedCopy);
  } catch (error) {
    console.error(`Failed to read industry locale file: ${filePath}`, error);
    return defaultCopy;
  }
}

export function getIndustries(locale = "en"): Industry[] {
  const copy = getIndustryPageCopy(locale);
  const localizedBySlug = copy.industries || {};
  const market = getIndustryMarket(locale);

  return (baseIndustries as Industry[]).map((industry) => {
    const localized = deepMerge(industry, localizedBySlug[industry.slug]);

    return {
      ...localized,
      tagline: ensureMarketContent(localized.tagline, market, localized.name),
      description: ensureMarketContent(
        localized.description,
        market,
        localized.name
      ),
      heroStat: localized.heroStat,
      challenges: localized.challenges,
      solutions: localized.solutions,
      testimonial: localized.testimonial,
      featuredClients: localized.featuredClients,
    };
  });
}

export function getIndustrySlugs() {
  return (baseIndustries as Industry[]).map((industry) => industry.slug);
}

export function getIndustryBySlug(slug: string, locale = "en") {
  return getIndustries(locale).find((industry) => industry.slug === slug);
}
