import React from "react";
import {
  TrendingUp,
  Package,
  Calendar,
  MapPin,
  Flame,
  Award,
} from "lucide-react";
import { useTranslation } from "next-i18next";

const BusinessStatsSection = () => {
  const { t } = useTranslation("common");

  const stats = [
    {
      icon: <TrendingUp className="text-amber-500" size={32} />,
      value: "2,000–5,000",
      labelKey: "stats.candlesProduced.label",
      descriptionKey: "stats.candlesProduced.description",
    },
    {
      icon: <Package className="text-amber-500" size={32} />,
      value: "100+",
      labelKey: "stats.candleVariants.label",
      descriptionKey: "stats.candleVariants.description",
    },
    {
      icon: <Calendar className="text-amber-500" size={32} />,
      value: t("stats.yearsOfExcellence.value"),
      labelKey: "stats.yearsOfExcellence.label",
      descriptionKey: "stats.yearsOfExcellence.description",
    },
    {
      icon: <MapPin className="text-amber-500" size={32} />,
      value: t("stats.cities.value"),
      labelKey: "stats.cities.label",
      descriptionKey: "stats.cities.description",
    },
    {
      icon: <Flame className="text-amber-500" size={32} />,
      value: "1,000,000+",
      labelKey: "stats.candlesSold.label",
      descriptionKey: "stats.candlesSold.description",
    },
    {
      icon: <Award className="text-amber-500" size={32} />,
      value: "99.8%",
      labelKey: "stats.quality.label",
      descriptionKey: "stats.quality.description",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t("stats.title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("stats.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                {stat.icon}
                <span className="ml-3 text-3xl font-bold text-gray-900">
                  {stat.value}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {t(stat.labelKey)}
              </h3>
              <p className="text-gray-600">{t(stat.descriptionKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessStatsSection;
