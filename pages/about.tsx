import Layout from "components/layout/Landing";
import Head from "next/head";
import { marked } from "marked";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { LocalBusinessJsonLd } from "next-seo";
import { motion } from "framer-motion";
import { fadeIn } from "lib/animations";

function About() {
  const { t } = useTranslation("common");
  const text = marked.parse(`
Di Codeverta, kami percaya bahwa informasi yang tepat adalah kunci untuk menghadapi masa depan digital. Tim kami terdiri dari penulis teknologi berpengalaman, analis industri, developer profesional, dan praktisi IT yang berdedikasi untuk menyajikan konten berkualitas tinggi yang mudah dipahami namun tetap komprehensif.

## Visi & Misi

**Visi:** Menjadi media teknologi terdepan di Indonesia yang memberdayakan bisnis dengan informasi dan solusi digital terkini.

**Misi:**
- Menyediakan informasi teknologi yang akurat, terpercaya, dan mudah dipahami
- Memberikan solusi IT yang inovatif dan sesuai kebutuhan bisnis
- Membantu transformasi digital perusahaan dengan pendekatan yang tepat
- Membangun komunitas teknologi yang saling mendukung dan berkembang

## Apa yang Kami Lakukan

### 📰 Media Teknologi
Kami menghadirkan berita, artikel, dan analisis mendalam tentang:
- **Teknologi Terkini** - Update tentang perkembangan teknologi global dan lokal
- **Artificial Intelligence** - Insight tentang AI, machine learning, dan implementasinya
- **Startup & Inovasi** - Cerita inspiratif dari dunia startup dan inovasi digital
- **Digital Transformation** - Panduan praktis transformasi digital untuk bisnis

### 💻 Layanan IT Profesional
Tim developer dan konsultan IT kami menyediakan:
- **Pembuatan Website** - Website modern, responsif, dan SEO-friendly
- **Aplikasi Mobile** - Pengembangan aplikasi iOS dan Android
- **Sistem Manajemen** - ERP, CRM, dan sistem custom sesuai kebutuhan
- **E-commerce Solution** - Platform jual beli online yang terintegrasi

### 🔧 Konsultasi & Problem Solving
Kami membantu menyelesaikan berbagai tantangan teknologi:
- **Audit Sistem** - Evaluasi dan optimasi infrastruktur IT
- **Migrasi Data** - Pemindahan sistem lama ke platform modern
- **Keamanan Siber** - Implementasi security best practices
- **Strategi Digital** - Perencanaan roadmap teknologi perusahaan

## Mengapa Memilih Codeverta?

### 🎯 **Expertise yang Terpercaya**
Tim kami memiliki pengalaman bertahun-tahun di industri teknologi, dengan track record project yang sukses dari berbagai sektor bisnis.

### 🚀 **Teknologi Terdepan**
Kami selalu menggunakan teknologi terkini dan best practices untuk memastikan solusi yang kami berikan future-proof dan scalable.

### 📊 **Pendekatan Data-Driven**
Setiap keputusan dan rekomendasi yang kami berikan didasarkan pada data dan analisis mendalam, bukan asumsi.

### 🤝 **Partnership Jangka Panjang**
Kami tidak hanya sebagai vendor, tetapi sebagai partner teknologi yang mendampingi pertumbuhan bisnis Anda.

## Tim Codeverta

Tim kami terdiri dari profesional multidisiplin yang passionate dalam teknologi:

- **Tech Writers** - Penulis berpengalaman dalam teknologi dan bisnis
- **Software Engineers** - Developer full-stack dengan expertise di berbagai teknologi
- **UI/UX Designers** - Desainer yang memahami user experience dan business goals
- **IT Consultants** - Konsultan dengan pengalaman enterprise-level
- **Digital Strategists** - Ahli strategi digital dan transformasi bisnis

## Komitmen Kualitas

Kami berkomitmen untuk:
- ✅ **Memberikan informasi yang akurat dan up-to-date**
- ✅ **Menyediakan solusi yang sesuai dengan kebutuhan dan budget**
- ✅ **Mengutamakan kepuasan dan kesuksesan klien**
- ✅ **Mendukung pertumbuhan ekosistem teknologi Indonesia**

## Mari Berkolaborasi

Apakah Anda membutuhkan informasi teknologi terkini, solusi IT untuk bisnis, atau konsultasi digital strategy? Tim Codeverta siap membantu Anda menghadapi tantangan teknologi dan meraih kesuksesan di era digital.

**Hubungi kami untuk diskusi lebih lanjut:**

- 📧 Email: utomoteknologi@gmail.com

---

*Codeverta - Empowering Business Through Technology*`);

  return (
    <>
      <Head>
        <title>
          Tentang Kami | Codeverta - Media Teknologi, Inovasi Digital & AI,
          Startup
        </title>
        <meta
          name="description"
          content="Codeverta adalah media teknologi terdepan yang menyediakan informasi, layanan IT, dan solusi digital untuk bisnis modern."
        />
        <meta
          name="keywords"
          content="codeverta, media teknologi, layanan IT, pembuatan website, solusi digital, startup, AI, inovasi"
        />
      </Head>
      <LocalBusinessJsonLd
        type="TechCompany"
        id="https://codeverta.com"
        name="Codeverta"
        description="Media teknologi dan penyedia layanan IT terdepan untuk solusi digital bisnis modern."
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
          "https://codeverta.com/images/codeverta-logo.png",
          "https://codeverta.com/images/team-photo.jpg",
          "https://codeverta.com/images/office-space.jpg",
        ]}
        openingHours={[
          {
            opens: "09:00",
            closes: "17:00",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            validFrom: "2023-01-01",
            validThrough: "2030-12-31",
          },
        ]}
        rating={{
          ratingValue: "4.9",
          ratingCount: "85",
        }}
        review={[
          {
            author: "Ahmad Rizki",
            datePublished: "2024-01-15",
            name: "Layanan IT Profesional",
            reviewBody:
              "Tim Codeverta sangat profesional dalam mengembangkan website perusahaan kami. Hasilnya melampaui ekspektasi dan support aftercare-nya excellent.",
            reviewRating: {
              bestRating: "5",
              worstRating: "1",
              ratingValue: "5",
            },
          },
          {
            author: "Sarah Indira",
            datePublished: "2024-02-20",
            name: "Konten Teknologi Berkualitas",
            reviewBody:
              "Artikel-artikel di Codeverta selalu update dan memberikan insight yang valuable untuk bisnis digital. Sangat recommended!",
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
              price: "5000000-50000000",
            },
            itemOffered: {
              name: "Pembuatan Website",
              description:
                "Layanan pembuatan website profesional dengan teknologi terkini untuk bisnis dan perusahaan.",
            },
          },
          {
            priceSpecification: {
              type: "UnitPriceSpecification",
              priceCurrency: "IDR",
              price: "2000000-20000000",
            },
            itemOffered: {
              name: "Konsultasi IT",
              description:
                "Konsultasi teknologi informasi untuk optimasi sistem dan transformasi digital perusahaan.",
            },
          },
          {
            priceSpecification: {
              type: "UnitPriceSpecification",
              priceCurrency: "IDR",
              price: "3000000-30000000",
            },
            itemOffered: {
              name: "Solusi Digital",
              description:
                "Pengembangan aplikasi mobile, sistem manajemen, dan solusi teknologi custom sesuai kebutuhan bisnis.",
            },
          },
        ]}
        areaServed={[
          {
            geoMidpoint: {
              latitude: "-7.7248921",
              longitude: "110.3979528",
            },
            geoRadius: "1000", // Melayani seluruh Indonesia
          },
        ]}
        action={{
          actionName: "potentialAction",
          actionType: "ReviewAction",
          target: "https://codeverta.com",
        }}
      />
      <motion.div
        className="w-full bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-700 dark:text-gray-100"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
              variants={fadeIn}
            >
              Tentang{" "}
              <span className="text-blue-600 dark:text-blue-400">
                Codeverta
              </span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              variants={fadeIn}
            >
              Media teknologi terdepan yang memberdayakan bisnis dengan
              informasi dan solusi digital terkini
            </motion.p>
          </div>

          {/* Content Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
            <article
              className="p-8 md:p-12 prose prose-lg md:prose-xl max-w-none dark:prose-invert
                prose-headings:text-blue-800 dark:prose-headings:text-blue-400
                prose-a:text-blue-600 dark:prose-a:text-blue-300
                prose-p:text-gray-700 dark:prose-p:text-gray-300
                prose-strong:text-blue-700 dark:prose-strong:text-blue-300"
              dangerouslySetInnerHTML={{ __html: text }}
            ></article>
          </div>

          {/* Services Preview */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center"
              variants={fadeIn}
            >
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Media Teknologi
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Konten berkualitas tinggi tentang teknologi, AI, dan inovasi
                digital terkini
              </p>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center"
              variants={fadeIn}
            >
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Layanan IT
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Pengembangan website, aplikasi, dan solusi teknologi custom
                untuk bisnis
              </p>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center"
              variants={fadeIn}
            >
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-purple-600 dark:text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Konsultasi Digital
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Strategi transformasi digital dan optimasi teknologi untuk
                pertumbuhan bisnis
              </p>
            </motion.div>
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
      ...(await serverSideTranslations(locale, ["common", "order"])),
    },
  };
}

export default About;
