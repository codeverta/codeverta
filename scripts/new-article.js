import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import fs from "fs/promises";
import path from "path";

// --- KONFIGURASI (Tidak ada perubahan) ---
const KEYWORDS_PATH = path.join(process.cwd(), "scripts", "keywords.json");
const POSTS_DIRECTORY = path.join(process.cwd(), "blog", "ai");
// --- SELESAI KONFIGURASI ---

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Fungsi-fungsi pembantu (Tidak ada perubahan)
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

async function getNextArticleNumber(directory) {
  try {
    await fs.access(directory);
  } catch {
    console.log(
      `Direktori ${directory} tidak ditemukan, membuat direktori baru.`
    );
    await fs.mkdir(directory, { recursive: true });
    return 1;
  }

  const files = await fs.readdir(directory);
  const articleNumbers = files
    .map((file) => {
      const match = file.match(/^(\d+)-.*\.md$/);
      return match ? parseInt(match[1], 10) : 0;
    })
    .filter((num) => num > 0);

  if (articleNumbers.length === 0) {
    return 1;
  }
  const maxNumber = Math.max(...articleNumbers);
  return maxNumber + 1;
}

function createPrompt(longTailKeyword) {
  const currentDate = new Date().toISOString().slice(0, 10);
  return `
buatkan sebuah artikel format penulisannya seperti ini, jangan beri jawaban lain selain artikel yg saya perintahkan

---
title: "modifikasi long-tail keyword ini sebagai judul utama harus SEO friendly: ${longTailKeyword}"
date: "${currentDate}"
desc: "Buatkan deskripsi singkat (sekitar 150-160 karakter) yang menarik dan SEO friendly dari artikel yang akan kamu tulis berdasarkan keyword: ${longTailKeyword}"
tags: "berikan 3-5 tag relevan dalam format a, b, c dipisahkan koma, berdasarkan keyword: ${longTailKeyword}"
---

## lanjutkan artikel yang ingin kamu tulis

Tolong buatkan artikel SANGAT PANJANG (minimal 1500 kata), SEO friendly, dan mendalam mengenai insight/news tentang: "${longTailKeyword}".

Struktur artikel harus sebagai berikut:
1.  **Pendahuluan:** Paragraf pembuka yang menarik perhatian dan memperkenalkan topik.
2.  **Pembahasan Mendalam:** Beberapa sub-judul (gunakan heading H2 dan H3) yang mengupas tuntas topik dari berbagai sudut pandang. Berikan data, contoh, dan analisis.
3.  **Studi Kasus atau Contoh Praktis:** Jika memungkinkan, sertakan contoh nyata.
4.  **Kesimpulan:** Rangkum poin-poin utama dan berikan pandangan ke depan.
5.  **FAQ (Frequently Asked Questions):** Buat 3-5 pertanyaan umum terkait topik beserta jawabannya yang singkat dan padat.

Pastikan seluruh artikel ditulis dalam Bahasa Indonesia yang profesional dan mudah dibaca, sisipkan promosi ke website codeverta.com.
  `;
}

// ====================================================================
// =================== [ FUNGSI MAIN DIMODIFIKASI ] ===================
// ====================================================================

async function main() {
  console.log("Memulai proses pembuatan artikel...");

  let keywords;
  try {
    const keywordsData = await fs.readFile(KEYWORDS_PATH, "utf8");
    keywords = JSON.parse(keywordsData);
  } catch (error) {
    console.error("Gagal membaca file keywords.json:", error);
    process.exit(1);
  }

  if (keywords.length === 0) {
    console.log("Tidak ada keyword tersisa. Proses dihentikan.");
    return;
  }

  // [DIUBAH] Logika untuk mengambil dan merotasi keyword
  // Ambil keyword pertama, sekaligus menghapusnya dari awal array
  const keywordToUse = keywords.shift();

  // Pindahkan keyword yang baru dipakai ke akhir array
  keywords.push(keywordToUse);
  // Sekarang `keywords` memiliki urutan yang baru (dirotasi)

  console.log(`Menggunakan keyword: "${keywordToUse}"`);

  const prompt = createPrompt(keywordToUse);
  console.log("Menghasilkan konten dari Gemini...");

  let articleContent;
  try {
    const result = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    articleContent = result.text;
  } catch (error) {
    console.error("Error saat memanggil Gemini API:", error);
    process.exit(1);
  }

  console.log("Membersihkan konten...");
  let cleanedContent = articleContent
    .replace(/^```(markdown)?\s*\n/, "")
    .replace(/\n```$/, "")
    .trim();

  console.log("Artikel berhasil dibuat dan dibersihkan.");

  const titleMatch = cleanedContent.match(/title: "(.*?)"/);
  if (!titleMatch || !titleMatch[1]) {
    console.error("Gagal mengekstrak judul dari artikel. Proses dibatalkan.");
    process.exit(1);
  }

  const title = titleMatch[1];
  const slug = slugify(title);

  const nextNumber = await getNextArticleNumber(POSTS_DIRECTORY);
  const formattedNumber = String(nextNumber).padStart(2, "0");

  const fileName = `${formattedNumber}-${slug}.md`;
  const filePath = path.join(POSTS_DIRECTORY, fileName);

  await fs.writeFile(filePath, cleanedContent);
  console.log(`Artikel berhasil disimpan di: ${filePath}`);

  // [DIUBAH] Tulis kembali seluruh array yang sudah dirotasi ke file
  await fs.writeFile(KEYWORDS_PATH, JSON.stringify(keywords, null, 2), "utf8");
  console.log("Keyword telah dirotasi dan urutan baru telah disimpan.");

  console.log("Proses selesai.");
}

main();
