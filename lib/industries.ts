export type Industry = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  accentColor: string;
  heroStat: { value: string; label: string };
  challenges: string[];
  solutions: { title: string; description: string }[];
  testimonial: { quote: string; author: string; company: string };
  featuredClients: string[];
};

export type IndustryPageCopy = {
  seo: {
    indexTitle: string;
    indexDescription: string;
    indexKeywords: string;
    detailTitleTemplate: string;
    detailDescriptionTemplate: string;
    detailKeywordsTemplate: string;
  };
  index: {
    badge: string;
    titlePrefix: string;
    titleHighlight: string;
    description: string;
    statLabel: string;
    ctaEyebrow: string;
    ctaTitle: string;
    ctaDescription: string;
    ctaButton: string;
  };
  detail: {
    breadcrumbHome: string;
    breadcrumbIndustries: string;
    badge: string;
    primaryCta: string;
    secondaryCta: string;
    statNote: string;
    trustedBy: string;
    problemEyebrow: string;
    problemTitleTemplate: string;
    solutionEyebrow: string;
    solutionTitle: string;
    moreEyebrow: string;
    moreTitle: string;
    viewAll: string;
    bottomTitleTemplate: string;
    bottomDescription: string;
    bottomCta: string;
  };
  industries?: Record<string, Partial<Industry>>;
};

export function interpolate(template: string, values: Record<string, string>) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => values[key] || "");
}
