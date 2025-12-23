import { BarChart, Layers, Shield, Star, Users, Zap } from "lucide-react";
// stats.js atau di lib/data.js
import { ShieldAlert, Code, Clock } from "lucide-react";

export const companyStats = [
  {
    icon: <ShieldAlert className="size-8 text-red-500" />,
    value: 99.9,
    from: 30.5,
    unit: "%",
    label: "Uptime & Security Score",
    suffix: "%",
    decimal: 1,
    duration: 0.4,
  },
  {
    icon: <Users className="size-8 text-yellow-500" />,
    value: 13,
    unit: "+",
    label: "Klien",
    suffix: "+",
    decimal: 0,
    duration: 0.3,
  },
  {
    icon: <Code className="size-8 text-green-500" />,
    value: 500000,
    from: 429000,
    unit: "+",
    label: "Baris Kode (LOC)",
    suffix: "+",
    decimal: 0,
    duration: 0.3,
  },
  {
    icon: <Clock className="size-8 text-blue-500" />,
    value: 3200,
    from: 3000,
    unit: "+",
    label: "Jam Pengerjaan Proyek",
    suffix: "+",
    decimal: 0,
    duration: 0.3,
  },
];

export const logos = [
  {
    src: "/assets/bapperida.png",
    alt: "Bapperida Papua",
  },
  {
    src: "/assets/nsc.png",
    alt: "NSC Bantu Perizinan",
  },
  {
    src: "/assets/tickethub.jpeg",
    alt: "Ticket Hub",
  },
  {
    src: "/assets/souvenirlilin.png",
    alt: "Million Candles",
  },
  {
    src: "/assets/nova-tech.jpeg",
    alt: "Ticket Hub",
  },
];

export const features = [
  {
    title: "Desain Website Profesional",
    description:
      "Kami merancang website modern dan responsif yang optimal di semua perangkat, dari desktop hingga mobile.",
    icon: <Zap className="size-5" />,
  },
  {
    title: "Optimasi SEO & Performa",
    description:
      "Tingkatkan peringkat di Google dan berikan pengalaman pengguna terbaik dengan website yang cepat dan teroptimasi.",
    icon: <BarChart className="size-5" />,
  },
  {
    title: "Perbaikan & Maintenance",
    description:
      "Mengalami masalah dengan website Anda? Tim kami siap memperbaiki bug, error, dan melakukan pembaruan rutin.",
    icon: <Users className="size-5" />,
  },
  {
    title: "Keamanan Website Terjamin",
    description:
      "Lindungi data dan pengunjung website Anda dari ancaman siber dengan sistem keamanan berlapis.",
    icon: <Shield className="size-5" />,
  },
  {
    title: "Layanan IT Support",
    description:
      "Solusi untuk semua masalah teknis IT Anda, mulai dari troubleshooting hardware hingga manajemen jaringan.",
    icon: <Layers className="size-5" />,
  },
  {
    title: "Dukungan Aftersales",
    description:
      "Kami tidak hanya membuat, tapi juga memastikan website dan sistem IT Anda berjalan lancar setelah serah terima.",
    icon: <Star className="size-5" />,
  },
];

export const testimonials = [
  {
    quote:
      "Codeverta mengubah total tampilan website kami menjadi lebih profesional. Pengunjung meningkat drastis!",
    author: "Sarah Widjaja",
    role: "Owner, Butik Elegan",
    rating: 5,
  },
  {
    quote:
      "Website lama kami sangat lambat. Setelah diperbaiki oleh Codeverta, kecepatannya luar biasa. Terima kasih!",
    author: "Budi Santoso",
    role: "Manajer Marketing, Maju Jaya Motor",
    rating: 5,
  },
  {
    quote:
      "Dukungan IT mereka sangat responsif. Setiap masalah teknis di kantor kami selesai dalam sekejap. Sangat direkomendasikan.",
    author: "Emily Hartono",
    role: "Kepala Operasional, Startup Cepat",
    rating: 5,
  },
  {
    quote:
      "Proses pembuatannya transparan dan hasilnya melebihi ekspektasi. Website kami sekarang menjadi mesin penjualan utama.",
    author: "David Kim",
    role: "CEO, InnovateNow",
    rating: 5,
  },
  {
    quote:
      "Sangat mudah berkomunikasi dengan tim Codeverta. Mereka benar-benar memahami visi yang kami inginkan untuk website kami.",
    author: "Lisa Puspita",
    role: "Direktur Kreatif, Galeri Seni",
    rating: 5,
  },
  {
    quote:
      "Investasi terbaik yang pernah kami lakukan. Sejak website baru diluncurkan, omzet kami naik hingga 40%. Luar biasa!",
    author: "James Wilson",
    role: "COO, ScaleUp Inc",
    rating: 5,
  },
];

export const monthlyPricing = [
  {
    name: "Paket Website UMKM",
    price: "Rp 2Jt",
    description: "Cocok untuk profil perusahaan atau portofolio.",
    features: [
      "Desain Custom Sesuai Permintaan",
      "Cocok Untuk UMKM",
      "Fitur Dasar (Kontak, Layanan, Katalog Produk dll)",
      "Gratis Domain & Hosting 1 Tahun",
      "Mengutamakan Performa, Bukan Template Wordpress",
    ],
    cta: "Pilih Paket",
  },
  {
    name: "Paket Toko Online (E-commerce)",
    price: "Rp 5Jt",
    description: "Ideal untuk UKM dan bisnis yang sedang berkembang.",
    features: [
      "Desain Custom Sesuai Permintaan",
      "Optimasi SEO",
      "Pengerjaan Prioritas",
    ],
    cta: "Pilih Paket",
    popular: true,
  },
  {
    name: "Paket Sistem Custom",
    price: "Rp >10Jt",
    description: "Untuk perusahaan dengan kebutuhan kompleks.",
    features: [
      "Fitur Kompleks (E-commerce, dll)",
      "Desain & Sistem Sesuai Kebutuhan",
      "Laporan Performa Bulanan",
      "Maintenance Lebih dari 1 Tahun",
    ],
    cta: "Hubungi Sales",
  },
];

export const faqItems = [
  {
    question: "Berapa lama proses pembuatan sebuah website?",
    answer:
      "Waktu pengerjaan bervariasi tergantung kompleksitas. Untuk Paket Basic biasanya memakan waktu 1-2 minggu, sedangkan untuk sistem skala menengah dapat lebih lama(lebih dari 1 bulan). Waktu pengerjaan akan disesuaikan dengan permintaan fitur oleh client.",
  },
  {
    question: "Apa saja yang perlu saya siapkan?",
    answer:
      "Anda cukup menyiapkan konten seperti teks profil perusahaan, daftar layanan/produk, dan gambar/foto yang ingin ditampilkan. Jika belum ada, tim kami bisa membantu mengarahkannya.",
  },
  {
    question: "Apakah ada layanan maintenance setelah website jadi?",
    answer:
      "Tentu. Kami menyediakan paket maintenance bulanan atau tahunan yang mencakup update, backup, dan monitoring keamanan. Anda juga bisa menghubungi kami jika butuh perbaikan sewaktu-waktu.",
  },
  {
    question: "Bisakah Anda memperbaiki website saya yang sudah ada?",
    answer:
      "Ya, kami bisa. Tim kami akan melakukan audit terlebih dahulu untuk mengidentifikasi masalah pada website Anda, mulai dari error, kecepatan, hingga tampilan, lalu memberikan solusi perbaikan terbaik.",
  },
  {
    question: "Pembayarannya bagaimana? Apakah ada uang muka?",
    answer:
      "Pembayaran dilakukan dengan sistem DP 30% di awal, sisanya dibayar setelah website selesai dan disetujui. Kami juga menyediakan opsi pembayaran bertahap untuk proyek besar.",
  },
];

export const steps = [
  {
    step: "01",
    title: "Konsultasi Kebutuhan",
    description:
      "Diskusikan ide, tujuan, dan kebutuhan spesifik proyek Anda bersama kami secara gratis(meetup offline/online).",
  },
  {
    step: "02",
    title: "Proses Desain & Pengembangan",
    description:
      "Tim kami akan merancang dan membangun website atau solusi IT Anda sesuai dengan hasil diskusi.",
  },
  {
    step: "03",
    title: "Peluncuran & Maintenance",
    description:
      "Kami luncurkan proyek Anda ke publik dan memberikan maintenance untuk memastikan semua berjalan lancar.",
  },
];
