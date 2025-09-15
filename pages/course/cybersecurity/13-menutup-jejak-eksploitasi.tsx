import React, { useState } from "react";

// === Ikon SVG untuk setiap bagian ===
const LogIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 mr-3 text-amber-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);
const FileShredIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 mr-3 text-amber-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);
const HistoryIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 mr-3 text-amber-400"
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
);
const TimestampIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 mr-3 text-amber-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);
const IconChevronDown = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);
const IconShieldCheck = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 mr-3 text-sky-400"
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

// === Data untuk konten accordion ===
const accordionData = [
  {
    title: "Manipulasi Log",
    icon: <LogIcon />,
    content: {
      description:
        "Log adalah catatan digital dari semua aktivitas di sistem. Ini adalah target utama untuk dihapus karena berisi bukti paling langsung dari sebuah intrusi.",
      sections: [
        {
          title: "Jenis Log yang Ditargetkan",
          points: [
            "**Security/Auth Logs:** Mencatat upaya login (berhasil/gagal), eskalasi hak akses (`sudo`), dll. Lokasi: `Event Viewer (Security)` di Windows, `/var/log/auth.log` atau `/var/log/secure` di Linux.",
            "**System Logs:** Mencatat event sistem operasi, seperti service yang dimulai atau dihentikan.",
            "**Web Server Logs:** Mencatat setiap permintaan ke web server (misalnya, log akses Apache/Nginx). Penyerang akan menghapus jejak IP mereka dan permintaan berbahaya yang mereka kirim.",
            "**Application Logs:** Log spesifik dari aplikasi yang berjalan, yang mungkin mencatat aktivitas tidak wajar.",
          ],
        },
        {
          title: "Teknik yang Digunakan",
          points: [
            '**Pembersihan Total:** Menghapus seluruh isi file log. Ini adalah metode yang paling "berisik" karena meninggalkan jejak berupa log yang tiba-tiba kosong, yang sangat mencurigakan.',
            "**Editing Selektif:** Menghapus hanya baris-baris tertentu dari log yang berisi alamat IP atau aktivitas penyerang. Ini lebih sulit dideteksi.",
            "**Mematikan Logging:** Menonaktifkan layanan logging untuk sementara waktu selama serangan berlangsung.",
          ],
          commands: [
            {
              cmd: "wevtutil cl Security",
              desc: "(Windows) Membersihkan seluruh log Security.",
            },
            {
              cmd: "> /var/log/auth.log",
              desc: "(Linux) Mengosongkan file log otentikasi.",
            },
            {
              cmd: "history -c",
              desc: "(Linux) Membersihkan riwayat perintah di sesi shell saat ini.",
            },
          ],
        },
      ],
    },
  },
  {
    title: "Manipulasi File & Direktori",
    icon: <FileShredIcon />,
    content: {
      description:
        "Penyerang perlu menghapus semua alat, skrip, dan file sementara yang mereka unggah atau buat di sistem target.",
      sections: [
        {
          title: "Metode Penghapusan",
          points: [
            "**Simple Deletion (`rm`, `del`):** Ini hanya menghapus penunjuk ke file. Data aslinya masih ada di disk dan dapat dipulihkan dengan alat forensik.",
            "**Secure Deletion (Wiping/Shredding):** Menimpa data file dengan data acak beberapa kali sebelum menghapusnya, membuatnya hampir mustahil untuk dipulihkan.",
            '**Menggunakan Ruang Disk "Kosong":** Menimpa ruang disk yang tidak terpakai untuk menghancurkan sisa-sisa file yang telah dihapus sebelumnya.',
          ],
          commands: [
            {
              cmd: "shred -u -n 5 sensitive_file.txt",
              desc: "(Linux) Menimpa file 5 kali lalu menghapusnya.",
            },
            {
              cmd: "sdelete -p 3 C:\\tools\\malware.exe",
              desc: "(Windows - Sysinternals) Menghapus file dengan 3 kali penimpaan.",
            },
          ],
        },
        {
          title: "Teknik Penyembunyian",
          points: [
            '**Hidden Files/Directories:** Membuat file atau direktori dengan nama yang diawali titik (`.`) di Linux atau dengan atribut "hidden" di Windows.',
            "**Alternate Data Streams (ADS) - Windows:** Menyembunyikan file di dalam file lain. File `evil.exe` bisa disembunyikan di dalam `notepad.exe` yang sah, tanpa mengubah ukuran file aslinya.",
          ],
        },
      ],
    },
  },
  {
    title: "Manipulasi Timestamp",
    icon: <TimestampIcon />,
    content: {
      description:
        "Setiap file memiliki metadata waktu (dibuat, dimodifikasi, diakses). Penyerang akan mengubah metadata ini pada file yang mereka sentuh agar tidak menonjol saat analisis.",
      sections: [
        {
          title: 'Teknik "Timestomping"',
          points: [
            "**Tujuan:** Membuat file berbahaya terlihat seolah-olah merupakan bagian dari instalasi sistem operasi asli atau sudah ada di sistem sejak lama.",
            "**Cara Kerja:** Penyerang akan menyalin timestamp dari file sistem yang sah (misalnya, `kernel32.dll`) dan menerapkannya ke file malware mereka.",
            "**Dampak:** Ini mengalahkan analisis forensik sederhana yang hanya mengurutkan file berdasarkan waktu modifikasi untuk menemukan file yang baru dibuat.",
          ],
          commands: [
            {
              cmd: "touch -r /bin/bash malware.sh",
              desc: "(Linux) Mengubah timestamp `malware.sh` agar sama dengan file `/bin/bash`.",
            },
          ],
        },
      ],
    },
  },
];

// === Sub-komponen untuk setiap item accordion ===
const AccordionItem = ({ item, isOpen, onClick }) => {
  const { icon, title, content } = item;

  return (
    <div className="border-b border-gray-700">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left py-5 px-6 text-lg font-semibold text-gray-200 hover:bg-gray-700 focus:outline-none"
      >
        <span className="flex items-center">
          {icon} {title}
        </span>
        <IconChevronDown
          className={`w-6 h-6 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[1000px]" : "max-h-0"
        }`}
      >
        <div className="p-6 bg-gray-800">
          <p className="text-gray-300 mb-6">{content.description}</p>
          {content.sections.map((section, index) => (
            <div key={index} className="mb-6">
              <h4 className="text-amber-300 font-bold mb-3">{section.title}</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                {section.points.map((point, pIndex) => (
                  <li
                    key={pIndex}
                    dangerouslySetInnerHTML={{ __html: point }}
                  ></li>
                ))}
              </ul>
              {section.commands && (
                <div className="mt-4 space-y-2">
                  {section.commands.map((cmd, cIndex) => (
                    <div key={cIndex} className="bg-gray-900 p-3 rounded-md">
                      <code className="text-cyan-400 font-mono text-sm">
                        {cmd.cmd}
                      </code>
                      <p className="text-gray-400 text-xs mt-1">{cmd.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// === Komponen Utama Halaman ===
function CoveringTracksModule() {
  const [openIndex, setOpenIndex] = useState(0); // Buka item pertama secara default

  const handleItemClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4 sm:p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-slate-400 to-sky-500 text-transparent bg-clip-text">
            Covering Tracks
          </h1>
          <p className="text-lg text-gray-400">
            Menjadi Hantu di dalam Mesin: Seni Menghilangkan Jejak Digital.
          </p>
        </header>

        <div className="mb-12 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-100 mb-2">
            Mengapa Menghapus Jejak?
          </h2>
          <p className="text-gray-300">
            Seorang peretas yang berhasil masuk tetapi terdeteksi adalah peretas
            yang gagal. "Covering Tracks" adalah fase kritis setelah tujuan
            tercapai, yang bertujuan untuk:
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-300 mt-3">
            <li>
              <strong>Menghindari Deteksi:</strong> Mencegah administrator
              sistem atau sistem keamanan (IDS/IPS) menyadari adanya intrusi.
            </li>
            <li>
              <strong>Mempersulit Forensik:</strong> Menghancurkan bukti digital
              untuk menghambat atau menghentikan investigasi setelah insiden
              terjadi.
            </li>
            <li>
              <strong>Mempertahankan Akses:</strong> Jika jejak dihapus dengan
              baik, *backdoor* yang telah ditanam bisa tetap aktif untuk waktu
              yang lama tanpa diketahui.
            </li>
          </ul>
        </div>

        <main className="bg-gray-800 rounded-lg shadow-2xl shadow-sky-500/10 overflow-hidden">
          {accordionData.map((item, index) => (
            <AccordionItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onClick={() => handleItemClick(index)}
            />
          ))}
        </main>

        <section className="mt-12 bg-gray-800 p-6 rounded-lg">
          <h3 className="text-2xl font-bold mb-4 flex items-center">
            <IconShieldCheck />
            Perspektif Tim Biru: Mendeteksi Upaya Penghapusan Jejak
          </h3>
          <p className="text-gray-300 mb-4">
            Menghapus jejak itu sendiri adalah aktivitas yang "berisik".
            Bagaimana cara kita mendeteksinya?
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>
              <strong>Log Forwarding & Immutable Storage:</strong> Kirim log
              dari semua sistem secara *real-time* ke server terpusat (SIEM)
              yang bersifat *write-only* atau *append-only*. Penyerang bisa
              menghapus log di mesin target, tapi tidak di server SIEM.
            </li>
            <li>
              <strong>File Integrity Monitoring (FIM):</strong> Gunakan alat
              seperti Tripwire atau Wazuh untuk memantau perubahan pada file
              sistem yang kritis. FIM akan memberi peringatan jika ada file
              penting yang diubah atau dihapus.
            </li>
            <li>
              <strong>Analisis Log:</strong> Cari "celah" atau kejanggalan pada
              log. Misalnya, jika log tiba-tiba berhenti untuk periode waktu
              tertentu, atau jika log sistem bersih total, itu adalah tanda
              bahaya besar.
            </li>
            <li>
              <strong>Memory Forensics:</strong> Banyak aktivitas berbahaya
              (seperti menjalankan Mimikatz) hanya terjadi di memori. Analisis
              RAM dump dapat mengungkap jejak yang tidak ada di disk.
            </li>
            <li>
              <strong>Analisis Command History:</strong> Periksa riwayat
              perintah dari semua pengguna. Jika seorang pengguna tiba-tiba
              menjalankan perintah untuk menghapus riwayat, itu sangat
              mencurigakan.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default CoveringTracksModule;
