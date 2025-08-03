// 1. Install library baru: npm install react-image-crop
// 2. Ganti seluruh konten di app/resize/page.tsx dengan kode di bawah ini.

"use client";

import { useState, useRef } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Download, Loader2, AspectRatio, Crop } from "lucide-react";
import { useEffect, DependencyList } from "react";

// Import library crop
import ReactCrop, {
  type Crop as CropType,
  centerCrop,
  makeAspectCrop,
  PixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css"; // Jangan lupa import CSS-nya


export default function ResizeImagePage() {
  // State untuk file dan pratinjau
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [imgSrc, setImgSrc] = useState("");
  const [resizedBlob, setResizedBlob] = useState<Blob | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // State untuk dimensi dan opsi
  const [outputWidth, setOutputWidth] = useState(800);
  const [outputHeight, setOutputHeight] = useState(600);
  const [keepAspectRatio, setKeepAspectRatio] = useState(true);
  const [aspect, setAspect] = useState<number | undefined>(16 / 9);

  // State untuk cropping
  const [crop, setCrop] = useState<CropType>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

  // State UI
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fungsi saat gambar dimuat di pratinjau
  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    const newAspect = keepAspectRatio ? outputWidth / outputHeight : undefined;
    setAspect(newAspect);
    // Membuat crop awal di tengah gambar
    const initialCrop = centerCrop(
      makeAspectCrop(
        {
          unit: "%",
          width: 90,
        },
        newAspect || width / height,
        width,
        height
      ),
      width,
      height
    );
    setCrop(initialCrop);
  }

  // Fungsi untuk menangani saat pengguna memilih file
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Reset state
      setOriginalFile(file);
      setCrop(undefined); // Reset crop
      setCompletedCrop(undefined);
      setError(null);

      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(file);
    }
  };

  // Update aspect ratio saat input dimensi atau checkbox berubah
  useEffect(() => {
    if (keepAspectRatio) {
      setAspect(outputWidth / outputHeight);
    } else {
      setAspect(undefined);
    }
  }, [outputWidth, outputHeight, keepAspectRatio]);

  // Efek ini akan berjalan saat pengguna selesai mengubah area crop
  // dan akan menggambar pratinjau hasil crop di canvas.
  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          1, // scale
          0 // rotate
        );
      }
    },
    100, // debounce delay
    [completedCrop]
  );

  // Fungsi utama untuk memproses gambar (crop & resize)
  const handleProcessImage = async () => {
    const image = imgRef.current;
    if (!completedCrop || !image) {
      setError("Silakan pilih area pada gambar untuk dipotong.");
      return;
    }

    setIsProcessing(true);
    setError(null);

    // Membuat canvas baru untuk hasil akhir
    const finalCanvas = document.createElement("canvas");
    finalCanvas.width = outputWidth;
    finalCanvas.height = outputHeight;
    const ctx = finalCanvas.getContext("2d");

    if (!ctx) {
      setError("Gagal membuat konteks canvas.");
      setIsProcessing(false);
      return;
    }

    // --- PERUBAHAN DIMULAI DI SINI ---

    // Hitung rasio skala antara gambar asli dan gambar yang ditampilkan
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    // Menggambar area yang di-crop ke canvas baru dengan ukuran target
    // Gunakan koordinat yang sudah diskalakan
    ctx.drawImage(
      image,
      completedCrop.x * scaleX, // <- Gunakan nilai yang diskalakan
      completedCrop.y * scaleY, // <- Gunakan nilai yang diskalakan
      completedCrop.width * scaleX, // <- Gunakan nilai yang diskalakan
      completedCrop.height * scaleY, // <- Gunakan nilai yang diskalakan
      0,
      0,
      outputWidth,
      outputHeight
    );

    // --- PERUBAHAN SELESAI DI SINI ---

    // Mendapatkan blob dari canvas akhir
    finalCanvas.toBlob(
      (blob) => {
        if (blob) {
          setResizedBlob(blob);
        }
        setIsProcessing(false);
      },
      originalFile?.type || "image/jpeg",
      0.95 // Kualitas 95%
    );
  };
  // Fungsi untuk mengunduh gambar
  const handleDownload = () => {
    if (!resizedBlob) return;
    const url = URL.createObjectURL(resizedBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `resized-${originalFile?.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Resize & Crop IMAGE
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Pilih area, atur dimensi, dan ubah ukuran gambar Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Kolom Kontrol */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Pengaturan</CardTitle>
              <CardDescription>
                Atur dimensi output dan pilih gambar.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="picture">1. Pilih Gambar</Label>
                <Input
                  id="picture"
                  type="file"
                  accept="image/jpeg,image/png,image/gif"
                  onChange={handleFileChange}
                />
              </div>

              {imgSrc && (
                <>
                  <div className="space-y-4 pt-4">
                    <Label>2. Atur Dimensi Output (Pixel)</Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="aspect-ratio"
                        checked={keepAspectRatio}
                        onCheckedChange={(checked) =>
                          setKeepAspectRatio(Boolean(checked))
                        }
                      />
                      <Label htmlFor="aspect-ratio">
                        Kunci rasio aspek seleksi
                      </Label>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="space-y-1">
                        <Label htmlFor="width">Width</Label>
                        <Input
                          id="width"
                          type="number"
                          value={outputWidth}
                          onChange={(e) =>
                            setOutputWidth(Number(e.target.value))
                          }
                        />
                      </div>
                      <span className="mt-6 font-bold">x</span>
                      <div className="space-y-1">
                        <Label htmlFor="height">Height</Label>
                        <Input
                          id="height"
                          type="number"
                          value={outputHeight}
                          onChange={(e) =>
                            setOutputHeight(Number(e.target.value))
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={handleProcessImage}
                    disabled={isProcessing || !completedCrop}
                    className="w-full"
                  >
                    {isProcessing ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Crop className="mr-2 h-4 w-4" />
                    )}
                    3. Potong & Ubah Ukuran
                  </Button>
                </>
              )}
            </CardContent>
            {resizedBlob && (
              <CardFooter className="flex-col items-start gap-4">
                <Separator />
                <div className="w-full">
                  <h3 className="font-semibold mb-2">Hasil Akhir</h3>
                  <p className="text-sm text-muted-foreground">
                    Ukuran: {outputWidth} x {outputHeight} px
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Ukuran file:{" "}
                    <span className="font-bold">
                      {formatFileSize(resizedBlob.size)}
                    </span>
                  </p>
                </div>
                <Button onClick={handleDownload} className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Unduh Gambar
                </Button>
              </CardFooter>
            )}
          </Card>

          {/* Kolom Pratinjau */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Editor Gambar</CardTitle>
              <CardDescription>
                Seret untuk memilih area yang ingin Anda simpan.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
              {!imgSrc && (
                <div className="text-center text-muted-foreground p-8 border-dashed border-2 rounded-lg">
                  Silakan pilih gambar untuk memulai.
                </div>
              )}
              {imgSrc && (
                <ReactCrop
                  crop={crop}
                  onChange={(_, percentCrop) => setCrop(percentCrop)}
                  onComplete={(c) => setCompletedCrop(c)}
                  aspect={aspect}
                  className="max-w-full"
                >
                  <img
                    ref={imgRef}
                    alt="Crop me"
                    src={imgSrc}
                    onLoad={onImageLoad}
                    className="max-h-[60vh] object-contain"
                  />
                </ReactCrop>
              )}
              {error && (
                <p className="text-sm font-medium text-destructive mt-4">
                  {error}
                </p>
              )}

              {/* Canvas untuk pratinjau (tersembunyi, hanya untuk render) */}
              <div className="mt-4">
                <h3 className="text-center font-semibold text-sm mb-2">
                  Pratinjau Seleksi
                </h3>
                <canvas
                  ref={previewCanvasRef}
                  className="rounded-md border bg-muted"
                  style={{
                    objectFit: "contain",
                    width: completedCrop?.width
                      ? Math.min(completedCrop.width, 300)
                      : 0,
                    height: completedCrop?.height
                      ? Math.min(completedCrop.height, 300)
                      : 0,
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

// Buat file baru di: app/resize/canvasPreview.ts
// Ini adalah fungsi helper yang direkomendasikan oleh react-image-crop
export async function canvasPreview(
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  crop: PixelCrop,
  scale = 1,
  rotate = 0
) {
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d context");
  }

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  const pixelRatio = window.devicePixelRatio;

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = "high";

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  const rotateRads = (rotate * Math.PI) / 180;
  const centerX = image.naturalWidth / 2;
  const centerY = image.naturalHeight / 2;

  ctx.save();
  ctx.translate(-cropX, -cropY);
  ctx.translate(centerX, centerY);
  ctx.rotate(rotateRads);
  ctx.scale(scale, scale);
  ctx.translate(-centerX, -centerY);
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight
  );

  ctx.restore();
}

export function useDebounceEffect(
  fn: () => void,
  waitTime: number,
  deps: DependencyList
) {
  useEffect(() => {
    const t = setTimeout(() => {
      fn.apply(undefined, deps as any);
    }, waitTime);

    return () => {
      clearTimeout(t);
    };
  }, deps);
}
