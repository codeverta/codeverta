import Head from "next/head";
import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";
import SeoHead from "@/components/SeoHead";
import { withI18n } from "@/lib/withi18n";
import { Industry, IndustryPageCopy, interpolate } from "@/lib/industries";
import { getLocalizedUrl, SITE_NAME, SITE_URL } from "@/lib/seo";

/* ── getStaticPaths ── */
export const getStaticPaths: GetStaticPaths = async ({ locales = [] }) => {
  const { getIndustrySlugs } = await import("@/lib/industries.server");
  const paths = locales.flatMap((locale) =>
    getIndustrySlugs().map((slug) => ({
      params: { slug },
      locale,
    }))
  );

  return { paths, fallback: false };
};

/* ── getStaticProps ── */
export const getStaticProps: GetStaticProps = withI18n(
  ["common", "industry"],
  async ({ params, locale }) => {
    const { getIndustries, getIndustryBySlug, getIndustryPageCopy } =
      await import("@/lib/industries.server");
    const slug = params?.slug as string;
    const safeLocale = locale || "en-US";
    const industry = getIndustryBySlug(slug, safeLocale);

    if (!industry) {
      return { notFound: true };
    }

    const industries = getIndustries(safeLocale);

    return {
      props: {
        industry,
        copy: getIndustryPageCopy(safeLocale),
        others: industries.filter((i) => i.slug !== slug).slice(0, 4),
        locale: safeLocale,
      },
    };
  }
);

/* ── Page ── */
export default function IndustryDetailPage({
  industry,
  others,
  copy,
  locale,
}: {
  industry: Industry;
  others: Industry[];
  copy: IndustryPageCopy;
  locale: string;
}) {
  const title = interpolate(copy.seo.detailTitleTemplate, {
    industry: industry.name,
  });
  const description = interpolate(copy.seo.detailDescriptionTemplate, {
    industry: industry.name,
  });
  const keywords = interpolate(copy.seo.detailKeywordsTemplate, {
    industry: industry.name,
  });
  const canonical = getLocalizedUrl(locale, `/industry/${industry.slug}`);
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${canonical}#service`,
        name: title,
        description,
        url: canonical,
        inLanguage: locale,
        provider: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
        areaServed: {
          "@type": "Country",
          name: "Indonesia",
        },
        serviceType: `${industry.name} software solution`,
        audience: {
          "@type": "BusinessAudience",
          name: industry.name,
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${industry.name} modules`,
          itemListElement: industry.solutions.map((solution) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: solution.title,
              description: solution.description,
            },
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: copy.detail.breadcrumbHome,
            item: getLocalizedUrl(locale, "/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: copy.detail.breadcrumbIndustries,
            item: getLocalizedUrl(locale, "/industry"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: industry.name,
            item: canonical,
          },
        ],
      },
    ],
  };

  return (
    <>
      <SeoHead
        title={title}
        description={description}
        keywords={keywords}
        url={canonical}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
        />
      </Head>
      <main
        className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 pb-20"
        style={{ "--accent": industry.accentColor } as React.CSSProperties}
      >
        {/* ── Breadcrumb ── */}
        <nav
          className="flex items-center gap-2 py-5 px-6 max-w-7xl mx-auto text-sm text-slate-500"
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="hover:text-[var(--accent)] transition-colors"
          >
            {copy.detail.breadcrumbHome}
          </Link>
          <span className="text-slate-300">/</span>
          <Link
            href="/industry"
            className="hover:text-[var(--accent)] transition-colors"
          >
            {copy.detail.breadcrumbIndustries}
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 font-medium">{industry.name}</span>
        </nav>

        {/* ── Hero ── */}
        <section className="relative max-w-7xl mx-auto px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 items-start">
          <div className="relative z-10">
            <div className="text-5xl mb-6">{industry.icon}</div>
            <div className="inline-block text-xs font-bold tracking-widest uppercase text-[var(--accent)] bg-white border border-slate-200 rounded-full py-1.5 px-4 mb-4 shadow-sm">
              {copy.detail.badge}
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 leading-tight">
              {industry.name}
            </h1>
            <p className="text-lg font-semibold text-[var(--accent)] mb-5">
              {industry.tagline}
            </p>
            <p className="text-base leading-relaxed text-slate-600 mb-8 max-w-2xl">
              {industry.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-sm hover:shadow"
              >
                {copy.detail.primaryCta}
              </Link>
              <Link
                href="/contact"
                className="inline-block bg-white hover:bg-slate-50 text-slate-700 font-semibold py-3 px-6 rounded-lg border border-slate-200 transition-all shadow-sm hover:shadow"
              >
                {copy.detail.secondaryCta}
              </Link>
            </div>
          </div>

          {/* Stat Card */}
          <div
            className="sticky top-8 bg-white border border-slate-200 rounded-xl p-8 text-center shadow-md"
            style={{ borderTop: "4px solid var(--accent)" }}
          >
            <div className="text-4xl md:text-5xl font-extrabold text-[var(--accent)] tracking-tight mb-2">
              {industry.heroStat.value}
            </div>
            <div className="text-sm font-semibold text-slate-700 mb-3 leading-snug">
              {industry.heroStat.label}
            </div>
            <div className="text-xs text-slate-400 italic">
              {copy.detail.statNote}
            </div>
          </div>
        </section>

        {/* ── Featured Clients Marquee ── */}
        <div className="border-y border-slate-200 bg-white py-5 px-6 flex flex-col md:flex-row items-center gap-6 overflow-hidden">
          <span className="text-xs font-bold tracking-widest uppercase text-slate-500 whitespace-nowrap shrink-0">
            {copy.detail.trustedBy}
          </span>
          <div
            className="flex gap-3 overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
            }}
          >
            {[...industry.featuredClients, ...industry.featuredClients].map(
              (client, i) => (
                <span
                  key={i}
                  className="shrink-0 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-full py-1.5 px-4 whitespace-nowrap"
                >
                  {client}
                </span>
              )
            )}
          </div>
        </div>

        {/* ── Body grid ── */}
        <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          {/* ── Challenges ── */}
          <section>
            <div className="text-xs font-bold tracking-widest uppercase text-[var(--accent)] mb-3">
              {copy.detail.problemEyebrow}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 leading-snug">
              {interpolate(copy.detail.problemTitleTemplate, {
                industry: industry.name,
              })}
            </h2>
            <ul className="flex flex-col gap-4">
              {industry.challenges.map((c, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 text-slate-600 leading-relaxed"
                >
                  <span className="shrink-0 w-2 h-2 rounded-full bg-[var(--accent)] mt-2 opacity-80" />
                  {c}
                </li>
              ))}
            </ul>
          </section>

          {/* ── Solutions ── */}
          <section>
            <div className="text-xs font-bold tracking-widest uppercase text-[var(--accent)] mb-3">
              {copy.detail.solutionEyebrow}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 leading-snug">
              {copy.detail.solutionTitle}
            </h2>
            <div className="flex flex-col gap-5">
              {industry.solutions.map((sol, i) => (
                <div
                  key={i}
                  className="bg-white border border-slate-200 rounded-xl p-6 transition-colors hover:border-[var(--accent)] shadow-sm"
                >
                  <div className="text-xs font-bold text-[var(--accent)] tracking-widest mb-2 opacity-80">
                    0{i + 1}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {sol.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {sol.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ── Testimonial ── */}
        <section className="max-w-4xl mx-auto px-6 pb-24 text-center">
          <div className="text-7xl leading-none text-[var(--accent)] opacity-20 font-serif mb-4">
            &ldquo;
          </div>
          <blockquote className="text-xl md:text-2xl leading-relaxed text-slate-700 italic mb-8">
            {industry.testimonial.quote}
          </blockquote>
          <div className="inline-flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[var(--accent)] text-white flex items-center justify-center text-lg font-bold shadow-sm">
              {industry.testimonial.author.charAt(0)}
            </div>
            <div className="text-left">
              <div className="text-sm font-bold text-slate-900">
                {industry.testimonial.author}
              </div>
              <div className="text-xs text-slate-500">
                {industry.testimonial.company}
              </div>
            </div>
          </div>
        </section>

        {/* ── Explore more industries ── */}
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <div className="text-center text-xs font-bold tracking-widest uppercase text-slate-500 mb-3">
            {copy.detail.moreEyebrow}
          </div>
          <h2 className="text-center text-2xl md:text-3xl font-bold text-slate-900 mb-10">
            {copy.detail.moreTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {others.map((ind) => (
              <Link
                key={ind.slug}
                href={`/industry/${ind.slug}`}
                className="group flex items-center gap-4 bg-white border border-slate-200 rounded-xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                style={
                  { "--card-accent": ind.accentColor } as React.CSSProperties
                }
              >
                <span className="text-3xl shrink-0">{ind.icon}</span>
                <div className="flex-1">
                  <div className="text-sm font-bold text-slate-900 mb-0.5">
                    {ind.name}
                  </div>
                  <div className="text-xs text-slate-500 line-clamp-1">
                    {ind.tagline}
                  </div>
                </div>
                <span className="text-slate-300 group-hover:text-[var(--card-accent)] group-hover:translate-x-1 transition-all duration-300 text-xl">
                  &rarr;
                </span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/industry"
              className="inline-block bg-white hover:bg-slate-50 text-slate-600 font-semibold py-2.5 px-6 rounded-lg border border-slate-200 transition-colors shadow-sm"
            >
              {copy.detail.viewAll}
            </Link>
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="text-center px-6 pt-16 pb-12 bg-slate-100 border-t border-slate-200">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
            {interpolate(copy.detail.bottomTitleTemplate, {
              industry: industry.name.toLowerCase(),
            })}
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            {copy.detail.bottomDescription}
          </p>
          <Link
            href="/contact"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-all shadow-md hover:shadow-lg"
          >
            {copy.detail.bottomCta}
          </Link>
        </section>
      </main>
    </>
  );
}
