// 1. Buat file baru di: app/compress/page.tsx
// 2. Salin dan tempel semua kode di bawah ini ke dalam file tersebut.

"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Download, Loader2, Target } from "lucide-react";

// Library untuk kompresi gambar di browser
import imageCompression from "browser-image-compression";

export default function CompressImagePage() {
  // State untuk menyimpan file asli dan file terkompresi
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);

  // State untuk URL pratinjau gambar
  const [originalPreview, setOriginalPreview] = useState<string>("");
  const [compressedPreview, setCompressedPreview] = useState<string>("");

  // State untuk target ukuran file dalam KB (default 500 KB)
  const [maxSizeKB, setMaxSizeKB] = useState(500);

  // State untuk loading dan error
  const [isCompressing, setIsCompressing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fungsi untuk menangani saat pengguna memilih file
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Reset state sebelumnya
      setOriginalFile(file);
      setOriginalPreview(URL.createObjectURL(file));
      setCompressedFile(null);
      setCompressedPreview("");
      setError(null);
    }
  };

  // Fungsi untuk memulai proses kompresi
  const handleCompress = useCallback(async () => {
    if (!originalFile) {
      setError("Silakan pilih file terlebih dahulu.");
      return;
    }
    if (maxSizeKB <= 0) {
      setError("Target ukuran harus lebih besar dari 0 KB.");
      return;
    }

    setIsCompressing(true);
    setError(null);

    // Opsi untuk library kompresi
    const options = {
      // Mengubah target dari KB ke MB
      maxSizeMB: maxSizeKB / 1024,
      maxWidthOrHeight: 1920, // Resolusi maksimum (opsional)
      useWebWorker: true, // Gunakan web worker untuk performa lebih baik
    };

    try {
      console.log(`Memulai kompresi dengan target ukuran: < ${maxSizeKB} KB`);
      const compressed = await imageCompression(originalFile, options);

      setCompressedFile(compressed);
      setCompressedPreview(URL.createObjectURL(compressed));
      console.log("Kompresi berhasil.");
    } catch (err) {
      console.error(err);
      setError(
        "Gagal mengompres gambar. Coba target ukuran yang berbeda atau file lain."
      );
    } finally {
      setIsCompressing(false);
    }
  }, [originalFile, maxSizeKB]);

  // Fungsi untuk mengunduh gambar yang sudah dikompres
  const handleDownload = () => {
    if (!compressedFile || !compressedPreview) return;

    const link = document.createElement("a");
    link.href = compressedPreview;
    // Menambahkan prefix 'compressed-' pada nama file asli
    link.download = `compressed-${originalFile?.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Fungsi untuk memformat ukuran file
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl">
        {/* Header Halaman */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Compress IMAGE
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Atur target ukuran file untuk mengompres gambar JPG, PNG, & GIF.
          </p>
        </div>

        {/* Card Utama */}
        <Card>
          <CardHeader>
            <CardTitle>Image Compression Tool</CardTitle>
            <CardDescription>
              Pilih gambar, tentukan target ukuran maksimal, dan lihat hasilnya.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Input File */}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">1. Pilih Gambar</Label>
              <Input
                id="picture"
                type="file"
                accept="image/jpeg,image/png,image/gif"
                onChange={handleFileChange}
              />
            </div>

            {originalFile && (
              <>
                {/* Pengaturan Target Ukuran */}
                <div className="space-y-2">
                  <Label htmlFor="size">
                    2. Tentukan Target Ukuran Maksimal (KB)
                  </Label>
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-muted-foreground" />
                    <Input
                      id="size"
                      type="number"
                      value={maxSizeKB}
                      onChange={(e) => setMaxSizeKB(Number(e.target.value))}
                      className="w-40"
                      placeholder="Contoh: 500"
                      disabled={isCompressing}
                    />
                    <span className="text-sm font-medium">KB</span>
                  </div>
                </div>

                {/* Tombol Aksi */}
                <Button
                  onClick={handleCompress}
                  disabled={isCompressing || !originalFile}
                  className="w-full"
                >
                  {isCompressing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Mengompres...
                    </>
                  ) : (
                    "3. Kompres Gambar"
                  )}
                </Button>
              </>
            )}

            {error && (
              <p className="text-sm font-medium text-destructive">{error}</p>
            )}
          </CardContent>

          {/* Hasil Perbandingan */}
          {(originalPreview || compressedPreview) && <Separator />}

          <CardFooter className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {/* Gambar Asli */}
              {originalPreview && (
                <div className="flex flex-col items-center gap-2">
                  <h3 className="font-semibold">Gambar Asli</h3>
                  <img
                    src={originalPreview}
                    alt="Original"
                    className="rounded-md max-h-64 object-contain border"
                  />
                  <p className="text-sm text-muted-foreground">
                    {formatFileSize(originalFile?.size || 0)}
                  </p>
                </div>
              )}

              {/* Gambar Terkompresi */}
              {compressedPreview && (
                <div className="flex flex-col items-center gap-2">
                  <h3 className="font-semibold">Hasil Kompresi</h3>
                  <img
                    src={compressedPreview}
                    alt="Compressed"
                    className="rounded-md max-h-64 object-contain border"
                  />
                  <p className="text-sm text-muted-foreground font-bold text-green-600">
                    {formatFileSize(compressedFile?.size || 0)}
                  </p>
                  {originalFile && compressedFile && (
                    <p className="text-xs text-muted-foreground">
                      Ukuran berkurang{" "}
                      {(
                        ((originalFile.size - compressedFile.size) /
                          originalFile.size) *
                        100
                      ).toFixed(1)}
                      %
                    </p>
                  )}
                  <Button onClick={handleDownload} size="sm" className="mt-2">
                    <Download className="mr-2 h-4 w-4" />
                    Unduh Gambar
                  </Button>
                </div>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
