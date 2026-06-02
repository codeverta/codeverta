import Head from "next/head";
import Link from "next/link";
import SeoHead from "@/components/SeoHead";
import { withI18n } from "@/lib/withi18n";
import { Industry, IndustryPageCopy } from "@/lib/industries";
import { getLocalizedUrl, SITE_NAME, SITE_URL } from "@/lib/seo";

export const getStaticProps = withI18n(
  ["common", "industry"],
  async function ({ locale }) {
    const { getIndustries, getIndustryPageCopy } = await import(
      "@/lib/industries.server"
    );
    const safeLocale = locale || "en-US";

    return {
      props: {
        industries: getIndustries(safeLocale),
        copy: getIndustryPageCopy(safeLocale),
        locale: safeLocale,
      },
    };
  }
);

export default function IndustryPage({
  industries,
  copy,
  locale,
}: {
  industries: Industry[];
  copy: IndustryPageCopy;
  locale: string;
}) {
  const canonical = getLocalizedUrl(locale, "/industry");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${canonical}#itemlist`,
    name: copy.seo.indexTitle,
    description: copy.seo.indexDescription,
    url: canonical,
    inLanguage: locale,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    itemListElement: industries.map((industry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: getLocalizedUrl(locale, `/industry/${industry.slug}`),
      name: industry.name,
      description: industry.tagline,
    })),
  };

  return (
    <>
      <SeoHead
        title={copy.seo.indexTitle}
        description={copy.seo.indexDescription}
        keywords={copy.seo.indexKeywords}
        url={canonical}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <main className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
        {/* ── Hero ── */}
        <section className="max-w-4xl mx-auto pt-24 pb-16 px-6 text-center">
          <div className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-700 bg-blue-50 border border-blue-200 rounded-full py-1.5 px-4 mb-6">
            {copy.index.badge}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-slate-900 mb-5">
            {copy.index.titlePrefix}{" "}
            <span className="text-blue-600">{copy.index.titleHighlight}</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            {copy.index.description}
          </p>
          <div className="inline-flex items-baseline gap-2.5 bg-white border border-slate-200 rounded-lg px-6 py-3 shadow-sm">
            <span className="text-3xl font-bold text-slate-900">
              {industries.length}
            </span>
            <span className="text-sm font-medium text-slate-500">
              {copy.index.statLabel}
            </span>
          </div>
        </section>

        {/* ── Grid ── */}
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/industry/${industry.slug}`}
                className="group relative flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-slate-300 transition-all duration-300 hover:-translate-y-1"
                style={
                  { "--accent": industry.accentColor } as React.CSSProperties
                }
              >
                {/* Accent bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: "var(--accent)" }}
                />

                <div className="flex items-start gap-4 p-6 pb-4">
                  <div className="text-3xl mt-1">{industry.icon}</div>
                  <div className="flex-1">
                    <h2 className="text-lg font-bold text-slate-900 mb-1">
                      {industry.name}
                    </h2>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {industry.tagline}
                    </p>
                  </div>
                  <div className="text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 mt-1">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 10H16M16 10L10 4M16 10L10 16"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Stat pill */}
                <div className="flex items-center gap-3 px-6 py-4 border-t border-slate-100 mt-auto bg-slate-50/50">
                  <span
                    className="text-lg font-bold"
                    style={{ color: "var(--accent)" }}
                  >
                    {industry.heroStat.value}
                  </span>
                  <span className="text-xs text-slate-500 font-medium leading-tight">
                    {industry.heroStat.label}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="max-w-3xl mx-auto px-6 pb-24 text-center">
          <p className="text-sm font-semibold tracking-wider uppercase text-slate-500 mb-3">
            {copy.index.ctaEyebrow}
          </p>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            {copy.index.ctaTitle}
          </h2>
          <p className="text-base text-slate-600 mb-8 max-w-xl mx-auto leading-relaxed">
            {copy.index.ctaDescription}
          </p>
          <Link
            href="/contact"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3.5 rounded-lg transition-colors shadow-sm"
          >
            {copy.index.ctaButton}
          </Link>
        </section>
      </main>
    </>
  );
}
