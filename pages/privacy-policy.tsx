import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SeoHead from "@/components/SeoHead";
import { buildSeoMeta, SITE_NAME, SITE_URL } from "@/lib/seo";

export default function PrivacyPolicy() {
  const { t } = useTranslation("privacy");
  const router = useRouter();
  const seo = buildSeoMeta({
    locale: router.locale,
    path: "/privacy-policy",
    title: t("seo.title"),
    description: t("seo.description"),
    keywords: t("seo.keywords"),
  });

  const sectionKeys = [
    "collection",
    "usage",
    "protection",
    "third_party",
    "cookies",
    "rights",
    "contact",
  ];
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${seo.canonical}#webpage`,
    url: seo.canonical,
    name: seo.title,
    description: seo.description,
    inLanguage: seo.locale,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: {
      "@type": "Thing",
      name: t("schema.about"),
    },
  };

  return (
    <>
      <SeoHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        image={seo.image}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
        />
      </Head>
      <div className="bg-slate-50 min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-none shadow-lg">
            <CardHeader className="space-y-4 text-center">
              <CardTitle className="text-4xl font-extrabold text-slate-900">
                {t("title")}
              </CardTitle>
              <p className="text-slate-500 font-medium">{t("last_updated")}</p>
            </CardHeader>

            <CardContent className="pt-6">
              <p className="text-slate-600 leading-relaxed mb-8 text-lg">
                {t("intro")}
              </p>

              <Accordion type="single" collapsible className="w-full space-y-4">
                {sectionKeys.map((key) => (
                  <AccordionItem
                    key={key}
                    value={key}
                    className="border bg-white px-4 rounded-lg shadow-sm"
                  >
                    <AccordionTrigger className="hover:no-underline font-bold text-slate-800 text-left">
                      {t(`sections.${key}.title`)}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 leading-relaxed pt-2 pb-4">
                      <p className="mb-4">{t(`sections.${key}.content`)}</p>

                      {t(`sections.${key}.items`, {
                        returnObjects: true,
                      }) instanceof Array && (
                        <ul className="list-disc pl-5 space-y-2">
                          {(
                            t(`sections.${key}.items`, {
                              returnObjects: true,
                            }) as string[]
                          ).map((item, idx) => (
                            <li key={idx} className="pl-2">
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="mt-12 p-6 bg-primary/5 rounded-xl border border-primary/10">
                <p className="text-sm text-center text-slate-500">
                  {t("notice.before")} <strong>Codeverta</strong>{" "}
                  {t("notice.and")} <strong>BikinWebsiteJogja</strong>.{" "}
                  {t("notice.after")}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "privacy"])),
    },
  };
}
