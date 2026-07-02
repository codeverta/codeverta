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
        url="https://codeverta.com/about"
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
      <TeamSection />
      <OrgChart />
      <LocationMap t={t} />
      <SocialImpact t={t} />
    </div>
  );
}

type AboutTranslate = (key: string) => string;

const team = [
  {
    img: "/assets/employee/bu_wulan_finance.png",
    name: "Wulan Maheswari, S.E.",
    role: "Chief Financial Officer & HR",
    linkedin: "https://www.linkedin.com/company/pt-zenit-technology-solution",
    instagram: "https://www.instagram.com/codeverta",
  },
  {
    img: "/assets/employee/nabila_marketing.png",
    name: "Nabila Salma Hadiya, S.M.",
    role: "Growth & Chief Marketing Officer",
    linkedin: "https://www.linkedin.com/company/pt-zenit-technology-solution",
    instagram: "https://www.instagram.com/codeverta",
  },
  {
    img: "/assets/employee/pak_bernard_project_manager.png",
    name: "Bernard Prasetyo, S.T., PMP",
    role: "CTO, Project Manager & Engineer",
    linkedin: "https://www.linkedin.com/company/pt-zenit-technology-solution",
    instagram: "https://www.instagram.com/codeverta",
  },
  {
    img: "/assets/employee/rabih_cybersecurity_engineer.jpeg",
    name: "Rabih Utomo, S.Kom.",
    role: "Red Team, Cybersecurity Engineer",
    linkedin: "https://www.linkedin.com/in/rabih-ganteng/",
    instagram: "https://www.instagram.com/0xrabih",
  },
];

const TeamSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-14 text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600 mb-3">
            Our Team
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            Tim <span className="text-blue-600">Codeverta</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Berkenalan dengan para profesional di balik Codeverta, kami
            berdedikasi menciptakan solusi digital terbaik untuk bisnis Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {team.map((member) => (
            <div
              key={member.name}
              className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="aspect-[3/4] overflow-hidden bg-slate-100">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 text-center">
                <h3 className="font-semibold text-slate-900 text-sm leading-snug">
                  {member.name}
                </h3>
                <p className="mt-1 text-xs font-medium text-blue-600 uppercase tracking-wide">
                  {member.role}
                </p>
                <div className="mt-3 flex items-center justify-center gap-3">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-blue-600 transition-colors"
                      aria-label={`LinkedIn ${member.name}`}
                    >
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  )}
                  {member.instagram && (
                    <a
                      href={member.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-pink-500 transition-colors"
                      aria-label={`Instagram ${member.name}`}
                    >
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const LocationMap = ({ t }: { t: AboutTranslate }) => {
  const mapUrl =
    "https://www.google.com/maps?q=-7.7248765,110.3979139&z=18&output=embed";
  const directionsUrl = "https://maps.app.goo.gl/iR4RFPnsUrSRNf8G9";

  return (
    <section className="py-20 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            {t("location.badge")}
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t("location.heading")}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            {t("location.description")}
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <iframe
            src={mapUrl}
            title={t("location.mapTitle")}
            className="h-[24rem] w-full md:h-[30rem]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          {t("location.cta")}
        </a>
      </div>
    </section>
  );
};

const SocialImpact = ({ t }: { t: AboutTranslate }) => {
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
