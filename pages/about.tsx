import Layout from "components/layout/Landing";
import Head from "next/head";
import { marked } from "marked";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { LocalBusinessJsonLd } from "next-seo";
import IndonesiaHeatmap from "components/IndonesiaHeatmap";
import { motion } from "framer-motion";
import { fadeIn } from "lib/animations";

function About() {
  const { t } = useTranslation("common");
  const text = marked.parse(t("about_us.content"));

  return (
    <>
      <Head>
        <title>
          Tentang Kami | UD Million Candles - Produsen Lilin Aromaterapi
        </title>
      </Head>
      <LocalBusinessJsonLd
        type="Store"
        id="https://souvenirlilin.id"
        name="Supplier Lilin Jogja"
        description="Toko lilin hias dan souvenir terbaik di Jogja."
        url="https://souvenirlilin.id"
        telephone="+6281578956156"
        address={{
          streetAddress: "Jl. Kaliurang Km. 9,5",
          addressLocality: "Yogyakarta",
          addressRegion: "DIY",
          postalCode: "55581",
          addressCountry: "ID",
        }}
        geo={{
          latitude: "-7.7248921",
          longitude: "110.3979528",
        }}
        images={[
          "https://souvenirlilin.id/Million-Candles/Lilin-Gelas-Biru/1.png",
          "https://souvenirlilin.id/Million-Candles/Lilin-Gelas-Biru/2.png",
          "https://souvenirlilin.id/Million-Candles/Lilin-Gelas-Biru/3.png",
          "https://souvenirlilin.id/Million-Candles/Lilin-Gelas-Biru/4.png",
        ]}
        openingHours={[
          {
            opens: "09:00",
            closes: "21:00",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            validFrom: "2023-01-01",
            validThrough: "2030-12-31",
          },
        ]}
        rating={{
          ratingValue: "4.8",
          ratingCount: "150",
        }}
        review={[
          {
            author: "Andi Pratama",
            datePublished: "2023-09-15",
            name: "Lilin berkualitas tinggi",
            reviewBody:
              "Lilin dari toko ini sangat berkualitas dan aromanya menenangkan. Cocok untuk hadiah maupun dekorasi rumah.",
            reviewRating: {
              bestRating: "5",
              worstRating: "1",
              ratingValue: "5",
            },
          },
          {
            author: "Siti Nurhaliza",
            datePublished: "2023-10-01",
            name: "Pelayanan ramah",
            reviewBody:
              "Pelayanan di toko ini sangat ramah dan membantu. Saya sangat puas dengan pembelian saya.",
            reviewRating: {
              bestRating: "5",
              worstRating: "1",
              ratingValue: "5",
            },
          },
        ]}
        makesOffer={[
          {
            priceSpecification: {
              type: "UnitPriceSpecification",
              priceCurrency: "IDR",
              price: "50000-200000",
            },
            itemOffered: {
              name: "Lilin Hias",
              description:
                "Lilin hias dengan berbagai aroma dan desain unik untuk dekorasi dan souvenir.",
            },
          },
          {
            priceSpecification: {
              type: "UnitPriceSpecification",
              priceCurrency: "IDR",
              price: "60000-500000",
            },
            itemOffered: {
              name: "Paket Souvenir Lilin",
              description:
                "Paket lilin custom untuk acara pernikahan, ulang tahun, dan event lainnya.",
            },
          },
        ]}
        areaServed={[
          {
            geoMidpoint: {
              latitude: "-7.7248921",
              longitude: "110.3979528",
            },
            geoRadius: "50",
          },
        ]}
        action={{
          actionName: "potentialAction",
          actionType: "ReviewAction",
          target: "https://souvenirlilin.id",
        }}
      />
      <motion.div
        className="w-full bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-700 dark:text-gray-100"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          {/* Content Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
            <article
              className="p-8 md:p-12 prose prose-lg md:prose-xl max-w-none dark:prose-invert
                prose-headings:text-amber-800 dark:prose-headings:text-amber-400
                prose-a:text-amber-600 dark:prose-a:text-amber-300
                prose-p:text-gray-700 dark:prose-p:text-gray-300
                prose-strong:text-amber-700 dark:prose-strong:text-amber-300"
              dangerouslySetInnerHTML={{ __html: text }}
            ></article>
          </div>
        </div>
      </motion.div>

      {/* Map Section */}
      <motion.div
        className="w-full bg-gray-50 dark:bg-gray-850 py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-800 dark:text-amber-400 mb-4">
              {t("about_us.map_title", "Our Candles Trusted Across Indonesia")}
            </h2>
            <div className="h-1 w-24 bg-amber-500 rounded mx-auto mb-6"></div>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              {t(
                "about_us.map_description",
                `From Sumatra to Papua, our candles have brought warmth, light, and
                comfort to homes and businesses across the archipelago. Each location
                on the map represents a story, a moment, and a loyal customer who
                trusts the glow of our craftsmanship.`
              )}
            </p>
          </div>

          {/* Map Container with styling */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 md:p-6 overflow-hidden">
            <IndonesiaHeatmap />
          </div>

          {/* Stats or testimonial section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: "500+",
                label: t("about_us.stats.customers", "Happy Customers"),
                icon: "✨",
              },
              {
                number: "34",
                label: t("about_us.stats.provinces", "Provinces Reached"),
                icon: "🏝️",
              },
              {
                number: "100%",
                label: t("about_us.stats.handcrafted", "Handcrafted"),
                icon: "🕯️",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.2, duration: 0.5 }}
              >
                <div className="text-3xl mb-3">{stat.icon}</div>
                <div className="text-4xl font-bold text-amber-600 dark:text-amber-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        className="w-full bg-amber-100 dark:bg-gray-900 py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-amber-800 dark:text-amber-400 mb-6">
            {t(
              "about_us.cta_title",
              "Experience the Warmth of Indonesian Craftsmanship"
            )}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            {t(
              "about_us.cta_description",
              "Our candles are more than just products; they're a piece of Indonesia's rich cultural heritage."
            )}
          </p>
          <a
            href="/products"
            className="inline-block px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg shadow-md transition duration-300 transform hover:scale-105"
          >
            {t("about_us.cta_button", "Shop Our Collection")}
          </a>
        </div>
      </motion.div>
    </>
  );
}

About.getLayout = function (page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "order"])), // <- fixed to load 'order' not 'common'
    },
  };
}

export default About;
