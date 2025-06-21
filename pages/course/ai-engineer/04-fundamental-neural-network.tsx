"use client"
import React, { useState } from "react";

// Komponen untuk ikon, menggunakan SVG inline agar mandiri
const BrainCircuitIcon = () => (
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
    className="lucide lucide-brain-circuit"
  >
    <path d="M12 5a3 3 0 1 0-5.95 1.12L4 8V6" />
    <path d="M12 19a3 3 0 1 1 5.95-1.12L20 16v2" />
    <path d="M12 12a3 3 0 1 0 5.95 1.12L20 11V9" />
    <path d="M12 12a3 3 0 1 1-5.95-1.12L4 13v-2" />
    <path d="M14 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
    <path d="M4.5 8.5h3" />
    <path d="M16.5 8.5h3" />
    <path d="M4.5 15.5h3" />
    <path d="M16.5 15.5h3" />
  </svg>
);

const BookOpenIcon = () => (
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
    className="lucide lucide-book-open-text"
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    <path d="M6 8h2" />
    <path d="M6 12h2" />
    <path d="M16 8h2" />
    <path d="M16 12h2" />
  </svg>
);

// Komponen Kuis yang berdiri sendiri untuk Uji Pemahaman
const Quiz = () => {
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const options = [
    "Gradient Descent",
    "Backpropagation",
    "K-Means Clustering",
    "Decision Tree",
  ];
  const correctAnswer = "Backpropagation";

  const handleSelect = (option) => {
    setSelected(option);
    setIsCorrect(option === correctAnswer);
  };

  return (
    <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg my-6">
      <h3 className="font-bold text-slate-800 mb-4">Pertanyaan:</h3>
      <p className="text-lg mb-4">
        Algoritma apa yang paling umum digunakan oleh jaringan saraf untuk
        "belajar" dengan menyesuaikan bobotnya berdasarkan kesalahan prediksi?
      </p>

      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleSelect(option)}
            disabled={selected !== null}
            className={`w-full text-left p-3 rounded-md border-2 transition-all duration-200 disabled:cursor-not-allowed ${
              selected === null
                ? "border-slate-300 hover:bg-slate-100"
                : selected === option
                ? isCorrect
                  ? "border-green-500 bg-green-100"
                  : "border-red-500 bg-red-100"
                : "border-slate-300"
            }`}
          >
            {option}
          </button>
        ))}
        {isCorrect === true && (
          <p className="text-green-600 font-semibold mt-4">
            Benar! Backpropagation adalah jawabannya.
          </p>
        )}
        {isCorrect === false && (
          <p className="text-red-600 font-semibold mt-4">
            Belum tepat. Coba lihat kembali materi "Bagaimana Jaringan Belajar".
          </p>
        )}
      </div>
    </div>
  );
};

// Konten untuk setiap topik pelajaran
const courseContent = [
  {
    id: 1,
    title: "Pengenalan Jaringan Saraf Tiruan",
    content: (
      <div className="space-y-4 text-slate-700">
        <p>
          Jaringan Saraf Tiruan (JST), atau *Artificial Neural Network* (ANN),
          adalah model komputasi yang terinspirasi oleh cara kerja otak biologis
          manusia. Sama seperti otak kita yang terdiri dari miliaran neuron yang
          saling terhubung, JST terdiri dari unit-unit pemrosesan sederhana yang
          disebut "neuron" atau "node".
        </p>
        <p>
          Tujuan utama JST adalah untuk mengenali pola dalam data. Pola ini bisa
          berupa gambar, suara, teks, atau data numerik. Mereka "belajar" dari
          data contoh, bukan diprogram secara eksplisit untuk tugas tertentu.
        </p>
        <div className="bg-slate-100 p-4 rounded-lg my-6">
          <h3 className="font-semibold text-slate-800 mb-2">
            Analogi Otak Manusia:
          </h3>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <span className="font-semibold">Neuron Biologis:</span> Menerima
              sinyal, memprosesnya, dan meneruskannya.
            </li>
            <li>
              <span className="font-semibold">Neuron Tiruan (Node):</span>{" "}
              Menerima data input, melakukan perhitungan, dan menghasilkan
              output.
            </li>
          </ul>
        </div>
        <div className="w-full flex justify-center py-4">
          <svg
            width="250"
            height="150"
            viewBox="0 0 250 150"
            className="text-slate-400"
          >
            <title>Diagram Jaringan Saraf Sederhana</title>

            {/* Connections from Input to Hidden */}
            {[30, 75, 120].map((y1) =>
              [30, 55, 95, 120].map((y2) => (
                <line
                  key={`i${y1}-h${y2}`}
                  x1="40"
                  y1={y1}
                  x2="125"
                  y2={y2}
                  stroke="currentColor"
                  strokeOpacity="0.3"
                />
              ))
            )}

            {/* Connections from Hidden to Output */}
            {[30, 55, 95, 120].map((y1) => (
              <line
                key={`h${y1}-o75`}
                x1="125"
                y1={y1}
                x2="210"
                y2={75}
                stroke="currentColor"
                strokeOpacity="0.3"
              />
            ))}

            {/* Input Layer */}
            <g>
              <text
                x="5"
                y="15"
                fontSize="12"
                fill="black"
                className="font-medium"
              >
                Input
              </text>
              <circle cx="30" cy="30" r="10" fill="currentColor" />
              <circle cx="30" cy="75" r="10" fill="currentColor" />
              <circle cx="30" cy="120" r="10" fill="currentColor" />
            </g>

            {/* Hidden Layer */}
            <g>
              <text
                x="100"
                y="15"
                fontSize="12"
                fill="black"
                className="font-medium"
              >
                Hidden
              </text>
              <circle cx="125" cy="30" r="10" fill="currentColor" />
              <circle cx="125" cy="55" r="10" fill="currentColor" />
              <circle cx="125" cy="95" r="10" fill="currentColor" />
              <circle cx="125" cy="120" r="10" fill="currentColor" />
            </g>

            {/* Output Layer */}
            <g>
              <text
                x="195"
                y="15"
                fontSize="12"
                fill="black"
                className="font-medium"
              >
                Output
              </text>
              <circle cx="220" cy="75" r="10" fill="currentColor" />
            </g>
          </svg>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: "Perceptron: Neuron Pertama",
    content: (
      <div className="space-y-4 text-slate-700">
        <p>
          Perceptron adalah bentuk paling sederhana dari jaringan saraf, yang
          diperkenalkan oleh Frank Rosenblatt pada tahun 1957. Ini adalah model
          untuk klasifikasi biner: memutuskan apakah suatu input termasuk dalam
          satu kategori atau kategori lainnya.
        </p>
        <h3 className="font-semibold text-slate-800 pt-4">
          Bagaimana Cara Kerjanya?
        </h3>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            <strong>Input:</strong> Menerima beberapa nilai input (x1, x2, ...).
          </li>
          <li>
            <strong>Bobot (Weights):</strong> Setiap input memiliki "bobot" (w1,
            w2, ...) yang menentukan seberapa penting input tersebut.
          </li>
          <li>
            <strong>Penjumlahan:</strong> Semua input yang telah dikalikan
            dengan bobotnya dijumlahkan. Seringkali, ada juga nilai "bias" yang
            ditambahkan.
          </li>
          <li>
            <strong>Fungsi Aktivasi:</strong> Hasil penjumlahan dilewatkan ke
            fungsi aktivasi (misalnya, fungsi step) yang menghasilkan output
            akhir (biasanya 0 atau 1).
          </li>
        </ol>
        <div className="bg-emerald-50 text-emerald-800 p-4 rounded-lg mt-6">
          <p>
            <span className="font-bold">Intinya:</span> Perceptron mengambil
            banyak bukti (input), menimbangnya berdasarkan kepentingannya
            (bobot), dan membuat keputusan ya/tidak.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: "Fungsi Aktivasi",
    content: (
      <div className="space-y-4 text-slate-700">
        <p>
          Fungsi aktivasi adalah komponen kunci dalam sebuah neuron. Setelah
          neuron menjumlahkan semua input yang dibobotkan, fungsi aktivasi
          memutuskan apakah neuron tersebut harus "aktif" atau tidak. Ini
          menambahkan non-linearitas ke dalam jaringan, yang memungkinkannya
          mempelajari pola yang kompleks.
        </p>
        <p>
          Tanpa fungsi aktivasi (atau dengan fungsi linear), JST sekompleks
          apapun akan berperilaku seperti model regresi linear sederhana.
        </p>
        <h3 className="font-semibold text-slate-800 pt-4">
          Beberapa Fungsi Populer:
        </h3>
        <ul className="list-disc list-inside space-y-3">
          <li>
            <span className="font-semibold">Sigmoid:</span> Mengubah angka
            menjadi nilai antara 0 dan 1. Berguna untuk memprediksi
            probabilitas.
            <div className="text-xs text-slate-500 pl-4">
              Formula: σ(x) = 1 / (1 + e⁻ˣ)
            </div>
          </li>
          <li>
            <span className="font-semibold">ReLU (Rectified Linear Unit):</span>{" "}
            Mengeluarkan input jika positif, jika tidak maka mengeluarkan nol.
            Sangat efisien secara komputasi dan paling umum digunakan.
            <div className="text-xs text-slate-500 pl-4">
              Formula: f(x) = max(0, x)
            </div>
          </li>
          <li>
            <span className="font-semibold">Tanh (Hyperbolic Tangent):</span>{" "}
            Mirip Sigmoid, tetapi mengubah output menjadi antara -1 dan 1.
            <div className="text-xs text-slate-500 pl-4">Formula: tanh(x)</div>
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 4,
    title: "Bagaimana Jaringan Belajar: Backpropagation",
    content: (
      <div className="space-y-4 text-slate-700">
        <p>
          Proses "belajar" dalam JST biasanya dilakukan melalui algoritma yang
          disebut <span className="font-semibold">Backpropagation</span>, yang
          merupakan singkatan dari "propagasi mundur dari kesalahan" (*backward
          propagation of errors*).
        </p>
        <p>Ini adalah proses coba-coba yang cerdas:</p>
        <ol className="list-decimal list-inside space-y-3 bg-slate-100 p-4 rounded-lg">
          <li>
            <strong>Tebakan (Forward Pass):</strong> Jaringan menerima input dan
            membuat prediksi (misalnya, "Saya pikir gambar ini adalah kucing").
          </li>
          <li>
            <strong>Hitung Kesalahan (Error):</strong> Prediksi jaringan
            dibandingkan dengan label yang benar ("Gambar ini sebenarnya adalah
            anjing"). Perbedaan antara prediksi dan kebenaran adalah "kesalahan"
            atau "loss".
          </li>
          <li>
            <strong>Propagasi Mundur (Backward Pass):</strong> Algoritma
            berjalan mundur dari output ke input, mencari tahu seberapa besar
            kontribusi setiap bobot terhadap total kesalahan.
          </li>
          <li>
            <strong>Pembaruan Bobot (Weight Update):</strong> Bobot dalam
            jaringan sedikit disesuaikan untuk mengurangi kesalahan. Bobot yang
            paling berkontribusi pada kesalahan akan diubah paling banyak.
          </li>
        </ol>
        <p className="pt-4">
          Proses ini diulang ribuan atau jutaan kali dengan banyak data contoh,
          dan secara bertahap, jaringan menjadi lebih baik dalam membuat
          prediksi yang akurat.
        </p>
      </div>
    ),
  },
  {
    id: 5,
    title: "Jenis-Jenis Jaringan Saraf Tiruan",
    content: (
      <div className="space-y-4 text-slate-700">
        <p>
          Ada banyak arsitektur JST yang berbeda, masing-masing dirancang untuk
          tugas-tugas tertentu.
        </p>
        <div className="space-y-4">
          <div className="border p-4 rounded-lg">
            <h4 className="font-semibold text-slate-800">
              Convolutional Neural Networks (CNNs)
            </h4>
            <p className="mt-1">
              Spesialis dalam memproses data grid, seperti gambar. CNNs
              menggunakan filter khusus (konvolusi) untuk mendeteksi fitur
              seperti tepi, sudut, dan tekstur. Sangat baik untuk tugas
              klasifikasi gambar dan deteksi objek.
            </p>
            <p className="text-sm text-blue-600 mt-2">
              Contoh Penggunaan: Pengenalan wajah, mobil otonom.
            </p>
          </div>
          <div className="border p-4 rounded-lg">
            <h4 className="font-semibold text-slate-800">
              Recurrent Neural Networks (RNNs)
            </h4>
            <p className="mt-1">
              Dirancang untuk bekerja dengan data sekuensial atau data deret
              waktu. RNN memiliki "memori" yang memungkinkan informasi bertahan
              dari satu langkah ke langkah berikutnya. Cocok untuk data di mana
              urutan itu penting.
            </p>
            <p className="text-sm text-blue-600 mt-2">
              Contoh Penggunaan: Terjemahan bahasa, prediksi pasar saham,
              chatbot.
            </p>
          </div>
          <div className="border p-4 rounded-lg">
            <h4 className="font-semibold text-slate-800">Transformers</h4>
            <p className="mt-1">
              Arsitektur yang lebih modern, awalnya untuk tugas pemrosesan
              bahasa alami (NLP). Sangat efisien dalam menangani hubungan jarak
              jauh dalam data. Merupakan dasar dari model bahasa besar seperti
              GPT.
            </p>
            <p className="text-sm text-blue-600 mt-2">
              Contoh Penggunaan: ChatGPT, Google Translate.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 6,
    title: "Uji Pemahaman",
    content: (
      <div className="space-y-4 text-slate-700">
        <p>
          Mari kita lihat seberapa baik Anda memahami konsep dasarnya. Jawab
          pertanyaan di bawah ini.
        </p>
        {/* Memanggil komponen Kuis yang sudah dirapikan */}
        <Quiz />
      </div>
    ),
  },
];

function App() {
  const [activeTopic, setActiveTopic] = useState(0);

  const handleTopicSelect = (index) => {
    setActiveTopic(index);
  };

  const currentTopicData = courseContent[activeTopic];

  const goToNext = () => {
    setActiveTopic((prev) => Math.min(prev + 1, courseContent.length - 1));
  };

  const goToPrev = () => {
    setActiveTopic((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="bg-slate-50 font-sans text-slate-800 min-h-screen">
      <header className="bg-white border-b border-slate-200 p-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center space-x-3">
          <BrainCircuitIcon />
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Pengantar Kecerdasan Buatan
            </h1>
            <p className="text-sm text-slate-500">
              Modul: Dasar-Dasar Jaringan Saraf Tiruan
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-8 grid md:grid-cols-12 gap-8">
        {/* Sidebar Navigasi */}
        <aside className="md:col-span-3 lg:col-span-3 bg-white p-4 rounded-xl border border-slate-200 h-fit shadow-sm">
          <h2 className="text-sm font-semibold uppercase text-slate-500 mb-4 tracking-wider flex items-center gap-2">
            <BookOpenIcon />
            Topik Pelajaran
          </h2>
          <nav className="space-y-1">
            {courseContent.map((topic, index) => (
              <button
                key={topic.id}
                onClick={() => handleTopicSelect(index)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                  activeTopic === index
                    ? "bg-blue-500 text-white shadow"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {topic.title}
              </button>
            ))}
          </nav>
        </aside>

        {/* Konten Utama */}
        <div className="md:col-span-9 lg:col-span-9 bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm">
          <article>
            <header className="mb-6 pb-6 border-b border-slate-200">
              <h2 className="text-3xl font-bold text-slate-900">
                {currentTopicData.title}
              </h2>
            </header>
            <div className="prose prose-slate max-w-none">
              {currentTopicData.content}
            </div>
          </article>

          {/* Tombol Navigasi Bawah */}
          <footer className="mt-8 pt-6 border-t border-slate-200 flex justify-between items-center">
            <button
              onClick={goToPrev}
              disabled={activeTopic === 0}
              className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Sebelumnya
            </button>
            <div className="text-sm text-slate-500">
              Topik {activeTopic + 1} dari {courseContent.length}
            </div>
            <button
              onClick={goToNext}
              disabled={activeTopic === courseContent.length - 1}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Selanjutnya
            </button>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
