// app/components/tool-list.ts
// app/page.tsx

"use client"; // Diperlukan karena kita menggunakan state (useState) untuk filter

import { useState } from "react";

// Impor komponen dari shadcn/ui
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  Maximize,
  Minimize2,
  Crop,
  FlipHorizontal,
  FileImage,
  Sparkles,
  ShieldCheck,
  RotateCw,
  Type,
  ImageIcon,
  Eraser,
  Smile,
  Code,
} from "lucide-react";
import Link from "next/link";

// Definisikan tipe data untuk setiap tool
export type Tool = {
  category: "Optimize" | "Create" | "Edit" | "Convert" | "Security";
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  isNew?: boolean;
  url: string; 
};

// Ekspor array dari semua tools
export const tools: Tool[] = [
  {
    category: "Optimize",
    url: "/image/image-compression",
    icon: Minimize2,
    title: "Compress IMAGE",
    description:
      "Compress JPG, PNG, SVG, and GIFs while saving space and maintaining quality.",
  },
  {
    category: "Optimize",
    url: "/image/image-resize",
    icon: Maximize,
    title: "Resize IMAGE",
    description:
      "Define your dimensions, by percent or pixel, and resize your JPG, PNG, SVG, and GIF images.",
  },
  {
    category: "Edit",
    url: "/image/image-crop",
    icon: Crop,
    title: "Crop IMAGE",
    description:
      "Crop JPG, PNG, or GIFs with ease; Choose pixels to define your rectangle or use our visual editor.",
  },
  {
    category: "Convert",
    url: "/image/image-convert-to-jpg",
    icon: FlipHorizontal,
    title: "Convert to JPG",
    description:
      "Turn PNG, GIF, TIF, PSD, SVG, WEBP, HEIC, or RAW format images to JPG in bulk with ease.",
  },
  {
    category: "Convert",
    url: "/image/image-convert-from-jpg",
    icon: FileImage,
    title: "Convert from JPG",
    description:
      "Turn JPG images to PNG and GIF. Choose several JPGs to create an animated GIF in seconds!",
  },
  {
    category: "Edit",
    url: "/image/image-editor",
    icon: ImageIcon,
    title: "Photo editor",
    description:
      "Spice up your pictures with text, effects, frames or stickers. Simple editing tools for your image needs.",
  },
  {
    category: "Create",
    url: "/image/image-upscale",
    icon: Sparkles,
    title: "Upscale Image",
    description:
      "Enlarge your images with high resolution. Easily increase the size of your JPG and PNG images while maintaining visual quality.",
    isNew: true,
  },
  {
    category: "Edit",
    url: "/image/image-remove-background",
    icon: Eraser,
    title: "Remove background",
    description:
      "Quickly remove image backgrounds with high accuracy, instantly detect objects and cut out backgrounds with ease.",
    isNew: true,
  },
  {
    category: "Security",
    url: "/image/image-watermark",
    icon: ShieldCheck,
    title: "Watermark IMAGE",
    description:
      "Stamp an image or text over your images in seconds. Choose the typography, transparency and position.",
  },
  {
    category: "Create",
    url: "/image/image-meme-generator",
    icon: Smile,
    title: "Meme generator",
    description:
      "Create your memes online with ease. Caption meme images or upload your pictures to make custom memes.",
  },
  {
    category: "Edit",
    url: "/image/image-rotate",
    icon: RotateCw,
    title: "Rotate IMAGE",
    description:
      "Rotate many images JPG, PNG or GIF at same time. Choose to rotate only landscape or portrait images!",
  },
  {
    category: "Convert",
    url: "/image/html-to-image",
    icon: Code,
    title: "HTML to IMAGE",
    description:
      "Convert webpages in HTML to JPG or SVG. Copy and paste the URL of the page you want and convert it to IMAGE with a click.",
  },
  {
    category: "Security",
    url: "/image/image-blur-face",
    icon: Type,
    title: "Blur face",
    description:
      "Easily blur out faces in photos. You can also blur licence plates and other objects to hide private information.",
    isNew: true,
  },
];

// Definisikan kategori untuk filter menu
export const categories = [
  "All",
  "Optimize",
  "Create",
  "Edit",
  "Convert",
  "Security",
];



export default function HomePage() {
  // State untuk menyimpan filter yang sedang aktif
  const [activeFilter, setActiveFilter] = useState("All");

  // Logika untuk memfilter tools berdasarkan kategori yang aktif
  const filteredTools = activeFilter === "All"
      ? tools
      : tools.filter((tool) => tool.category === activeFilter);

  return (
    <main className="container mx-auto px-4 py-12">
      {/* Bagian Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
          Every tool you could want to edit images in bulk
        </h1>
        <p className="text-lg text-muted-foreground">
          Your online photo editor is here and forever free!
        </p>
      </div>

      {/* Bagian Filter Menu */}
      <div className="flex justify-center flex-wrap gap-2 mb-12">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeFilter === category ? "default" : "outline"}
            onClick={() => setActiveFilter(category)}
            className="capitalize"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Bagian Grid Tools */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTools.map((tool) => (
          <Link href={tool.url} key={tool.title} legacyBehavior={false}>
            <Card className="hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <tool.icon className="h-7 w-7 text-primary" />
                    <CardTitle className="text-lg">{tool.title}</CardTitle>
                  </div>
                  {tool.isNew && <Badge variant="destructive">New!</Badge>}
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">
                  {tool.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}