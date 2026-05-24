import { ShieldCheck } from "lucide-react";
import SeoHead from "@/components/SeoHead";
import { withI18n } from "@/lib/withi18n";
import { Heart, Activity } from "lucide-react";
import { useTranslation } from "next-i18next";
import OrgChart from "@/components/OrgChart";

export const getStaticProps = withI18n(["common", "about"]);

export default function AboutPage() {
  const { t } = useTranslation("about");

  return (
    <div className="bg-white text-slate-900 font-sans">
      <SeoHead
        title={t("seo.title")}
        description={t("seo.description")}
        keywords={t("seo.keywords")}
      />
      {/* --- OUR STORY / MISSION --- */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                {/* Placeholder Image: Office / Team working */}
                <img
                  src="/assets/images/meeting.jpeg"
                  alt={t("story.imageAlt")}
                  className="object-cover w-full h-[25rem]"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-blue-600 rounded-lg -z-10 hidden lg:block"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-slate-200 rounded-full -z-10 hidden lg:block"></div>
            </div>

            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-slate-900 text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                {t("story.heading.prefix")}{" "}
                <span className="text-blue-600">
                  {t("story.heading.highlight")}
                </span>
              </h2>
              <div className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                <p>{t("story.paragraphs.0")}</p>
                <p>{t("story.paragraphs.1")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <OrgChart />
      <SocialImpact t={t} />
    </div>
  );
}

const SocialImpact = ({ t }) => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side: Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-sm font-medium text-rose-700 dark:bg-rose-900/30 dark:text-rose-400">
              <Heart className="mr-2 h-4 w-4 fill-rose-500" />
              <span>{t("impact.badge")}</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t("impact.heading.prefix")}{" "}
              <span className="text-rose-600">
                {t("impact.heading.highlight")}
              </span>
            </h2>

            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              {t("impact.description.before")}{" "}
              <span className="font-semibold text-slate-900 dark:text-white">
                {t("impact.description.pledge")}
              </span>{" "}
              {t("impact.description.after")}{" "}
              <a
                href="http://kitabisa.com/"
                target="_blank"
                className="underline text-blue-600"
              >
                kitabisa.com
              </a>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <Activity className="h-6 w-6 text-rose-500 shrink-0" />
                <div>
                  <h4 className="font-semibold">
                    {t("impact.cards.direct.title")}
                  </h4>
                  <p className="text-sm text-slate-500">
                    {t("impact.cards.direct.description")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <ShieldCheck className="h-6 w-6 text-blue-500 shrink-0" />
                <div>
                  <h4 className="font-semibold">
                    {t("impact.cards.ethical.title")}
                  </h4>
                  <p className="text-sm text-slate-500">
                    {t("impact.cards.ethical.description")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Visual Card */}
          <div className="relative group bg-slate-100 dark:bg-slate-900 rounded-2xl overflow-hidden">
            <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-tr from-rose-500/20 via-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-1000 blur-2xl" />

            <img
              src="/assets/images/kitabisa.jpg"
              alt={t("impact.imageAlt")}
              className="relative rounded-2xl object-contain w-full h-[25rem] shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
