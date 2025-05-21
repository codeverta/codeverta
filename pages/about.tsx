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
          Tentang Kami | UD Codeverta - Produsen Lilin Aromaterapi
        </title>
      </Head>
      <LocalBusinessJsonLd
        type="Store"
        id="https://codeverta.com"
        name="Supplier Lilin Jogja"
        description="Toko lilin hias dan souvenir terbaik di Jogja."
        url="https://codeverta.com"
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
          "https://codeverta.com/Million-Candles/Lilin-Gelas-Biru/1.png",
          "https://codeverta.com/Million-Candles/Lilin-Gelas-Biru/2.png",
          "https://codeverta.com/Million-Candles/Lilin-Gelas-Biru/3.png",
          "https://codeverta.com/Million-Candles/Lilin-Gelas-Biru/4.png",
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
          target: "https://codeverta.com",
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
