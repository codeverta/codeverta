import React, { useState } from "react";
import {
  Book,
  Code,
  CheckCircle,
  Target,
  BarChart,
  Settings,
  Sliders,
  BrainCircuit,
  PlayCircle,
} from "lucide-react";

// --- Data Konten Kursus ---
// Di aplikasi nyata, ini mungkin berasal dari API atau file terpisah.
const courseContent = {
  pengantar: {
    title: "Pengantar Scikit-learn",
    icon: Book,
    content: (
      <>
        <h2 className="text-3xl font-bold mb-4 text-slate-800">
          Selamat Datang di Modul Scikit-learn!
        </h2>
        <p className="mb-4 text-lg text-slate-600">
          Scikit-learn adalah salah satu pustaka (library) machine learning
          paling populer dan kuat untuk Python. Kursus ini dirancang untuk
          memberikan Anda pemahaman mendalam tentang konsep-konsep inti dan cara
          menggunakannya secara efektif.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
          <p className="text-blue-800">
            Pustaka ini menyediakan alat yang sederhana dan efisien untuk
            analisis data prediktif, dapat diakses oleh semua orang, dan dapat
            digunakan kembali dalam berbagai konteks.
          </p>
        </div>
        <h3 className="text-2xl font-semibold mb-3 text-slate-700">
          Apa yang akan Anda Pelajari?
        </h3>
        <ul className="list-disc list-inside space-y-2 text-slate-600">
          <li>Dasar-dasar machine learning dengan Scikit-learn.</li>
          <li>Implementasi model Supervised dan Unsupervised Learning.</li>
          <li>
            Teknik-teknik penting untuk pra-pemrosesan data (preprocessing).
          </li>
          <li>Cara mengevaluasi performa model Anda secara akurat.</li>
          <li>Membangun pipeline machine learning dari awal hingga akhir.</li>
        </ul>
      </>
    ),
  },
  instalasi: {
    title: "Instalasi dan Pengaturan",
    icon: Settings,
    content: (
      <>
        <h2 className="text-3xl font-bold mb-4 text-slate-800">
          Instalasi dan Pengaturan
        </h2>
        <p className="mb-4 text-lg text-slate-600">
          Memulai dengan Scikit-learn sangatlah mudah. Pastikan Anda sudah
          memiliki Python (versi 3.6 atau lebih baru) dan pip terinstal di
          sistem Anda.
        </p>
        <p className="mb-4 text-slate-600">
          Scikit-learn juga bergantung pada beberapa pustaka lain seperti NumPy
          dan SciPy. Cara termudah untuk menginstalnya adalah dengan menggunakan
          pip.
        </p>
        <div className="bg-gray-800 text-white p-4 rounded-lg font-mono text-sm mb-6">
          <p className="flex justify-between items-center">
            <span>pip install -U scikit-learn</span>
            <button
              onClick={() =>
                navigator.clipboard.writeText("pip install -U scikit-learn")
              }
              className="text-gray-400 hover:text-white transition-colors"
            >
              Salin
            </button>
          </p>
        </div>
        <h3 className="text-2xl font-semibold mb-3 text-slate-700">
          Verifikasi Instalasi
        </h3>
        <p className="mb-4 text-slate-600">
          Setelah instalasi selesai, Anda dapat memverifikasinya dengan membuka
          interpreter Python dan menjalankan skrip singkat berikut:
        </p>
        <div className="bg-gray-800 text-white p-4 rounded-lg font-mono text-sm">
          <pre>
            <code>
              {`import sklearn

print(sklearn.__version__)`}
            </code>
          </pre>
        </div>
        <p className="mt-4 text-slate-600">
          Jika tidak ada error dan versi Scikit-learn tercetak, maka instalasi
          Anda telah berhasil!
        </p>
      </>
    ),
  },
  supervised: {
    title: "Supervised Learning",
    icon: Target,
    content: (
      <>
        <h2 className="text-3xl font-bold mb-4 text-slate-800">
          Model-model Supervised Learning
        </h2>
        <p className="mb-4 text-lg text-slate-600">
          Supervised learning (pembelajaran terarah) adalah tugas machine
          learning untuk mempelajari fungsi yang memetakan input ke output
          berdasarkan contoh pasangan input-output.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold text-xl mb-2 text-slate-700">
              Regresi Linear
            </h4>
            <p className="text-slate-600 mb-4">
              Model untuk memprediksi nilai kontinu (misalnya, harga rumah).
            </p>
            <pre className="bg-gray-100 p-2 rounded text-sm text-gray-700">
              <code>from sklearn.linear_model import LinearRegression</code>
            </pre>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold text-xl mb-2 text-slate-700">
              Regresi Logistik
            </h4>
            <p className="text-slate-600 mb-4">
              Model untuk tugas klasifikasi biner (misalnya, spam atau bukan
              spam).
            </p>
            <pre className="bg-gray-100 p-2 rounded text-sm text-gray-700">
              <code>from sklearn.linear_model import LogisticRegression</code>
            </pre>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold text-xl mb-2 text-slate-700">
              Support Vector Machines
            </h4>
            <p className="text-slate-600 mb-4">
              Efektif untuk klasifikasi di ruang berdimensi tinggi.
            </p>
            <pre className="bg-gray-100 p-2 rounded text-sm text-gray-700">
              <code>from sklearn.svm import SVC</code>
            </pre>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold text-xl mb-2 text-slate-700">
              Decision Trees
            </h4>
            <p className="text-slate-600 mb-4">
              Model yang mudah diinterpretasikan, berbentuk seperti diagram
              alir.
            </p>
            <pre className="bg-gray-100 p-2 rounded text-sm text-gray-700">
              <code>from sklearn.tree import DecisionTreeClassifier</code>
            </pre>
          </div>
        </div>
      </>
    ),
  },
  unsupervised: {
    title: "Unsupervised Learning",
    icon: BrainCircuit,
    content: (
      <>
        <h2 className="text-3xl font-bold mb-4 text-slate-800">
          Model-model Unsupervised Learning
        </h2>
        <p className="mb-4 text-lg text-slate-600">
          Unsupervised learning (pembelajaran tak terarah) digunakan ketika kita
          tidak memiliki data berlabel. Tujuannya adalah untuk menemukan pola
          atau struktur tersembunyi dalam data.
        </p>
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold text-xl mb-2 text-slate-700">
              K-Means Clustering
            </h4>
            <p className="text-slate-600 mb-4">
              Algoritma untuk mengelompokkan data ke dalam sejumlah K cluster
              berdasarkan kesamaan fitur.
            </p>
            <pre className="bg-gray-100 p-2 rounded text-sm text-gray-700">
              <code>from sklearn.cluster import KMeans</code>
            </pre>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold text-xl mb-2 text-slate-700">
              Principal Component Analysis (PCA)
            </h4>
            <p className="text-slate-600 mb-4">
              Teknik reduksi dimensi untuk mengurangi jumlah variabel sambil
              mempertahankan sebagian besar informasi.
            </p>
            <pre className="bg-gray-100 p-2 rounded text-sm text-gray-700">
              <code>from sklearn.decomposition import PCA</code>
            </pre>
          </div>
        </div>
      </>
    ),
  },
  preprocessing: {
    title: "Pra-pemrosesan Data",
    icon: Sliders,
    content: (
      <>
        <h2 className="text-3xl font-bold mb-4 text-slate-800">
          Pra-pemrosesan Data (Preprocessing)
        </h2>
        <p className="mb-4 text-lg text-slate-600">
          Kualitas data sangat menentukan kualitas model. Scikit-learn
          menyediakan berbagai alat untuk membersihkan dan mentransformasi data
          sebelum dimasukkan ke model.
        </p>
        <h3 className="text-2xl font-semibold mb-3 text-slate-700">
          Scaling dan Normalisasi
        </h3>
        <p className="mb-4 text-slate-600">
          Banyak algoritma bekerja lebih baik ketika fitur numerik berada pada
          skala yang sama.
        </p>
        <div className="bg-gray-800 text-white p-4 rounded-lg font-mono text-sm mb-6">
          <pre>
            <code>
              {`from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)`}
            </code>
          </pre>
        </div>
        <h3 className="text-2xl font-semibold mb-3 text-slate-700">
          Encoding Variabel Kategorikal
        </h3>
        <p className="mb-4 text-slate-600">
          Model machine learning memerlukan input numerik, jadi variabel
          kategori (seperti 'Merah', 'Biru') perlu diubah menjadi angka.
        </p>
        <div className="bg-gray-800 text-white p-4 rounded-lg font-mono text-sm">
          <pre>
            <code>
              {`from sklearn.preprocessing import OneHotEncoder

encoder = OneHotEncoder()
X_encoded = encoder.fit_transform(X_categorical)`}
            </code>
          </pre>
        </div>
      </>
    ),
  },
  evaluasi: {
    title: "Evaluasi Model",
    icon: BarChart,
    content: (
      <>
        <h2 className="text-3xl font-bold mb-4 text-slate-800">
          Evaluasi Model
        </h2>
        <p className="mb-4 text-lg text-slate-600">
          Setelah melatih model, penting untuk mengevaluasi seberapa baik
          performanya. Scikit-learn menyediakan metrik-metrik standar untuk
          tugas ini.
        </p>
        <h3 className="text-2xl font-semibold mb-3 text-slate-700">
          Metrik Klasifikasi
        </h3>
        <p className="mb-4 text-slate-600">
          Untuk tugas klasifikasi, kita sering menggunakan akurasi, presisi,
          recall, dan F1-score.
        </p>
        <div className="bg-gray-800 text-white p-4 rounded-lg font-mono text-sm mb-6">
          <pre>
            <code>
              {`from sklearn.metrics import accuracy_score, classification_report

y_pred = model.predict(X_test)
print(f"Akurasi: {accuracy_score(y_test, y_pred)}")
print(classification_report(y_test, y_pred))`}
            </code>
          </pre>
        </div>
        <h3 className="text-2xl font-semibold mb-3 text-slate-700">
          Cross-Validation
        </h3>
        <p className="mb-4 text-slate-600">
          Teknik yang lebih andal untuk evaluasi model, di mana data dibagi
          menjadi beberapa 'lipatan' (folds) untuk pelatihan dan pengujian
          berulang kali.
        </p>
        <div className="bg-gray-800 text-white p-4 rounded-lg font-mono text-sm">
          <pre>
            <code>
              {`from sklearn.model_selection import cross_val_score

scores = cross_val_score(model, X, y, cv=5)
print(f"Akurasi Rata-rata: {scores.mean():.2f} (+/- {scores.std() * 2:.2f})")`}
            </code>
          </pre>
        </div>
      </>
    ),
  },
  studi_kasus: {
    title: "Studi Kasus: Proyek",
    icon: PlayCircle,
    content: (
      <>
        <h2 className="text-3xl font-bold mb-4 text-slate-800">
          Studi Kasus: Prediksi Spesies Iris
        </h2>
        <p className="mb-4 text-lg text-slate-600">
          Mari kita gabungkan semua yang telah kita pelajari dalam sebuah proyek
          sederhana dari awal hingga akhir. Kita akan menggunakan dataset Iris
          yang terkenal untuk memprediksi spesies bunga berdasarkan ukuran sepal
          dan petal.
        </p>
        <div className="bg-gray-800 text-white p-4 rounded-lg font-mono text-sm mb-6">
          <pre className="overflow-x-auto">
            <code>
              {`# 1. Muat data
from sklearn.datasets import load_iris
iris = load_iris()
X, y = iris.data, iris.target

# 2. Bagi data menjadi data latih dan data uji
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# 3. Inisialisasi dan latih model
from sklearn.neighbors import KNeighborsClassifier
knn = KNeighborsClassifier(n_neighbors=3)
knn.fit(X_train, y_train)

# 4. Lakukan prediksi
y_pred = knn.predict(X_test)

# 5. Evaluasi model
from sklearn.metrics import accuracy_score
accuracy = accuracy_score(y_test, y_pred)
print(f"Akurasi model pada data uji: {accuracy:.2f}")

# Output yang diharapkan: Akurasi model pada data uji: 1.00`}
            </code>
          </pre>
        </div>
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
          <p className="text-green-800">
            Selamat! Anda baru saja membangun pipeline machine learning pertama
            Anda dengan Scikit-learn. Ini adalah fondasi yang kuat untuk
            mengerjakan proyek-proyek yang lebih kompleks di masa depan.
          </p>
        </div>
      </>
    ),
  },
};

const SidebarItem = ({ id, title, icon: Icon, isActive, onClick }) => (
  <li>
    <button
      onClick={() => onClick(id)}
      className={`w-full flex items-center p-3 text-base font-normal text-slate-900 rounded-lg group transition-all duration-200 ${
        isActive ? "bg-blue-100 text-blue-700 shadow-sm" : "hover:bg-gray-100"
      }`}
    >
      <Icon
        className={`w-6 h-6 transition-all duration-200 ${
          isActive ? "text-blue-600" : "text-gray-500 group-hover:text-gray-900"
        }`}
      />
      <span className="ml-3 flex-1 whitespace-nowrap text-left">{title}</span>
    </button>
  </li>
);

export default function App() {
  const [activeTopic, setActiveTopic] = useState("pengantar");
  const topics = Object.keys(courseContent);
  const activeContent = courseContent[activeTopic];

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r border-gray-200 flex-shrink-0">
        <div className="flex items-center justify-center h-20 border-b border-gray-200">
          <Code className="w-8 h-8 text-blue-600" />
          <h1 className="text-xl font-bold ml-2 text-slate-800">AI Course</h1>
        </div>
        <div className="p-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Topik Pembelajaran
          </h2>
          <ul className="space-y-2">
            {topics.map((topicId) => (
              <SidebarItem
                key={topicId}
                id={topicId}
                title={courseContent[topicId].title}
                icon={courseContent[topicId].icon}
                isActive={activeTopic === topicId}
                onClick={setActiveTopic}
              />
            ))}
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="h-20 flex items-center px-8 border-b border-gray-200 bg-white">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-full">
              {React.createElement(activeContent.icon, {
                className: "w-6 h-6 text-blue-600",
              })}
            </div>
            <h1 className="text-2xl font-bold text-slate-800 ml-4">
              {activeContent.title}
            </h1>
          </div>
        </div>

        <div className="p-8">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            {activeContent.content}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center p-4 text-sm text-gray-500">
          © 2025 Kursus AI Interaktif. Dibuat dengan React & Tailwind.
        </footer>
      </main>
    </div>
  );
}
