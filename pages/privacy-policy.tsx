import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicy() {
  const { t } = useTranslation("privacy");

  const sectionKeys = [
    "collection",
    "usage",
    "protection",
    "third_party",
    "cookies",
    "rights",
    "contact",
  ];

  return (
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

                    {/* Render list items if they exist for this section */}
                    {t(`sections.${key}.items`, {
                      returnObjects: true,
                    }) instanceof Array && (
                      <ul className="list-disc pl-5 space-y-2">
                        {t(`sections.${key}.items`, {
                          returnObjects: true,
                        }).map((item, idx) => (
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
                Dokumen ini berlaku untuk seluruh entitas di bawah manajemen{" "}
                <strong>Codeverta</strong> dan{" "}
                <strong>BikinWebsiteJogja</strong>. Dengan melanjutkan
                penggunaan layanan kami, Anda dianggap menyetujui poin-poin di
                atas.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["privacy"])),
    },
  };
}
