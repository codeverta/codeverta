import React from "react";
import { Briefcase, ArrowRight, Mail } from "lucide-react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import path from "path";
import fs from "fs";

// Tipe data untuk Job
type Job = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string; // Full-time, Contract, etc.
};

// MOCK DATA: Kosongkan array ini untuk melihat tampilan "No Jobs"
const OPEN_JOBS: Job[] = [
  // { id: '1', title: 'Backend Engineer (Golang)', department: 'Engineering', location: 'Yogyakarta (Remote)', type: 'Full-time' },
  // { id: '2', title: 'Frontend Developer', department: 'Product', location: 'Jakarta', type: 'Contract' },
];

export async function getStaticProps({ locale }) {
  const filePath = path.join(process.cwd(), "projects.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(jsonData);
  const projects = data.projects || [];

  return {
    props: {
      projects: projects.slice(0, 3),
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default function CareersPage() {
  const hasJobs = OPEN_JOBS.length > 0;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Hero Section */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-slate-900">
            Bergabung Bersama Kami
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Kami membangun teknologi masa depan dengan integritas dan inovasi.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* CASE 1: Ada Lowongan */}
        {hasJobs ? (
          <div className="space-y-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold text-slate-800">
                Posisi Terbuka
              </h2>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {OPEN_JOBS.length} Lowongan
              </span>
            </div>

            <div className="grid gap-4">
              {OPEN_JOBS.map((job) => (
                <div
                  key={job.id}
                  className="group bg-white p-6 rounded-lg border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between"
                >
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 mt-2 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <Briefcase size={14} /> {job.department}
                      </span>
                      <span>•</span>
                      <span>{job.location}</span>
                      <span>•</span>
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <button className="flex items-center font-medium text-blue-600 group-hover:translate-x-1 transition-transform">
                    Apply Now <ArrowRight size={16} className="ml-2" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* CASE 2: Tidak Ada Lowongan (Empty State) */
          <div className="bg-white rounded-2xl p-10 md:p-16 text-center border border-slate-200 shadow-sm">
            <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Briefcase className="text-slate-400" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              Saat ini belum ada posisi terbuka
            </h2>
            <p className="text-slate-600 max-w-lg mx-auto mb-8 leading-relaxed">
              Meskipun kami tidak sedang membuka rekrutmen aktif, kami selalu
              tertarik bertemu talenta luar biasa. Jika Anda yakin memiliki
              nilai tambah, kirimkan CV Anda untuk basis data kami.
            </p>

            <a
              href="mailto:contact@codeverta.com"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-slate-900 hover:bg-slate-800 transition-colors"
            >
              <Mail className="mr-2 -ml-1" size={18} />
              Kirim Email Perkenalan
            </a>

            <p className="mt-6 text-sm text-slate-400">
              Kami akan menghubungi Anda jika ada posisi yang sesuai di masa
              depan.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
