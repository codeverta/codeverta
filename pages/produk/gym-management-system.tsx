import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  BarChart3,
  CalendarCheck,
  Bell,
  Smartphone,
  CreditCard,
  CheckCircle,
  ArrowRight,
  Dumbbell,
  TrendingUp,
  Clock,
  Star,
  Shield,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PricingCard from "@/components/products/PricingCard";
import {
  ArticleSection,
  ArticlePreview,
} from "@/components/products/ArticleSection";
import { WhatsappWrapper } from "@/components/WhatsappButton";
import SeoHead from "@/components/SeoHead";
import Layout from "@/components/layout/Landing";
import { getSortedPostsData } from "@/lib/posts";
import { withI18n } from "@/lib/withi18n";

// ── Data ──
const FEATURES = [
  {
    icon: Users,
    title: "Manajemen Member",
    desc: "Data member, tipe membership, riwayat pembayaran, masa aktif — semua terpusat.",
  },
  {
    icon: CalendarCheck,
    title: "Tracking Kehadiran",
    desc: "Check-in QR code atau PIN. Tahu siapa datang, jam berapa, dan frekuensi latihan.",
  },
  {
    icon: BarChart3,
    title: "Laporan Keuangan Otomatis",
    desc: "Pemasukan per member, pengeluaran operasional, laba rugi — satu klik aja.",
  },
  {
    icon: Bell,
    title: "Reminder Otomatis WhatsApp",
    desc: "Kirim pengingat ke member yang jarang datang, hampir expired, atau ulang tahun.",
  },
  {
    icon: Smartphone,
    title: "Akses Mobile",
    desc: "Pantau gym dari HP kapan pun. Dashboard ringkas untuk pemilik yang mobile.",
  },
  {
    icon: CreditCard,
    title: "Pembayaran Digital",
    desc: "Terima pembayaran via QRIS, transfer, atau cash. Otomatis tercatat di sistem.",
  },
];

const PRICING_PLANS = [
  {
    tier: "Starter",
    price: "Rp 150rb",
    description: "Cocok untuk gym dengan 50-100 member aktif",
    features: [
      "Manajemen hingga 100 member",
      "Check-in QR code",
      "Laporan keuangan dasar",
      "Reminder WhatsApp (100 pesan/bln)",
      "Akses web & mobile",
      "Support email 1x24 jam",
    ],
  },
  {
    tier: "Pro",
    price: "Rp 350rb",
    description: "Untuk gym 100-300 member dengan fitur lengkap",
    features: [
      "Manajemen hingga 500 member",
      "Check-in QR code & PIN",
      "Laporan keuangan lengkap",
      "Reminder WhatsApp otomatis (unlimited)",
      "Jadwal trainer & kelas",
      "Tracking progres member",
      "Integrasi pembayaran digital",
      "Export data CSV/Excel",
      "Prioritas support",
    ],
    isRecommended: true,
  },
  {
    tier: "Enterprise",
    price: "Custom",
    description: "Gym multi-cabang dengan kebutuhan khusus",
    features: [
      "Multi-cabang management",
      "White label / custom branding",
      "API integrasi",
      "Dedicated server",
      "Training staf onsite",
      "24/7 priority support",
      "Kustomisasi fitur sesuai kebutuhan",
    ],
  },
];

const FAQS = [
  {
    q: "Apakah software gym ini cocok untuk gym kecil dengan 50 member?",
    a: "Sangat cocok. Justru gym kecil yang paling merasakan manfaatnya. Dengan member yang terbatas, setiap churn member sangat terasa dampaknya. Sistem membantu Anda tracking kehadiran, mengirim reminder otomatis, dan memberikan laporan keuangan yang jelas.",
  },
  {
    q: "Berapa lama proses migrasi dari catatan manual?",
    a: "Biasanya 3-7 hari tergantung jumlah data. Kami sarankan menjalankan sistem baru bersamaan dengan cara lama selama 7-14 hari untuk memastikan akurasi data sebelum fully switch.",
  },
  {
    q: "Apakah bisa diakses dari HP?",
    a: "Bisa. Sistem kami berbasis web dan bisa diakses dari HP, tablet, maupun komputer. Member juga bisa check-in via QR code dari HP mereka.",
  },
  {
    q: "Apakah data member aman?",
    a: "Kami menggunakan encryption untuk data sensitif, backup harian otomatis, dan server dengan standar keamanan industri. Data Anda sepenuhnya milik Anda dan bisa di-export kapan pun.",
  },
  {
    q: "Apakah ada garansi?",
    a: "Ya, kami memberikan garansi kepuasan 30 hari. Jika tidak cocok, Anda bisa berhenti kapan saja tanpa penalti. Kami juga menyediakan support teknis selama jam operasional.",
  },
];

// ── Props ──
type Props = {
  latestArticles: ArticlePreview[];
};

// ── Page ──
function GymManagementSystem({ latestArticles }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <SeoHead
        title="Sistem Manajemen Gym untuk UKM Indonesia | Codeverta"
        description="Kelola member, kehadiran, jadwal trainer, dan keuangan gym dari satu dashboard. Cocok untuk gym kecil & menengah. Mulai dari Rp 150rb/bulan."
        url="https://codeverta.com/produk/gym-management-system"
        keywords="sistem manajemen gym, software gym, gym management system, aplikasi gym, manajemen member gym, software fitness"
      />

      <Head>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Sistem Manajemen Gym Codeverta",
            description:
              "Software manajemen gym untuk UKM Indonesia. Kelola member, kehadiran, jadwal, dan keuangan.",
            brand: { "@type": "Brand", name: "Codeverta" },
            offers: {
              "@type": "AggregateOffer",
              priceCurrency: "IDR",
              lowPrice: "150000",
              highPrice: "350000",
              offerCount: 3,
            },
          })}
        </script>
      </Head>

      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white">
        <div className="container mx-auto px-4 py-20 md:py-28">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 mb-6">
              Software Manajemen Gym
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Gym Berantakan Gara-Gara Catatan{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Masih Manual?
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              Kelola member, kehadiran, jadwal trainer, dan keuangan gym dari
              satu dashboard. Gak perlu pusing rekap manual tiap akhir bulan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <WhatsappWrapper>
                <Button
                  size="lg"
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold text-base px-8 py-6"
                >
                  Konsultasi Gratis via WhatsApp
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </WhatsappWrapper>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-500 text-white hover:bg-slate-700 font-semibold text-base px-8 py-6"
                onClick={() =>
                  document
                    .getElementById("fitur")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Lihat Fitur
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Social Proof ── */}
      <section className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50+", label: "Gym Menggunakan" },
              { number: "95%", label: "Kepuasan Klien" },
              { number: "40%", label: "Rata-rata Penurunan Churn" },
              { number: "24/7", label: "Support Teknis" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl md:text-4xl font-extrabold text-blue-600">
                  {stat.number}
                </p>
                <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Masalah → Solusi ── */}
      <section className="bg-slate-50 dark:bg-slate-800/50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-2 text-center">
              Masalah vs Solusi
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white text-center mb-12">
              Kenapa Pindah ke Sistem?
            </h2>

            <div className="space-y-6">
              {[
                {
                  problem:
                    "Pembayaran member campur aduk — ada yang cash, transfer, nitip temen",
                  solution:
                    "Semua pembayaran tercatat otomatis. Satu klik lihat status pembayaran tiap member.",
                },
                {
                  problem:
                    "Gak tahu siapa aja yang datang minggu ini — staf cuma jawab 'kayaknya si A sering datang'",
                  solution:
                    "Check-in QR code mencatat kehadiran otomatis. Lihat grafik kehadiran real-time.",
                },
                {
                  problem:
                    "Jadwal trainer sering bentrok karena catatan di sticky notes",
                  solution:
                    "Jadwal trainer & kelas terkelola di satu kalender. Gak ada lagi double booking.",
                },
                {
                  problem:
                    "Akhir bulan lembur 2-3 hari cuma buat rekap laporan keuangan",
                  solution:
                    "Laporan laba rugi, cash flow, dan pendapatan — satu klik, langsung jadi.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-full shrink-0">
                      <X className="w-4 h-4 text-red-500" />
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 flex-1">
                      {item.problem}
                    </p>
                    <div className="hidden md:block">
                      <ArrowRight className="w-5 h-5 text-blue-500 mt-1" />
                    </div>
                    <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full shrink-0 md:block hidden">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                    <p className="text-slate-700 dark:text-slate-200 flex-1 hidden md:block">
                      {item.solution}
                    </p>
                  </div>
                  {/* Mobile solution */}
                  <div className="mt-3 md:hidden flex items-start gap-4">
                    <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full shrink-0">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                    <p className="text-slate-700 dark:text-slate-200 flex-1">
                      {item.solution}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Fitur ── */}
      <section id="fitur" className="bg-white dark:bg-slate-900 py-20">
        <div className="container mx-auto px-4">
          <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-2 text-center">
            Fitur Lengkap
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white text-center mb-4">
            Semua yang Anda Butuhkan
          </h2>
          <p className="text-slate-500 text-center max-w-xl mx-auto mb-12">
            Dari pendaftaran member sampai laporan keuangan — semuanya
            terintegrasi dalam satu sistem.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature) => (
              <Card
                key={feature.title}
                className="border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {feature.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimoni ── */}
      <section className="bg-slate-50 dark:bg-slate-800/50 py-20">
        <div className="container mx-auto px-4">
          <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-2 text-center">
            Testimoni
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white text-center mb-12">
            Yang Udah Pakai, Bilang Apa?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-slate-200 dark:border-slate-700">
              <CardContent className="p-8">
                <Star className="w-5 h-5 text-yellow-400 mb-4" />
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 italic">
                  &ldquo;Dulu tiap akhir bulan istri saya harus lembur 2-3 hari
                  buat cocokin pembayaran member. Sekarang semua otomatis,
                  tinggal buka HP. Churn member turun drastis karena reminder
                  otomatis ke member yang jarang datang.&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    RG
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-slate-900 dark:text-white">
                      Pemilik Gym, Depok
                    </p>
                    <p className="text-xs text-slate-400">60 member aktif</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 dark:border-slate-700">
              <CardContent className="p-8">
                <Star className="w-5 h-5 text-yellow-400 mb-4" />
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 italic">
                  &ldquo;Bisa lihat laporan keuangan harian dari HP itu game
                  changer banget. Saya jadi tahu jam berapa gym paling ramai,
                  alat mana yang paling dipakai, dan member mana yang jarang
                  datang. Keputusan bisnis jadi lebih data-driven.&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="bg-green-600 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    AF
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-slate-900 dark:text-white">
                      Pemilik Gym, Bandung
                    </p>
                    <p className="text-xs text-slate-400">120 member aktif</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/blog/19-fitur-gym-management-system-roxgym"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1"
            >
              Baca studi kasus lengkap Roxgym →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Harga ── */}
      <section className="bg-white dark:bg-slate-900 py-20">
        <div className="container mx-auto px-4">
          <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-2 text-center">
            Harga
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white text-center mb-4">
            Investasi Kecil, Dampak Besar
          </h2>
          <p className="text-slate-500 text-center max-w-xl mx-auto mb-12">
            Bandingkan dengan kehilangan 5-10 member per bulan. Software ini
            biasanya balik modal dalam 1-2 bulan.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {PRICING_PLANS.map((plan, i) => (
              <PricingCard
                key={plan.tier}
                index={i}
                tier={plan.tier}
                price={plan.price}
                description={plan.description}
                features={plan.features}
                isRecommended={plan.isRecommended}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <WhatsappWrapper>
              <Button
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-6"
              >
                Konsultasi Gratis — Tentukan Paket yang Tepat
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </WhatsappWrapper>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-slate-50 dark:bg-slate-800/50 py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-2 text-center">
            FAQ
          </p>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-12">
            Pertanyaan Umum
          </h2>

          <div className="space-y-4">
            {FAQS.map((faq) => (
              <details
                key={faq.q}
                className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 group"
              >
                <summary className="p-5 cursor-pointer font-semibold text-slate-900 dark:text-white flex items-center justify-between list-none">
                  {faq.q}
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Final ── */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Siap Merapikan Operasional Gym Anda?
          </h2>
          <p className="text-blue-100 text-lg mb-10">
            Konsultasi gratis 30 menit — tanpa syarat. Kami bantu analisis
            kebutuhan gym Anda dan kasih rekomendasi sistem yang tepat.
          </p>
          <WhatsappWrapper>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 font-bold text-lg px-10 py-7"
            >
              Chat via WhatsApp Sekarang
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </WhatsappWrapper>
          <p className="text-blue-200 text-sm mt-4">
            Respon dalam 1-2 jam di jam kerja
          </p>
        </div>
      </section>

      {/* ── Artikel Terkait ── */}
      <ArticleSection articles={latestArticles} />
    </>
  );
}

GymManagementSystem.getLayout = function (page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

export default GymManagementSystem;

export const getStaticProps = withI18n(["common"], function () {
  const latestArticles = getSortedPostsData("blog")
    .filter((p) => {
      const tags = (p.tags || "").toLowerCase();
      return tags.includes("gym") || tags.includes("fitness");
    })
    .slice(0, 3)
    .map((p: any) => ({
      id: p.id,
      title: p.title,
      desc: p.desc || "",
      date: p.date,
      image: p.image || null,
      tags: p.tags || "",
    }));

  return {
    props: { latestArticles },
  };
});
