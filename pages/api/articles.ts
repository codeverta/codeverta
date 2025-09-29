// pages/api/articles.ts
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // === GET: READ ALL Articles ===
  if (req.method === "GET") {
    try {
      // Ambil semua artikel, hanya field penting, diurutkan berdasarkan tanggal terbaru
      const articles = await prisma.article.findMany({
        select: {
          id: true,
          title: true,
          slug: true,
          metaDescription: true,
          language: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { createdAt: "desc" },
      });
      return res.status(200).json(articles);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Gagal mengambil daftar artikel." });
    }
  }

  // === POST: CREATE Article ===
  else if (req.method === "POST") {
    try {
      // Ambil data dari body request
      const {
        title,
        slug,
        content,
        metaTitle,
        metaDescription,
        ogImageURL,
        language,
        authorId,
      } = req.body;

      // Validasi dasar
      if (!title || !slug || !content) {
        return res
          .status(400)
          .json({ message: "Judul, Slug, dan Konten wajib diisi." });
      }

      const newArticle = await prisma.article.create({
        data: {
          title,
          slug,
          content,
          metaTitle: metaTitle || title, // Gunakan title jika metaTitle tidak ada
          metaDescription,
          ogImageURL,
          language: language || "id",
          authorId: authorId ? parseInt(authorId) : null,
        },
      });

      return res
        .status(201)
        .json({ message: "Artikel berhasil dibuat.", article: newArticle });
    } catch (error: any) {
      // P2002: Unique constraint violation (biasanya karena slug sudah ada)
      if (error.code === "P2002") {
        return res
          .status(409)
          .json({
            message:
              "Slug yang Anda masukkan sudah digunakan. Silakan gunakan slug lain.",
          });
      }
      console.error(error);
      return res
        .status(500)
        .json({ message: "Gagal membuat artikel baru.", error: error.message });
    }
  }

  // === Method Not Allowed ===
  else {
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
