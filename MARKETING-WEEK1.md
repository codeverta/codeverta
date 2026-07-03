# 📊 Marketing Plan — Codeverta.com

## Week 1 (3-9 July 2026)

### Lead Marketing: Heri (gaji Rp 0 😄)

---

## Ringkasan Situasi Saat Ini

| Metrik                     | Nilai                                      | Target Minggu Ini |
| -------------------------- | ------------------------------------------ | ----------------- |
| Rata-rata impressions/hari | ~70-90                                     | → 150             |
| Rata-rata clicks/hari      | ~2-3                                       | → 8               |
| Rata-rata CTR              | 3.3%                                       | → 6%+             |
| Posisi rata-rata           | ~47                                        | → <30             |
| Lead capture active        | ❌ (console.log only)                      | ✅ Live API       |
| Product landing pages      | ❌ None dedicated                          | → 3 draft         |
| FAQPage rich results       | ❌ Deprecated — fokus ke konten & konversi |                   |

---

## 📋 Task List — Minggu 1

### 🔴 P0 — HIGH PRIORITY (Hari 1-3)

#### Task 1: Benerin LeadMagnet — API Capture Leads

**Goal:** Email yang diisi di LeadMagnet beneran kesimpan. **Ini tugas paling penting — jangan sia-siain traffic!**
**Estimasi:** 1-2 jam

**Yang perlu dilakukan:**

1. Buat API endpoint di backend (`pages/api/leads.ts`) yang:
   - Menerima POST dengan body: `{ email, product, source, page }`
   - Validasi email format
   - Simpan ke file JSON (sementara) atau Google Sheets API
   - Return 200 OK
2. Update `components/LeadMagnet.tsx`:
   - Ganti `handleSubmit` dari `console.log` → POST ke `/api/leads`
   - Tambah field `source: "blog-article"`
   - Kirim `relatedProduct` sebagai data produk
3. Test flow: isi email → sukses → cek data masuk

**File yang diubah:**

- `components/LeadMagnet.tsx` — handleSubmit real
- Buat baru: `pages/api/leads.ts` — API endpoint
- Buat baru: `data/leads.json` — penyimpanan sementara

**Kode API endpoint (`pages/api/leads.ts`):**

```typescript
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

type LeadData = {
  email: string;
  product?: string;
  source: string;
  page?: string;
  timestamp: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, product, source, page } = req.body;

  // Validasi email
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }

  const lead: LeadData = {
    email,
    product: product || "",
    source: source || "blog",
    page: page || "",
    timestamp: new Date().toISOString(),
  };

  // Simpan ke file (sementara — nanti upgrade ke DB atau Google Sheets)
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

  const filePath = path.join(dataDir, "leads.json");
  let leads: LeadData[] = [];
  if (fs.existsSync(filePath)) {
    try {
      leads = JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch {
      leads = [];
    }
  }
  leads.push(lead);
  fs.writeFileSync(filePath, JSON.stringify(leads, null, 2));

  console.log("[LEAD CAPTURED]", lead);

  res.status(200).json({
    success: true,
    message: "Lead captured! Thank you.",
  });
}
```

---

#### Task 2: Landing Page Produk — Gym Management System

**Goal:** Halaman produk yang di-optimasi SEO biar ranking naik dari posisi 48 → page 1. Ini ngincer keyword "sistem gym" (59 imp) & "gym management" (5 imp).
**Estimasi:** 4-5 jam

**Yang perlu dibuat:**

- File: `pages/produk/gym-management-system.tsx`
- Konten:
  - **H1:** "Sistem Manajemen Gym untuk UKM Indonesia"
  - **Hook:** "Gym berantakan gara-gara catatan masih manual?" — reframe dari artikel #25 yang udah problem-centric
  - **Masalah → Solusi:** Tabel perbandingan manual vs sistem
  - **Fitur:** Manajemen member, tracking kehadiran, laporan keuangan, reminder otomatis
  - **Harga:** Mulai Rp 150rb/bulan
  - **Testimoni:** Roxgym — ambil data dari artikel #19 dan #20
  - **FAQ section:** 5 pertanyaan umum (buat konversi, bukan rich result)
  - **CTA:** WhatsApp langsung + LeadMagnet form
  - **Schema:** Product schema (masih didukung Google!) + Article schema
- Template: copy dari layout `pages/produk/index.tsx` yang sudah ada

---

#### Task 3: Landing Page Produk — Point of Sale / POS

**Goal:** Target keyword "aplikasi kasir" (posisi 30-50), "software kasir toko" (pos 30), "aplikasi pos retail" (pos 32)
**Estimasi:** 3-4 jam

**Yang perlu dibuat:**

- File: `pages/produk/point-of-sale.tsx`
- Sama seperti Task 2 tapi untuk POS
- Fokus keyword: "aplikasi kasir", "software kasir toko", "aplikasi pos retail", "kasir online"
- Manfaatkan data dari artikel POS yang sudah ada (#22, #23, #24)
- Bedakan dengan kompetitor: fokus ke **multi-outlet**, **inventory real-time**, **laporan otomatis**

---

#### Task 4: Optimasi Meta Description 5 Artikel Teratas

**Goal:** Naikin CTR dari 3.3% → 6%+
**Estimasi:** 1 jam
**Mengapa penting:** CTR 3.3% itu rendah banget. Dengan meta description yang lebih hook-driven, kita bisa naikin tanpa nambah konten.

**Artikel yang di-optimasi (berdasarkan data Search Console):**

1. **Artikel "sistem kasir toko"** (pos 30, 26 imp) — meta baru spesifik
2. **Artikel "gym management"** (pos 19) — tambah hook & angka
3. **Artikel "aplikasi kontraktor"** (pos 88, 43 imp) — rewrite meta
4. **Artikel "software laundry"** (pos 81) — spesifik ke masalah
5. **Artikel "aplikasi pos retail"** (pos 32) — target conversion

**Formula meta description baru:**

```
[Rasa sakit]? [Angka real + solusi].
[CTA subtle ke produk Codeverta]
```

**Contoh (artikel gym #17 — "Kenapa Gym Kecil Susah Pertahankan Member"):**
❌ Old: "Member daftar bulan pertama ramai, bulan ketiga tinggal setengah. Simak 5 penyebab utama churn member di gym kecil dan solusi yang sudah terbukti."
✅ New: "150 member daftar, 6 bulan kemudian tinggal 30? Gak sendirian. Temukan 5 penyebab churn tinggi di gym kecil + solusi yang udah bikin FitPrime Gym turunkan churn dari 65% ke 25% dalam 5 bulan."

---

### 🟡 P1 — MEDIUM PRIORITY (Hari 3-5)

#### Task 5: Setup Google Analytics + Search Console Verification

**Goal:** Bisa ukur konversi dan traffic beneran. **Tanpa ini kita gak bisa ukur ROI marketing.**
**Estimasi:** 1-2 jam

**Yang perlu dilakukan:**

1. Setup Google Analytics 4 property
2. Tambahkan GA script ke `pages/_app.tsx` atau `pages/_document.tsx`
3. Pasang Google Tag Manager (opsional)
4. Verifikasi Search Console udah connect
5. Setup Goals/Events: `lead_capture`, `whatsapp_click`, `product_view`

**File yang diubah:**

- `pages/_app.tsx` — inject GA script
- `components/LeadMagnet.tsx` — fire `gtag('event', 'lead_capture', ...)`
- `components/WhatsappButton.tsx` — fire `gtag('event', 'whatsapp_click', ...)`

---

#### Task 6: Landing Page Produk — Warehouse Management System

**Goal:** Target keyword "warehouse management" (pos 81, 41 imp), "sistem gudang"
**Estimasi:** 3-4 jam

**Yang perlu dibuat:**

- File: `pages/produk/warehouse-management-system.tsx`
- Fokus: UMKM yang baru mulai butuh sistem gudang
- Manfaatkan artikel #04 dan #21 yang sudah ada

---

#### Task 7: Newsletter Signup di Footer + All Blog Articles

**Goal:** Capture leads dari SETIAP halaman, bukan cuma dari LeadMagnet di artikel
**Estimasi:** 1 jam

**Yang perlu dilakukan:**

1. Buat komponen `NewsletterSignup.tsx`
2. Integrasi dengan API endpoint yang sama dari Task 1
3. Pasang di footer component + di sidebar blog
4. CTA: "Dapatkan tips software & bisnis setiap minggu + free konsultasi 30 menit"

---

### 🟢 P2 — LOW PRIORITY (Hari 5-7)

#### Task 8: Pruning / Rewrite Artikel Gak Relevan

**Goal:** Bersihin crawl budget dari konten yang gak konversi
**Estimasi:** 30 menit

**Artikel yang perlu ditindak:**

- **Artikel "Privy"** — 550+ impressions, 0 klik. Buang-buang crawl budget.
  - Opsi A: Noindex (`noindex: true` di frontmatter)
  - Opsi B: Rewrite jadi artikel tentang "Tanda Tangan Digital untuk Bisnis" → relevan dengan produk Codeverta
- **Artikel "Elon Musk"** — 289 impressions, 1 click. Gak relevan.
  - Noindex atau delete
- **Artikel "Nintendo Switch 2"** — 112 impressions, 3 click. Untuk gadget blog, ok 留着

---

#### Task 9: Siapkan Data + Draft Case Studies

**Goal:** Social proof dengan angka real — kunci konversi B2B
**Estimasi:** 2 jam (riset + drafting)

**Draft case study 1: Roxgym**

- Data dari artikel #19 dan #20
- Tambah wawancara singkat atau quote dari pemilik Roxgym
- Fokus: masalah sebelum → solusi → hasil (angka! misal: "churn turun 40%")
- Letak: halaman produk Gym Management System

**Draft case study 2: Malabar Trail Run**

- Data dari artikel #18
- Fokus: handle ribuan transaksi per detik saat "war" tiket
- Letak: halaman produk Ticketing System

---

### 📅 Daily Schedule

| Hari               | Fokus                 | Tasks                                                          |
| ------------------ | --------------------- | -------------------------------------------------------------- |
| **Day 1** (Jumat)  | Lead Capture          | **Task 1** — bikin API + update LeadMagnet. Ini paling krusial |
| **Day 2** (Sabtu)  | Landing Page Gym      | **Task 2** — mulai + selesaiin landing page Gym Management     |
| **Day 3** (Minggu) | Landing Page POS      | **Task 3** — landing page Point of Sale                        |
| **Day 4** (Senin)  | Meta + GA             | **Task 4** (meta descriptions) + **Task 5** (GA setup)         |
| **Day 5** (Selasa) | Landing Page WMS      | **Task 6** — landing page Warehouse Management System          |
| **Day 6** (Rabu)   | Newsletter + Pruning  | **Task 7** + **Task 8**                                        |
| **Day 7** (Kamis)  | Case Studies + Review | **Task 9** + review KPI minggu ini                             |

---

### 📊 Target Minggu Ini

| KPI                           | Target         | Status  | Cara Ukur                                      |
| ----------------------------- | -------------- | ------- | ---------------------------------------------- |
| Landing page produk baru      | 3 halaman      | ✅ DONE | `pages/produk/gym-management-system.tsx`       |
|                               |                |         | `pages/produk/point-of-sale.tsx`               |
|                               |                |         | `pages/produk/warehouse-management-system.tsx` |
| Meta descriptions di-optimasi | 5 artikel      | ✅ DONE | `desc:` field frontmatter 5 artikel            |
| GA script infrastructure      | Terpasang      | ✅ DONE | `components/GAScript.tsx` + `_app.tsx` update  |
|                               |                |         | **Set NEXT_PUBLIC_GA_ID di .env.local**        |
| Pruning artikel gak relevan   | noindex        | ✅ DONE | `noindex: true` di Elon Musk & eFishery        |
|                               |                |         | `PostContent` & 4 template files di-update     |
| LeadMagnet API                | Skip (WA only) | ⏭️ SKIP | User cukup WA, gak perlu capture email         |
| Newsletter signup             | Skip (WA only) | ⏭️ SKIP | User cukup WA                                  |

### 📋 Files Changed (Week 1)

| File                                                     | Action                                           |
| -------------------------------------------------------- | ------------------------------------------------ |
| `pages/produk/gym-management-system.tsx`                 | ✅ NEW — Landing page lengkap (21KB)             |
| `pages/produk/point-of-sale.tsx`                         | ✅ NEW — Landing page lengkap (15KB)             |
| `pages/produk/warehouse-management-system.tsx`           | ✅ NEW — Landing page lengkap (14KB)             |
| `components/GAScript.tsx`                                | ✅ NEW — GA script + event tracking + page view  |
| `pages/_app.tsx`                                         | ✅ MODIFIED — Injected GAScript + page view hook |
| `.env.local.example`                                     | ✅ NEW — Template GA Measurement ID              |
| `components/blog/post-content.tsx`                       | ✅ MODIFIED — Added `noindex` support            |
| `pages/tutorials/[id].tsx`                               | ✅ MODIFIED — Added `noindex` support            |
| `pages/startups/[id].tsx`                                | ✅ MODIFIED — Added `noindex` support            |
| `pages/cybersecurity/[id].tsx`                           | ✅ MODIFIED — Added `noindex` support            |
| `blog/blog/22-kasir-modern-bukan-sekadar-mesin-kasir.md` | ✅ MODIFIED — Meta description                   |
| `blog/blog/23-aplikasi-kasir-gratis-vs-berbayar.md`      | ✅ MODIFIED — Meta description                   |
| `blog/blog/24-aplikasi-kasir-toko-dan-pos.md`            | ✅ MODIFIED — Meta description                   |
| `blog/blog/15-mengapa-proyek-kontraktor.md`              | ✅ MODIFIED — Meta description                   |
| `blog/blog/10-mengapa-laundry-kiloan.md`                 | ✅ MODIFIED — Meta description                   |
| `blog/startups/05-biografi-lengkap-elon-musk.md`         | ✅ MODIFIED — Added `noindex: true`              |
| `blog/startups/03-skandal-efishery.md`                   | ✅ MODIFIED — Added `noindex: true`              |
| `MARKETING-WEEK1.md`                                     | ✅ UPDATED — Progress tracker                    |

### ⚠️ Update Penting (3 July 2026)

**FAQPage rich result Google SUDAH DEPRECATED** per Agustus 2023. Hanya government & health sites yang bisa dapet FAQ rich snippet. Jadi:

- ❌ Gak usah nambah FAQ demi rich results Google — **buang-buang waktu**
- ✅ FAQ di halaman produk **tetep penting** buat konversi pembaca
- ✅ Schema yang MASIH didukung & relevan: **Product schema**, **Article schema**, **Breadcrumb schema**, **LocalBusiness schema** — ini semua udah terpasang di Codeverta

### 📝 Yang Perlu Kamu Lakukan Manual

1. **Setup GA**: Buka https://analytics.google.com → Create property → Copy Measurement ID (G-XXXXXXXXXX) → Paste ke `.env.local`
2. **Build & Deploy**: `pnpm build && pnpm postbuild` untuk regenerate sitemap
3. **Pantau Search Console**: 7-14 hari untuk lihat efek perubahan meta descriptions
4. **Review snippet** udah muncul 4 clicks — pertahankan dengan structured data yang rapi

### 📝 Catatan Penting Lainnya

- **JANGAN auto-rebuild/restart Go backend** — report aja, user rebuild manual
- **CTA auto-injection udah jalan** — `insertProductCta()` di lib/parser.ts udah aktif
- **Review snippet** udah muncul 4 clicks — pertanda baik! Pertahankan structured data

---

_Dibuat oleh Lead Marketing Codeverta — Heri (gaji Rp 0, passion Rp ∞)_
_Updated: 3 July 2026 — Removed FAQ rich result dependency_
