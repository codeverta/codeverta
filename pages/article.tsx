import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Newspaper,
  BrainCircuit,
  Rocket,
  Code,
  ShieldCheck,
  BotMessageSquare,
  BookOpen,
  MessageSquare,
  Eraser,
  Smile,
} from "lucide-react";
import Link from "next/link";

// Menambahkan properti 'icon' dan 'iconBgColor' pada data kategori
const categories = [
  {
    title: "News",
    description: "Berita terbaru seputar teknologi dan inovasi.",
    href: "/news",
    icon: <Newspaper className="h-8 w-8 text-blue-500" />,
    iconBgColor: "bg-blue-100 dark:bg-blue-900/50",
  },
  {
    title: "AI",
    description: "Jelajahi perkembangan terbaru dalam Kecerdasan Buatan.",
    href: "/ai",
    icon: <BrainCircuit className="h-8 w-8 text-purple-500" />,
    iconBgColor: "bg-purple-100 dark:bg-purple-900/50",
  },
  {
    title: "Startups",
    description: "Kisah inspiratif dan strategi dari dunia startup.",
    href: "/startups",
    icon: <Rocket className="h-8 w-8 text-orange-500" />,
    iconBgColor: "bg-orange-100 dark:bg-orange-900/50",
  },
  {
    title: "Tutorials",
    description: "Panduan langkah demi langkah untuk membantu Anda belajar.",
    href: "/tutorials",
    icon: <Code className="h-8 w-8 text-green-500" />,
    iconBgColor: "bg-green-100 dark:bg-green-900/50",
  },
  {
    title: "AI LLM(Large Language Models)",
    description:
      "Pelajari teknik prompting untuk Large Language Models dan AI.",
    href: "/course/prompting",
    icon: <MessageSquare className="h-8 w-8 text-indigo-500" />,
    iconBgColor: "bg-indigo-100 dark:bg-indigo-900/50",
  },
  {
    title: "Artikel Cybersecurity Terupdate",
    description: "Jaga keamanan digital Anda dengan tips dan trik terbaru.",
    href: "/cybersecurity",
    icon: <ShieldCheck className="h-8 w-8 text-red-500" />,
    iconBgColor: "bg-red-100 dark:bg-red-900/50",
  },
  {
    title: "Cybersecurity Course",
    description: "Kelas cybersecurity terbaru.",
    href: "/course/cybersecurity",
    icon: <ShieldCheck className="h-8 w-8 text-red-500" />,
    iconBgColor: "bg-red-100 dark:bg-red-900/50",
  },
  {
    title: "AI Engineer",
    description: "Artikel mendalam tentang AI dan model bahasa besar.",
    href: "/course/ai-engineer",
    icon: <BotMessageSquare className="h-8 w-8 text-sky-500" />,
    iconBgColor: "bg-sky-100 dark:bg-sky-900/50",
  },
  // tambahkan image editor dan pdf editor
  {
    title: "Image Editor",
    description: "Edit gambar dengan berbagai tools seperti crop, resize, dll.",
    href: "/image",
    icon: <Eraser className="h-8 w-8 text-yellow-500" />,
    iconBgColor: "bg-yellow-100 dark:bg-yellow-900/50",
  },
  {
    title: "PDF Editor",
    description: "Edit dan konversi file PDF dengan mudah.",
    href: "/pdf",
    icon: <Smile className="h-8 w-8 text-teal-500" />,
    iconBgColor: "bg-teal-100 dark:bg-teal-900/50",
  },
];

export default function ArticleCategoriesPage() {
  return (
    // Latar belakang dengan gradien radial
    <div className="min-h-screen w-full bg-slate-50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-100 to-slate-50 dark:bg-neutral-950 dark:from-neutral-900 dark:to-neutral-950">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <header className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-sm font-medium">
            Jelajahi Topik
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
            Pustaka Pengetahuan
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Pilih kategori untuk memulai perjalanan Anda di dunia teknologi dan
            inovasi.
          </p>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              href={category.href}
              key={category.title}
              className="group block"
            >
              <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out border-2 border-transparent group-hover:border-primary group-hover:shadow-2xl group-hover:shadow-primary/10 group-hover:-translate-y-2">
                <CardHeader className="p-6">
                  <div className="flex items-center gap-5">
                    {/* Ikon dengan latar belakang berwarna */}
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-xl ${category.iconBgColor}`}
                    >
                      {category.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl font-semibold">
                        {category.title}
                      </CardTitle>
                      <CardDescription className="mt-1 text-sm">
                        {category.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                {/* Panah yang muncul di bagian bawah kartu */}
                <div className="px-6 pb-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex justify-end">
                  <ArrowRight className="h-6 w-6 text-primary" />
                </div>
              </Card>
            </Link>
          ))}
        </main>
      </div>
    </div>
  );
}
