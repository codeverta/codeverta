// pages/api/articles/[slug].ts
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Ambil slug dari query parameter
  const { slug } = req.query;
  if (typeof slug !== "string") {
    return res.status(400).json({ message: "Slug tidak valid." });
  }

  // === GET: READ ONE Article ===
  if (req.method === "GET") {
    try {
      const article = await prisma.article.findUnique({
        where: { slug },
      });

      if (!article) {
        return res.status(404).json({ message: "Artikel tidak ditemukan." });
      }

      return res.status(200).json(article);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Gagal mengambil artikel." });
    }
  }

  // === PUT: UPDATE Article ===
  else if (req.method === "PUT") {
    try {
      // Ambil semua data update dari body
      const dataToUpdate = req.body;

      const updatedArticle = await prisma.article.update({
        where: { slug },
        data: dataToUpdate,
      });

      return res
        .status(200)
        .json({
          message: "Artikel berhasil diperbarui.",
          article: updatedArticle,
        });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Gagal memperbarui artikel." });
    }
  }

  // === DELETE: DELETE Article ===
  else if (req.method === "DELETE") {
    try {
      await prisma.article.delete({
        where: { slug },
      });

      return res
        .status(200)
        .json({ message: `Artikel dengan slug '${slug}' berhasil dihapus.` });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Gagal menghapus artikel." });
    }
  }

  // === Method Not Allowed ===
  else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
