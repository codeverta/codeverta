import React, { useState, useMemo } from "react";
import {
  BookOpen,
  BrainCircuit,
  CheckCircle,
  XCircle,
  ArrowLeft,
  ArrowRight,
  Award,
} from "lucide-react";

// Komponen Ikon untuk representasi visual
const MaskIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="inline-block h-5 w-5 mr-1 text-indigo-500"
  >
    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" />
    <path d="M16 10h-2a2 2 0 0 0-4 0H8" />
    <path d="M12 14v1" />
    <path d="M12 17v1" />
  </svg>
);

const SentenceIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="inline-block h-5 w-5 mr-1 text-teal-500"
  >
    <path d="M18 6H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h13l4-4V8a2 2 0 0 0-2-2z" />
    <path d="M5 10h8" />
    <path d="M5 14h5" />
  </svg>
);

// Data untuk Kuis
const quizData = [
  {
    question: "Apa kepanjangan dari BERT?",
    options: [
      "Bidirectional Encoder Representations from Transformers",
      "Bilateral Engagement Rate Tracker",
      "Bidirectional Encoding for Rational Text",
      "Basic Encoder for Reading Text",
    ],
    answer: "Bidirectional Encoder Representations from Transformers",
  },
  {
    question:
      "Manakah dari berikut ini yang merupakan tugas pre-training utama BERT?",
    options: [
      "Text Generation dan Summarization",
      "Masked Language Model (MLM) dan Next Sentence Prediction (NSP)",
      "Sentiment Analysis dan Question Answering",
      "Image Captioning dan Translation",
    ],
    answer: "Masked Language Model (MLM) dan Next Sentence Prediction (NSP)",
  },
  {
    question:
      "Apa keuntungan utama dari sifat 'bidirectional' BERT dibandingkan model sebelumnya seperti GPT?",
    options: [
      "Lebih cepat dalam melakukan training",
      "Membutuhkan lebih sedikit data",
      "Memahami konteks dari kedua arah (kiri dan kanan) sebuah kata",
      "Hanya bisa digunakan untuk bahasa Inggris",
    ],
    answer: "Memahami konteks dari kedua arah (kiri dan kanan) sebuah kata",
  },
];

// Komponen Interaktif untuk Masked Language Model (MLM)
const MLMDemo = () => {
  const [revealed, setRevealed] = useState(false);
  const sentence = ["Bank", "adalah", "tempat", "untuk", "menyimpan", "."];
  const maskedWord = "uang";

  return (
    <div className="bg-slate-100 p-6 rounded-lg my-4 text-center border border-slate-200">
      <h4 className="font-semibold text-lg text-slate-800 mb-3">
        Demonstrasi Masked Language Model (MLM)
      </h4>
      <p className="text-slate-600 mb-4">
        BERT dilatih untuk memprediksi kata yang disembunyikan ([MASK]). Coba
        lihat kalimat di bawah ini.
      </p>
      <div className="text-xl font-mono p-4 bg-white rounded-md shadow-inner text-slate-700 tracking-wider">
        {sentence.slice(0, 5).join(" ")}
        <span
          className={`inline-block mx-2 px-2 py-1 rounded-md transition-all duration-300 ${
            revealed ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
          }`}
        >
          {revealed ? maskedWord : "[MASK]"}
        </span>
        {sentence[5]}
      </div>
      <button
        onClick={() => setRevealed(!revealed)}
        className="mt-4 bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {revealed ? "Sembunyikan Kata" : "Tebak Kata"}
      </button>
    </div>
  );
};

// Komponen Interaktif untuk Next Sentence Prediction (NSP)
const NSPDemo = () => {
  const [feedback, setFeedback] = useState(null);
  const sentenceA = "Ibu pergi ke pasar.";
  const sentenceB_next = "Ia membeli sayur dan buah.";
  const sentenceB_notNext = "Langit berwarna biru.";
  const [currentSentenceB, setCurrentSentenceB] = useState(sentenceB_next);
  const isNext = currentSentenceB === sentenceB_next;

  const handleChoice = (choice) => {
    if (choice === isNext) {
      setFeedback({
        correct: true,
        message: "Tepat! Kalimat kedua adalah kelanjutan yang logis.",
      });
    } else {
      setFeedback({
        correct: false,
        message: "Kurang tepat. Coba pikirkan lagi hubungan antar kalimat.",
      });
    }
  };

  const reset = () => {
    setFeedback(null);
    setCurrentSentenceB((s) =>
      s === sentenceB_next ? sentenceB_notNext : sentenceB_next
    );
  };

  return (
    <div className="bg-slate-100 p-6 rounded-lg my-4 border border-slate-200">
      <h4 className="font-semibold text-lg text-slate-800 mb-3 text-center">
        Demonstrasi Next Sentence Prediction (NSP)
      </h4>
      <p className="text-slate-600 mb-4 text-center">
        BERT juga belajar apakah sebuah kalimat adalah kelanjutan dari kalimat
        lainnya.
      </p>
      <div className="bg-white p-4 rounded-lg shadow-inner space-y-3">
        <p className="text-slate-700">
          <strong>Kalimat A:</strong> "{sentenceA}"
        </p>
        <p className="text-slate-700">
          <strong>Kalimat B:</strong> "{currentSentenceB}"
        </p>
      </div>
      <div className="mt-4 text-center">
        <p className="font-semibold mb-2 text-slate-700">
          Apakah Kalimat B adalah kelanjutan dari Kalimat A?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => handleChoice(true)}
            className="bg-teal-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-teal-600 transition-transform transform hover:scale-105"
          >
            Ya
          </button>
          <button
            onClick={() => handleChoice(false)}
            className="bg-rose-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-rose-600 transition-transform transform hover:scale-105"
          >
            Bukan
          </button>
        </div>
      </div>
      {feedback && (
        <div
          className={`mt-4 p-3 rounded-lg flex items-center justify-center gap-2 ${
            feedback.correct
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {feedback.correct ? <CheckCircle size={20} /> : <XCircle size={20} />}
          <span>{feedback.message}</span>
        </div>
      )}
      <div className="text-center mt-4">
        <button
          onClick={reset}
          className="text-sm text-indigo-600 hover:text-indigo-800"
        >
          Coba contoh lain
        </button>
      </div>
    </div>
  );
};

// Komponen untuk Kuis
const Quiz = ({ onComplete }) => {
  const [answers, setAnswers] = useState({});
  const [showScore, setShowScore] = useState(false);

  const handleAnswerChange = (questionIndex, answer) => {
    setAnswers({
      ...answers,
      [questionIndex]: answer,
    });
  };

  const handleSubmit = () => {
    setShowScore(true);
  };

  const score = useMemo(() => {
    return quizData.reduce((acc, question, index) => {
      return acc + (answers[index] === question.answer ? 1 : 0);
    }, 0);
  }, [answers]);

  if (showScore) {
    onComplete(score);
    return (
      <div className="bg-white p-8 rounded-xl shadow-lg text-center border border-slate-200">
        <Award className="mx-auto h-16 w-16 text-yellow-500" />
        <h3 className="text-2xl font-bold text-slate-800 mt-4">
          Kuis Selesai!
        </h3>
        <p className="text-slate-600 mt-2 text-lg">Skor Anda:</p>
        <p className="text-5xl font-bold text-indigo-600 my-4">
          {score} / {quizData.length}
        </p>
        <button
          onClick={() => {
            setShowScore(false);
            setAnswers({});
            onComplete(null);
          }}
          className="mt-4 bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105"
        >
          Ulangi Kuis
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-center text-slate-800">
        Uji Pemahamanmu!
      </h2>
      {quizData.map((item, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow-md border border-slate-200"
        >
          <p className="font-semibold text-lg text-slate-800 mb-4">
            {index + 1}. {item.question}
          </p>
          <div className="space-y-3">
            {item.options.map((option) => (
              <label
                key={option}
                className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  answers[index] === option
                    ? "bg-indigo-100 border-indigo-500"
                    : "border-slate-300 hover:border-indigo-400"
                }`}
              >
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option}
                  checked={answers[index] === option}
                  onChange={() => handleAnswerChange(index, option)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-400"
                />
                <span className="ml-3 text-slate-700">{option}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
      <div className="text-center">
        <button
          onClick={handleSubmit}
          disabled={Object.keys(answers).length !== quizData.length}
          className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:scale-100"
        >
          Lihat Skor
        </button>
      </div>
    </div>
  );
};

// Data utama untuk konten kursus
const courseContent = [
  {
    title: "Selamat Datang!",
    icon: BookOpen,
    content: (
      <>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          Pengenalan BERT
        </h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          Selamat datang di kursus interaktif singkat mengenai{" "}
          <strong>
            BERT (Bidirectional Encoder Representations from Transformers)
          </strong>
          . BERT adalah sebuah model pemrosesan bahasa alami (NLP) yang
          revolusioner, dikembangkan oleh Google pada tahun 2018.
        </p>
        <p className="text-slate-600 leading-relaxed mb-4">
          Tidak seperti model-model sebelumnya, BERT mampu memahami konteks
          sebuah kata berdasarkan kata-kata di{" "}
          <strong>sebelah kiri dan kanannya (bidirectional)</strong>. Kemampuan
          inilah yang membuatnya sangat kuat dalam berbagai tugas NLP.
        </p>
        <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500">
          <p className="text-indigo-800">
            Dalam kursus ini, kita akan menjelajahi konsep inti BERT, melihat
            cara kerjanya melalui demonstrasi interaktif, dan menguji pemahaman
            Anda di akhir.
          </p>
        </div>
      </>
    ),
  },
  {
    title: "Kunci: Bidirectional",
    icon: BrainCircuit,
    content: (
      <>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          Kekuatan Konteks Dua Arah
        </h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          Kata "Bidirectional" adalah kunci dari kehebatan BERT. Model
          sebelumnya seperti GPT bersifat "unidirectional", artinya mereka
          memproses teks hanya dari kiri ke kanan.
        </p>
        <p className="text-slate-600 leading-relaxed mb-4">
          Mari kita lihat contoh: "Saya pergi ke <strong>bank</strong> untuk
          menabung."
        </p>
        <ul className="list-disc list-inside space-y-2 text-slate-600 mb-4">
          <li>
            Model <strong>unidirectional</strong> hanya melihat "Saya pergi ke"
            untuk memahami kata "bank". Konteksnya terbatas.
          </li>
          <li>
            Model <strong>bidirectional</strong> (BERT) melihat seluruh kalimat,
            termasuk "untuk menabung". Ini memberikan pemahaman yang jauh lebih
            kaya bahwa "bank" di sini adalah lembaga keuangan, bukan tepi sungai
            (river bank).
          </li>
        </ul>
        <div className="bg-slate-100 p-4 rounded-lg shadow-inner">
          <p className="font-semibold text-center text-slate-700">
            BERT: <span className="text-blue-600">Melihat ke belakang</span> dan{" "}
            <span className="text-green-600">melihat ke depan</span> untuk
            pemahaman penuh.
          </p>
        </div>
      </>
    ),
  },
  {
    title: "Pre-training: MLM",
    icon: MaskIcon,
    content: (
      <>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          Pre-training #1: Masked Language Model (MLM)
        </h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          Bagaimana BERT belajar menjadi begitu pintar? Melalui proses
          "pre-training" pada data teks yang sangat besar (seperti seluruh
          Wikipedia). Salah satu tugas utamanya adalah{" "}
          <strong>Masked Language Model (MLM)</strong>.
        </p>
        <p className="text-slate-600 leading-relaxed mb-4">
          Idenya sederhana namun cerdas:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-slate-600 mb-4">
          <li>Ambil sebuah kalimat.</li>
          <li>Sembunyikan (mask) sekitar 15% kata secara acak.</li>
          <li>Tugas BERT adalah menebak kata asli yang disembunyikan itu.</li>
        </ol>
        <p className="text-slate-600 leading-relaxed mb-4">
          Dengan melakukan ini jutaan kali, BERT menjadi sangat ahli dalam
          memahami hubungan antar kata dan struktur kalimat.
        </p>
        <MLMDemo />
      </>
    ),
  },
  {
    title: "Pre-training: NSP",
    icon: SentenceIcon,
    content: (
      <>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          Pre-training #2: Next Sentence Prediction (NSP)
        </h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          Selain MLM, BERT juga dilatih dengan tugas{" "}
          <strong>Next Sentence Prediction (NSP)</strong>. Tugas ini membantu
          BERT memahami hubungan antar kalimat, yang penting untuk tugas seperti
          Question Answering dan Natural Language Inference.
        </p>
        <p className="text-slate-600 leading-relaxed mb-4">
          Prosesnya seperti ini:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-slate-600 mb-4">
          <li>Model diberi dua kalimat, A dan B.</li>
          <li>
            50% dari waktu, kalimat B adalah kalimat yang benar-benar mengikuti
            kalimat A.
          </li>
          <li>50% sisanya, kalimat B adalah kalimat acak dari korpus teks.</li>
          <li>
            Tugas BERT adalah memprediksi apakah kalimat B adalah kelanjutan
            dari A (IsNext) atau bukan (NotNext).
          </li>
        </ol>
        <NSPDemo />
      </>
    ),
  },
  {
    title: "Kuis",
    icon: Award,
    content: null, // Konten kuis akan ditangani secara khusus
  },
];

export default function BertScreen() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [quizScore, setQuizScore] = useState(null);

  const CurrentContent = courseContent[activeChapter].content;

  const goToNext = () => {
    if (activeChapter < courseContent.length - 1) {
      setActiveChapter(activeChapter + 1);
      setQuizScore(null); // Reset score view when moving
    }
  };

  const goToPrev = () => {
    if (activeChapter > 0) {
      setActiveChapter(activeChapter - 1);
      setQuizScore(null); // Reset score view when moving
    }
  };

  const progress = ((activeChapter + 1) / courseContent.length) * 100;

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900 antialiased">
      <div className="container mx-auto p-4 md:p-8">
        {/* Header */}
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800">
            Kursus Interaktif{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-teal-500">
              BERT
            </span>
          </h1>
          <p className="text-slate-500 mt-2 text-lg">
            Pelajari Konsep Inti Bidirectional Encoder Representations from
            Transformers
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigasi */}
          <aside className="w-full md:w-1/4 lg:w-1/5">
            <div className="bg-white p-4 rounded-xl shadow-md sticky top-8 border border-slate-200">
              <h3 className="font-bold text-lg mb-4 text-slate-700">Topik</h3>
              <nav className="space-y-2">
                {courseContent.map((item, index) => (
                  <button
                    key={item.title}
                    onClick={() => {
                      setActiveChapter(index);
                      setQuizScore(null);
                    }}
                    className={`w-full text-left px-4 py-2.5 rounded-lg flex items-center gap-3 transition-all duration-200 ${
                      activeChapter === index
                        ? "bg-indigo-500 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
                    }`}
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{item.title}</span>
                  </button>
                ))}
              </nav>
              {/* Progress Bar */}
              <div className="mt-6">
                <span className="text-sm font-medium text-slate-500">
                  Progress
                </span>
                <div className="w-full bg-slate-200 rounded-full h-2.5 mt-1">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-teal-500 h-2.5 rounded-full"
                    style={{
                      width: `${progress}%`,
                      transition: "width 0.5s ease-in-out",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </aside>

          {/* Konten Utama */}
          <main className="w-full md:w-3/4 lg:w-4/5">
            <div className="bg-white p-6 md:p-10 rounded-xl shadow-lg border border-slate-200 min-h-[500px]">
              {courseContent[activeChapter].title !== "Kuis" ? (
                CurrentContent
              ) : (
                <Quiz onComplete={setQuizScore} />
              )}
            </div>

            {/* Tombol Navigasi Bawah */}
            <div className="mt-8 flex justify-between items-center">
              <button
                onClick={goToPrev}
                disabled={activeChapter === 0}
                className="flex items-center gap-2 bg-white border border-slate-300 text-slate-700 font-bold py-2 px-4 rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft size={16} />
                Sebelumnya
              </button>
              <button
                onClick={goToNext}
                disabled={activeChapter === courseContent.length - 1}
                className="flex items-center gap-2 bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Selanjutnya
                <ArrowRight size={16} />
              </button>
            </div>
          </main>
        </div>

        <footer className="text-center mt-12 text-slate-500 text-sm">
          <p>Dibuat dengan React & Tailwind CSS.</p>
        </footer>
      </div>
    </div>
  );
}
