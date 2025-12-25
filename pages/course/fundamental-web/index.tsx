import { Badge } from "@/components/ui/badge";
import {
  BookText,
  Code,
  Paintbrush,
  Lightbulb,
  Rocket,
  BrainCircuit,
  TerminalSquare,
} from "lucide-react";
import Layout from "@/components/layout/Landing";
import { withI18n } from "@/lib/withi18n";
export const getStaticProps = withI18n(["common"]);

// --- DATA MATERI ---
// Ganti URL "#" dengan link materi Anda yang sebenarnya.
const introTopics = [
  {
    title: "Apa itu Web Development?",
    url: "/tutorials/18-apa-itu-web-development",
  },
  { title: "Frontend vs Backend", url: "#" },
  {
    title: "Tools yang Dibutuhkan (VS Code, Chrome/Firefox, Live Server)",
    url: "#",
  },
];

const htmlTopics = [
  {
    title: "Struktur Dasar Dokumen HTML",
    url: "/tutorials/17-panduan-lengkap-struktur-dasar-html-untuk-pemula",
  },
  { title: "Elemen dan Tag", url: "#" },
  { title: "Heading, Paragraf, dan Teks", url: "#" },
  { title: "Hyperlink dan Anchor", url: "#" },
  { title: "Gambar dan Media", url: "#" },
  { title: "List (Ordered & Unordered)", url: "#" },
  { title: "Formulir (Input, Select, Button)", url: "#" },
  { title: "Semantic HTML (header, footer, nav)", url: "#" },
];

const cssTopics = [
  { title: "Cara Menghubungkan CSS ke HTML", url: "#" },
  { title: "Selektor dan Properti", url: "#" },
  { title: "Warna, Font, dan Teks", url: "#" },
  { title: "Box Model (Padding, Border, Margin)", url: "#" },
  { title: "Layout dengan Flexbox", url: "#" },
  { title: "Grid CSS Dasar", url: "#" },
  { title: "Responsif dengan Media Query", url: "#" },
  { title: "Pseudo-class & Pseudo-element", url: "#" },
];

const jsTopics = [
  { title: "Variabel dan Tipe Data", url: "#" },
  { title: "Operator dan Ekspresi", url: "#" },
  { title: "Struktur Kontrol (if/else, switch)", url: "#" },
  { title: "Perulangan (for, while)", url: "#" },
  { title: "Fungsi (Function)", url: "#" },
  { title: "DOM (Document Object Model)", url: "#" },
  { title: "Event Listener", url: "#" },
  { title: "Manipulasi Elemen DOM", url: "#" },
];

const bonusTopics = [
  { title: "Pengenalan ke Git & GitHub", url: "#" },
  { title: "Cara Deploy Website ke GitHub Pages", url: "#" },
  { title: "Dasar SEO & Web Performance", url: "#" },
  {
    title: "Rekomendasi Lanjutan (Belajar React, Tailwind, dsb.)",
    url: "#",
  },
];

// Komponen Card untuk setiap bagian materi
const CourseSection = ({ icon, title, description, topics, children }) => (
  <section className="mb-8 bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition-all hover:shadow-xl hover:-translate-y-1">
    <div className="flex items-start mb-4">
      <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-lg mr-4">
        {icon}
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {title}
        </h2>
        <p className="text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
    <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-gray-700 dark:text-gray-300">
      {topics.map((item) => (
        <li key={item.title}>
          <a
            href={item.url}
            className="group flex items-center transition-colors duration-200"
          >
            <Code className="h-4 w-4 mr-3 text-gray-400 group-hover:text-blue-500" />
            <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:underline">
              {item.title}
            </span>
          </a>
        </li>
      ))}
    </ul>
    {children && <div className="mt-6">{children}</div>}
  </section>
);

// --- KOMPONEN UTAMA ---
export default function Syllabus() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8">
      <header className="mb-12 text-center">
        <Badge
          variant="default"
          className="mb-4 bg-blue-600 text-white hover:bg-blue-700"
        >
          Kursus Pemula
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-50 mb-3">
          Web Development Fundamentals
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Gerbang utama Anda untuk menguasai fondasi pengembangan web modern
          dengan HTML, CSS, dan JavaScript.
        </p>
      </header>

      <div className="space-y-10">
        <CourseSection
          icon={
            <BookText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          }
          title="🔰 Pendahuluan"
          description="Memahami gambaran besar pengembangan web dan mempersiapkan alat tempur Anda."
          topics={introTopics}
        />

        <CourseSection
          icon={
            <TerminalSquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          }
          title="Bagian 1: HTML (HyperText Markup Language)"
          description="Membangun kerangka dan struktur konten untuk setiap halaman web."
          topics={htmlTopics}
        >
          <div className="bg-yellow-50 dark:bg-yellow-900/50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
            <div className="flex items-center">
              <Lightbulb className="h-5 w-5 mr-3 text-yellow-600 dark:text-yellow-400" />
              <div>
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">
                  Praktik
                </h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Buat halaman profil sederhana menggunakan tag-tag HTML yang
                  telah dipelajari.
                </p>
              </div>
            </div>
          </div>
        </CourseSection>

        <CourseSection
          icon={
            <Paintbrush className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          }
          title="Bagian 2: CSS (Cascading Style Sheets)"
          description="Mendesain dan mempercantik tampilan website agar menarik dan profesional."
          topics={cssTopics}
        >
          <div className="bg-yellow-50 dark:bg-yellow-900/50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
            <div className="flex items-center">
              <Lightbulb className="h-5 w-5 mr-3 text-yellow-600 dark:text-yellow-400" />
              <div>
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">
                  Praktik
                </h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Hias halaman profil Anda dengan warna, font, dan layout
                  Flexbox.
                </p>
              </div>
            </div>
          </div>
        </CourseSection>

        <CourseSection
          icon={<Code className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
          title="Bagian 3: JavaScript (Dasar)"
          description="Memberikan interaktivitas dan fungsionalitas untuk menghidupkan website."
          topics={jsTopics}
        >
          <div className="bg-yellow-50 dark:bg-yellow-900/50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
            <div className="flex items-center">
              <Lightbulb className="h-5 w-5 mr-3 text-yellow-600 dark:text-yellow-400" />
              <div>
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">
                  Praktik
                </h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Tambahkan tombol interaktif (contoh: mode gelap/terang).
                </p>
              </div>
            </div>
          </div>
        </CourseSection>

        {/* Mini Project Section */}
        <section className="mb-8 bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6 rounded-xl shadow-lg border border-blue-700">
          <div className="flex items-start mb-4">
            <div className="bg-white/20 p-3 rounded-lg mr-4">
              <Rocket className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">💡 Mini Project</h2>
              <p className="opacity-90 mt-1">
                Gabungkan semua skill untuk membangun sebuah proyek portofolio
                nyata.
              </p>
            </div>
          </div>
          <div className="border-t border-white/20 my-4"></div>
          <div className="bg-white/10 p-4 rounded-lg">
            <h4 className="font-semibold">
              Buat Website Portofolio Pribadi (Satu Halaman)
            </h4>
            <p className="text-sm opacity-90 mt-1 mb-3">
              Fitur yang harus ada:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Struktur HTML lengkap dan semantik</li>
              <li>Styling dengan CSS yang modern dan responsif</li>
              <li>Interaktivitas dasar dengan JavaScript</li>
            </ul>
          </div>
        </section>

        <CourseSection
          icon={
            <BrainCircuit className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          }
          title="Bonus: Langkah Selanjutnya"
          description="Materi tambahan untuk memperluas wawasan dan mempersiapkan karir Anda."
          topics={bonusTopics}
        />
      </div>
    </div>
  );
}

Syllabus.getLayout = function (page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};
