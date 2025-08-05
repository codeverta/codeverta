import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';
import fs from 'fs/promises';
import path from 'path';

// --- KONFIGURASI (Tidak ada perubahan) ---
const KEYWORDS_PATH = path.join(process.cwd(), 'scripts', 'keywords.json');
const POSTS_DIRECTORY = path.join(process.cwd(), 'blog', 'tutorials');
// --- SELESAI KONFIGURASI ---

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Fungsi-fungsi pembantu (Tidak ada perubahan)
function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

async function getNextArticleNumber(directory) {
    try {
        await fs.access(directory);
    } catch {
        console.log(`Direktori ${directory} tidak ditemukan, membuat direktori baru.`);
        await fs.mkdir(directory, { recursive: true });
        return 1;
    }

    const files = await fs.readdir(directory);
    const articleNumbers = files
        .map(file => {
            const match = file.match(/^(\d+)-.*\.md$/);
            return match ? parseInt(match[1], 10) : 0;
        })
        .filter(num => num > 0);

    if (articleNumbers.length === 0) {
        return 1;
    }
    const maxNumber = Math.max(...articleNumbers);
    return maxNumber + 1;
}

function createPrompt(longTailKeyword) {
    const currentDate = new Date().toISOString().slice(0, 10);
    const randomSeed = longTailKeyword.split(" ").join("-").slice(0, 10);

    return `
buatkan sebuah artikel format penulisannya seperti ini, jangan beri jawaban lain selain artikel yg saya perintahkan

---
title: "Gunakan long-tail keyword ini sebagai judul utama: ${longTailKeyword}"
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

Pastikan seluruh artikel ditulis dalam Bahasa Indonesia yang profesional dan mudah dibaca.
  `;
}

// ====================================================================
// =================== [ FUNGSI MAIN DIMODIFIKASI ] ===================
// ====================================================================

async function main() {
    console.log('Memulai proses pembuatan artikel...');

    let config;
    try {
        const configData = await fs.readFile(KEYWORDS_PATH, 'utf8');
        config = JSON.parse(configData);
    } catch (error) {
        console.error('Gagal membaca atau parse file keywords.json:', error);
        console.log('Pastikan file keywords.json ada dan formatnya benar: { "currentIndex": 0, "keywords": ["a", "b"] }');
        process.exit(1);
    }

    const { keywords, currentIndex } = config;

    if (!keywords || keywords.length === 0) {
        console.log('Array "keywords" di dalam keywords.json kosong. Proses dihentikan.');
        return;
    }

    // [LOGIKA BARU] Memastikan currentIndex valid, jika tidak, reset ke 0
    const validCurrentIndex = (currentIndex >= 0 && currentIndex < keywords.length) ? currentIndex : 0;

    // [LOGIKA BARU] Mengambil keyword berdasarkan currentIndex
    const keywordToUse = keywords[validCurrentIndex];
    console.log(`Menggunakan keyword (index ${validCurrentIndex}): "${keywordToUse}"`);

    const prompt = createPrompt(keywordToUse);
    console.log('Menghasilkan konten dari Gemini...');

    let articleContent;
    try {
        // [DIUBAH] Menggunakan model gemini-1.5-flash yang lebih baru dan efisien
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent(prompt);
        const response = result.response;
        articleContent = response.text();

    } catch (error) {
        console.error('Error saat memanggil Gemini API:', error);
        process.exit(1);
    }

    console.log('Membersihkan konten...');
    let cleanedContent = articleContent
        .replace(/^```(markdown)?\s*\n/, '')
        .replace(/\n```$/, '')
        .trim();

    console.log('Artikel berhasil dibuat dan dibersihkan.');

    const titleMatch = cleanedContent.match(/title: "(.*?)"/);
    if (!titleMatch || !titleMatch[1]) {
        console.error('Gagal mengekstrak judul dari artikel. Proses dibatalkan.');
        process.exit(1);
    }

    const title = titleMatch[1];
    const slug = slugify(title);

    const nextNumber = await getNextArticleNumber(POSTS_DIRECTORY);
    const formattedNumber = String(nextNumber).padStart(2, '0');

    const fileName = `${formattedNumber}-${slug}.md`;
    const filePath = path.join(POSTS_DIRECTORY, fileName);

    await fs.writeFile(filePath, cleanedContent);
    console.log(`Artikel berhasil disimpan di: ${filePath}`);

    // [LOGIKA BARU] Memutar (rotate) indeks untuk penggunaan selanjutnya
    // Menggunakan operator modulo (%) untuk kembali ke 0 setelah mencapai akhir array
    const nextIndex = (validCurrentIndex + 1) % keywords.length;

    // Buat objek config baru dengan currentIndex yang diperbarui
    const updatedConfig = {
        ...config,
        currentIndex: nextIndex
    };

    // Simpan konfigurasi yang sudah diperbarui kembali ke file
    await fs.writeFile(KEYWORDS_PATH, JSON.stringify(updatedConfig, null, 2), 'utf8');
    console.log(`Indeks keyword telah diperbarui ke: ${nextIndex}.`);

    console.log('Proses selesai.');
}

main();