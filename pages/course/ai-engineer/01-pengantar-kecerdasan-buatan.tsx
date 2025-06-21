import React, { useState } from "react";

// --- Data Kursus ---
// Menyimpan semua materi kursus dalam sebuah array objek agar mudah dikelola.
const courseData = [
  {
    id: "pengantar",
    title: "Apa itu Kecerdasan Buatan?",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.636-6.364l.707.707M19 19l-1.414-1.414"
        />
      </svg>
    ),
    content: {
      introduction:
        "Kecerdasan Buatan (Artificial Intelligence atau AI) adalah cabang ilmu komputer yang berfokus pada pembuatan mesin cerdas yang dapat melakukan tugas-tugas yang biasanya memerlukan kecerdasan manusia. Ini mencakup kemampuan seperti belajar, bernalar, memecahkan masalah, persepsi, dan penggunaan bahasa.",
      points: [
        "Simulasi Kecerdasan: AI mencoba meniru atau mensimulasikan kecerdasan manusia dalam mesin.",
        "Otomatisasi Tugas: Mengotomatiskan tugas-tugas kompleks yang sebelumnya hanya bisa dilakukan oleh manusia.",
        "Analisis Data: AI sangat unggul dalam menganalisis data dalam jumlah besar untuk menemukan pola dan membuat prediksi.",
      ],
      conclusion:
        "Tujuan utama AI adalah untuk menciptakan teknologi yang memungkinkan komputer dan mesin untuk berfungsi secara cerdas.",
    },
  },
  {
    id: "sejarah",
    title: "Sejarah Singkat AI",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    content: {
      introduction:
        "Konsep AI sebenarnya sudah ada sejak lama dalam mitos dan fiksi, tetapi sebagai bidang ilmiah, AI baru dimulai pada pertengahan abad ke-20. Perjalanannya penuh dengan inovasi, antusiasme, dan juga periode kekecewaan yang dikenal sebagai 'AI winter'.",
      points: [
        "1956 - Kelahiran AI: Istilah 'Artificial Intelligence' pertama kali diciptakan oleh John McCarthy pada Konferensi Dartmouth.",
        "1950s-1970s - Era Keemasan Awal: Banyak penelitian awal yang menjanjikan, seperti program catur dan pemecah masalah umum.",
        "1980s - Sistem Pakar: AI komersial pertama yang sukses, meniru kemampuan pengambilan keputusan seorang ahli dalam domain tertentu.",
        "2010s-Sekarang - Revolusi Deep Learning: Ketersediaan data besar (Big Data) dan kekuatan komputasi yang masif memicu kemajuan pesat dalam machine learning dan deep learning, membawa AI ke kehidupan kita sehari-hari.",
      ],
      conclusion:
        "Sejarah AI menunjukkan evolusi dari konsep teoretis menjadi teknologi transformatif yang kita kenal sekarang.",
    },
  },
  {
    id: "tipe",
    title: "Tipe-Tipe Kecerdasan Buatan",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
        />
      </svg>
    ),
    content: {
      introduction:
        "AI dapat diklasifikasikan menjadi beberapa tipe berdasarkan kapabilitasnya. Dua klasifikasi utama adalah AI lemah (Narrow AI) dan AI kuat (General AI).",
      points: [
        "AI Lemah (Narrow AI): Ini adalah jenis AI yang kita miliki saat ini. Dirancang untuk melakukan tugas tertentu, seperti asisten suara (Siri, Google Assistant), pengenalan wajah, atau merekomendasikan produk di situs e-commerce. Meskipun sangat kuat dalam tugas spesifiknya, ia tidak memiliki kesadaran atau kecerdasan umum.",
        "AI Kuat (General AI / AGI): Ini adalah AI tingkat manusia—mesin yang memiliki kemampuan kognitif seperti manusia, mampu memahami, belajar, dan menerapkan pengetahuannya untuk memecahkan masalah apa pun. AGI masih bersifat teoretis dan belum ada hingga saat ini.",
        "Superintelligence (ASI): Bentuk AI hipotetis yang melampaui kecerdasan manusia di hampir semua bidang. Ini adalah subjek banyak diskusi fiksi ilmiah dan etika.",
      ],
      conclusion:
        "Memahami perbedaan tipe-tipe AI ini penting untuk mengelola ekspektasi dan memahami di mana posisi teknologi kita saat ini.",
    },
  },
  {
    id: "ml_dl",
    title: "Machine Learning & Deep Learning",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    content: {
      introduction:
        "Machine Learning (ML) dan Deep Learning (DL) adalah sub-bidang dari AI yang menjadi pendorong utama kemajuan AI saat ini.",
      points: [
        "Machine Learning (ML): Adalah teknik yang memungkinkan sistem untuk 'belajar' dari data tanpa diprogram secara eksplisit. Algoritma ML menggunakan data historis sebagai input untuk memprediksi nilai output baru. Contohnya adalah filter spam email atau prediksi harga rumah.",
        "Deep Learning (DL): Merupakan sub-set dari ML yang menggunakan 'jaringan saraf tiruan' (Artificial Neural Networks) dengan banyak lapisan (deep). DL sangat efektif untuk tugas-tugas yang melibatkan data tidak terstruktur dalam jumlah besar, seperti pengenalan gambar dan pemrosesan bahasa alami (NLP). Mobil self-driving dan penerjemahan bahasa otomatis adalah hasil dari deep learning.",
      ],
      conclusion:
        "Sederhananya: AI adalah konsep besarnya, ML adalah salah satu cara untuk mencapai AI, dan DL adalah salah satu teknik ML yang paling canggih saat ini.",
    },
  },
  {
    id: "learning_types",
    title: "Metode Pembelajaran Mesin",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v4m0 0h-4m4 0l-5-5"
        />
      </svg>
    ),
    content: {
      introduction:
        "Machine Learning dapat dikategorikan ke dalam tiga paradigma pembelajaran utama: Supervised, Unsupervised, dan Reinforcement Learning. Pilihan metode tergantung pada jenis masalah yang ingin dipecahkan dan data yang tersedia.",
      points: [
        "Supervised Learning (Pembelajaran Terarah): Model 'belajar' dari data yang sudah diberi label. Anda memberikan contoh input beserta output yang benar. Tujuannya adalah agar model dapat memprediksi output untuk data baru yang belum pernah dilihat. Contoh: memprediksi harga rumah berdasarkan luas, lokasi, dll (data historis sebagai label), atau klasifikasi email sebagai 'spam' atau 'bukan spam'.",
        "Unsupervised Learning (Pembelajaran Tak Terarah): Model 'belajar' dari data yang tidak memiliki label. Tujuannya adalah untuk menemukan struktur atau pola tersembunyi dalam data. Contoh: mengelompokkan pelanggan ke dalam segmen-segmen berbeda berdasarkan perilaku belanja mereka, atau mendeteksi transaksi anomali (fraud detection).",
        "Reinforcement Learning (Pembelajaran Penguatan): Model (disebut 'agent') belajar membuat keputusan dengan melakukan tindakan di sebuah lingkungan untuk mencapai tujuan. Agent menerima 'reward' (penghargaan) untuk tindakan yang benar dan 'penalty' (hukuman) untuk tindakan yang salah. Tujuannya adalah memaksimalkan total reward. Contoh: melatih AI untuk bermain catur atau Go, atau mengoptimalkan robot untuk melakukan tugas di pabrik.",
      ],
      conclusion:
        "Memilih pendekatan yang tepat—Supervised, Unsupervised, atau Reinforcement Learning—adalah langkah fundamental dalam membangun solusi AI yang efektif.",
    },
  },
  {
    id: "studi_kasus",
    title: "Studi Kasus & Aplikasi",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
    ),
    content: {
      introduction:
        "AI bukan lagi fiksi ilmiah; teknologinya sudah terintegrasi dalam kehidupan kita sehari-hari dalam berbagai cara.",
      points: [
        "Kesehatan: AI membantu dokter mendiagnosis penyakit (seperti kanker dari gambar medis) lebih awal dan lebih akurat, serta mempersonalisasi rencana perawatan.",
        "Keuangan: Digunakan untuk mendeteksi penipuan transaksi kartu kredit, trading algoritmik, dan memberikan saran keuangan yang dipersonalisasi.",
        "Hiburan: Layanan streaming seperti Netflix dan Spotify menggunakan AI untuk merekomendasikan film dan musik yang mungkin Anda sukai berdasarkan riwayat tontonan/dengar Anda.",
        "Transportasi: Mobil self-driving menggunakan AI untuk memahami lingkungan sekitar mereka dan bernavigasi dengan aman. Aplikasi peta seperti Waze menggunakan AI untuk menemukan rute tercepat.",
      ],
      conclusion:
        "Aplikasi AI sangat luas dan terus berkembang, mengubah cara kita bekerja, hidup, dan berinteraksi dengan teknologi.",
    },
  },
];

// --- Komponen Individual ---

// Komponen untuk Sidebar Navigasi Kursus
const Sidebar = ({ activeTopic, setActiveTopic }) => {
  return (
    <aside className="w-full md:w-64 lg:w-72 bg-white flex-shrink-0">
      <nav className="px-4">
        <ul>
          {courseData.map((item) => (
            <li key={item.id} className="mb-2">
              <button
                onClick={() => setActiveTopic(item.id)}
                className={`w-full text-left flex items-center gap-4 p-3 rounded-lg transition-colors duration-200 ${
                  activeTopic === item.id
                    ? "bg-indigo-100 text-indigo-700 font-semibold"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <span
                  className={
                    activeTopic === item.id
                      ? "text-indigo-600"
                      : "text-gray-500"
                  }
                >
                  {item.icon}
                </span>
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

// Komponen untuk menampilkan konten utama
const Content = ({ topicId }) => {
  const topic = courseData.find((t) => t.id === topicId);

  if (!topic) {
    return (
      <div className="p-8 text-center text-gray-500">
        Pilih topik untuk memulai.
      </div>
    );
  }

  return (
    <main className="flex-1 p-6 md:p-10 overflow-y-auto">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 flex items-center gap-4">
          <span className="text-indigo-600 bg-indigo-100 p-2 rounded-lg">
            {topic.icon}
          </span>
          {topic.title}
        </h1>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          {topic.content.introduction}
        </p>

        <div className="space-y-6">
          {topic.content.points.map((point, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0 h-6 w-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-gray-700 leading-loose">
                <strong className="text-gray-800">
                  {point.split(":")[0]}:
                </strong>
                {point.split(":").slice(1).join(":")}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200">
          <p className="text-gray-700 bg-gray-50 p-4 rounded-lg italic">
            {topic.content.conclusion}
          </p>
        </div>
      </div>
    </main>
  );
};

// Komponen Header Aplikasi
const Header = () => {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center w-full z-10">
      <div className="flex items-center gap-3">
        <div className="bg-indigo-600 p-2 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800">
          Pengantar Kecerdasan Buatan
        </h1>
      </div>
      {/* Tombol bisa ditambahkan di sini jika perlu */}
    </header>
  );
};

// Komponen Utama Aplikasi
export default function App() {
  const [activeTopic, setActiveTopic] = useState(courseData[0].id);

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-gray-800">
      <Header />
      <div
        className="flex flex-col md:flex-row"
        style={{ height: "calc(100vh - 68px)" }}
      >
        <Sidebar activeTopic={activeTopic} setActiveTopic={setActiveTopic} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Content topicId={activeTopic} />
        </div>
      </div>
    </div>
  );
}
