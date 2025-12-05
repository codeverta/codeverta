import React, { useState } from "react";
import {
  ChevronDown,
  HelpCircle,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { handleRedirectToWhatsapp } from "@/components/WhatsappButton";
import Head from "next/head";
import SeoHead from "@/components/SeoHead";

// --- DATA FAQ (Dari User) ---
const faqData = [
  {
    question: "Berapa lama waktu pengembangan untuk tiap jenis sistem?",
    answer:
      "Durasi pengerjaan bergantung pada skala dan kompleksitas proyek. Aplikasi sederhana seperti company profile atau landing page umumnya selesai dalam 1–2 minggu. Sistem berskala menengah seperti E-commerce, POS, dan HRMS memerlukan 1–3 bulan. Untuk platform besar seperti ERP, WMS, atau Project Management Tool dapat mencapai beberapa bulan karena modul dan integrasinya lebih luas.",
  },
  {
    question: "Apa yang harus saya siapkan sebelum project dimulai?",
    answer:
      "Client cukup menyiapkan kebutuhan fitur, referensi desain (jika ada), struktur data awal, serta konten seperti deskripsi produk, foto, atau dokumen perusahaan. Untuk proyek teknis seperti WebGIS, Inventory, Finance, atau Accounting, kami akan membantu merapikan kebutuhan teknis dan alur bisnis sebelum development.",
  },
  {
    question:
      "Apakah sistem yang saya pesan bisa dikembangkan lagi di masa depan?",
    answer:
      "Tentu saja. Semua platform yang kami buat seperti E-commerce, ERP, HRMS, CRM, atau WMS dibangun menggunakan teknologi modular sehingga dapat dikembangkan bertahap sesuai kebutuhan bisnis Anda. Penambahan fitur seperti pembayaran baru, integrasi API, hingga migrasi server dapat dilakukan kapan saja.",
  },
  {
    question: "Apakah ada dukungan maintenance setelah project selesai?",
    answer:
      "Ada. Kami menyediakan layanan maintenance bulanan atau tahunan yang mencakup perbaikan bug, update keamanan, server monitoring, hingga penambahan fitur kecil. Sistem aktif seperti POS, Inventory, dan Finance sangat disarankan untuk memakai paket maintenance demi menjaga stabilitas.",
  },
  {
    question:
      "Bisakah Anda mengembangkan fitur khusus sesuai kebutuhan bisnis saya?",
    answer:
      "Bisa. Setiap solusi yang kami buat seperti ERP, Project Management Tool, E-learning, atau CRM dapat dikustomisasi sesuai proses bisnis Anda. Kami juga bisa menambahkan integrasi seperti Midtrans, GeoServer, Socket.io, GraphQL, Kafka, atau RFID sesuai kebutuhan.",
  },
  {
    question: "Bagaimana alur kerja mulai dari pemesanan hingga deployment?",
    answer:
      "Proses dimulai dari konsultasi kebutuhan, analisis alur bisnis, pembuatan proposal & estimasi biaya, pembayaran DP, desain UI/UX, pengembangan, testing, revisi, finalisasi, pelunasan, lalu deployment ke server atau cloud pilihan Anda. Untuk sistem besar seperti ERP, implementasi dilakukan bertahap per modul.",
  },
  {
    question:
      "Bagaimana sistem pembayaran untuk layanan pengembangan software?",
    answer:
      "Pembayaran dilakukan dengan DP 30% sebagai tanda jadi, lalu pelunasan dilakukan setelah project selesai dan disetujui. Untuk proyek jangka panjang seperti ERP atau WMS, tersedia opsi pembayaran per milestone agar lebih fleksibel.",
  },
  {
    question:
      "Teknologi apa saja yang Anda gunakan untuk berbagai jenis sistem?",
    answer:
      "Tech stack disesuaikan dengan kebutuhan proyek. Contohnya: E-commerce memakai React + Laravel + Midtrans; POS menggunakan Vue + Laravel + Redis; WebGIS memakai React, Leaflet, PostGIS, GeoServer; ERP menggunakan Next.js + Node.js + Docker; Inventory memakai Angular + Java + Kafka; CRM memakai React + GraphQL; Finance menggunakan React + Django. Semua dipilih berdasarkan performa, keamanan, dan skalabilitas.",
  },
  {
    question:
      "Apakah sistem yang dibuat sudah responsif dan siap digunakan di berbagai perangkat?",
    answer:
      "Ya. Semua sistem yang kami bangun seperti E-commerce, HRMS, CRM, dan E-learning sudah responsif dan dapat digunakan dengan optimal di desktop, tablet, maupun smartphone. Untuk aplikasi khusus seperti POS atau WMS, kami juga mengoptimalkan tampilan untuk perangkat sentuh.",
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
    <>
      <SeoHead
        title="FAQ - Pertanyaan yang Sering Diajukan tentang Layanan Codeverta"
        description="Temukan jawaban atas pertanyaan umum mengenai layanan pembuatan website, sistem digital, teknis pengerjaan, dan sistem pembayaran di Codeverta."
        url="https://bikinwebsitejogja.com/about"
        image="https://bikinwebsitejogja.com/og-image.png"
      />
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
              Jangan ragu untuk berkonsultasi mengenai kebutuhan digital Anda.
              Tim kami siap membantu Anda.
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
    </>
  );
}
