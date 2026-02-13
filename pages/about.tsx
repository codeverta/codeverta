// File: src/pages/Tentang.jsx
// Anda bisa menggunakan komponen dari Shadcn seperti <Card>, <Button>, <Accordion>, dll.

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Target, Code, ShieldCheck } from "lucide-react"; // Contoh ikon dari lucide-react
import { WhatsappWrapper } from "@/components/WhatsappButton";
import SeoHead from "@/components/SeoHead";
import { withI18n } from "@/lib/withi18n";

export const getStaticProps = withI18n(["common"]);

import React from "react";
import Image from "next/image";
import { CheckCircle2, Code2, Rocket, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-white text-slate-900 font-sans">
      {/* --- HERO SECTION --- */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-600/30 border border-blue-500 text-blue-300 text-sm font-semibold mb-6">
            Tentang Codeverta
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Membangun Solusi Digital <br className="hidden md:block" />
            <span className="text-blue-500">Jujur & Berkualitas</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            Kami adalah penyedia jasa IT yang berdedikasi untuk membangun solusi
            digital berkualitas tinggi dengan proses yang jujur dan transparan.
            Misi kami adalah membantu digitalisasi UMKM di Yogyakarta agar dapat
            bersaing di era modern.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {/* <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition flex items-center justify-center gap-2">
              Konsultasi Gratis <ArrowRight className="w-4 h-4" />
            </button> */}
            <Link href={"/produk"}>
              <button className="px-8 py-3 bg-transparent border border-slate-600 hover:bg-slate-800 rounded-lg font-semibold transition">
                Lihat Portofolio
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* --- OUR STORY / MISSION --- */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                {/* Placeholder Image: Office / Team working */}
                <img
                  src="/images/meeting.jpeg"
                  alt="Tim Codeverta Diskusi"
                  className="object-cover w-full h-[25rem]"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-blue-600 rounded-lg -z-10 hidden lg:block"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-slate-200 rounded-full -z-10 hidden lg:block"></div>
            </div>

            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-slate-900">
                Lahir dari Keyakinan akan{" "}
                <span className="text-blue-600">Standar Baru</span>
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  <strong>Codeverta</strong> lahir dari sebuah keyakinan: <br />{" "}
                  setiap bisnis, besar maupun kecil, berhak mendapatkan partner
                  pengembangan teknologi yang bisa dipercaya. Terlalu sering
                  kami melihat proyek digital yang gagal karena komunikasi yang
                  buruk, biaya tersembunyi, atau hasil yang tidak sesuai
                  harapan.
                </p>
                <p>
                  Oleh karena itu, kami hadir untuk mengubahnya. Kami adalah tim
                  developer, desainer, dan konsultan IT profesional yang
                  berkomitmen pada tiga hal: kualitas kode, komunikasi yang
                  transparan, dan kesuksesan klien. Misi kami adalah mewujudkan
                  visi digital Anda menjadi solusi nyata yang berfungsi dengan
                  baik dan memberikan nilai tambah bagi bisnis Anda.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Kenapa Memilih Codeverta?
            </h2>
            <p className="text-slate-600">
              Kami tidak hanya membangun aplikasi, kami membangun ketenangan
              pikiran Anda.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 border border-slate-100 rounded-2xl shadow-sm hover:shadow-lg transition bg-white group">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">
                Transparansi Radikal
              </h3>
              <p className="text-slate-600">
                Tidak ada biaya siluman atau jargon teknis yang membingungkan.
                Kami memberikan rincian biaya yang jelas (SLA) dan komunikasi
                terbuka di setiap fase pengembangan.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 border border-slate-100 rounded-2xl shadow-sm hover:shadow-lg transition bg-white group">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <Code2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">
                Stack Teknologi Modern
              </h3>
              <p className="text-slate-600">
                Kami membangun solusi yang <em>scalable</em>, aman, dan{" "}
                <em>maintainable</em> menggunakan teknologi terkini (Next.js,
                Go, Cloud Native) agar aset digital Anda berumur panjang.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 border border-slate-100 rounded-2xl shadow-sm hover:shadow-lg transition bg-white group">
              <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <Rocket className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">
                Berorientasi Hasil
              </h3>
              <p className="text-slate-600">
                Kode yang bagus itu standar, tapi produk yang sukses itu tujuan.
                Kami fokus menciptakan solusi yang benar-benar memecahkan
                masalah bisnis dan memberikan ROI nyata.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES --- */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold mb-4">
                Layanan Profesional Kami
              </h2>
              <p className="text-slate-400">
                Ekosistem solusi digital lengkap untuk mengakselerasi
                pertumbuhan bisnis Anda.
              </p>
            </div>
            <a
              href="#"
              className="hidden md:flex items-center gap-2 text-blue-400 hover:text-blue-300 transition mt-4 md:mt-0"
            >
              Lihat Selengkapnya <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Website & Landing Page",
                desc: "Desain modern, responsif, dan SEO-friendly untuk meningkatkan kredibilitas brand Anda.",
                icon: <Users className="w-6 h-6" />,
              },
              {
                title: "Sistem Informasi Custom",
                desc: "ERP, CRM, atau sistem internal yang dirancang khusus menyesuaikan alur kerja unik bisnis Anda.",
                icon: <Code2 className="w-6 h-6" />,
              },
              {
                title: "E-commerce Solution",
                desc: "Platform toko online aman dengan integrasi payment gateway untuk jualan tanpa batas.",
                icon: <ShieldCheck className="w-6 h-6" />,
              },
              {
                title: "UI/UX & Prototyping",
                desc: "Perancangan antarmuka intuitif yang memprioritaskan kenyamanan pengguna (User Experience).",
                icon: <Rocket className="w-6 h-6" />,
              },
            ].map((service, idx) => (
              <div
                key={idx}
                className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-blue-500 transition duration-300"
              >
                <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center mb-4 text-blue-400">
                  {service.icon}
                </div>
                <h4 className="text-lg font-bold mb-2">{service.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
            Siap Transformasi Digital?
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Jangan biarkan ide besar Anda terhambat oleh eksekusi teknis yang
            buruk. Diskusikan kebutuhan Anda bersama tim Codeverta.
          </p>
          <button className="px-10 py-4 bg-blue-600 text-white rounded-full font-bold shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-1 transition duration-300">
            Hubungi Kami Sekarang
          </button>
        </div>
      </section>
    </div>
  );
}
