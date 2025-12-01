import React, { useState } from "react";
import {
  ChevronDown,
  HelpCircle,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { handleRedirectToWhatsapp } from "@/components/WhatsappButton";

// --- DATA FAQ (Dari User) ---
const faqData = [
  {
    question: "Berapa lama proses pembuatan sebuah website?",
    answer:
      "Waktu pengerjaan bervariasi tergantung kompleksitas. Untuk Paket Basic biasanya memakan waktu 1-2 minggu, sedangkan untuk sistem skala menengah dapat lebih lama (lebih dari 1 bulan). Waktu pengerjaan akan disesuaikan dengan permintaan fitur oleh client.",
  },
  {
    question: "Apa saja yang perlu saya siapkan?",
    answer:
      "Anda cukup menyiapkan konten seperti teks profil perusahaan, daftar layanan/produk, dan gambar/foto yang ingin ditampilkan. Jika belum ada, tim kami bisa membantu mengarahkannya.",
  },
  {
    question: "Apakah ada layanan maintenance setelah website jadi?",
    answer:
      "Tentu. Kami menyediakan paket maintenance bulanan atau tahunan yang mencakup update, backup, dan monitoring keamanan. Anda juga bisa menghubungi kami jika butuh perbaikan sewaktu-waktu.",
  },
  {
    question: "Bisakah Anda memperbaiki website saya yang sudah ada?",
    answer:
      "Ya, kami bisa. Tim kami akan melakukan audit terlebih dahulu untuk mengidentifikasi masalah pada website Anda, mulai dari error, kecepatan, hingga tampilan, lalu memberikan solusi perbaikan terbaik.",
  },
  {
    question: "Pembayarannya bagaimana? Apakah ada uang muka?",
    answer:
      "Pembayaran dilakukan dengan sistem DP 30% di awal, sisanya dibayar setelah website selesai dan disetujui. Kami juga menyediakan opsi pembayaran bertahap untuk proyek besar.",
  },
  {
    question: "Apakah website yang dibuat sudah mobile-friendly (responsif)?",
    answer:
      "Ya, 100%. Semua website dan web apps yang kami buat dijamin responsif dan dapat diakses dengan baik di berbagai perangkat, mulai dari desktop, tablet, hingga smartphone.",
  },
  {
    question:
      "Apakah saya mendapatkan akses penuh ke kode sumber (source code)?",
    answer:
      "Tentu saja. Setelah pelunasan pembayaran, hak kepemilikan penuh dan akses ke source code proyek akan diserahkan sepenuhnya kepada Anda.",
  },
  {
    question: "Teknologi apa yang Anda gunakan dalam pengembangan web apps?",
    answer:
      "Kami menggunakan teknologi modern seperti **Next.js** (React) untuk frontend dan berbagai stack backend (Node.js/Express, Python/Django, dll.) serta database yang sesuai dengan kebutuhan dan skalabilitas proyek Anda.",
  },
  {
    question: "Bagaimana proses dari awal pemesanan hingga launching?",
    answer:
      "Proses kami dimulai dari konsultasi dan penawaran harga, dilanjutkan dengan tanda tangan kontrak & pembayaran DP, pengembangan, revisi, testing, pelunasan, dan diakhiri dengan deployment (peluncuran).",
  },
];

// --- KOMPONEN ACCORDION ITEM (Gaya Shadcn) ---
const AccordionItem = ({ item, isOpen, onClick }) => {
  // Fungsi helper untuk merender teks dengan formatting bold markdown (**) sederhana
  const renderText = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="font-semibold text-slate-900">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between py-4 text-left text-sm font-medium transition-all hover:underline md:text-base group"
        aria-expanded={isOpen}
      >
        <span
          className={`text-slate-700 group-hover:text-slate-900 ${
            isOpen ? "text-slate-900" : ""
          }`}
        >
          {item.question}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-slate-900" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100 mb-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="text-slate-600 leading-relaxed text-sm md:text-base pt-1 pb-2">
          {renderText(item.answer)}
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(0); // Item pertama terbuka default

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  // --- GENERATE JSON-LD SCHEMA UNTUK SEO ---
  // Ini sangat penting agar Google menampilkan FAQ snippet di hasil pencarian
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer.replace(/\*\*/g, ""), // Bersihkan markdown untuk schema
      },
    })),
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Script JSON-LD untuk SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10 space-y-4">
          <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-full mb-2">
            <HelpCircle className="h-5 w-5 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            Pertanyaan yang Sering Diajukan
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Temukan jawaban mengenai layanan pembuatan website, teknis
            pengerjaan, hingga sistem pembayaran kami.
          </p>
        </div>

        {/* FAQ Container (Card Style) */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 md:p-8">
            {faqData.map((item, index) => (
              <AccordionItem
                key={index}
                item={item}
                isOpen={openIndex === index}
                onClick={() => toggleAccordion(index)}
              />
            ))}
          </div>
        </div>

        {/* CTA Section (Bottom) */}
        <div className="mt-10 bg-slate-900 rounded-2xl p-8 text-center text-white shadow-lg">
          <h3 className="text-xl font-semibold mb-3">
            Masih memiliki pertanyaan lain?
          </h3>
          <p className="text-slate-300 mb-6 max-w-lg mx-auto">
            Jangan ragu untuk berkonsultasi mengenai kebutuhan digital Anda. Tim
            kami siap membantu Anda.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleRedirectToWhatsapp}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-slate-900 bg-white hover:bg-slate-100 transition-colors w-full sm:w-auto"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat WhatsApp
            </button>
            <Link
              href={"/produk"}
              className="inline-flex items-center justify-center px-6 py-3 border border-slate-600 text-base font-medium rounded-md text-white hover:bg-slate-800 transition-colors w-full sm:w-auto"
            >
              Lihat Portfolio
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
