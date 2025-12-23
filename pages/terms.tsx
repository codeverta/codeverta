import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function TermsPage() {
  const { t } = useTranslation("common");

  const sections = ["services", "payment", "ip", "liability"];

  return (
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
          <p className="mb-8 text-leading text-gray-700">{t("terms.intro")}</p>

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
        © 2025 codeverta.com & bikinwebsitejogja.com - All Rights Reserved.
      </footer>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
