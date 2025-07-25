// Import komponen yang dibutuhkan dari React dan Shadcn/ui
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

// --- DATA DUMMY PROYEK ---
// Ganti bagian ini dengan data proyek asli perusahaan Anda.
const projectsData = [
  {
    id: 1,
    title: "Sistem Informasi Manajemen Rumah Sakit (SIMRS)",
    category: "Sistem Informasi",
    imageUrl: "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=2070&auto=format&fit=crop", // Ganti dengan URL gambar proyek Anda
    techStack: ["React", "Node.js", "Express", "PostgreSQL", "Prisma"],
    description: "Platform komprehensif untuk mengelola data pasien, jadwal dokter, inventaris obat, dan rekam medis secara digital.",
    detailedDescription: "SIMRS ini dirancang untuk meningkatkan efisiensi operasional rumah sakit. Fitur utamanya mencakup pendaftaran pasien online, manajemen rekam medis elektronik (EMR) yang aman, penjadwalan janji temu otomatis, serta modul farmasi dan laboratorium yang terintegrasi. Sistem ini membantu mengurangi waktu tunggu pasien dan meminimalisir kesalahan administrasi.",
    client: "RS Sehat Selalu",
    year: 2024,
    liveUrl: "#", // Ganti dengan link live demo jika ada
    githubUrl: "#", // Ganti dengan link repository jika ada
  },
  {
    id: 2,
    title: "WebGIS Pemetaan Lahan Pertanian",
    category: "WebGIS",
    imageUrl: "https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=1974&auto=format&fit=crop",
    techStack: ["Vue.js", "Leaflet.js", "GeoServer", "Python", "Flask"],
    description: "Aplikasi WebGIS interaktif untuk visualisasi dan analisis data spasial lahan pertanian di suatu daerah.",
    detailedDescription: "Aplikasi ini memungkinkan pengguna untuk melihat batas persil lahan, jenis tanaman, status kesuburan tanah, dan data irigasi secara real-time. Dibangun dengan Leaflet.js untuk frontend dan GeoServer untuk melayani data geospasial, sistem ini membantu dinas pertanian dalam membuat keputusan strategis terkait zonasi tanaman dan distribusi pupuk.",
    client: "Dinas Pertanian Kab. Maju Jaya",
    year: 2023,
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "Model Prediksi Customer Churn",
    category: "Machine Learning",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    techStack: ["Python", "Scikit-learn", "Pandas", "Jupyter", "FastAPI"],
    description: "Sebuah model machine learning untuk memprediksi pelanggan yang berpotensi berhenti berlangganan.",
    detailedDescription: "Dengan menggunakan data historis transaksi dan interaksi pelanggan, kami membangun model klasifikasi (Random Forest) dengan akurasi tinggi. Model ini di-deploy sebagai API menggunakan FastAPI, sehingga dapat diintegrasikan dengan sistem CRM perusahaan untuk memberikan peringatan dini dan memungkinkan tim marketing melakukan tindakan retensi secara proaktif.",
    client: "PT Koneksi Digital",
    year: 2025,
    liveUrl: "#",
    githubUrl: null, // Contoh jika tidak ada link github
  },
];

// --- KOMPONEN UTAMA HALAMAN PORTOFOLIO ---
export default function PortfolioPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-950">
      <div
        className="container mx-auto px-4 md:px-6"
      >
        {/* Judul dan Deskripsi Halaman */}
        <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }} className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Portofolio Proyek Kami
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Berikut adalah beberapa proyek unggulan yang telah kami kerjakan,
              mencakup berbagai bidang dari sistem informasi hingga machine
              learning.
            </p>
          </div>
        </motion.div>

        {/* Grid untuk menampilkan semua proyek */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {projectsData.map((project) => (
            <Dialog key={project.id}>
              <DialogTrigger asChild>
                <Card className="cursor-pointer hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
                  <CardHeader>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <CardDescription>{project.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <img
                      src={project.imageUrl}
                      alt={`Gambar Proyek ${project.title}`}
                      className="object-cover w-full h-48 rounded-md"
                    />
                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                      {project.description}
                    </p>
                  </CardContent>
                  <CardFooter className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </CardFooter>
                </Card>
              </DialogTrigger>

              {/* Konten Modal yang akan muncul */}
              <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl">
                    {project.title}
                  </DialogTitle>
                  <DialogDescription>
                    {project.category} | Klien: {project.client} | Tahun:{" "}
                    {project.year}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  <img
                    src={project.imageUrl}
                    alt={`Gambar Proyek ${project.title}`}
                    className="object-cover w-full h-64 rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Deskripsi Rinci Proyek
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {project.detailedDescription}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Teknologi yang Digunakan
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <Badge key={tech} variant="default">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-4 mt-4">
                  {project.liveUrl && project.liveUrl !== "#" && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button>Lihat Live Demo</Button>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline">Lihat Kode</Button>
                    </a>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}