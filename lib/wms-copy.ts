export type WmsLocale = "id" | "en";

export type WmsCopy = {
  seo: {
    title: string;
    description: string;
    keywords: string;
    productName: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    accent: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  workflow: {
    eyebrow: string;
    title: string;
    intro: string;
    items: { title: string; description: string }[];
  };
  evidence: {
    eyebrow: string;
    title: string;
    intro: string;
    sampleNote: string;
    screenshots: { title: string; description: string; caption: string }[];
  };
  demo: {
    eyebrow: string;
    title: string;
    description: string;
    scenarios: { title: string; description: string }[];
    cta: string;
    whatsappMessage: string;
  };
  scope: {
    eyebrow: string;
    title: string;
    description: string;
    details: string[];
    cta: string;
    whatsappMessage: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: { question: string; answer: string }[];
  };
  leadForm: { title: string; description: string };
  finalCta: { title: string; description: string; cta: string };
};

const COPY: Record<WmsLocale, WmsCopy> = {
  id: {
    seo: {
      title:
        "Software Manajemen Gudang (WMS) untuk Visibilitas Stok | Codeverta",
      description:
        "Kelola penerimaan dan perpindahan stok antargudang. Tinjau transaksi di Stock Entry dan ringkasan inventori melalui dashboard WMS Codeverta.",
      keywords:
        "software manajemen gudang, warehouse management system, WMS Indonesia, sistem stok gudang, Codeverta",
      productName: "Warehouse Management System Codeverta",
    },
    hero: {
      eyebrow: "Warehouse Management System",
      title: "Kelola penerimaan dan perpindahan stok",
      accent: "antargudang.",
      description:
        "Tinjau riwayat transaksi lewat Stock Entry dan ringkasan inventori di dashboard. Minta demo yang berfokus pada cara tim Anda menerima, memindahkan, dan mengirim barang.",
      primaryCta: "Minta demo sesuai alur gudang saya",
      secondaryCta: "Lihat contoh sistem",
    },
    workflow: {
      eyebrow: "Alur gudang",
      title: "Jaga alur stok tetap terlihat",
      intro:
        "Lihat penerimaan, perpindahan, dan ringkasan inventori melalui area kerja WMS Codeverta.",
      items: [
        {
          title: "Catat penerimaan dan perpindahan",
          description:
            "Tinjau tipe, status, tujuan, serta gudang asal dan tujuan pada daftar Stock Entry.",
        },
        {
          title: "Tinjau dokumen pembelian dan pengiriman",
          description:
            "Akses Purchase Receipt dan Delivery Note untuk membahas proses barang masuk dan keluar.",
        },
        {
          title: "Lihat ringkasan stok per gudang",
          description:
            "Dashboard merangkum item dan gudang, nilai stok per gudang, tren penerimaan dan pengiriman, barang tertua, serta ringkasan kekurangan.",
        },
      ],
    },
    evidence: {
      eyebrow: "Contoh tampilan sistem",
      title: "Lihat alur stok dan ringkasan inventori",
      intro:
        "Layar Stock Entry dan dashboard memperlihatkan cara WMS menyajikan pergerakan barang dan ringkasan stok.",
      sampleNote:
        "Screenshot ini memakai akun dan data demonstrasi. Angka dashboard, nama akun, dan status transaksi adalah ilustrasi, bukan metrik pelanggan.",
      screenshots: [
        {
          title: "Daftar Stock Entry",
          description:
            "Tinjau tipe Material Receipt, status, tujuan, serta kolom gudang asal dan tujuan.",
          caption: "Daftar Stock Entry Codeverta.",
        },
        {
          title: "Dashboard stok",
          description:
            "Lihat ringkasan item dan gudang, nilai stok per gudang, serta panel tren inventori.",
          caption: "Dashboard inventori Codeverta.",
        },
      ],
    },
    demo: {
      eyebrow: "Demo WMS",
      title: "Pilih fokus demo untuk tim gudang Anda",
      description:
        "Mulai dari penerimaan barang, perpindahan antargudang, atau ringkasan dashboard. Sertakan konteks proses Anda agar tim dapat menyiapkan pembahasan yang relevan.",
      scenarios: [
        {
          title: "Penerimaan barang",
          description:
            "Tinjau status transaksi, tujuan, serta gudang asal dan tujuan pada daftar Stock Entry.",
        },
        {
          title: "Perpindahan antargudang",
          description:
            "Bahas informasi gudang sumber dan target untuk meninjau alur perpindahan stok.",
        },
        {
          title: "Ringkasan inventori",
          description:
            "Gunakan tampilan dashboard untuk membahas ringkasan stok yang dibutuhkan tim Anda.",
        },
      ],
      cta: "Minta demo sesuai alur gudang saya",
      whatsappMessage:
        "Halo, saya ingin meminta demo WMS Codeverta sesuai alur gudang saya. Saya ingin membahas: ",
    },
    scope: {
      eyebrow: "Estimasi biaya",
      title: "Biaya mengikuti ruang lingkup gudang Anda",
      description:
        "Minta estimasi berdasarkan jumlah gudang dan pengguna, kebutuhan migrasi data, integrasi, konfigurasi lingkungan, serta dukungan yang dibutuhkan. Tim akan menyepakati cakupan sebelum penawaran.",
      details: [
        "Jumlah gudang, pengguna, dan alur yang perlu dicakup",
        "Sistem atau perangkat yang perlu dihubungkan",
        "Migrasi data, konfigurasi, pelatihan, hosting, dan dukungan yang diminta",
      ],
      cta: "Tanyakan estimasi WMS",
      whatsappMessage:
        "Halo, saya ingin meminta estimasi untuk WMS Codeverta. Kebutuhan gudang saya: ",
    },
    faq: {
      eyebrow: "Pertanyaan umum",
      title: "Menyiapkan pembahasan",
      items: [
        {
          question: "Bisakah WMS mengikuti alur gudang kami?",
          answer:
            "Ceritakan langkah penerimaan, pemindahan, dan pengiriman barang yang dijalankan tim Anda. Tim dapat meninjau alur tersebut bersama Anda dan menjelaskan konfigurasi yang dibutuhkan.",
        },
        {
          question: "Bisakah WMS terhubung ke sistem atau perangkat kami?",
          answer:
            "Sampaikan nama sistem atau perangkat dan cara data perlu bertukar. Tim akan meninjau kompatibilitas dan memasukkan kebutuhan yang disepakati ke ruang lingkup penawaran.",
        },
      ],
    },
    leadForm: {
      title: "Minta demo WMS untuk alur gudang Anda",
      description:
        "Ceritakan jumlah lokasi, jenis transaksi yang ingin dibahas, dan sistem yang sudah digunakan. Tim Codeverta akan menghubungi Anda.",
    },
    finalCta: {
      title: "Siap membahas alur gudang Anda?",
      description:
        "Pilih fokus demo dan ceritakan kebutuhan tim Anda kepada Codeverta.",
      cta: "Minta demo sesuai alur gudang saya",
    },
  },
  en: {
    seo: {
      title:
        "Warehouse Management System (WMS) for Inventory Visibility | Codeverta",
      description:
        "Manage warehouse receipts and stock transfers. Review transactions in Stock Entry and inventory summaries in the Codeverta WMS dashboard.",
      keywords:
        "warehouse management system, WMS, inventory management, warehouse stock software, Codeverta",
      productName: "Codeverta Warehouse Management System",
    },
    hero: {
      eyebrow: "Warehouse Management System",
      title: "Manage warehouse receipts and stock movements",
      accent: "across locations.",
      description:
        "Review movement records in Stock Entry and inventory summaries in the dashboard. Request a demo focused on how your team receives, transfers, and dispatches goods.",
      primaryCta: "Request a demo around my warehouse workflow",
      secondaryCta: "View system examples",
    },
    workflow: {
      eyebrow: "Warehouse workflows",
      title: "Keep stock flows in view",
      intro:
        "Review receipts, transfers, and inventory summaries through Codeverta WMS work areas.",
      items: [
        {
          title: "Record receipts and transfers",
          description:
            "Review transaction type, status, purpose, and source and target warehouses in the Stock Entry list.",
        },
        {
          title: "Review purchasing and dispatch documents",
          description:
            "Open Purchase Receipt and Delivery Note to discuss your inbound and outbound processes.",
        },
        {
          title: "See stock summaries by warehouse",
          description:
            "The dashboard summarizes items and warehouses, warehouse-wise stock value, receipt and delivery trends, oldest items, and a shortage summary.",
        },
      ],
    },
    evidence: {
      eyebrow: "System examples",
      title: "See stock flows and inventory summaries",
      intro:
        "The Stock Entry and dashboard screens show how WMS presents stock movements and inventory summaries.",
      sampleNote:
        "These screenshots use a demonstration account and sample data. Dashboard figures, account names, and transaction statuses are illustrative, not customer metrics.",
      screenshots: [
        {
          title: "Stock Entry list",
          description:
            "Review Material Receipt type, status, purpose, and source and target warehouse fields.",
          caption: "Codeverta Stock Entry list.",
        },
        {
          title: "Stock dashboard",
          description:
            "See item and warehouse summaries, warehouse-wise stock value, and inventory trend panels.",
          caption: "Codeverta inventory dashboard.",
        },
      ],
    },
    demo: {
      eyebrow: "WMS demo",
      title: "Choose a demo focus for your warehouse team",
      description:
        "Start with receiving, transfers between warehouses, or the dashboard summary. Share your process context so our team can prepare a useful discussion.",
      scenarios: [
        {
          title: "Goods receiving",
          description:
            "Review transaction status, purpose, and source and target warehouse fields in the Stock Entry list.",
        },
        {
          title: "Inter-warehouse transfers",
          description:
            "Discuss source and target warehouse information to review your stock transfer flow.",
        },
        {
          title: "Inventory summary",
          description:
            "Use the dashboard view to discuss which stock summaries your team needs.",
        },
      ],
      cta: "Request a demo around my warehouse workflow",
      whatsappMessage:
        "Hello, I would like to request a Codeverta WMS demo based on my warehouse workflow. I would like to discuss: ",
    },
    scope: {
      eyebrow: "Pricing estimate",
      title: "Cost follows your warehouse scope",
      description:
        "Request an estimate based on the number of warehouses and users, data migration, integrations, deployment setup, and support needs. The team will agree on scope before preparing a proposal.",
      details: [
        "Warehouses, users, and workflows to cover",
        "Systems or devices to connect",
        "Requested data migration, configuration, training, hosting, and support",
      ],
      cta: "Ask for a WMS estimate",
      whatsappMessage:
        "Hello, I would like to request an estimate for Codeverta WMS. My warehouse requirements are: ",
    },
    faq: {
      eyebrow: "Frequently asked questions",
      title: "Preparing for a conversation",
      items: [
        {
          question: "Can WMS fit our warehouse workflow?",
          answer:
            "Describe how your team receives, transfers, and dispatches goods. The team can review the process with you and explain any configuration needed.",
        },
        {
          question: "Can WMS connect to our systems or devices?",
          answer:
            "Share the systems or devices involved and how data should move between them. The team will review compatibility and include agreed requirements in the proposal scope.",
        },
      ],
    },
    leadForm: {
      title: "Request a WMS demo for your warehouse workflow",
      description:
        "Share the number of locations, transactions you want to review, and systems you use. The Codeverta team will follow up.",
    },
    finalCta: {
      title: "Ready to discuss your warehouse workflow?",
      description:
        "Choose a demo focus and tell Codeverta what your team needs.",
      cta: "Request a demo around my warehouse workflow",
    },
  },
};

export function getWmsCopy(locale?: string): WmsCopy {
  return locale === "en" ? COPY.en : COPY.id;
}
