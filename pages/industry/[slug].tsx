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
  ["common"],
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
        className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[var(--accent)] selection:text-white pb-0"
        style={{ "--accent": industry.accentColor } as React.CSSProperties}
      >
        {/* ── Enterprise Hero Section ── */}
        <div className="relative bg-slate-900 overflow-hidden border-b border-slate-800">
          {/* Abstract Background Gradient */}
          <div
            className="absolute top-0 right-0 w-[800px] h-[800px] opacity-20 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/4 pointer-events-none"
            style={{ background: "var(--accent)" }}
          />

          {/* Breadcrumb Layered on Hero */}
          <nav
            className="relative z-20 flex items-center gap-2 pt-8 px-6 lg:px-12 max-w-[90rem] mx-auto text-sm text-slate-400 font-medium"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-white transition-colors">
              {copy.detail.breadcrumbHome}
            </Link>
            <span className="text-slate-600">/</span>
            <Link
              href="/industry"
              className="hover:text-white transition-colors"
            >
              {copy.detail.breadcrumbIndustries}
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-white">{industry.name}</span>
          </nav>

          <section className="relative z-10 max-w-[90rem] mx-auto px-6 lg:px-12 pt-16 pb-24 lg:pt-24 lg:pb-32 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Hero Content */}
            <div>
              <div className="inline-flex items-center gap-3 mb-8">
                <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 text-2xl shadow-inner border border-white/5 backdrop-blur-sm">
                  {industry.icon}
                </span>
                <span
                  className="text-xs font-bold tracking-widest uppercase py-1.5 px-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm"
                  style={{ color: "var(--accent)" }}
                >
                  {copy.detail.badge}
                </span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
                {industry.name}
              </h1>
              <p className="text-xl lg:text-2xl font-light text-slate-300 mb-8 max-w-2xl leading-relaxed">
                <span
                  className="font-semibold text-white mr-2"
                  style={{ color: "var(--accent)" }}
                >
                  {industry.tagline}
                </span>
                {industry.description}
              </p>
              <div className="flex flex-wrap gap-4 items-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center font-bold py-4 px-8 rounded-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-white"
                  style={{ backgroundColor: "var(--accent)" }}
                >
                  {copy.detail.primaryCta}
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center font-bold py-4 px-8 rounded-lg border border-slate-700 bg-slate-800/50 text-white hover:bg-slate-700 transition-all backdrop-blur-sm"
                >
                  {copy.detail.secondaryCta}
                </Link>
              </div>

              {/* Integrated Stat Card */}
              <div className="mt-16 flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md max-w-md">
                <div
                  className="text-4xl lg:text-5xl font-black tracking-tighter"
                  style={{ color: "var(--accent)" }}
                >
                  {industry.heroStat.value}
                </div>
                <div>
                  <div className="text-sm font-bold text-white mb-1 leading-snug">
                    {industry.heroStat.label}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">
                    {copy.detail.statNote}
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Right: Masonry Staggered Carousel Concept */}
            <div className="relative h-[600px] w-full hidden lg:block group perspective-[1000px]">
              <div className="absolute inset-0 grid grid-cols-2 gap-6 transform rotate-y-[-10deg] rotate-x-[5deg] group-hover:rotate-0 transition-transform duration-1000 ease-out">
                <div className="flex flex-col gap-6 -translate-y-12 group-hover:-translate-y-8 transition-transform duration-1000">
                  <img
                    src={industry.images.hero[0]}
                    alt="Corporate"
                    className="rounded-3xl object-cover h-[350px] w-full shadow-2xl border border-white/10"
                  />
                  <img
                    src={industry.images.hero[1]}
                    alt="Enterprise"
                    className="rounded-3xl object-cover h-[250px] w-full shadow-2xl border border-white/10"
                  />
                </div>
                <div className="flex flex-col gap-6 translate-y-12 group-hover:translate-y-8 transition-transform duration-1000">
                  <img
                    src={industry.images.hero[2]}
                    alt="Business"
                    className="rounded-3xl object-cover h-[250px] w-full shadow-2xl border border-white/10"
                  />
                  <img
                    src={industry.images.hero[3]}
                    alt="Architecture"
                    className="rounded-3xl object-cover h-[350px] w-full shadow-2xl border border-white/10"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ── Featured Clients Enterprise Marquee ── */}
        <div className="bg-slate-900 border-b border-slate-800 py-6 px-6 overflow-hidden flex flex-col md:flex-row items-center gap-8 shadow-inner">
          <span className="text-xs font-black tracking-[0.2em] uppercase text-slate-500 whitespace-nowrap shrink-0">
            {copy.detail.trustedBy}
          </span>
          <div
            className="flex gap-8 overflow-hidden w-full"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            }}
          >
            {[
              ...industry.featuredClients,
              ...industry.featuredClients,
              ...industry.featuredClients,
            ].map((client, i) => (
              <span
                key={i}
                className="shrink-0 text-xl font-bold text-slate-700 whitespace-nowrap hover:text-white transition-colors cursor-default"
              >
                {client}
              </span>
            ))}
          </div>
        </div>

        {/* ── Enterprise Masonry Gallery ── */}
        <section className="bg-slate-100 py-24 px-6">
          <div className="max-w-[90rem] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                Global Impact & Operations
              </h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                Visualizing our commitment to excellence, scalable
                infrastructure, and industry-leading corporate environments.
              </p>
            </div>
            <div className="columns-1 sm:columns-2 lg:columns-4 gap-6 space-y-6">
              {industry.images.gallery.map((imgSrc, idx) => (
                <img
                  key={idx}
                  src={imgSrc}
                  className="rounded-2xl w-full object-cover break-inside-avoid shadow-sm hover:shadow-xl transition-all duration-300"
                  alt={`Gallery ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── Body Content Grid ── */}
        <div className="max-w-[90rem] mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* ── Challenges Column ── */}
          <section className="lg:col-span-5">
            <div className="sticky top-12">
              <div
                className="text-xs font-black tracking-widest uppercase mb-4"
                style={{ color: "var(--accent)" }}
              >
                {copy.detail.problemEyebrow}
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8 leading-tight tracking-tight">
                {interpolate(copy.detail.problemTitleTemplate, {
                  industry: industry.name,
                })}
              </h2>
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
                <ul className="flex flex-col gap-6">
                  {industry.challenges.map((c, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-5 text-slate-600 text-lg leading-relaxed group"
                    >
                      <span
                        className="shrink-0 w-3 h-3 rounded-full mt-2.5 transition-transform group-hover:scale-150 shadow-sm"
                        style={{ backgroundColor: "var(--accent)" }}
                      />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* ── Solutions Column ── */}
          <section className="lg:col-span-7">
            <div
              className="text-xs font-black tracking-widest uppercase mb-4"
              style={{ color: "var(--accent)" }}
            >
              {copy.detail.solutionEyebrow}
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8 leading-tight tracking-tight">
              {copy.detail.solutionTitle}
            </h2>
            <div className="flex flex-col gap-6">
              {industry.solutions.map((sol, i) => (
                <div
                  key={i}
                  className="group bg-white rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl border border-slate-100 hover:border-transparent relative overflow-hidden"
                >
                  <div
                    className="absolute top-0 right-0 w-32 h-32 opacity-5 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: "var(--accent)" }}
                  />
                  <div
                    className="text-sm font-black tracking-widest mb-4 opacity-50"
                    style={{ color: "var(--accent)" }}
                  >
                    0{i + 1} //
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">
                    {sol.title}
                  </h3>
                  <p className="text-lg text-slate-500 leading-relaxed max-w-3xl">
                    {sol.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ── Enterprise Testimonial ── */}
        <section className="bg-slate-900 text-white py-32 px-6 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10 blur-3xl pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 50%, var(--accent) 0%, transparent 50%)`,
            }}
          />
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <div
              className="text-8xl leading-none opacity-20 font-serif mb-8 select-none"
              style={{ color: "var(--accent)" }}
            >
              &ldquo;
            </div>
            <blockquote className="text-3xl md:text-5xl font-light leading-tight text-white mb-12 tracking-tight">
              {industry.testimonial.quote}
            </blockquote>
            <div className="inline-flex items-center gap-6 text-left bg-white/5 border border-white/10 rounded-full pr-8 pl-2 py-2 backdrop-blur-sm">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg"
                style={{ backgroundColor: "var(--accent)", color: "#fff" }}
              >
                {industry.testimonial.author.charAt(0)}
              </div>
              <div>
                <div className="text-lg font-bold text-white tracking-tight">
                  {industry.testimonial.author}
                </div>
                <div className="text-sm text-slate-400 font-medium uppercase tracking-widest mt-1">
                  {industry.testimonial.company}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── App Screenshots (education LMS) ── */}
        {industry.images?.screenshots &&
          industry.images.screenshots.length > 0 && (
            <section className="bg-white py-24 px-6 border-b border-slate-200">
              <div className="max-w-[90rem] mx-auto">
                <div className="text-center mb-16">
                  <div className="text-xs font-black tracking-widest uppercase text-slate-400 mb-3">
                    Platform Screenshots
                  </div>
                  <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                    Learning Management System
                  </h2>
                  <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                    A look inside our LMS platform — from AI chat to
                    certificates, schedules, and quizzes.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {industry.images.screenshots.map((src, idx) => (
                    <div
                      key={idx}
                      className="group bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300"
                    >
                      <img
                        src={src}
                        alt={`Screenshot ${idx + 1}`}
                        className="w-full object-cover aspect-[4/3] group-hover:scale-[1.02] transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

        {/* ── Explore More Industries ── */}
        <section className="bg-white py-32 px-6 border-b border-slate-200">
          <div className="max-w-[90rem] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                <div className="text-xs font-black tracking-widest uppercase text-slate-400 mb-3">
                  {copy.detail.moreEyebrow}
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                  {copy.detail.moreTitle}
                </h2>
              </div>
              <Link
                href="/industry"
                className="hidden md:inline-flex items-center justify-center font-bold py-3 px-8 rounded-lg border-2 border-slate-200 text-slate-600 hover:border-slate-900 hover:text-slate-900 transition-all"
              >
                {copy.detail.viewAll}
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {others.map((ind) => (
                <Link
                  key={ind.slug}
                  href={`/industry/${ind.slug}`}
                  className="group flex flex-col bg-slate-50 border border-slate-200 rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                  style={
                    { "--card-accent": ind.accentColor } as React.CSSProperties
                  }
                >
                  <div className="flex justify-between items-start mb-12">
                    <span className="text-5xl bg-white p-4 rounded-2xl shadow-sm border border-slate-100 group-hover:scale-110 transition-transform duration-500">
                      {ind.icon}
                    </span>
                    <span className="text-slate-300 group-hover:text-[var(--card-accent)] group-hover:translate-x-2 transition-all duration-300 text-2xl">
                      &rarr;
                    </span>
                  </div>
                  <div>
                    <div className="text-xl font-extrabold text-slate-900 mb-2 tracking-tight">
                      {ind.name}
                    </div>
                    <div className="text-sm text-slate-500 font-medium line-clamp-2 leading-relaxed">
                      {ind.tagline}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-10 md:hidden">
              <Link
                href="/industry"
                className="inline-flex items-center justify-center font-bold py-4 px-8 rounded-lg border-2 border-slate-200 text-slate-600 w-full"
              >
                {copy.detail.viewAll}
              </Link>
            </div>
          </div>
        </section>

        {/* ── Enterprise Bottom CTA ── */}
        <section className="text-center px-6 py-32 bg-slate-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-6 leading-tight">
              {interpolate(copy.detail.bottomTitleTemplate, {
                industry: industry.name.toLowerCase(),
              })}
            </h2>
            <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed">
              {copy.detail.bottomDescription}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center text-lg font-bold py-5 px-12 rounded-xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 text-white"
              style={{ backgroundColor: "var(--accent)" }}
            >
              {copy.detail.bottomCta}
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
