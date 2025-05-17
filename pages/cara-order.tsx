import React from "react";
import { Phone, ShoppingBag, CreditCard, Truck, Clock } from "lucide-react";
import Layout from "components/layout/Landing";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const CandleOrderPage = () => {
  const { t } = useTranslation("order");

  return (
    <div className="min-h-screen text-gray-800 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-amber-800 mb-4">
            {t("howToOrder.title")}
          </h1>
          <p className="text-lg md:text-xl text-amber-700">
            {t("header.subtitle")}
          </p>
        </header>

        {/* Main Content */}
        <main>
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-amber-800 mb-6 text-center"></h2>

            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="bg-amber-100 p-3 rounded-full">
                  <Phone className="w-8 h-8 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-medium text-amber-700 mb-2">
                    {t("howToOrder.step1.title")}
                  </h3>
                  <p className="text-gray-600">
                    {t("howToOrder.step1.description")}{" "}
                    <span className="font-medium text-green-600">
                      {t("howToOrder.step1.phone")}
                    </span>{" "}
                    {t("howToOrder.step1.contactNote")}
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="bg-amber-100 p-3 rounded-full">
                  <ShoppingBag className="w-8 h-8 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-medium text-amber-700 mb-2">
                    {t("howToOrder.step2.title")}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    {t("howToOrder.step2.description")}
                  </p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    <li>
                      <span className="font-medium">
                        {t("howToOrder.step2.pickupTitle")}:
                      </span>{" "}
                      {t("howToOrder.step2.pickupDescription")}
                    </li>
                    <li>
                      <span className="font-medium">
                        {t("howToOrder.step2.deliveryTitle")}:
                      </span>{" "}
                      {t("howToOrder.step2.deliveryDescription")}
                    </li>
                  </ul>
                  <p className="text-gray-600 mt-2 italic">
                    {t("howToOrder.step2.note")}
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="bg-amber-100 p-3 rounded-full">
                  <CreditCard className="w-8 h-8 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-medium text-amber-700 mb-2">
                    {t("howToOrder.step3.title")}
                  </h3>
                  <p className="text-gray-600">
                    {t("howToOrder.step3.description")}
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="bg-amber-100 p-3 rounded-full">
                  <Truck className="w-8 h-8 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-medium text-amber-700 mb-2">
                    {t("howToOrder.step4.title")}
                  </h3>
                  <p className="text-gray-600">
                    {t("howToOrder.step4.description")}
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="bg-amber-100 p-3 rounded-full">
                  <Clock className="w-8 h-8 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-medium text-amber-700 mb-2">
                    {t("howToOrder.step5.title")}
                  </h3>
                  <p className="text-gray-600">
                    {t("howToOrder.step5.description")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-amber-100 rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-amber-800 mb-3">
              {t("cta.title")}
            </h3>
            <p className="text-amber-700 mb-4">{t("cta.subtitle")}</p>
            <a
              href="https://wa.me/+6281578956156?text=Halo%20saya%20tertarik%20dengan%20produk%20lilin%20Anda"
              target="_blank"
              className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-6 rounded-full transition duration-300 flex items-center justify-center mx-auto"
            >
              <Phone className="w-5 h-5 mr-2" />
              {t("cta.button")}
            </a>
          </div>
        </main>
      </div>
    </div>
  );
};

CandleOrderPage.getLayout = function (page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "order"])),
    },
  };
}

export default CandleOrderPage;
