import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  ShoppingCart,
  BarChart3,
  Package,
  Printer,
  Smartphone,
  CreditCard,
  CheckCircle,
  ArrowRight,
  Users,
  TrendingUp,
  Clock,
  Star,
  Wifi,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    icon: ShoppingCart,
    title: "POS Cepat & Intuitif",
    desc: "Transaksi dalam hitungan detik. Support barcode scanner, QRIS, dan multi-payment.",
  },
  {
    icon: Package,
    title: "Inventory Real-Time",
    desc: "Stok otomatis terupdate setiap ada transaksi. Dapat notifikasi kalau stok mau habis.",
  },
  {
    icon: BarChart3,
    title: "Laporan Penjualan Otomatis",
    desc: "Lihat produk terlaris, jam sibuk, dan profit harian/mingguan/bulanan — satu klik.",
  },
  {
    icon: Users,
    title: "Manajemen Customer",
    desc: "Riwayat belanja, poin loyalitas, dan data pelanggan tersimpan rapi.",
  },
  {
    icon: Printer,
    title: "Struk & Invoice Digital",
    desc: "Cetak struk thermal atau kirim invoice digital via WhatsApp/Email.",
  },
  {
    icon: Smartphone,
    title: "Multi-Outlet & Mobile",
    desc: "Pantau semua cabang dari satu dashboard. Cocok untuk bisnis bercabang.",
  },
];

const PRICING_PLANS = [
  {
    tier: "Basic",
    price: "Rp 100rb",
    description: "Untuk toko kecil dengan 1 outlet",
    features: [
      "1 outlet",
      "POS cepat",
      "Manajemen stok dasar",
      "Laporan penjualan harian",
      "Support email",
    ],
  },
  {
    tier: "Pro",
    price: "Rp 250rb",
    description: "Untuk bisnis dengan 2-5 outlet",
    features: [
      "Hingga 5 outlet",
      "Semua fitur Basic",
      "Inventory real-time multi-cabang",
      "Manajemen customer + poin",
      "Laporan keuangan lengkap",
      "Integrasi QRIS & e-wallet",
      "Prioritas support",
    ],
    isRecommended: true,
  },
  {
    tier: "Enterprise",
    price: "Custom",
    description: "Bisnis skala besar dengan kebutuhan khusus",
    features: [
      "Multi-cabang unlimited",
      "White label",
      "API integrasi",
      "Dedicated server",
      "Training staf onsite",
      "24/7 support",
    ],
  },
];

const FAQS = [
  {
    q: "Apakah POS ini bisa untuk toko kelontong kecil?",
    a: "Bisa. Paket Basic kami cocok untuk toko kecil dengan 1 outlet. Interface-nya sederhana dan mudah dipelajari — staf bisa operasional dalam 1 jam.",
  },
  {
    q: "Bagaimana cara migrasi data dari sistem lama?",
    a: "Kami bantu migrasi data produk, stok, dan pelanggan dari Excel atau software lama. Biasanya selesai dalam 1-2 hari.",
  },
  {
    q: "Apakah bisa integrasi dengan printer thermal?",
    a: "Bisa. Sistem kami mendukung berbagai merek printer thermal ESC/POS. Tinggal colok dan setting sekali.",
  },
  {
    q: "Apakah data penjualan aman?",
    a: "Data Anda tersimpan di server dengan encryption dan backup harian otomatis. Hanya pemilik dan staf yang diberi akses yang bisa melihat data.",
  },
];

function PointOfSale({ latestArticles }: { latestArticles: ArticlePreview[] }) {
  return (
    <>
      <SeoHead
        title="Aplikasi Kasir & POS untuk UMKM Indonesia | Codeverta"
        description="Aplikasi POS modern dengan manajemen stok real-time, laporan otomatis, dan multi-outlet. Mulai dari Rp 100rb/bulan. Cocok untuk retail, F&B, dan UMKM."
        url="https://codeverta.com/produk/point-of-sale"
        keywords="aplikasi kasir, software kasir toko, aplikasi pos retail, pos kasir, kasir online, point of sale indonesia"
      />

      <Head>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "POS Kasir Codeverta",
            description:
              "Aplikasi POS modern dengan inventory real-time, laporan otomatis, dan multi-outlet.",
            brand: { "@type": "Brand", name: "Codeverta" },
            offers: {
              "@type": "AggregateOffer",
              priceCurrency: "IDR",
              lowPrice: "100000",
              highPrice: "250000",
              offerCount: 3,
            },
          })}
        </script>
      </Head>

      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white">
        <div className="container mx-auto px-4 py-20 md:py-28">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 mb-6">
              Point of Sale System
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Masih Pakai Kalkulator & Buku Stok?{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                Saatnya Ganti ke POS Modern.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              Aplikasi kasir yang bisa handle transaksi, stok, laporan, dan
              multi-cabang dari satu dashboard. Gak perlu IT training.
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

      {/* ── Masalah → Solusi ── */}
      <section className="bg-slate-50 dark:bg-slate-800/50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-emerald-600 text-xs font-semibold uppercase tracking-widest mb-2 text-center">
              Masalah vs Solusi
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white text-center mb-12">
              Manual Itu Rentan Salah
            </h2>

            <div className="space-y-6">
              {[
                {
                  problem:
                    "Transaksi pakai kalkulator — sering salah hitung kembalian",
                  solution:
                    "POS otomatis hitung total dan kembalian. Scan barang, bayar, selesai.",
                },
                {
                  problem:
                    "Stok barang gak update — tahu-tahu best seller udah kosong",
                  solution:
                    "Stok otomatis berkurang setiap transaksi. Notifikasi kalau stok mau habis.",
                },
                {
                  problem:
                    "Rekap penjualan akhir bulan manual — makan waktu 1-2 hari",
                  solution:
                    "Laporan penjualan real-time. Produk terlaris, jam sibuk, profit — langsung lihat.",
                },
                {
                  problem: "Multi-cabang, laporan masing-masing terpisah",
                  solution:
                    "Semua cabang terpusat di satu dashboard. Bandingkan performa antar cabang.",
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
                      <ArrowRight className="w-5 h-5 text-emerald-500 mt-1" />
                    </div>
                    <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full shrink-0 hidden md:block">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                    <p className="text-slate-700 dark:text-slate-200 flex-1 hidden md:block">
                      {item.solution}
                    </p>
                  </div>
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
          <p className="text-emerald-600 text-xs font-semibold uppercase tracking-widest mb-2 text-center">
            Fitur Lengkap
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white text-center mb-12">
            Lebih dari Sekadar Kasir
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <Card
                key={f.title}
                className="border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="bg-emerald-100 dark:bg-emerald-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <f.icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {f.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {f.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Harga ── */}
      <section className="bg-slate-50 dark:bg-slate-800/50 py-20">
        <div className="container mx-auto px-4">
          <p className="text-emerald-600 text-xs font-semibold uppercase tracking-widest mb-2 text-center">
            Harga
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white text-center mb-4">
            Mulai dari Rp 100rb/Bulan
          </h2>
          <p className="text-slate-500 text-center max-w-xl mx-auto mb-12">
            Investasi kecil yang langsung terasa dampaknya. Gak perlu ribet
            install server sendiri.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {PRICING_PLANS.map((plan, i) => (
              <PricingCard key={plan.tier} index={i} {...plan} />
            ))}
          </div>

          <div className="text-center mt-12">
            <WhatsappWrapper>
              <Button
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-6"
              >
                Konsultasi Gratis — Cari Tahu Paket yang Cocok
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </WhatsappWrapper>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-white dark:bg-slate-900 py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-emerald-600 text-xs font-semibold uppercase tracking-widest mb-2 text-center">
            FAQ
          </p>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-12">
            Pertanyaan Umum
          </h2>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <details
                key={faq.q}
                className="bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 group"
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
      <section className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white py-20">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Siap Ganti ke POS Modern?
          </h2>
          <p className="text-emerald-100 text-lg mb-10">
            Konsultasi gratis 30 menit. Tim teknis kami siap bantu analisis
            kebutuhan toko Anda.
          </p>
          <WhatsappWrapper>
            <Button
              size="lg"
              className="bg-white text-emerald-600 hover:bg-emerald-50 font-bold text-lg px-10 py-7"
            >
              Chat via WhatsApp Sekarang
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </WhatsappWrapper>
        </div>
      </section>

      <ArticleSection articles={latestArticles} />
    </>
  );
}

PointOfSale.getLayout = function (page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

export default PointOfSale;

export const getStaticProps = withI18n(["common"], function () {
  const latestArticles = getSortedPostsData("blog")
    .filter((p) => {
      const tags = (p.tags || "").toLowerCase();
      return (
        tags.includes("kasir") ||
        tags.includes("pos") ||
        tags.includes("retail")
      );
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

  return { props: { latestArticles } };
});
