import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  Package,
  BarChart3,
  Truck,
  Scan,
  ClipboardList,
  Bell,
  CheckCircle,
  ArrowRight,
  Boxes,
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

const FEATURES = [
  {
    icon: Package,
    title: "Manajemen Stok Real-Time",
    desc: "Stok otomatis terupdate untuk setiap transaksi masuk & keluar. Tau persis jumlah barang kapan pun.",
  },
  {
    icon: Scan,
    title: "Barcode & QR Code",
    desc: "Scan barcode untuk receiving, picking, packing, dan shipping. Cepat dan minim human error.",
  },
  {
    icon: Truck,
    title: "Manajemen Pengiriman",
    desc: "Atur pengiriman, delivery note, packing slip, dan tracking status pengiriman.",
  },
  {
    icon: ClipboardList,
    title: "Purchase & Sales Order",
    desc: "Kelola purchase order, sales order, dan blanket order. Auto-update stok saat barang datang.",
  },
  {
    icon: BarChart3,
    title: "Laporan Inventori",
    desc: "Lihat stok minimum, barang slow-moving, valuation inventory, dan histori mutasi.",
  },
  {
    icon: Bell,
    title: "Notifikasi Stok Minimum",
    desc: "Dapat peringatan otomatis saat stok barang di bawah minimum. Gak perlu cek manual.",
  },
];

const PRICING_PLANS = [
  {
    tier: "Starter",
    price: "Rp 200rb",
    description: "Untuk gudang skala kecil (1-2 gudang)",
    features: [
      "Manajemen 1-2 gudang",
      "Stok real-time",
      "Barcode scanning",
      "Laporan stok dasar",
      "Support email",
    ],
  },
  {
    tier: "Pro",
    price: "Rp 450rb",
    description: "Untuk bisnis dengan 3-5 gudang & tim lebih besar",
    features: [
      "Hingga 5 gudang",
      "Semua fitur Starter",
      "Purchase & sales order",
      "Manajemen pengiriman",
      "Batch & serial number tracking",
      "Laporan inventori lengkap",
      "Integrasi dengan POS & akuntansi",
      "Prioritas support",
    ],
    isRecommended: true,
  },
  {
    tier: "Enterprise",
    price: "Custom",
    description: "Multi-gudang skala besar dengan automation",
    features: [
      "Multi-gudang unlimited",
      "RFID integration",
      "API integrasi ERP",
      "Dedicated server",
      "Training staf onsite",
      "24/7 priority support",
      "Dapat dikustomisasi",
    ],
  },
];

const FAQS = [
  {
    q: "Apakah WMS ini cocok untuk UMKM?",
    a: "Sangat cocok. Paket Starter kami didesain untuk UMKM dengan skala gudang kecil. Fiturnya sederhana, mudah dipelajari, dan gak butuh IT training.",
  },
  {
    q: "Bisa integrasi dengan sistem yang sudah ada?",
    a: "Bisa. Kami punya API yang bisa diintegrasikan dengan POS, sistem akuntansi, atau e-commerce Anda. Tim teknis kami akan bantu setup.",
  },
  {
    q: "Apakah data bisa di-export ke Excel?",
    a: "Tentu. Semua data bisa di-export ke CSV/Excel. Jadi Anda tetap punya backup data dan bisa dianalisis lebih lanjut.",
  },
  {
    q: "Berapa lama implementasinya?",
    a: "Untuk paket Starter biasanya 3-7 hari. Paket Pro dan Enterprise butuh 1-3 minggu tergantung kompleksitas integrasi.",
  },
];

function WarehouseManagementSystem({
  latestArticles,
}: {
  latestArticles: ArticlePreview[];
}) {
  return (
    <>
      <SeoHead
        title="Warehouse Management System untuk UMKM Indonesia | Codeverta"
        description="Sistem manajemen gudang dengan stok real-time, barcode scanning, dan laporan inventori otomatis. Mulai dari Rp 200rb/bulan."
        url="https://codeverta.com/produk/warehouse-management-system"
        keywords="warehouse management system, software gudang, sistem inventory barang, manajemen gudang, wms indonesia"
      />

      <Head>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "WMS Codeverta",
            description:
              "Warehouse management system dengan stok real-time, barcode, dan laporan inventori.",
            brand: { "@type": "Brand", name: "Codeverta" },
            offers: {
              "@type": "AggregateOffer",
              priceCurrency: "IDR",
              lowPrice: "200000",
              highPrice: "450000",
              offerCount: 3,
            },
          })}
        </script>
      </Head>

      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900 text-white">
        <div className="container mx-auto px-4 py-20 md:py-28">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 mb-6">
              Warehouse Management System
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Stok Berantakan, Barang Sering Hilang?{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                Saatnya WMS.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              Kelola stok, barang masuk/keluar, dan laporan inventori secara
              real-time. Barcode scan, batch tracking, dan notifikasi stok
              minimum.
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
            <p className="text-amber-600 text-xs font-semibold uppercase tracking-widest mb-2 text-center">
              Masalah vs Solusi
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white text-center mb-12">
              Manual Gak Cukup Buat Skala Bisnis Anda
            </h2>
            <div className="space-y-6">
              {[
                {
                  problem: "Tahu-tahu stok barang kosong pas ada order besar",
                  solution:
                    "Stok real-time + notifikasi minimum stok. Gak ada lagi kejadian kehabisan stok.",
                },
                {
                  problem:
                    "Barang hilang atau salah kirim karena catatan manual",
                  solution:
                    "Setiap barang tercatat dengan barcode. Tahu posisi dan riwayat mutasi barang.",
                },
                {
                  problem: "Receiving barang lama karena harus cek satu-satu",
                  solution:
                    "Scan barcode pas barang datang. Otomatis update stok dan generate receiving report.",
                },
                {
                  problem: "Laporan stok akhir bulan makan waktu berhari-hari",
                  solution:
                    "Laporan inventori satu klik. Stok valuation, slow-moving items, semuanya langsung jadi.",
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
                      <ArrowRight className="w-5 h-5 text-amber-500 mt-1" />
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
          <p className="text-amber-600 text-xs font-semibold uppercase tracking-widest mb-2 text-center">
            Fitur Lengkap
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white text-center mb-12">
            Kontrol Penuh Atas Gudang Anda
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <Card
                key={f.title}
                className="border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="bg-amber-100 dark:bg-amber-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <f.icon className="w-6 h-6 text-amber-600 dark:text-amber-400" />
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
          <p className="text-amber-600 text-xs font-semibold uppercase tracking-widest mb-2 text-center">
            Harga
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white text-center mb-4">
            Mulai dari Rp 200rb/Bulan
          </h2>
          <p className="text-slate-500 text-center max-w-xl mx-auto mb-12">
            Investasi yang balik modal dengan mengurangi kehilangan stok dan
            efisiensi operasional.
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
                Konsultasi Gratis — Tentukan Paket yang Tepat
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </WhatsappWrapper>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-white dark:bg-slate-900 py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-amber-600 text-xs font-semibold uppercase tracking-widest mb-2 text-center">
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
      <section className="bg-gradient-to-br from-amber-600 to-orange-700 text-white py-20">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Rapikan Gudang Anda Mulai Hari Ini
          </h2>
          <p className="text-amber-100 text-lg mb-10">
            Konsultasi gratis 30 menit. Tim kami siap bantu setup WMS sesuai
            kebutuhan bisnis Anda.
          </p>
          <WhatsappWrapper>
            <Button
              size="lg"
              className="bg-white text-amber-600 hover:bg-amber-50 font-bold text-lg px-10 py-7"
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

WarehouseManagementSystem.getLayout = function (page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

export default WarehouseManagementSystem;

export const getStaticProps = withI18n(["common"], function () {
  const latestArticles = getSortedPostsData("blog")
    .filter((p) => {
      const tags = (p.tags || "").toLowerCase();
      return (
        tags.includes("gudang") ||
        tags.includes("warehouse") ||
        tags.includes("inventory")
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
