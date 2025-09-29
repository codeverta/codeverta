// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

// Cek apakah Prisma Client sudah ada di object global (untuk Next.js Hot Reloading)
const prisma =
  (global as any).prisma ||
  new PrismaClient({
    log: ["warn", "error"], // Hanya log peringatan dan error
  });

if (process.env.NODE_ENV !== "production") {
  (global as any).prisma = prisma;
}

export default prisma;
