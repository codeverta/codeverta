import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import {
  Users,
  BarChart3,
  CalendarCheck,
  Bell,
  Smartphone,
  CreditCard,
  CheckCircle,
  ArrowRight,
  Star,
  ChevronDown,
  Activity,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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

// ── Fonts ──
// Space Grotesk carries the "dashboard software" personality on display type.
// JetBrains Mono is reserved for anything that reads like live product data.
const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
});

// ── Motion helpers ──
function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function CountUp({
  value,
  suffix = "",
  duration = 1400,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.5);
  const [display, setDisplayVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    let frame: number;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayVal(Math.floor(eased * value));
      if (progress < 1) frame = requestAnimationFrame(step);
      else setDisplayVal(value);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

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

const STATS = [
  { value: 50, suffix: "+", label: "Gym Menggunakan" },
  { value: 95, suffix: "%", label: "Kepuasan Klien" },
  { value: 40, suffix: "%", label: "Rata-rata Penurunan Churn" },
  { value: 0, suffix: "24/7", label: "Support Teknis" },
];

const PROBLEM_SOLUTION = [
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
    problem: "Jadwal trainer sering bentrok karena catatan di sticky notes",
    solution:
      "Jadwal trainer & kelas terkelola di satu kalender. Gak ada lagi double booking.",
  },
  {
    problem: "Akhir bulan lembur 2-3 hari cuma buat rekap laporan keuangan",
    solution:
      "Laporan laba rugi, cash flow, dan pendapatan — satu klik, langsung jadi.",
  },
];

const PRICING_PLANS = [
  {
    tier: "Starter",
    price: "Rp 200rb",
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

const HERO_BARS = [38, 62, 45, 80, 58, 92, 70];

// ── FAQ accordion (grid-rows animation trick — no JS height math needed) ──
function FaqItem({
  q,
  a,
  isOpen,
  onToggle,
}: {
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.03] overflow-hidden transition-colors">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded-2xl"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-slate-900 dark:text-white">
          {q}
        </span>
        <ChevronDown
          className={`w-4 h-4 shrink-0 text-violet-500 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Props ──
type Props = {
  latestArticles: ArticlePreview[];
};

// ── Page ──
function GymManagementSystem({ latestArticles }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [heroMounted, setHeroMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`${display.variable} ${mono.variable}`}>
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

      <style jsx global>{`
        @keyframes gms-pulse-draw {
          from {
            stroke-dashoffset: 420;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes gms-float {
          0%,
          100% {
            transform: translateY(0) rotate(1deg);
          }
          50% {
            transform: translateY(-10px) rotate(0deg);
          }
        }
        @keyframes gms-grid-drift {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 64px 64px;
          }
        }
        @keyframes gms-glow {
          0%,
          100% {
            opacity: 0.55;
          }
          50% {
            opacity: 1;
          }
        }
        .gms-pulse-path {
          stroke-dasharray: 420;
          animation: gms-pulse-draw 2.1s ease-out forwards;
        }
        .gms-float {
          animation: gms-float 6s ease-in-out infinite;
        }
        .gms-grid-bg {
          background-image: linear-gradient(
              rgba(148, 163, 255, 0.08) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(148, 163, 255, 0.08) 1px,
              transparent 1px
            );
          background-size: 64px 64px;
          animation: gms-grid-drift 12s linear infinite;
        }
        .gms-live-dot {
          animation: gms-glow 1.8s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .gms-pulse-path,
          .gms-float,
          .gms-grid-bg,
          .gms-live-dot {
            animation: none !important;
          }
        }
      `}</style>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[#0B0E1A] text-white">
        <div className="gms-grid-bg absolute inset-0 opacity-60" />
        <div
          className="absolute -top-40 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(124,92,232,0.35) 0%, rgba(124,92,232,0) 70%)",
          }}
        />
        <div
          className="absolute bottom-[-120px] right-[-80px] h-[380px] w-[380px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(255,94,126,0.25) 0%, rgba(255,94,126,0) 70%)",
          }}
        />

        <div className="relative container mx-auto px-4 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="max-w-3xl mx-auto text-center">
            <div
              className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 mb-7 font-[family-name:var(--font-mono)] text-xs text-violet-200 transition-all duration-700 ${
                heroMounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2"
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="gms-live-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
              </span>
              Live di 50+ gym seluruh Indonesia
            </div>

            <h1
              className={`font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight mb-6 transition-all duration-700 delay-100 ${
                heroMounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              Gym Berantakan Gara-Gara
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-violet-300 to-rose-300">
                Catatan Masih Manual?
              </span>
            </h1>

            <p
              className={`text-lg md:text-xl text-slate-300 max-w-xl mx-auto mb-10 leading-relaxed transition-all duration-700 delay-200 ${
                heroMounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              Kelola member, kehadiran, jadwal trainer, dan keuangan gym dari
              satu dashboard. Gak perlu pusing rekap manual tiap akhir bulan.
            </p>

            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-300 ${
                heroMounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <WhatsappWrapper>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-violet-500 to-rose-400 hover:brightness-110 text-white font-semibold text-base px-8 py-6 shadow-lg shadow-violet-900/40 transition-transform hover:-translate-y-0.5"
                >
                  Konsultasi Gratis via WhatsApp
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </WhatsappWrapper>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white bg-transparent hover:bg-white/5 font-semibold text-base px-8 py-6 transition-transform hover:-translate-y-0.5"
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

          {/* Signature: live dashboard mockup */}
          <div
            className={`relative mx-auto mt-16 max-w-md transition-all duration-700 delay-500 ${
              heroMounted
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="gms-float rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5 shadow-2xl shadow-black/40">
              <div className="flex items-center justify-between mb-5">
                <span className="font-[family-name:var(--font-mono)] text-[11px] text-slate-400">
                  dashboard.codeverta.gym
                </span>
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-400/70" />
                  <span className="w-2 h-2 rounded-full bg-amber-300/70" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400/70" />
                </div>
              </div>

              <svg viewBox="0 0 300 56" className="w-full h-12 mb-5">
                <path
                  d="M0 30 L48 30 L60 8 L74 50 L88 18 L104 30 L300 30"
                  fill="none"
                  stroke="url(#gmsPulseGrad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="gms-pulse-path"
                />
                <defs>
                  <linearGradient id="gmsPulseGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#a78bfa" />
                    <stop offset="100%" stopColor="#fb7185" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="flex items-end gap-2 h-20 mb-5">
                {HERO_BARS.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-md bg-gradient-to-t from-violet-500/70 to-rose-400/70 origin-bottom transition-transform duration-700 ease-out"
                    style={{
                      height: `${h}%`,
                      transform: heroMounted ? "scaleY(1)" : "scaleY(0)",
                      transitionDelay: `${600 + i * 60}ms`,
                    }}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between font-[family-name:var(--font-mono)] text-xs">
                <span className="flex items-center gap-1.5 text-emerald-300">
                  <Activity className="w-3.5 h-3.5" />
                  128 check-in hari ini
                </span>
                <span className="flex items-center gap-1 text-violet-300">
                  <Zap className="w-3.5 h-3.5" />
                  +<CountUp value={12} duration={1600} />% MoM
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Social Proof ── */}
      <section className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-white/10">
        <div className="container mx-auto px-4 py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 80}>
                <p className="font-[family-name:var(--font-mono)] text-3xl md:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-rose-500">
                  {stat.label === "Support Teknis" ? (
                    "24/7"
                  ) : (
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  )}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                  {stat.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Masalah → Solusi ── */}
      <section className="bg-slate-50 dark:bg-[#0B0E1A] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Reveal className="text-center mb-12">
              <p className="font-[family-name:var(--font-mono)] text-violet-500 text-xs font-semibold uppercase tracking-widest mb-3">
                Masalah vs Solusi
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                Kenapa Pindah ke Sistem?
              </h2>
            </Reveal>

            <div className="space-y-5">
              {PROBLEM_SOLUTION.map((item, i) => (
                <Reveal key={i} delay={i * 90}>
                  <div className="group rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-6 transition-all hover:border-violet-300 dark:hover:border-violet-500/40 hover:shadow-lg hover:shadow-violet-900/5">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="bg-rose-100 dark:bg-rose-500/10 p-2 rounded-full shrink-0 mt-0.5">
                          <span className="block w-4 h-4 rounded-full bg-rose-400" />
                        </div>
                        <p className="text-slate-500 dark:text-slate-400">
                          {item.problem}
                        </p>
                      </div>
                      <ArrowRight className="hidden md:block w-5 h-5 text-violet-400 shrink-0 transition-transform group-hover:translate-x-1" />
                      <div className="flex items-start gap-4 flex-1">
                        <div className="bg-emerald-100 dark:bg-emerald-500/10 p-2 rounded-full shrink-0 mt-0.5">
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                        </div>
                        <p className="text-slate-700 dark:text-slate-200 font-medium">
                          {item.solution}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Fitur ── */}
      <section id="fitur" className="bg-white dark:bg-slate-900 py-20">
        <div className="container mx-auto px-4">
          <Reveal className="text-center mb-14">
            <p className="font-[family-name:var(--font-mono)] text-violet-500 text-xs font-semibold uppercase tracking-widest mb-3">
              Fitur Lengkap
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Semua yang Anda Butuhkan
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
              Dari pendaftaran member sampai laporan keuangan — semuanya
              terintegrasi dalam satu sistem.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 70}>
                <div className="group h-full rounded-2xl border border-slate-200 dark:border-white/10 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-900/10 hover:border-violet-300 dark:hover:border-violet-500/40">
                  <div className="bg-gradient-to-br from-violet-500 to-rose-400 w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimoni ── */}
      <section className="bg-slate-50 dark:bg-[#0B0E1A] py-20">
        <div className="container mx-auto px-4">
          <Reveal className="text-center mb-14">
            <p className="font-[family-name:var(--font-mono)] text-violet-500 text-xs font-semibold uppercase tracking-widest mb-3">
              Testimoni
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              Yang Udah Pakai, Bilang Apa?
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                quote:
                  "Dulu tiap akhir bulan istri saya harus lembur 2-3 hari buat cocokin pembayaran member. Sekarang semua otomatis, tinggal buka HP. Churn member turun drastis karena reminder otomatis ke member yang jarang datang.",
                initials: "RG",
                name: "Pemilik Gym, Depok",
                detail: "60 member aktif",
                accent: "from-violet-500 to-violet-600",
              },
              {
                quote:
                  "Bisa lihat laporan keuangan harian dari HP itu game changer banget. Saya jadi tahu jam berapa gym paling ramai, alat mana yang paling dipakai, dan member mana yang jarang datang. Keputusan bisnis jadi lebih data-driven.",
                initials: "AF",
                name: "Pemilik Gym, Bandung",
                detail: "120 member aktif",
                accent: "from-rose-400 to-rose-500",
              },
            ].map((t, i) => (
              <Reveal key={t.initials} delay={i * 100}>
                <div className="h-full rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-8 transition-transform duration-300 hover:-translate-y-1">
                  <Star className="w-5 h-5 text-amber-400 mb-4 fill-amber-400" />
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className={`bg-gradient-to-br ${t.accent} w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm shrink-0`}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-slate-900 dark:text-white">
                        {t.name}
                      </p>
                      <p className="text-xs text-slate-400 font-[family-name:var(--font-mono)]">
                        {t.detail}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center mt-8" delay={150}>
            <Link
              href="/blog/19-fitur-gym-management-system-roxgym"
              className="text-violet-500 hover:text-violet-600 text-sm font-medium inline-flex items-center gap-1 group"
            >
              Baca studi kasus lengkap Roxgym
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Harga ── */}
      <section className="bg-white dark:bg-slate-900 py-20">
        <div className="container mx-auto px-4">
          <Reveal className="text-center mb-14">
            <p className="font-[family-name:var(--font-mono)] text-violet-500 text-xs font-semibold uppercase tracking-widest mb-3">
              Harga
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Investasi Kecil, Dampak Besar
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
              Bandingkan dengan kehilangan 5-10 member per bulan. Software ini
              biasanya balik modal dalam 1-2 bulan.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {PRICING_PLANS.map((plan, i) => (
              <Reveal key={plan.tier} delay={i * 100}>
                <div
                  className={
                    plan.isRecommended
                      ? "relative rounded-2xl transition-transform duration-300 hover:-translate-y-1 before:absolute before:-inset-0.5 before:rounded-2xl before:bg-gradient-to-br before:from-violet-500 before:to-rose-400 before:-z-10 before:blur-sm before:opacity-60"
                      : "transition-transform duration-300 hover:-translate-y-1"
                  }
                >
                  <PricingCard
                    index={i}
                    tier={plan.tier}
                    price={plan.price}
                    description={plan.description}
                    features={plan.features}
                    isRecommended={plan.isRecommended}
                  />
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center mt-12" delay={300}>
            <WhatsappWrapper>
              <Button
                size="lg"
                className="bg-gradient-to-r from-violet-500 to-rose-400 hover:brightness-110 text-white font-semibold px-8 py-6 shadow-lg shadow-violet-900/20 transition-transform hover:-translate-y-0.5"
              >
                Konsultasi Gratis — Tentukan Paket yang Tepat
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </WhatsappWrapper>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-slate-50 dark:bg-[#0B0E1A] py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <Reveal className="text-center mb-12">
            <p className="font-[family-name:var(--font-mono)] text-violet-500 text-xs font-semibold uppercase tracking-widest mb-3">
              FAQ
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-slate-900 dark:text-white">
              Pertanyaan Umum
            </h2>
          </Reveal>

          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 60}>
                <FaqItem
                  q={faq.q}
                  a={faq.a}
                  isOpen={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Final ── */}
      <section className="relative overflow-hidden bg-[#0B0E1A] text-white py-24">
        <div className="gms-grid-bg absolute inset-0 opacity-40" />
        <div
          className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(124,92,232,0.35) 0%, rgba(255,94,126,0.15) 45%, rgba(0,0,0,0) 75%)",
          }}
        />
        <Reveal className="relative container mx-auto px-4 text-center max-w-2xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold mb-6">
            Siap Merapikan Operasional Gym Anda?
          </h2>
          <p className="text-slate-300 text-lg mb-10">
            Konsultasi gratis 30 menit — tanpa syarat. Kami bantu analisis
            kebutuhan gym Anda dan kasih rekomendasi sistem yang tepat.
          </p>
          <WhatsappWrapper>
            <Button
              size="lg"
              className="bg-white text-slate-900 hover:bg-slate-100 font-bold text-lg px-10 py-7 transition-transform hover:-translate-y-0.5 shadow-xl"
            >
              Chat via WhatsApp Sekarang
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </WhatsappWrapper>
          <p className="text-slate-400 text-sm mt-4 font-[family-name:var(--font-mono)]">
            Respon dalam 1-2 jam di jam kerja
          </p>
        </Reveal>
      </section>

      {/* ── Artikel Terkait ── */}
      <ArticleSection articles={latestArticles} />
    </div>
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
