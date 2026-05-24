import { useTranslation } from "next-i18next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { withI18n } from "@/lib/withi18n";
import SeoHead from "@/components/SeoHead";
import { buildSeoMeta, SITE_NAME, SITE_URL } from "@/lib/seo";

export const getStaticProps = withI18n(["common"]);
export default function TermsPage() {
  const { t } = useTranslation("common");
  const router = useRouter();

  const sections = ["services", "payment", "ip", "liability"];
  const seo = buildSeoMeta({
    locale: router.locale,
    path: "/terms",
    title: t("terms.seo.title"),
    description: t("terms.seo.description"),
    keywords: t("terms.seo.keywords"),
  });
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
      name: t("terms.schema.about"),
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
      <div className="container mx-auto py-10 px-4 max-w-4xl">
        <Card className="border-none shadow-none lg:border lg:shadow-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold uppercase tracking-tight">
              {t("terms.title")}
            </CardTitle>
            <p className="text-sm text-muted-foreground italic">
              {t("terms.last_updated")}
            </p>
          </CardHeader>

          <Separator className="my-4" />

          <CardContent>
            <p className="mb-8 text-leading text-gray-700">
              {t("terms.intro")}
            </p>

            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-8">
                {sections.map((section) => (
                  <section key={section}>
                    <h2 className="text-xl font-semibold mb-3 text-primary">
                      {t(`terms.sections.${section}.title`)}
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      {t(`terms.sections.${section}.content`)}
                    </p>
                  </section>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <footer className="mt-10 text-center text-sm text-muted-foreground">
          © 2025 Codeverta - {t("footer.rights")}
        </footer>
      </div>
    </>
  );
}
