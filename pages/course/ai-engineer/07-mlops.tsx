import React, { useState } from "react";
import {
  ChevronDown,
  ChevronsRight,
  BrainCircuit,
  ShieldCheck,
  Repeat,
  Wind,
  CheckCircle,
  XCircle,
} from "lucide-react";

// Data untuk kursus
const courseData = {
  title: "Kursus Interaktif MLOps",
  subtitle: "Prinsip dan Praktik Terbaik",
  introduction:
    "MLOps (Machine Learning Operations) adalah seperangkat praktik yang bertujuan untuk menerapkan dan memelihara model machine learning dalam produksi secara andal dan efisien. Kursus ini akan membimbing Anda melalui konsep-konsep fundamental MLOps.",
  sections: [
    {
      title: "Apa itu MLOps?",
      content:
        "MLOps adalah budaya dan praktik yang mengadopsi prinsip-prinsip DevOps dan menerapkannya pada siklus hidup machine learning. Tujuannya adalah untuk mengotomatisasi dan menstandarisasi proses pengembangan, penerapan, dan pemantauan model ML, sehingga memperpendek siklus pengembangan dan memastikan kualitas serta keandalan model.",
      icon: <BrainCircuit className="w-8 h-8 text-cyan-400" />,
    },
    {
      title: "Mengapa MLOps Penting?",
      content:
        "Tanpa MLOps, banyak proyek machine learning gagal di tahap produksi. Model bisa menjadi usang (stale), performanya menurun, atau sulit untuk direproduksi. MLOps mengatasi tantangan ini dengan menyediakan kerangka kerja untuk manajemen siklus hidup model yang terstruktur, otomatis, dan dapat diulang.",
      icon: <ShieldCheck className="w-8 h-8 text-green-400" />,
    },
  ],
  principles: [
    {
      title: "CI/CD untuk ML",
      content:
        "Continuous Integration (CI) bukan hanya tentang menguji kode, tetapi juga menguji data dan model. Continuous Delivery (CD) bukan hanya menerapkan satu paket perangkat lunak, tetapi sistem ML yang kompleks (pipeline pemrosesan, model, kode inferensi).",
      icon: <Repeat className="w-6 h-6 text-indigo-400" />,
    },
    {
      title: "Otomatisasi Pipeline",
      content:
        "Seluruh pipeline ML, mulai dari penyerapan data, pelatihan model, validasi, hingga penerapan, harus diotomatisasi. Ini mengurangi intervensi manual, mempercepat proses, dan meminimalkan kesalahan.",
      icon: <Wind className="w-6 h-6 text-sky-400" />,
    },
    {
      title: "Versioning",
      content:
        "Setiap komponen harus memiliki versi: data, kode, dan model. Ini penting untuk reproduktifitas, memungkinkan kita untuk kembali ke versi sebelumnya dan memahami silsilah (lineage) dari setiap model yang diproduksi.",
      icon: <ChevronsRight className="w-6 h-6 text-amber-400" />,
    },
    {
      title: "Pemantauan (Monitoring)",
      content:
        "Model di produksi harus dipantau secara terus-menerus. Bukan hanya metrik teknis (latensi, penggunaan CPU), tetapi juga kualitas prediksi model (akurasi, drift) untuk mendeteksi kapan model perlu dilatih ulang.",
      icon: <ShieldCheck className="w-6 h-6 text-rose-400" />,
    },
  ],
  quiz: {
    question: "Apa tujuan utama dari versioning dalam MLOps?",
    options: [
      "Hanya untuk melacak perubahan pada kode sumber.",
      "Untuk memastikan model dapat direproduksi dengan melacak versi data, kode, dan model itu sendiri.",
      "Untuk mempercepat proses deployment model.",
      "Untuk memantau performa model di produksi.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Versioning dalam MLOps sangat krusial untuk reproduktifitas. Dengan melacak versi dari data, kode, dan parameter yang digunakan untuk melatih model, kita dapat mereproduksi model yang sama persis di masa depan, yang penting untuk debugging, audit, dan kepatuhan.",
  },
};

// Komponen untuk setiap bagian kursus dengan card style
const CourseSection = ({ title, content, icon }) => (
  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 shadow-lg transition-all duration-300 hover:border-cyan-500 hover:shadow-cyan-500/10">
    <div className="flex items-center gap-4 mb-3">
      {icon}
      <h2 className="text-2xl font-bold text-slate-100">{title}</h2>
    </div>
    <p className="text-slate-300 leading-relaxed">{content}</p>
  </div>
);

// Komponen Accordion untuk prinsip-prinsip MLOps
const PrinciplesAccordion = ({ principles }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-3">
        <ChevronsRight className="w-8 h-8 text-cyan-400" /> Prinsip Utama MLOps
      </h2>
      <div className="space-y-3">
        {principles.map((principle, index) => (
          <div
            key={index}
            className="border-b border-slate-700 last:border-b-0"
          >
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex justify-between items-center text-left py-4 px-2 rounded-lg hover:bg-slate-700/50 transition-colors"
            >
              <span className="flex items-center gap-3 text-lg font-semibold text-slate-200">
                {principle.icon}
                {principle.title}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openIndex === index ? "max-h-96" : "max-h-0"
              }`}
            >
              <div className="p-4 text-slate-300 bg-slate-800 rounded-b-lg">
                {principle.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Komponen Kuis Interaktif
const InteractiveQuiz = ({ quiz }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerSelect = (index) => {
    if (!showResult) {
      setSelectedAnswer(index);
    }
  };

  const checkAnswer = () => {
    setShowResult(true);
  };

  const resetQuiz = () => {
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const getButtonClass = (index) => {
    if (!showResult) {
      return `bg-slate-700 hover:bg-slate-600 ${
        selectedAnswer === index ? "ring-2 ring-cyan-400" : ""
      }`;
    }
    if (index === quiz.correctAnswerIndex) {
      return "bg-green-500/80 text-white";
    }
    if (index === selectedAnswer && index !== quiz.correctAnswerIndex) {
      return "bg-red-500/80 text-white";
    }
    return "bg-slate-700 opacity-60";
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-slate-100 mb-4">
        Uji Pemahaman Anda
      </h2>
      <p className="text-slate-300 mb-5">{quiz.question}</p>
      <div className="space-y-3 mb-6">
        {quiz.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${getButtonClass(
              index
            )}`}
            disabled={showResult}
          >
            {option}
          </button>
        ))}
      </div>

      {!showResult ? (
        <button
          onClick={checkAnswer}
          disabled={selectedAnswer === null}
          className="w-full py-3 px-4 bg-cyan-600 text-white font-bold rounded-lg hover:bg-cyan-700 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
        >
          Cek Jawaban
        </button>
      ) : (
        <div className="space-y-4">
          <div
            className={`p-4 rounded-lg ${
              selectedAnswer === quiz.correctAnswerIndex
                ? "bg-green-900/50 border-green-500"
                : "bg-red-900/50 border-red-500"
            } border`}
          >
            <h3 className="font-bold text-lg flex items-center gap-2">
              {selectedAnswer === quiz.correctAnswerIndex ? (
                <CheckCircle className="text-green-400" />
              ) : (
                <XCircle className="text-red-400" />
              )}
              {selectedAnswer === quiz.correctAnswerIndex
                ? "Jawaban Benar!"
                : "Jawaban Kurang Tepat"}
            </h3>
            <p className="text-slate-300 mt-2">{quiz.explanation}</p>
          </div>
          <button
            onClick={resetQuiz}
            className="w-full py-3 px-4 bg-slate-600 text-white font-bold rounded-lg hover:bg-slate-700 transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <div className="bg-slate-900 min-h-screen text-slate-200 font-sans antialiased">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500 pb-2">
            {courseData.title}
          </h1>
          <p className="text-xl text-slate-400 mt-2">{courseData.subtitle}</p>
        </header>

        <main className="space-y-8">
          <div className="bg-slate-800 border border-slate-700/50 rounded-xl p-8 text-center shadow-2xl shadow-slate-900/50">
            <p className="text-lg text-slate-300 leading-relaxed">
              {courseData.introduction}
            </p>
          </div>

          {courseData.sections.map((section, index) => (
            <CourseSection key={index} {...section} />
          ))}

          <PrinciplesAccordion principles={courseData.principles} />

          <InteractiveQuiz quiz={courseData.quiz} />
        </main>

        <footer className="text-center mt-16 text-slate-500">
          <p>Kursus Interaktif dibuat dengan React & Tailwind CSS.</p>
        </footer>
      </div>
    </div>
  );
}
