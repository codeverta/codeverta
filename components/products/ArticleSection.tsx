// ─────────────────────────────────────────────────────────────────────────────
// CARA PAKAI:
//
// 1. Di getStaticProps halaman produk, tambahkan:
//
//    import { getSortedPostsData } from "lib/posts";
//
//    const latestArticles = getSortedPostsData("news")
//      .slice(0, 3)
//      .map((p) => ({
//        id:    p.id,
//        title: p.title,
//        desc:  p.desc  || "",
//        date:  p.date,
//        image: p.image || null,
//        tags:  p.tags  || "",
//      }));
//
//    return { props: { ..., latestArticles } };
//
// 2. Tambahkan prop ke interface halaman:
//    latestArticles: ArticlePreview[]
//
// 3. Tempel komponen <ArticleSection> di bawah section Produk Lainnya
// ─────────────────────────────────────────────────────────────────────────────

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ── Types ── */
export interface ArticlePreview {
  id: string;
  title: string;
  desc: string;
  date: string;
  image?: string | null;
  tags: string;
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function estimateReadTime(desc: string) {
  const words = desc.split(/\s+/).filter(Boolean).length;
  return `${Math.max(2, Math.ceil(words / 40))} mnt`;
}

function firstTag(tags: string) {
  return tags.split(",")[0]?.trim() || "Artikel";
}

/* ── Single Article Card ── */
function ArticleCard({
  article,
  featured = false,
}: {
  article: ArticlePreview;
  featured?: boolean;
}) {
  const tag = firstTag(article.tags);
  const readTime = estimateReadTime(article.desc);

  if (featured) {
    return (
      <Link
        href={`/blog/${article.id}`}
        className="group relative flex flex-col md:flex-row gap-0 rounded-2xl overflow-hidden border border-slate-200 bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
      >
        {/* Image */}
        <div className="relative md:w-56 h-48 md:h-auto flex-shrink-0 bg-slate-100 overflow-hidden">
          {article.image ? (
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 224px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="1.5"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-col justify-between p-5 flex-1 min-w-0">
          <div>
            <Badge variant="secondary" className="mb-3 text-xs">
              {tag}
            </Badge>
            <h3 className="text-base font-bold text-slate-900 leading-snug mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {article.title}
            </h3>
            <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
              {article.desc}
            </p>
          </div>
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {readTime}
              </span>
              <span>{formatDate(article.date)}</span>
            </div>
            <span className="text-blue-600 text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
              Baca <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${article.id}`}
      className="group flex flex-col rounded-2xl overflow-hidden border border-slate-200 bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
    >
      {/* Image */}
      <div className="relative aspect-[16/9] bg-slate-100 overflow-hidden">
        {article.image ? (
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="1.5"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <Badge variant="secondary" className="w-fit mb-3 text-xs">
          {tag}
        </Badge>
        <h3 className="text-sm font-bold text-slate-900 leading-snug mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors flex-1">
          {article.title}
        </h3>
        <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed mb-4">
          {article.desc}
        </p>
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {readTime}
            </span>
            <span>{formatDate(article.date)}</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-blue-500 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

/* ── Section Component ── */
export function ArticleSection({ articles }: { articles: ArticlePreview[] }) {
  if (!articles || articles.length === 0) return null;

  const [featured, ...rest] = articles;

  return (
    <div className="bg-white border-t border-slate-200 py-20 mt-0">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" />
              Blog &amp; Insight
            </p>
            <h2 className="text-3xl font-bold text-slate-900">
              Coba Baca Artikel
            </h2>
            <p className="text-slate-500 mt-2 text-sm">
              Tips, tutorial, dan wawasan seputar teknologi untuk bisnis Anda
            </p>
          </div>
          <Button variant="outline" asChild className="hidden md:flex">
            <Link href="/blog">
              Semua Artikel
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        {/* Layout: 1 featured full-width + 2 cards below — atau 3 cards kalau mobile */}
        <div className="flex flex-col gap-5">
          {/* Featured — artikel pertama, lebih lebar */}
          <ArticleCard article={featured} featured />

          {/* Dua artikel berikutnya */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {rest.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          )}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 md:hidden">
          <Button variant="outline" className="w-full" asChild>
            <Link href="/blog">
              Lihat Semua Artikel
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
