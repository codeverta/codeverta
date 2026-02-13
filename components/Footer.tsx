import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Link from "next/link";
import packageInfo from "../package.json";

const version = packageInfo.version;
// Keywords disembunyikan untuk SEO
const keywords = [
  "belajar cyber security",
  "kursus coding online",
  "jasa pembuatan software",
  "web development",
  "mobile apps",
  "pt zenit technology solution",
];

// Data Menu (Bisa dipindahkan ke file config terpisah)
const COMPANY_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Page" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/blog", label: "Blog & News" },
];

const PROGRAM_LINKS = [
  { href: "/course/cybersecurity", label: "Cyber Security Course" },
  { href: "/course/ai-engineer", label: "AI Engineer" },
  { href: "/services/consulting", label: "IT Consulting" },
  { href: "/services/development", label: "Software Development" },
];

const CERTIFICATIONS = ["Indeks KAMI BSSN v5.0", "NIST CSF", "CAIQ v4"];

// Placeholder variable (sesuaikan dengan sumber data Anda)
export default function Footer() {
  const { t } = useTranslation("common");
  const { locale } = useRouter();

  return (
    <footer className="print:hidden bg-[#1a1a1a] text-white py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* === Kolom 1: Brand & Kontak === */}
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-2xl text-white mb-2">Codeverta</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Penyedia jasa IT yang berdedikasi membangun solusi digital
                berkualitas tinggi, jujur, dan transparan dengan standar
                keamanan terbaik.
              </p>
            </div>

            {/* Induk Perusahaan */}
            <div className="pt-4 border-t border-gray-700">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Bagian dari
              </p>
              <p className="mt-1 text-sm font-bold text-gray-300">
                PT ZENIT TECHNOLOGY SOLUTION
              </p>
            </div>

            {/* Kontak */}
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Email
                </p>
                <p className="text-sm font-medium text-gray-300 select-all hover:text-white transition-colors">
                  contact@codeverta.com
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  WhatsApp
                </p>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-300 select-all">
                    +62 856-0134-7820 (Admin 1)
                  </p>
                  <p className="text-sm font-medium text-gray-300 select-all">
                    +62 857-2639-4401 (Admin 2)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* === Kolom 2: Company === */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Company</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* === Kolom 3: Programs === */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Programs</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              {PROGRAM_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* === Kolom 4: Legal & Trust === */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Legal & Trust</h4>

            {/* PSE Badge */}
            <div className="mb-6">
              <p className="text-xs text-gray-500 mb-2">Terdaftar Resmi</p>
              <div className="flex flex-wrap gap-2">
                <div className="inline-flex bg-white/5 p-2 rounded border border-gray-700 hover:bg-white/10 transition-colors">
                  <img
                    src="/assets/logo-pse-small.png"
                    alt="PSE Kominfo"
                    className="h-8 w-auto object-contain"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                </div>

                <div className="inline-flex bg-white/5 p-2 rounded border border-gray-700 hover:bg-white/10 transition-colors">
                  <img
                    src="/assets/oss.webp"
                    alt="OSS Kementrian Investasi"
                    className="h-8 w-auto object-contain"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <p className="text-xs text-gray-500 mb-2">
                Sertifikasi & Keamanan
              </p>
              <div className="flex flex-wrap gap-2">
                {CERTIFICATIONS.map((cert) => (
                  <div
                    key={cert}
                    className="bg-gray-100 text-gray-900 px-2 py-1.5 rounded text-[10px] font-bold shadow-sm"
                  >
                    {cert}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* === Footer Bottom === */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p className="text-center md:text-left">
            &copy; {new Date().getFullYear()} PT Zenit Technology Solution. All
            rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex items-center gap-4 text-xs">
            <span>v{version}</span>
            <span className="hidden md:inline">•</span>
            <span>Yogyakarta, Indonesia</span>
          </div>
        </div>
      </div>

      {/* Hidden SEO */}
      <div className="hidden" aria-hidden="true">
        {keywords.join(", ")}
      </div>
    </footer>
  );
}
