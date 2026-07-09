// lib/map.ts

// Full province id → name map (still used to render the base map paths)
export const provinceNames = {
  IDAC: "Aceh",
  IDBA: "Bali",
  IDBB: "Bangka-Belitung",
  IDBE: "Bengkulu",
  IDBT: "Banten",
  IDGO: "Gorontalo",
  IDJA: "Jambi",
  IDJB: "Jawa Barat",
  IDJI: "Jawa Timur",
  IDJK: "Jakarta Raya",
  IDJT: "Jawa Tengah",
  IDKB: "Kalimantan Barat",
  IDKI: "Kalimantan Timur",
  IDKR: "Kepulauan Riau",
  IDKS: "Kalimantan Selatan",
  IDKT: "Kalimantan Tengah",
  IDKU: "North Kalimantan",
  IDLA: "Lampung",
  IDMA: "Maluku",
  IDMU: "Maluku Utara",
  IDNB: "Nusa Tenggara Barat",
  IDNT: "Nusa Tenggara Timur",
  IDPA: "Papua",
  IDPB: "Papua Barat",
  IDRI: "Riau",
  IDSA: "Sulawesi Utara",
  IDSB: "Sumatera Barat",
  IDSG: "Sulawesi Tenggara",
  IDSN: "Sulawesi Selatan",
  IDSR: "Sulawesi Barat",
  IDSS: "Sumatera Selatan",
  IDST: "Sulawesi Tengah",
  IDSU: "Sumatera Utara",
  IDYO: "Yogyakarta",
};

// Only the provinces you actually want pinned as customer locations.
// Add/remove keys here to control which pins show up on the map.
export type CustomerRegion = {
  name: string;
  city: string;
  customers: number;
  growth: string;
  highlights: string[];
  description: string;
};

export const customerRegions: Record<string, CustomerRegion> = {
  IDJK: {
    name: "Jakarta",
    city: "Jakarta & sekitarnya",
    customers: 1,
    growth: "+10%",
    highlights: ["UMKM Retail", "Startup Fintech", "Manufaktur"],
    description: "Pusat bisnis dan teknologi Indonesia.",
  },
  IDJB: {
    name: "Jawa Barat",
    city: "Bandung & sekitarnya",
    customers: 2,
    growth: "+10%",
    highlights: ["UMKM Retail", "Startup Fintech", "Manufaktur"],
    description:
      "Basis klien terbesar kami, didominasi bisnis retail dan startup digital di kawasan Bandung Raya.",
  },
  IDYO: {
    name: "Yogyakarta",
    city: "Kota Jogja",
    customers: 5,
    growth: "+8%",
    highlights: ["Edtech", "UMKM Kreatif", "F&B"],
    description:
      "Pusat kolaborasi kami dengan komunitas kreatif dan kampus, banyak proyek edtech dan UMKM lokal.",
  },
  IDJI: {
    name: "Jawa Timur",
    city: "Surabaya & Malang",
    customers: 1,
    growth: "+1%",
    highlights: ["UMKM"],
    description:
      "Banyak klien UMKM di Surabaya dan Malang, termasuk bisnis kuliner, fashion, dan jasa.",
  },
  IDBA: {
    name: "Bali",
    city: "Denpasar & Badung",
    customers: 2,
    growth: "+7%",
    highlights: ["Hospitality", "Travel Tech", "UMKM Ekspor"],
    description:
      "Klien berbasis pariwisata dan hospitality, dengan kebutuhan sistem booking dan manajemen properti.",
  },
  IDPA: {
    name: "Papua",
    city: "Jayapura",
    customers: 1,
    growth: "2%",
    highlights: ["Pemerintahan Daerah", "Pembangunan Infrastruktur"],
    description: "Membantu membangun infrastruktur digital Provinsi Papua.",
  },
};

// (sampleData kept for backward-compat if referenced elsewhere; safe to delete if unused)
export const sampleData = customerRegions;
