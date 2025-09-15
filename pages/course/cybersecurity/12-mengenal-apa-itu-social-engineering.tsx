import React, { useState } from "react";

// === Ikon SVG untuk setiap jenis serangan (agar lebih visual) ===
const PhishingIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-2"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
      clipRule="evenodd"
    />
    <path d="M15.545 15.394A9.01 9.01 0 0110 17a9.01 9.01 0 01-5.545-1.606 1 1 0 01.55-1.828 7.004 7.004 0 0010 0 1 1 0 01.55 1.828z" />
  </svg>
);
const BaitingIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-2"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm2 2a1 1 0 00-1 1v2a1 1 0 102 0V5a1 1 0 00-1-1zm5 0a1 1 0 00-1 1v2a1 1 0 102 0V5a1 1 0 00-1-1z"
      clipRule="evenodd"
    />
  </svg>
);
const PretextingIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-2"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h1a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
  </svg>
);
const TailgatingIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-2"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
  </svg>
);
const QuidProQuoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-2"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
  </svg>
);
const IconShieldCheck = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 mr-3 text-cyan-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944L12 22l9-1.056c-1.5-4.84-5.02-9.222-9.382-11.972z"
    />
  </svg>
);

// === Data untuk konten modul ===
const attackTypes = [
  {
    id: "phishing",
    name: "Phishing",
    icon: <PhishingIcon />,
    description:
      "Serangan paling umum, di mana penyerang menyamar sebagai entitas terpercaya (seperti bank atau rekan kerja) untuk menipu korban agar memberikan informasi sensitif seperti password, nomor kartu kredit, atau data pribadi.",
    howItWorks:
      "Biasanya dilakukan melalui email, pesan instan, atau situs web palsu yang terlihat sangat mirip dengan aslinya.",
    example:
      'Anda menerima email dari "Bank Anda" yang mengatakan ada aktivitas mencurigakan dan meminta Anda untuk "verifikasi akun" melalui link yang diberikan. Link tersebut mengarah ke situs palsu untuk mencuri kredensial Anda.',
    redFlags: [
      'Adanya rasa urgensi atau ancaman ("Akun Anda akan ditutup dalam 24 jam!").',
      "Alamat email pengirim yang aneh atau sedikit berbeda dari aslinya (misal, `support@bank-anda.co` bukan `support@bank-anda.com`).",
      "Link yang mencurigakan (arahkan mouse ke atas link untuk melihat URL aslinya).",
      "Kesalahan tata bahasa atau ejaan yang buruk.",
      "Permintaan informasi sensitif yang tidak wajar.",
    ],
  },
  {
    id: "pretexting",
    name: "Pretexting",
    icon: <PretextingIcon />,
    description:
      "Penyerang menciptakan sebuah skenario atau dalih (pretext) yang meyakinkan untuk mendapatkan informasi dari target.",
    howItWorks:
      "Penyerang akan melakukan riset terlebih dahulu untuk membuat cerita mereka kredibel. Mereka mungkin berpura-pura menjadi staf IT, auditor eksternal, atau bahkan penegak hukum.",
    example:
      "Seseorang menelepon Anda, mengaku dari departemen IT perusahaan Anda. Dia mengatakan sedang ada pembaruan sistem dan membutuhkan username serta password Anda untuk membantu proses migrasi data. Ceritanya detail dan meyakinkan.",
  },
  {
    id: "baiting",
    name: "Baiting (Umpan)",
    icon: <BaitingIcon />,
    description:
      "Serangan yang memancing korban dengan sesuatu yang menarik rasa penasaran atau keserakahan, mirip phishing tetapi dengan umpan yang lebih nyata.",
    howItWorks:
      "Penyerang meninggalkan perangkat fisik yang terinfeksi malware (seperti USB flash drive) di lokasi yang mudah ditemukan (lobi kantor, toilet). Korban yang penasaran akan mencolokkan USB tersebut ke komputernya.",
    example:
      'Seorang karyawan menemukan sebuah USB drive berlabel "Gaji Karyawan Q4 2025" di area parkir. Karena penasaran, ia mencolokkannya ke laptop kantor, yang tanpa disadari menginstal malware.',
  },
  {
    id: "quidproquo",
    name: "Quid Pro Quo",
    icon: <QuidProQuoIcon />,
    description:
      'Frasa Latin yang berarti "sesuatu untuk sesuatu". Penyerang menawarkan sesuatu sebagai ganti informasi yang mereka inginkan.',
    howItWorks:
      "Ini tidak selalu berupa ancaman. Seringkali berupa tawaran bantuan. Penyerang mungkin menelepon secara acak ke banyak nomor di sebuah perusahaan dan mengaku sebagai teknisi IT.",
    example:
      'Penyerang menelepon seorang karyawan dan berkata, "Halo, saya dari IT support. Kami melihat ada masalah di komputer Anda. Apakah Anda butuh bantuan?". Jika karyawan setuju, penyerang akan memandu korban untuk mematikan antivirus dan menginstal "software perbaikan" yang sebenarnya adalah malware.',
  },
  {
    id: "tailgating",
    name: "Tailgating",
    icon: <TailgatingIcon />,
    description:
      "Ini adalah serangan fisik. Penyerang mengikuti seseorang yang memiliki akses sah ke area terlarang (misalnya, gedung kantor).",
    howItWorks:
      "Penyerang menunggu di dekat pintu yang memerlukan kartu akses. Ketika seorang karyawan membuka pintu, penyerang akan berpura-pura sedang menelepon atau membawa banyak barang, lalu dengan sopan meminta ditahan pintunya atau langsung menyelinap masuk di belakangnya.",
    example:
      'Seorang penyerang memakai seragam kurir pengantar makanan dan menunggu di depan pintu masuk kantor. Saat seorang karyawan masuk, penyerang berkata "Permisi, saya antar pesanan untuk Bapak Budi" dan ikut masuk ke dalam gedung.',
  },
];

// === Komponen Utama ===
function SocialEngineeringModule() {
  const [activeTab, setActiveTab] = useState(attackTypes[0].id);
  const activeAttack = attackTypes.find((attack) => attack.id === activeTab);

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4 sm:p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
            Social Engineering
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Mengenal seni meretas manusia—memanipulasi psikologi untuk menembus
            pertahanan terkuat.
          </p>
        </header>

        <main className="bg-gray-800 rounded-lg shadow-2xl shadow-cyan-500/10">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-100 mb-2">
              Apa itu Social Engineering?
            </h2>
            <p className="text-gray-300">
              **Social Engineering** adalah tindakan memanipulasi orang agar
              mereka membocorkan informasi rahasia atau melakukan tindakan
              tertentu yang menguntungkan penyerang. Serangan ini tidak
              menargetkan kerentanan pada software, melainkan pada **sifat dasar
              manusia** seperti kepercayaan, rasa takut, keinginan membantu, dan
              rasa penasaran. Ini adalah peretasan pada "sistem operasi
              manusia".
            </p>
          </div>

          <div className="bg-gray-800/50 p-6 md:p-8">
            <h3 className="text-xl font-bold mb-5 text-center text-gray-200">
              Jenis-Jenis Serangan Umum
            </h3>

            {/* Tab Buttons */}
            <div className="flex flex-wrap justify-center border-b border-gray-700 mb-6">
              {attackTypes.map((attack) => (
                <button
                  key={attack.id}
                  onClick={() => setActiveTab(attack.id)}
                  className={`flex items-center px-4 py-3 text-sm font-semibold transition-colors duration-300 focus:outline-none ${
                    activeTab === attack.id
                      ? "border-b-2 border-cyan-400 text-cyan-400"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {attack.icon}
                  {attack.name}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="mt-4">
              {activeAttack && (
                <div className="bg-gray-700/50 p-6 rounded-lg animate-fade-in">
                  <h4 className="text-2xl font-bold text-cyan-300 mb-3">
                    {activeAttack.name}
                  </h4>
                  <p className="text-gray-300 mb-4">
                    {activeAttack.description}
                  </p>

                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold text-gray-100">
                        Bagaimana Cara Kerjanya?
                      </h5>
                      <p className="text-gray-400">{activeAttack.howItWorks}</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-100">
                        Contoh Skenario:
                      </h5>
                      <p className="italic text-gray-400 border-l-4 border-cyan-500 pl-4 py-2 bg-gray-800 rounded-r-md">
                        "{activeAttack.example}"
                      </p>
                    </div>

                    {activeAttack.redFlags && (
                      <div>
                        <h5 className="font-semibold text-gray-100">
                          Tanda Bahaya 🚩:
                        </h5>
                        <ul className="list-disc list-inside space-y-1 text-gray-400 mt-2">
                          {activeAttack.redFlags.map((flag, index) => (
                            <li key={index}>{flag}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>

        <section className="mt-12 bg-gray-800 p-6 rounded-lg">
          <h3 className="text-2xl font-bold mb-4 flex items-center">
            <IconShieldCheck />
            Cara Melindungi Diri
          </h3>
          <p className="text-gray-300 mb-4">
            Kunci utama pertahanan adalah **skeptisisme yang sehat** dan
            **verifikasi**.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>
              <strong>Perlambat Respons Anda:</strong> Penyerang menciptakan
              rasa urgensi. Ambil napas dan pikirkan sejenak sebelum bertindak.
            </li>
            <li>
              <strong>Verifikasi Identitas:</strong> Jika seseorang meminta
              informasi sensitif, tutup telepon dan hubungi nomor resmi
              perusahaan/organisasi tersebut untuk mengonfirmasi. Jangan gunakan
              informasi kontak dari email/pesan yang Anda terima.
            </li>
            <li>
              <strong>Jangan Klik Link Sembarangan:</strong> Arahkan mouse Anda
              ke atas link untuk melihat URL tujuannya sebelum mengklik. Jika
              ragu, ketik manual alamat situs web resmi di browser Anda.
            </li>
            <li>
              <strong>Waspadai Umpan Fisik:</strong> Jangan pernah mencolokkan
              USB drive atau perangkat tidak dikenal ke komputer Anda.
            </li>
            <li>
              <strong>Edukasi Berkelanjutan:</strong> Tetap update dengan
              teknik-teknik social engineering terbaru. Pengetahuan adalah
              pertahanan terbaik.
            </li>
            <li>
              <strong>Jaga Informasi Pribadi:</strong> Semakin sedikit informasi
              yang Anda bagikan secara online, semakin sedikit amunisi yang
              dimiliki penyerang untuk membangun skenario palsu.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}

// Tambahkan CSS untuk animasi sederhana jika Anda mau
// Dalam file CSS utama Anda (misal, index.css):
/*
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}
*/

export default SocialEngineeringModule;
