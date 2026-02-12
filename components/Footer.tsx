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

export default function Footer() {
  const { t } = useTranslation("common");
  const { locale } = useRouter();

  useEffect(() => {}, [locale]);

  return (
    <footer className="print:hidden bg-[#1a1a1a] text-white py-10 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Kolom 1: Brand, Induk Perusahaan & Kontak */}
          <div>
            <h4 className="font-bold text-xl mb-4 text-white">Codeverta</h4>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              Penyedia jasa IT yang berdedikasi untuk membangun solusi digital
              berkualitas tinggi dengan proses yang jujur dan transparan dengan
              standar keamanan terbaik.
            </p>

            {/* Bagian PT ZENIT */}
            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-gray-500 text-xs font-semibold tracking-wider uppercase">
                Bagian dari
              </p>
              <p className="font-bold text-sm text-gray-300 mt-1">
                PT ZENIT TECHNOLOGY SOLUTION
              </p>
            </div>

            {/* Bagian Kontak (Statis/Tanpa Redirect) */}
            <div className="mt-4">
              <p className="text-gray-500 text-xs font-semibold tracking-wider uppercase mb-1">
                Kontak
              </p>
              <p className="font-medium text-sm text-gray-300 select-all">
                +62 857-2639-4401
              </p>
            </div>
          </div>

          {/* Kolom 2: Menu Navigasi Utama */}
          <div>
            <h4 className="font-bold text-lg mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact Page
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-white transition-colors"
                >
                  Blog & News
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Layanan & Kursus */}
          <div>
            <h4 className="font-bold text-lg mb-4">Programs</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link
                  href="/course/cybersecurity"
                  className="hover:text-white transition-colors"
                >
                  Cyber Security Course
                </Link>
              </li>
              <li>
                <Link
                  href="/course/ai-engineer"
                  className="hover:text-white transition-colors"
                >
                  AI Engineer
                </Link>
              </li>
              <li>
                <Link
                  href="/services/consulting"
                  className="hover:text-white transition-colors"
                >
                  IT Consulting
                </Link>
              </li>
              <li>
                <Link
                  href="/services/development"
                  className="hover:text-white transition-colors"
                >
                  Software Development
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Legalitas & Sertifikasi */}
          <div>
            <h4 className="font-bold text-lg mb-4">Legal & Trust</h4>

            {/* Terdaftar PSE */}
            <div className="mb-6">
              <p className="text-xs text-gray-500 mb-2">Terdaftar Resmi</p>
              <div className="flex items-center gap-2 bg-white/5 p-2 rounded border border-gray-700 w-fit">
                {/* Pastikan file gambar ada di folder public/images/ */}
                <img
                  src="/assets/logo-pse-small.png"
                  alt="PSE Kominfo"
                  className="h-8 w-auto transition-all"
                  onError={(e) => (e.target.style.display = "none")}
                />
                {/* <span className="text-xs font-bold text-gray-300">PSE KOMINFO</span> */}
              </div>
            </div>

            {/* Sertifikasi Logos */}
            <div>
              <p className="text-xs text-gray-500 mb-2">
                Sertifikasi & Keamanan
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="bg-white p-1 rounded h-10 w-auto flex items-center justify-center">
                  <span className="text-black text-[10px] font-bold px-1">
                    Indeks KAMI BSSN v5.0
                  </span>
                </div>
                <div className="bg-white p-1 rounded h-10 w-auto flex items-center justify-center">
                  <span className="text-black text-[10px] font-bold px-1">
                    NIST CSF
                  </span>
                </div>
                <div className="bg-white p-1 rounded h-10 w-auto flex items-center justify-center">
                  <span className="text-black text-[10px] font-bold px-1">
                    CAIQ v4
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} PT Zenit Technology Solution. All
            rights reserved.
          </p>
          <p className="mt-2 md:mt-0">v{version} • Yogyakarta, Indonesia</p>
        </div>
      </div>

      {/* Hidden SEO Keywords */}
      <p className="hidden">{keywords.join(", ")}</p>
    </footer>
  );
}
