import React, { useState, useMemo } from "react";
import {
  BrainCircuit,
  BookOpen,
  Layers,
  Puzzle,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  TrendingDown,
  ToyBrick,
  ListOrdered,
} from "lucide-react";

// -- Data Kursus --
// Menyimpan semua konten kursus dalam satu objek agar mudah dikelola dan diperbarui.
const courseContent = [
  {
    id: "pengenalan",
    title: "Latar Belakang & Motivasi",
    icon: TrendingDown,
    content: () => (
      <div>
        <h2 className="text-3xl font-bold text-cyan-400 mb-4">
          Modul 1: Mengapa Perlu Transformer?
        </h2>
        <p className="text-lg text-gray-300 mb-6">
          Sebelum menyelami Transformer, penting untuk memahami keterbatasan
          model yang ada sebelumnya, yaitu Recurrent Neural Networks (RNN) dan
          Long Short-Term Memory (LSTM).
        </p>

        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 mb-6">
          <h3 className="text-xl font-semibold text-rose-400 mb-3">
            Keterbatasan RNN & LSTM
          </h3>
          <ul className="list-disc list-inside space-y-3 text-gray-300">
            <li>
              <span className="font-semibold text-rose-300">
                Pemrosesan Sekuensial:
              </span>{" "}
              RNN/LSTM memproses data kata per kata secara berurutan. Ini
              menciptakan "bottleneck" karena prosesnya tidak bisa diparalelkan.
              Untuk kalimat yang panjang, ini berarti waktu training yang sangat
              lama.
            </li>
            <li>
              <span className="font-semibold text-rose-300">
                Masalah Konteks Jarak Jauh:
              </span>{" "}
              Meskipun LSTM dirancang untuk mengingat konteks jangka panjang,
              kemampuannya tetap terbatas. Informasi dari kata-kata di awal
              kalimat bisa "terlupakan" atau memudar saat mencapai akhir kalimat
              yang sangat panjang.
            </li>
            <li>
              <span className="font-semibold text-rose-300">
                Vanishing/Exploding Gradients:
              </span>{" "}
              Selama training, informasi yang mengalir melalui banyak langkah
              waktu dapat menyebabkan gradien (sinyal pembelajaran) menjadi
              sangat kecil (vanishing) atau sangat besar (exploding), membuat
              model sulit untuk belajar.
            </li>
          </ul>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h3 className="text-xl font-semibold text-cyan-300 mb-3">
            Transformer Hadir Sebagai Solusi
          </h3>
          <p className="text-gray-300 mb-4">
            Transformer mengatasi masalah ini secara langsung:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>
              <span className="font-semibold text-cyan-300">Paralelisasi:</span>{" "}
              Dengan membuang sifat rekuren, Transformer dapat memproses semua
              kata dalam kalimat secara bersamaan.
            </li>
            <li>
              <span className="font-semibold text-cyan-300">
                Self-Attention:
              </span>{" "}
              Mekanisme ini memungkinkan setiap kata untuk "melihat" dan
              terhubung langsung dengan setiap kata lain dalam kalimat, sehingga
              masalah konteks jarak jauh dapat diatasi secara efektif.
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "embeddings_pos_encoding",
    title: "Input & Positional Encoding",
    icon: ListOrdered,
    content: () => (
      <div>
        <h2 className="text-3xl font-bold text-cyan-400 mb-4">
          Modul 2: Mempersiapkan Input
        </h2>
        <p className="text-lg text-gray-300 mb-6">
          Komputer tidak memahami kata, ia hanya mengerti angka. Langkah pertama
          adalah mengubah teks menjadi representasi numerik yang bisa diproses
          oleh model.
        </p>

        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 mb-6">
          <div className="flex items-center mb-3">
            <ToyBrick className="h-6 w-6 mr-3 text-lime-400" />
            <h3 className="text-xl font-semibold text-lime-400">
              Konsep Kunci: Embeddings
            </h3>
          </div>
          <p className="text-gray-300">
            Setiap kata dalam kosakata dipetakan ke sebuah vektor angka yang
            disebut{" "}
            <span className="font-semibold text-lime-300">embedding</span>.
            Vektor ini bukan sekadar angka acak; ia menangkap "makna" semantik
            dari kata tersebut. Kata-kata dengan makna serupa (misal: "raja" dan
            "ratu") akan memiliki vektor embedding yang letaknya berdekatan
            dalam ruang vektor.
          </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <div className="flex items-center mb-3">
            <ListOrdered className="h-6 w-6 mr-3 text-amber-400" />
            <h3 className="text-xl font-semibold text-amber-400">
              Masalah Urutan & Solusinya: Positional Encoding
            </h3>
          </div>
          <p className="text-gray-300 mb-4">
            Karena Transformer memproses semua kata sekaligus, ia kehilangan
            informasi tentang urutan kata. Kalimat "Anjing mengejar kucing" dan
            "Kucing mengejar anjing" akan terlihat sama baginya.
          </p>
          <p className="text-gray-300">
            Untuk mengatasi ini, kita menyuntikkan informasi posisi ke dalam
            input. Caranya adalah dengan membuat sebuah vektor lain yang disebut{" "}
            <span className="font-semibold text-amber-300">
              Positional Encoding
            </span>
            . Vektor ini unik untuk setiap posisi (kata ke-1, ke-2, dst.) dan
            ditambahkan ke vektor embedding kata tersebut.
          </p>
          <div className="mt-4 bg-slate-900/70 p-4 rounded-lg text-center font-mono text-sm text-cyan-200">
            Input Akhir Model = Vektor Embedding + Vektor Positional Encoding
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "arsitektur",
    title: "Gambaran Umum Arsitektur",
    icon: Layers,
    content: () => (
      <div>
        <h2 className="text-3xl font-bold text-cyan-400 mb-4">
          Modul 2: Arsitektur Transformer
        </h2>
        <p className="text-lg text-gray-300 mb-6">
          Secara garis besar, Transformer terdiri dari dua bagian utama:{" "}
          <span className="font-semibold text-emerald-400">Encoder</span> dan{" "}
          <span className="font-semibold text-amber-400">Decoder</span>.
        </p>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 bg-slate-800 p-6 rounded-xl border border-emerald-500/50">
            <h3 className="text-2xl font-bold text-emerald-400 mb-3">
              Encoder
            </h3>
            <p className="text-gray-300 mb-4">
              Tugasnya adalah "memahami" kalimat input. Encoder membaca seluruh
              kalimat dan membangun representasi numerik (vektor) yang kaya akan
              konteks untuk setiap kata.
            </p>
          </div>
          <div className="flex-1 bg-slate-800 p-6 rounded-xl border border-amber-500/50">
            <h3 className="text-2xl font-bold text-amber-400 mb-3">Decoder</h3>
            <p className="text-gray-300 mb-4">
              Tugasnya adalah "menghasilkan" kalimat output, kata per kata,
              sambil memperhatikan output dari Encoder.
            </p>
          </div>
        </div>
        <div className="mt-6 bg-slate-800/50 p-4 rounded-lg text-center">
          <p className="text-gray-300">
            Model seperti BERT hanya menggunakan{" "}
            <span className="font-semibold text-emerald-400">Encoder</span>,
            sedangkan model seperti GPT hanya menggunakan{" "}
            <span className="font-semibold text-amber-400">Decoder</span>.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "attention",
    title: "Deep Dive: Self-Attention",
    icon: BookOpen,
    content: () => (
      <div>
        <h2 className="text-3xl font-bold text-cyan-400 mb-4">
          Modul 3: Jantung Transformer
        </h2>
        <p className="text-lg text-gray-300 mb-6">
          Inilah jantung dari Transformer. Bayangkan Anda membaca kalimat:{" "}
          <span className="italic text-cyan-300">
            "Kucing itu tidak mau menyeberang jalan karena ia lelah."
          </span>{" "}
          Saat membaca kata{" "}
          <span className="font-bold text-yellow-300">"ia"</span>, perhatian
          Anda secara alami tertuju pada kata{" "}
          <span className="font-bold text-yellow-300">"kucing"</span>.
          Self-attention adalah cara model melakukan hal ini.
        </p>

        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h3 className="text-xl font-semibold text-white mb-3">
            Bagaimana Cara Kerjanya? (Query, Key, Value)
          </h3>
          <p className="text-gray-300 mb-4">
            Untuk setiap kata, kita membuat tiga vektor:{" "}
            <span className="text-blue-300">Query (Q)</span>,{" "}
            <span className="text-purple-300">Key (K)</span>, dan{" "}
            <span className="text-green-300">Value (V)</span>. Prosesnya adalah
            mencocokkan Query dari satu kata dengan Key dari semua kata lain
            untuk mendapatkan skor, lalu menggunakan skor tersebut untuk
            memboboti Value setiap kata.
          </p>
        </div>

        <div className="mt-6 bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h3 className="text-xl font-semibold text-white mb-3">
            Multi-Head Attention
          </h3>
          <p className="text-gray-300">
            Daripada melakukan proses attention sekali,{" "}
            <span className="font-semibold text-cyan-300">
              Multi-Head Attention
            </span>{" "}
            melakukannya berkali-kali secara paralel (misalnya, 8
            "kepala"/heads). Setiap "kepala" belajar hubungan konteks yang
            berbeda, memberikan pemahaman yang jauh lebih kaya dan mendalam.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "kuis",
    title: "Kuis Interaktif",
    icon: Puzzle,
    content: (props) => <QuizComponent {...props} />,
  },
];

// -- Komponen Kuis (Diperbarui) --
const quizQuestions = [
  {
    question:
      "Apa kelemahan utama dari arsitektur RNN/LSTM yang diatasi oleh Transformer?",
    options: [
      "Terlalu banyak parameter",
      "Tidak bisa diproses secara paralel",
      "Hanya bisa untuk teks pendek",
      "Sulit dilatih di GPU",
    ],
    correctAnswer: "Tidak bisa diproses secara paralel",
  },
  {
    question: "Apa tujuan dari 'Word Embedding'?",
    options: [
      "Menghitung jumlah kata",
      "Mengubah kata menjadi vektor numerik yang bermakna",
      "Memberi nomor urut pada kata",
      "Membuang kata yang tidak penting",
    ],
    correctAnswer: "Mengubah kata menjadi vektor numerik yang bermakna",
  },
  {
    question:
      "Bagaimana Transformer mengetahui urutan kata dalam sebuah kalimat?",
    options: [
      "Dengan memprosesnya satu per satu",
      "Tidak perlu tahu urutan kata",
      "Dengan menambahkan Positional Encoding ke input",
      "Dengan menggunakan arsitektur RNN",
    ],
    correctAnswer: "Dengan menambahkan Positional Encoding ke input",
  },
  {
    question:
      "Tiga vektor yang digunakan dalam mekanisme Self-Attention adalah...",
    options: [
      "Input, Hidden, dan Output",
      "Encoder, Decoder, dan Attention",
      "Query, Key, dan Value",
      "Embedding, Position, dan Layer",
    ],
    correctAnswer: "Query, Key, dan Value",
  },
  {
    question:
      "Model seperti GPT (Generative Pre-trained Transformer) utamanya menggunakan bagian mana dari arsitektur Transformer?",
    options: [
      "Hanya Encoder",
      "Hanya Decoder",
      "Encoder dan Decoder",
      "Tidak keduanya",
    ],
    correctAnswer: "Hanya Decoder",
  },
];

function QuizComponent({ onNavigate }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (answer) => {
    setUserAnswers({ ...userAnswers, [currentQuestionIndex]: answer });
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShowResults(false);
  };

  const score = useMemo(() => {
    return Object.keys(userAnswers).reduce((acc, index) => {
      if (userAnswers[index] === quizQuestions[index].correctAnswer) {
        return acc + 1;
      }
      return acc;
    }, 0);
  }, [userAnswers]);

  if (showResults) {
    return (
      <div className="text-center">
        <h2 className="text-3xl font-bold text-cyan-400 mb-4">Hasil Kuis</h2>
        <p className="text-2xl text-white mb-6">
          Skor Anda: <span className="font-bold text-cyan-300">{score}</span> /{" "}
          <span className="font-bold">{quizQuestions.length}</span>
        </p>
        <div className="space-y-4 text-left max-w-2xl mx-auto">
          {quizQuestions.map((q, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-slate-800 border border-slate-700"
            >
              <p className="font-semibold text-white">
                {index + 1}. {q.question}
              </p>
              <p
                className={`mt-2 ${
                  userAnswers[index] === q.correctAnswer
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                Jawaban Anda: {userAnswers[index] || "Tidak dijawab"}
                {userAnswers[index] !== q.correctAnswer && (
                  <span className="text-gray-400 block">
                    Jawaban Benar: {q.correctAnswer}
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>
        <button
          onClick={resetQuiz}
          className="mt-8 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Ulangi Kuis
        </button>
      </div>
    );
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <div>
      <h2 className="text-3xl font-bold text-cyan-400 mb-2">
        Kuis: Pertanyaan {currentQuestionIndex + 1}/{quizQuestions.length}
      </h2>
      <p className="text-xl text-gray-300 mb-6">{currentQuestion.question}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentQuestion.options.map((option) => (
          <button
            key={option}
            onClick={() => handleAnswer(option)}
            className={`p-4 rounded-lg text-left transition-all duration-200 border-2
              ${
                userAnswers[currentQuestionIndex] === option
                  ? "bg-cyan-500 border-cyan-400 text-white scale-105"
                  : "bg-slate-800 border-slate-700 hover:bg-slate-700 hover:border-cyan-600 text-gray-300"
              }`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="mt-8 text-right">
        <button
          onClick={handleNext}
          disabled={!userAnswers[currentQuestionIndex]}
          className="bg-cyan-600 text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed enabled:hover:bg-cyan-500"
        >
          {currentQuestionIndex < quizQuestions.length - 1
            ? "Selanjutnya"
            : "Lihat Hasil"}
        </button>
      </div>
    </div>
  );
}

// -- Komponen Utama Aplikasi --
export default function App() {
  const [activeTopicId, setActiveTopicId] = useState(courseContent[0].id);

  const activeTopicIndex = useMemo(
    () => courseContent.findIndex((t) => t.id === activeTopicId),
    [activeTopicId]
  );
  const ActiveContent = courseContent[activeTopicIndex].content;

  const navigateTo = (topicId) => {
    setActiveTopicId(topicId);
  };

  const navigatePrev = () => {
    if (activeTopicIndex > 0) {
      setActiveTopicId(courseContent[activeTopicIndex - 1].id);
    }
  };

  const navigateNext = () => {
    if (activeTopicIndex < courseContent.length - 1) {
      setActiveTopicId(courseContent[activeTopicIndex + 1].id);
    }
  };

  return (
    <div className="bg-slate-900 text-white min-h-screen font-sans">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 lg:w-72 bg-slate-900/80 backdrop-blur-sm border-r border-slate-800 p-6 sticky top-0 h-screen overflow-y-auto">
          <h1 className="text-2xl font-bold text-white mb-8">
            <BrainCircuit className="inline-block mr-2 text-cyan-400" />
            Transformer
          </h1>
          <nav>
            <ul>
              {courseContent.map((topic) => (
                <li key={topic.id} className="mb-2">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo(topic.id);
                    }}
                    className={`flex items-center p-3 rounded-lg transition-colors text-base ${
                      activeTopicId === topic.id
                        ? "bg-cyan-500/20 text-cyan-300 font-semibold"
                        : "text-gray-400 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <topic.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    <span className="flex-grow">{topic.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 sm:p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-800/50 p-8 rounded-2xl shadow-2xl shadow-slate-900/50 border border-slate-700/50 min-h-[70vh]">
              <ActiveContent onNavigate={navigateTo} />
            </div>

            {/* Tombol Navigasi Bawah */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={navigatePrev}
                disabled={activeTopicIndex === 0}
                className="flex items-center gap-2 px-4 py-2 bg-slate-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600 transition-colors"
              >
                <ChevronLeft size={20} />
                Sebelumnya
              </button>
              <div className="text-gray-400">
                {activeTopicIndex + 1} / {courseContent.length}
              </div>
              <button
                onClick={navigateNext}
                disabled={activeTopicIndex === courseContent.length - 1}
                className="flex items-center gap-2 px-4 py-2 bg-cyan-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-cyan-500 transition-colors"
              >
                Selanjutnya
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
