import React, { useState } from "react";
import {
  ChevronDown,
  HelpCircle,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { handleRedirectToWhatsapp } from "@/components/WhatsappButton";
import Head from "next/head";
import SeoHead from "@/components/SeoHead";
import { withI18n } from "@/lib/withi18n";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { buildSeoMeta, SITE_NAME, SITE_URL } from "@/lib/seo";

export const getStaticProps = withI18n(["common"]);

// --- KOMPONEN ACCORDION ITEM (Gaya Shadcn) ---
const AccordionItem = ({ item, isOpen, onClick }) => {
  // Fungsi helper untuk merender teks dengan formatting bold markdown (**) sederhana
  const renderText = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="font-semibold text-slate-900">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between py-4 text-left text-sm font-medium transition-all hover:underline md:text-base group"
        aria-expanded={isOpen}
      >
        <span
          className={`text-slate-700 group-hover:text-slate-900 ${
            isOpen ? "text-slate-900" : ""
          }`}
        >
          {item.question}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-slate-900" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100 mb-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="text-slate-600 leading-relaxed text-sm md:text-base pt-1 pb-2">
          {renderText(item.answer)}
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function FAQPage() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState(0); // Item pertama terbuka default

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };
  const faqData = t("faqPage.items", { returnObjects: true }) as {
    question: string;
    answer: string;
  }[];
  const seo = buildSeoMeta({
    locale: router.locale,
    path: "/faq",
    title: t("faqPage.seo.title"),
    description: t("faqPage.seo.description"),
    keywords: t("faqPage.seo.keywords"),
  });

  // --- GENERATE JSON-LD SCHEMA UNTUK SEO ---
  // Ini sangat penting agar Google menampilkan FAQ snippet di hasil pencarian
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${seo.canonical}#faq`,
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
    mainEntity: faqData.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer.replace(/\*\*/g, ""), // Bersihkan markdown untuk schema
      },
    })),
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-10 space-y-4">
            <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-full mb-2">
              <HelpCircle className="h-5 w-5 text-blue-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              {t("faqPage.title")}
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {t("faqPage.subtitle")}
            </p>
          </div>

          {/* FAQ Container (Card Style) */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 md:p-8">
              {faqData.map((item, index) => (
                <AccordionItem
                  key={index}
                  item={item}
                  isOpen={openIndex === index}
                  onClick={() => toggleAccordion(index)}
                />
              ))}
            </div>
          </div>

          {/* CTA Section (Bottom) */}
          <div className="mt-10 bg-slate-900 rounded-2xl p-8 text-center text-white shadow-lg">
            <h3 className="text-xl font-semibold mb-3">
              {t("faqPage.cta.title")}
            </h3>
            <p className="text-slate-300 mb-6 max-w-lg mx-auto">
              {t("faqPage.cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleRedirectToWhatsapp}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-slate-900 bg-white hover:bg-slate-100 transition-colors w-full sm:w-auto"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {t("faqPage.cta.whatsapp")}
              </button>
              <Link
                href={"/produk"}
                className="inline-flex items-center justify-center px-6 py-3 border border-slate-600 text-base font-medium rounded-md text-white hover:bg-slate-800 transition-colors w-full sm:w-auto"
              >
                {t("faqPage.cta.portfolio")}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
