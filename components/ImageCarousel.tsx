"use client";
import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

export default function ImageCarousel({ images, productName, videoCount }) {
  const [cur, setCur] = useState(0);
  const total = images.length;

  if (!images || total === 0) return null;

  const go = (i) => setCur((i + total) % total);

  return (
    <div className="space-y-2">
      {/* Main image */}
      <div className="relative w-full h-[400px] md:h-[650px] rounded-xl overflow-hidden bg-muted border border-border">
        {" "}
        <Image
          key={cur}
          src={images[cur] || "/placeholder.svg"}
          alt={`${productName} ${cur + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-contain transition-opacity duration-150" // <-- Menjaga gambar tidak kepotong
          priority={cur === 0}
        />
        {/* Prev / Next */}
        {total > 1 && (
          <>
            <button
              onClick={() => go(cur - 1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/75 text-white rounded-full w-8 h-8 flex items-center justify-center transition"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => go(cur + 1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/75 text-white rounded-full w-8 h-8 flex items-center justify-center transition"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
        {/* Counter */}
        <span className="absolute bottom-2.5 right-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full">
          {cur + 1} / {total}
        </span>
        {/* Video badge */}
        {videoCount > 0 && (
          <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full">
            <Play className="w-3 h-3 fill-white" />
            {videoCount} video tersedia ↓
          </div>
        )}
      </div>

      {/* Thumbnails — hanya tampil kalau > 1 gambar */}
      {total > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`flex-shrink-0 w-16 h-12 rounded-md overflow-hidden border-2 transition ${
                i === cur
                  ? "border-foreground"
                  : "border-transparent hover:border-border"
              }`}
              aria-label={`Gambar ${i + 1}`}
            >
              <Image
                src={src || "/placeholder.svg"}
                alt={`${productName} thumb ${i + 1}`}
                width={64}
                height={48}
                className="w-full h-full object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
