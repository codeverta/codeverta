"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, X, Info } from "lucide-react";

// --- Tipe Data ---
type Category = "All" | "Cosplay" | "Surrealism" | "Cyberpunk" | "Portrait";

interface Photo {
  id: number;
  src: string;
  title: string;
  category: Category;
  prompt: string;
  model: string;
  ratio: string;
}

// --- Dummy Data ---
const photos: Photo[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?q=80&w=600&auto=format&fit=crop",
    title: "Neon Samurai",
    category: "Cyberpunk",
    prompt:
      "Cyberpunk samurai standing in rain, neon lights, detailed armor, cinematic lighting, 8k, unreal engine 5 render --ar 16:9",
    model: "Midjourney v6",
    ratio: "16:9",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1578301978693-85ea400056e4?q=80&w=600&auto=format&fit=crop",
    title: "Ethereal Forest",
    category: "Surrealism",
    prompt:
      "A mystical forest with glowing mushrooms, floating islands, dreamlike atmosphere, pastel colors, digital art style",
    model: "Stable Diffusion XL",
    ratio: "9:16",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
    title: "Gothic Witch",
    category: "Cosplay",
    prompt:
      "Portrait of a gothic witch, intricate lace dress, dark makeup, holding a raven, victorian era background, photorealistic",
    model: "DALL-E 3",
    ratio: "4:5",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600&auto=format&fit=crop",
    title: "Future City",
    category: "Cyberpunk",
    prompt:
      "Futuristic cityscape with flying cars, towering skyscrapers, holographic billboards, night time, rain reflection",
    model: "Midjourney v5.2",
    ratio: "16:9",
  },
];

const categories: Category[] = ["All", "Cosplay", "Surrealism", "Cyberpunk"];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  // Filter Logic
  const filteredPhotos =
    selectedCategory === "All"
      ? photos
      : photos.filter((p) => p.category === selectedCategory);

  return (
    <main className="min-h-screen bg-neutral-950 text-white p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Art Gallery</h1>
        <p className="text-neutral-400">
          Explore curated AI-generated imagery and prompts.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-6xl mx-auto mb-8">
        <Tabs
          defaultValue="All"
          onValueChange={(v) => setSelectedCategory(v as Category)}
        >
          <TabsList className="bg-neutral-900">
            {categories.map((cat) => (
              <TabsTrigger
                key={cat}
                value={cat}
                className="data-[state=active]:bg-neutral-800 data-[state=active]:text-white"
              >
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Grid Gallery */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setSelectedPhoto(photo)}
            className="group relative cursor-pointer overflow-hidden rounded-xl bg-neutral-900 border border-neutral-800 transition-all hover:scale-[1.02]"
          >
            {/* Image */}
            <div className="aspect-[3/4] relative">
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <h3 className="font-bold text-lg">{photo.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge
                  variant="secondary"
                  className="text-xs bg-white/20 hover:bg-white/30 text-white border-0"
                >
                  {photo.category}
                </Badge>
              </div>
              <p className="text-xs text-neutral-300 mt-2 line-clamp-2 italic">
                "{photo.prompt}"
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      <Dialog
        open={!!selectedPhoto}
        onOpenChange={(open) => !open && setSelectedPhoto(null)}
      >
        <DialogContent className="max-w-4xl bg-neutral-900 border-neutral-800 text-white p-0 overflow-hidden">
          <div className="grid md:grid-cols-2 h-full">
            {/* Left: Image Full */}
            <div className="relative h-[50vh] md:h-full bg-black flex items-center justify-center">
              {selectedPhoto && (
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  width={800}
                  height={800}
                  className="object-contain max-h-full"
                />
              )}
            </div>

            {/* Right: Details */}
            <div className="p-6 flex flex-col h-full">
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className="border-neutral-700 text-neutral-300 mb-2"
                  >
                    {selectedPhoto?.category}
                  </Badge>
                </div>
                <DialogTitle className="text-2xl">
                  {selectedPhoto?.title}
                </DialogTitle>
                <DialogDescription className="text-neutral-500">
                  Generated by {selectedPhoto?.model}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6 space-y-4 flex-1">
                <div className="bg-neutral-950 p-4 rounded-lg border border-neutral-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold flex items-center gap-2">
                      <Info size={16} /> Prompt
                    </span>
                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(
                          selectedPhoto?.prompt || ""
                        )
                      }
                      className="text-xs flex items-center gap-1 text-neutral-400 hover:text-white transition-colors"
                    >
                      <Copy size={12} /> Copy
                    </button>
                  </div>
                  <ScrollArea className="h-[150px]">
                    <p className="text-sm text-neutral-300 font-mono leading-relaxed">
                      {selectedPhoto?.prompt}
                    </p>
                  </ScrollArea>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex flex-col">
                    <span className="text-neutral-500">Aspect Ratio</span>
                    <span>{selectedPhoto?.ratio}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-neutral-500">Model Version</span>
                    <span>{selectedPhoto?.model}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
