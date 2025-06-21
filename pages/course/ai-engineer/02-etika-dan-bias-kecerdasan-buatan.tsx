import React, { useState, useMemo } from "react";

// Ikon sebagai Komponen SVG untuk menghindari dependensi eksternal
const CheckCircleIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const BookOpenIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
);

const LockIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const ArrowRightIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

// DATA KURSUS
// Data konten untuk setiap modul, disimpan di satu tempat agar mudah dikelola.
const courseData = [
  {
    id: 1,
    title: "Apa itu Kecerdasan Buatan?",
    content: () => (
      <div className="prose prose-lg max-w-none text-gray-700">
        <p>
          Di sini kita akan membangun fondasi
          pemahaman tentang apa itu Kecerdasan Buatan (AI).
        </p>
        <p>
          AI, Machine Learning, dan Deep Learning sering digunakan secara
          bergantian, tapi sebenarnya mereka memiliki hubungan yang spesifik:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Kecerdasan Buatan (AI):</strong> Bidang ilmu komputer yang
            luas, berfokus pada pembuatan mesin cerdas yang dapat melakukan
            tugas yang biasanya memerlukan kecerdasan manusia.
          </li>
          <li>
            <strong>Machine Learning (ML):</strong> Sebuah cabang dari AI yang
            memberikan komputer kemampuan untuk belajar dari data tanpa
            diprogram secara eksplisit.
          </li>
          <li>
            <strong>Deep Learning (DL):</strong> Sub-bidang dari ML yang
            menggunakan jaringan saraf tiruan (neural networks) dengan banyak
            lapisan untuk menganalisis berbagai faktor dalam data.
          </li>
        </ul>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg mt-6">
          <p className="font-semibold text-blue-800">
            Contoh di Kehidupan Nyata:
          </p>
          <p className="text-blue-700">
            Saat Netflix merekomendasikan film atau Spotify membuat playlist
            untuk Anda, itu adalah hasil kerja dari Machine Learning.
          </p>
        </div>
        <p className="mt-6">
          Sejak awal, penting untuk menyadari bahwa teknologi sehebat apapun
          memiliki potensi dampak sosial. Itulah mengapa etika menjadi bagian
          tak terpisahkan dari pengembangan AI.
        </p>
      </div>
    ),
  },
  {
    id: 2,
    title: "Membedah 'Bias' dalam AI",
    content: () => (
      <div className="prose prose-lg max-w-none text-gray-700">
        <p>
          Bias dalam AI bukan sekadar kesalahan teknis; ia adalah cerminan dari
          bias yang sudah ada di masyarakat kita. Ketika kita tidak hati-hati,
          AI dapat memperkuat dan melanggengkan ketidakadilan.
        </p>
        <p>Bias bisa berasal dari tiga sumber utama:</p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            <strong>Data yang Bias:</strong> Jika data yang digunakan untuk
            melatih AI tidak representatif, model yang dihasilkan akan bias. Ini
            adalah sumber bias yang paling umum.
          </li>
          <li>
            <strong>Algoritma yang Didesain Buruk:</strong> Cara algoritma
            dibuat juga dapat memasukkan bias.
          </li>
          <li>
            <strong>Interaksi Manusia:</strong> Cara pengguna berinteraksi
            dengan sistem AI dapat menciptakan loop umpan balik yang memperkuat
            bias yang ada.
          </li>
        </ol>
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mt-6">
          <h4 className="font-bold text-gray-800">
            Studi Kasus: Alat Rekrutmen Amazon
          </h4>
          <p className="italic mt-2">
            "Pada tahun 2018, terungkap bahwa sistem AI eksperimental Amazon
            untuk merekrut talenta baru menunjukkan bias terhadap perempuan.
            Sistem ini dilatih menggunakan data resume yang diterima perusahaan
            selama 10 tahun terakhir, yang mayoritas berasal dari laki-laki.
            Akibatnya, AI 'belajar' bahwa kandidat laki-laki lebih disukai."
          </p>
          <p className="mt-4 font-semibold">
            Jenis Bias:{" "}
            <span className="text-red-600">Bias Data Historis.</span>
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: "Prinsip-Prinsip Etika AI",
    content: () => (
      <div className="prose prose-lg max-w-none text-gray-700">
        <p>
          Untuk memandu pengembangan AI yang bertanggung jawab, beberapa prinsip
          etika utama telah diidentifikasi secara global. Prinsip-prinsip ini
          membantu kita menavigasi kompleksitas dampak AI.
        </p>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg border">
            <h4 className="font-bold text-gray-800">Keadilan (Fairness)</h4>
            <p className="mt-2 text-sm">
              Memastikan hasil dan keputusan AI tidak merugikan atau
              mendiskriminasi kelompok individu tertentu secara sistematis.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg border">
            <h4 className="font-bold text-gray-800">
              Akuntabilitas (Accountability)
            </h4>
            <p className="mt-2 text-sm">
              Harus ada kejelasan tentang siapa yang bertanggung jawab atas
              hasil dari sistem AI, terutama ketika terjadi kesalahan.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg border">
            <h4 className="font-bold text-gray-800">
              Transparansi (Transparency)
            </h4>
            <p className="mt-2 text-sm">
              Proses pengambilan keputusan AI harus dapat dipahami dan
              dijelaskan, terutama untuk keputusan yang berdampak besar. Ini
              dikenal juga sebagai "Explainable AI" (XAI).
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg border">
            <h4 className="font-bold text-gray-800">Privasi & Keamanan</h4>
            <p className="mt-2 text-sm">
              Sistem AI harus dirancang untuk melindungi data pribadi pengguna
              dan aman dari serangan yang dapat membahayakan.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: "Studi Kasus Interaktif",
    content: () => <InteractiveCaseStudy />,
  },
  {
    id: 5,
    title: "Masa Depan & Tanggung Jawab Kita",
    content: () => (
      <div className="prose prose-lg max-w-none text-gray-700">
        <p>
          Membangun AI yang etis adalah tanggung jawab bersama. Ini bukan hanya
          tugas para insinyur, tetapi juga pembuat kebijakan, pemimpin bisnis,
          dan masyarakat luas.
        </p>
        <h3 className="font-bold text-gray-800 mt-8">
          Apa yang bisa Anda lakukan?
        </h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Sebagai Developer:</strong> Selalu pertanyakan data Anda.
            Gunakan tools untuk mendeteksi bias. Prioritaskan keadilan selain
            akurasi.
          </li>
          <li>
            <strong>Sebagai Manajer Produk:</strong> Lakukan audit etika sejak
            awal siklus hidup produk. Libatkan beragam pemangku kepentingan.
          </li>
          <li>
            <strong>Sebagai Pengguna:</strong> Pahami bagaimana AI digunakan
            dalam produk yang Anda pakai. Berikan masukan kepada perusahaan jika
            Anda melihat potensi masalah.
          </li>
        </ul>
        <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg mt-6">
          <p className="font-semibold text-green-800">
            Selamat! Anda telah menyelesaikan kursus ini.
          </p>
          <p className="text-green-700">
            Ini adalah awal dari perjalanan Anda. Teruslah belajar dan jadilah
            bagian dari gerakan untuk membangun AI yang lebih baik dan lebih
            adil bagi semua.
          </p>
        </div>
      </div>
    ),
  },
];

// KOMPONEN INTERAKTIF untuk Modul 4
const InteractiveCaseStudy = () => {
  const [userChoice, setUserChoice] = useState(null);
  const question =
    "Anda memulai proyek AI untuk persetujuan pinjaman. Untuk data training, apa yang akan Anda prioritaskan?";
  const options = [
    {
      text: "Gunakan semua data demografis (umur, gender, dll) untuk akurasi maksimal.",
      risk: "Tinggi",
      consequence:
        "Berisiko menciptakan model yang mendiskriminasi kelompok tertentu (misal, menolak aplikasi dari wilayah atau usia tertentu secara tidak adil).",
    },
    {
      text: "Hanya gunakan data finansial (skor kredit, riwayat pembayaran) untuk menghindari bias sosial.",
      risk: "Rendah",
      consequence:
        "Pilihan lebih aman. Model mungkin sedikit kurang akurat, tetapi secara signifikan mengurangi risiko bias demografis.",
    },
  ];

  return (
    <div className="bg-slate-50 p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
      <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
        Studi Kasus: Model Pinjaman Online
      </h3>
      <p className="text-gray-600 mb-6">{question}</p>

      <div className="space-y-4">
        {options.map((opt, index) => (
          <button
            key={index}
            onClick={() => setUserChoice(opt)}
            className={`block w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
              userChoice === opt
                ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                : "border-gray-300 hover:border-blue-400"
            }`}
          >
            <p className="font-semibold text-gray-800">{opt.text}</p>
            <p className="text-sm text-gray-500 mt-1">
              Potensi Risiko:{" "}
              <span
                className={
                  opt.risk === "Tinggi"
                    ? "text-red-500 font-bold"
                    : "text-green-500 font-bold"
                }
              >
                {opt.risk}
              </span>
            </p>
          </button>
        ))}
      </div>

      {userChoice && (
        <div className="mt-6 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg animate-fade-in">
          <h4 className="font-bold text-amber-800">
            Konsekuensi Pilihan Anda:
          </h4>
          <p className="text-amber-700 mt-2">{userChoice.consequence}</p>
        </div>
      )}
    </div>
  );
};

// KOMPONEN Sidebar
const Sidebar = ({ modules, activeModuleId, onSelectModule, progress }) => {
  const getIcon = (status, isActive) => {
    const activeClass = isActive ? "text-blue-600" : "text-gray-500";
    if (status === "completed")
      return <CheckCircleIcon className="text-green-500" size={20} />;
    if (status === "active")
      return <BookOpenIcon className={activeClass} size={20} />;
    return <LockIcon className="text-gray-400" size={20} />;
  };

  return (
    <aside className="w-full md:w-80 lg:w-96 bg-white shadow-sm p-6 flex-shrink-0">
      <div className="md:sticky md:top-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Pengantar AI & Etika
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Progress Anda: {Math.round(progress)}%
        </p>

        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <nav>
          <ul>
            {modules.map((mod) => {
              const isActive = mod.id === activeModuleId;
              return (
                <li key={mod.id}>
                  <button
                    onClick={() => onSelectModule(mod.id)}
                    disabled={mod.status === "locked"}
                    className={`w-full mb-2 flex items-center p-3 rounded-lg transition-all duration-200 text-left
                                ${
                                  isActive
                                    ? "bg-blue-50 font-semibold text-blue-700"
                                    : ""
                                }
                                ${
                                  mod.status === "completed"
                                    ? "text-gray-600"
                                    : ""
                                }
                                ${
                                  mod.status !== "locked"
                                    ? "hover:bg-gray-100"
                                    : "text-gray-400 cursor-not-allowed opacity-60"
                                }
                            `}
                  >
                    <div className="mr-4">{getIcon(mod.status, isActive)}</div>
                    <span>{mod.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

// KOMPONEN Konten Utama
const ModuleContent = ({ module, onComplete, isLastModule }) => {
  if (!module) return null;

  return (
    <div className="flex-1 p-6 sm:p-8 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <p className="text-blue-600 font-semibold">Modul {module.id}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-1">
            {module.title}
          </h1>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100">
          {module.content()}
        </div>

        <div className="mt-12 flex justify-end items-center">
          {module.status !== "completed" && (
            <button
              onClick={() => onComplete(module.id)}
              className="flex items-center gap-2 px-6 py-3 text-white font-semibold bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              {isLastModule ? "Selesaikan Kursus" : "Tandai Selesai & Lanjut"}
              {!isLastModule && <ArrowRightIcon size={18} />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// KOMPONEN APP Utama
export default function EthicAndBias() {
  const [modules, setModules] = useState(
    courseData.map((mod, index) => ({
      ...mod,
      status: index === 0 ? "active" : "locked", // Modul pertama 'active', sisanya 'locked'
    }))
  );
  const [activeModuleId, setActiveModuleId] = useState(1);

  const handleSelectModule = (id) => {
    const selectedModule = modules.find((m) => m.id === id);
    if (selectedModule && selectedModule.status !== "locked") {
      setActiveModuleId(id);
    }
  };

  const handleCompleteModule = (id) => {
    // 1. Tandai modul saat ini sebagai selesai
    const newModules = modules.map((m) =>
      m.id === id ? { ...m, status: "completed" } : m
    );

    // 2. Buka modul berikutnya jika ada
    const nextModuleIndex = newModules.findIndex((m) => m.id === id) + 1;
    if (nextModuleIndex < newModules.length) {
      newModules[nextModuleIndex].status = "active";
      // 3. Pindah ke modul berikutnya secara otomatis
      setActiveModuleId(newModules[nextModuleIndex].id);
    } else {
      // Jika ini modul terakhir, tidak ada modul selanjutnya untuk diaktifkan
    }

    setModules(newModules);
  };

  const activeModule = useMemo(
    () => modules.find((m) => m.id === activeModuleId),
    [modules, activeModuleId]
  );

  const progress = useMemo(() => {
    const completedCount = modules.filter(
      (m) => m.status === "completed"
    ).length;
    return (completedCount / modules.length) * 100;
  }, [modules]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <Sidebar
          modules={modules}
          activeModuleId={activeModuleId}
          onSelectModule={handleSelectModule}
          progress={progress}
        />

        {/* Main Content */}
        <ModuleContent
          module={activeModule}
          onComplete={handleCompleteModule}
          isLastModule={activeModuleId === modules.length}
        />
      </div>
      <style>{`
        .prose h3 { margin-top: 2em; margin-bottom: 1em; }
        .prose p, .prose ul, .prose ol { line-height: 1.7; }
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
}
