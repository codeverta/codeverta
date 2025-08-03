// 1. Install library: npm install @imgly/background-removal onnxruntime-web
// 2. Buat file baru di: app/remove-background/page.tsx atau pages/remove-background.tsx
// 3. Salin dan tempel semua kode di bawah ini ke dalam file tersebut.

"use client";

import { useState } from "react";
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
import { Download, Loader2, Wand2 } from "lucide-react";
// FIX: Menggunakan named import '{ removeBackground }' karena tidak ada default export.
import { removeBackground } from "@imgly/background-removal";

export default function RemoveBackgroundPage() {
  // State untuk file dan pratinjau
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string>("");
  const [resultPreview, setResultPreview] = useState<string>("");
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);

  // State UI
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fungsi untuk menangani saat pengguna memilih file
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validasi tipe file
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        setError("Tipe file tidak didukung. Silakan pilih file JPG atau PNG.");
        return;
      }
      // Reset state
      setOriginalFile(file);
      setOriginalPreview(URL.createObjectURL(file));
      setResultPreview("");
      setResultBlob(null);
      setError(null);
    }
  };

  // Fungsi utama untuk menghapus latar belakang
  const handleRemoveBackground = async () => {
    if (!originalFile) {
      setError("Silakan pilih file terlebih dahulu.");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setResultPreview("");
    setResultBlob(null);

    try {
      // FIX: Memanggil fungsi 'removeBackground' yang sudah diimpor.
      const blob = await removeBackground(originalFile);

      setResultBlob(blob);
      setResultPreview(URL.createObjectURL(blob));
    } catch (err: any) {
      console.error(err);
      setError(
        `Gagal memproses gambar: ${err.message || "Error tidak diketahui"}`
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // Fungsi untuk mengunduh gambar hasil
  const handleDownload = () => {
    if (!resultPreview || !resultBlob) return;
    const link = document.createElement("a");
    link.href = resultPreview;
    const fileName =
      originalFile?.name.split(".").slice(0, -1).join(".") || "image";
    link.download = `${fileName}-no-bg.png`; // Hasil selalu PNG untuk transparansi
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Remove Background
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Hapus latar belakang gambar dengan akurasi tinggi secara instan.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upload Gambar Anda</CardTitle>
            <CardDescription>
              Pilih gambar (JPG atau PNG) yang ingin Anda hapus latar
              belakangnya.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Pilih Gambar</Label>
              <Input
                id="picture"
                type="file"
                accept="image/jpeg,image/png"
                onChange={handleFileChange}
              />
            </div>
            {originalFile && (
              <Button
                onClick={handleRemoveBackground}
                disabled={isProcessing}
                className="w-full"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Hapus Latar Belakang
                  </>
                )}
              </Button>
            )}
            {error && (
              <p className="text-sm font-medium text-destructive">{error}</p>
            )}
          </CardContent>

          {(originalPreview || resultPreview) && <Separator />}

          <CardFooter className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {/* Gambar Asli */}
              {originalPreview && (
                <div className="flex flex-col items-center gap-2">
                  <h3 className="font-semibold">Gambar Asli</h3>
                  <img
                    src={originalPreview}
                    alt="Original"
                    className="rounded-md max-h-80 object-contain border p-2"
                  />
                  <p className="text-sm text-muted-foreground">
                    {formatFileSize(originalFile?.size || 0)}
                  </p>
                </div>
              )}

              {/* Hasil */}
              {resultPreview && (
                <div className="flex flex-col items-center gap-2">
                  <h3 className="font-semibold">
                    Hasil (Tanpa Latar Belakang)
                  </h3>
                  <img
                    src={resultPreview}
                    alt="Result"
                    className="rounded-md max-h-80 object-contain border p-2"
                  />
                  <p className="text-sm text-muted-foreground">
                    {formatFileSize(resultBlob?.size || 0)}
                  </p>
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
