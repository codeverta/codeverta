import Head from "next/head";
import { isValidElement } from "react";
import { useRouter } from "next/router";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  PackageCheck,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArticlePreview,
  ArticleSection,
} from "@/components/products/ArticleSection";
import WmsEvidenceSection from "@/components/products/WmsEvidenceSection";
import ContactForm from "@/components/contact-form";
import { WhatsappWrapper } from "@/components/WhatsappButton";
import SeoHead from "@/components/SeoHead";
import Layout from "@/components/layout/Landing";
import { getLocalizedPostsData } from "@/lib/posts";
import { withI18n } from "@/lib/withi18n";
import { getLocalizedUrl } from "@/lib/seo";
import { getWmsCopy } from "@/lib/wms-copy";

const WORKFLOW_ICONS = [PackageCheck, Truck, BarChart3];

function WarehouseManagementSystem({
  latestArticles,
}: {
  latestArticles: ArticlePreview[];
}) {
  const { locale = "id" } = useRouter();
  const copy = getWmsCopy(locale);

  return (
    <>
      <SeoHead
        title={copy.seo.title}
        description={copy.seo.description}
        url={getLocalizedUrl(locale, "/products/warehouse-management-system")}
        keywords={copy.seo.keywords}
        includeOfficeLocation={false}
        availableLocales={["id", "en"]}
      />

      <Head>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: copy.seo.productName,
            description: copy.seo.description,
            brand: { "@type": "Brand", name: "Codeverta" },
          })}
        </script>
      </Head>

      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 text-white">
        <div className="container mx-auto px-4 py-20 md:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-6 border-amber-400/30 bg-amber-400/10 text-amber-200">
              {copy.hero.eyebrow}
            </Badge>
            <h1 className="mb-6 text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
              {copy.hero.title}{" "}
              <span className="bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">
                {copy.hero.accent}
              </span>
            </h1>
            <p className="mx-auto mb-5 max-w-3xl text-lg leading-relaxed text-slate-300 md:text-xl">
              {copy.hero.description}
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <WhatsappWrapper
                product="wms"
                intent="demo"
                cta="request_demo"
                message={copy.demo.whatsappMessage}
                className="inline-flex justify-center"
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-green-500 px-7 py-6 text-base font-semibold text-white hover:bg-green-600"
                >
                  <span>
                    {copy.hero.primaryCta}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                </Button>
              </WhatsappWrapper>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-500 bg-transparent px-7 py-6 text-base font-semibold text-white hover:bg-slate-800 hover:text-white"
                onClick={() =>
                  document
                    .getElementById("contoh-sistem")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                {copy.hero.secondaryCta}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 dark:bg-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-amber-600">
              {copy.workflow.eyebrow}
            </p>
            <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
              {copy.workflow.title}
            </h2>
            <p className="leading-relaxed text-slate-600 dark:text-slate-300">
              {copy.workflow.intro}
            </p>
          </div>
          <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-3">
            {copy.workflow.items.map((item, index) => {
              const Icon = WORKFLOW_ICONS[index];
              return (
                <Card
                  key={item.title}
                  className="border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
                >
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <WmsEvidenceSection copy={copy.evidence} />

      <section className="bg-slate-50 py-20 dark:bg-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-amber-600">
              {copy.demo.eyebrow}
            </p>
            <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
              {copy.demo.title}
            </h2>
            <p className="leading-relaxed text-slate-600 dark:text-slate-300">
              {copy.demo.description}
            </p>
          </div>
          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
            {copy.demo.scenarios.map((scenario) => (
              <Card
                key={scenario.title}
                className="border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
              >
                <CardContent className="p-6">
                  <CheckCircle2
                    className="mb-4 h-6 w-6 text-green-600"
                    aria-hidden="true"
                  />
                  <h3 className="mb-2 font-bold text-slate-900 dark:text-white">
                    {scenario.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {scenario.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-9 text-center">
            <WhatsappWrapper
              product="wms"
              intent="demo"
              cta="request_demo"
              message={copy.demo.whatsappMessage}
              className="inline-flex justify-center"
            >
              <Button
                asChild
                size="lg"
                className="bg-green-500 px-7 py-6 font-semibold text-white hover:bg-green-600"
              >
                <span>
                  {copy.demo.cta}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </span>
              </Button>
            </WhatsappWrapper>
          </div>
        </div>
      </section>

      <ContactForm
        className="bg-white px-4 py-20 dark:bg-slate-900"
        title={copy.leadForm.title}
        description={copy.leadForm.description}
        product="wms"
        defaultService="wms"
        defaultIntent="demo"
      />

      <section className="bg-white py-20 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl gap-10 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-700 dark:bg-slate-800 md:grid-cols-[1.1fr_0.9fr] md:p-10">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-amber-600">
                {copy.scope.eyebrow}
              </p>
              <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">
                {copy.scope.title}
              </h2>
              <p className="leading-relaxed text-slate-600 dark:text-slate-300">
                {copy.scope.description}
              </p>
            </div>
            <div>
              <ul className="mb-7 space-y-4">
                {copy.scope.details.map((detail) => (
                  <li
                    key={detail}
                    className="flex items-start gap-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-amber-600"
                      aria-hidden="true"
                    />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
              <WhatsappWrapper
                product="wms"
                intent="general"
                cta="pricing_scope"
                message={copy.scope.whatsappMessage}
                className="inline-flex"
              >
                <Button
                  asChild
                  className="bg-slate-900 text-white hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                >
                  <span>
                    {copy.scope.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </Button>
              </WhatsappWrapper>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 dark:bg-slate-800/50">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-amber-600">
              {copy.faq.eyebrow}
            </p>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
              {copy.faq.title}
            </h2>
          </div>
          <div className="space-y-4">
            {copy.faq.items.map((item) => (
              <details
                key={item.question}
                className="group rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold text-slate-900 dark:text-white">
                  {item.question}
                  <span
                    className="text-slate-400 transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  >
                    ▼
                  </span>
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-amber-600 to-orange-700 py-20 text-white">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-5 text-3xl font-bold md:text-4xl">
            {copy.finalCta.title}
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-amber-100">
            {copy.finalCta.description}
          </p>
          <WhatsappWrapper
            product="wms"
            intent="demo"
            cta="request_demo"
            message={copy.demo.whatsappMessage}
            className="inline-flex justify-center"
          >
            <Button
              asChild
              size="lg"
              className="bg-white px-8 py-6 text-base font-bold text-amber-700 hover:bg-amber-50"
            >
              <span>
                {copy.finalCta.cta}
                <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            </Button>
          </WhatsappWrapper>
        </div>
      </section>

      <ArticleSection articles={latestArticles} />
    </>
  );
}

WarehouseManagementSystem.getLayout = function (page: React.ReactNode) {
  const seo = isValidElement<{
    seo: {
      title: string;
      description: string;
      keywords: string;
      includeOfficeLocation: boolean;
    };
  }>(page)
    ? page.props.seo
    : undefined;
  return (
    <Layout seo={seo} availableLocales={["id", "en"]}>
      {page}
    </Layout>
  );
};

export default WarehouseManagementSystem;

export const getStaticProps = withI18n(
  ["common", "blog", "contact"],
  function ({ locale }) {
    if (locale !== "id" && locale !== "en") {
      return { notFound: true };
    }

    const latestArticles = getLocalizedPostsData("blog", locale ?? "id")
      .filter((post) => {
        const tags = (post.tags || "").toLowerCase();
        return (
          tags.includes("gudang") ||
          tags.includes("warehouse") ||
          tags.includes("inventory")
        );
      })
      .slice(0, 3)
      .map((post: any) => ({
        id: post.id,
        title: post.title,
        desc: post.desc || "",
        date: post.date,
        image: post.image || null,
        tags: post.tags || "",
      }));

    const copy = getWmsCopy(locale);
    return {
      props: {
        latestArticles,
        seo: {
          title: copy.seo.title,
          description: copy.seo.description,
          keywords: copy.seo.keywords,
          includeOfficeLocation: false,
        },
      },
    };
  }
);
