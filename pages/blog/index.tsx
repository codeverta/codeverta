import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { getSortedPostsData } from "lib/posts";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image"; // Pastikan di-import di bagian atas

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
interface Post {
  id: string;
  lang: string;
  title: string;
  date: string;
  desc: string;
  tags: string;
  category: string;
  image?: string; // Tambahkan ini
  readTime?: string;
}
interface Props {
  allPostsData: Post[];
}

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */
function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getTagList(tags: string): string[] {
  return tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

function slugToReadTime(id: string): string {
  const num = id.split("-").length;
  const mins = Math.max(3, Math.min(12, Math.floor(num / 4)));
  return `${mins} menit baca`;
}

function getPostNumber(id: string): string {
  const match = id.match(/^(\d+)-/);
  return match ? match[1] : "00";
}

/* ─────────────────────────────────────────────
   Scroll Progress Bar
───────────────────────────────────────────── */
function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="scroll-progress-track">
      <div
        className="scroll-progress-bar"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Back to Top Button
───────────────────────────────────────────── */
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      className={`back-to-top${visible ? " visible" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Kembali ke atas"
    >
      ↑
    </button>
  );
}

/* ─────────────────────────────────────────────
   Post Card
───────────────────────────────────────────── */

function PostCard({ post, index }: { post: Post; index: number }) {
  const tags = getTagList(post.tags);
  const num = getPostNumber(post.id);
  const readTime = post.readTime || slugToReadTime(post.id);

  return (
    <Link href={`/blog/${post.id}`} className="post-card" data-index={index}>
      {/* Gambar Postingan */}
      <div
        className="card-image-wrap"
        style={{
          position: "relative",
          width: "160px",
          height: "120px",
          flexShrink: 0,
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            style={{ objectFit: "cover" }}
            sizes="160px"
          />
        ) : (
          <div
            className="mini-img-placeholder"
            style={{
              width: "100%",
              height: "100%",
              background: "#eee",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            📄
          </div>
        )}
      </div>

      <div className="card-body" style={{ marginLeft: "16px", flexGrow: 1 }}>
        <div className="card-number">#{num}</div>
        <h2 className="card-title">{post.title}</h2>
        <p className="card-desc">{post.desc}</p>
        <div className="card-meta">
          <span className="meta-date">{formatDate(post.date)}</span>
          <span className="meta-dot">·</span>
          <span className="meta-readtime">{readTime}</span>
        </div>
        <div className="card-tags">
          {tags.slice(0, 3).map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="card-arrow">→</div>
    </Link>
  );
}

/* ─────────────────────────────────────────────
   Sidebar: Table of Contents (post titles nav)
───────────────────────────────────────────── */
function TableOfContents({ posts }: { posts: Post[] }) {
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".post-card");
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index);
            setActiveIndex(idx);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, [posts]);

  const scrollToCard = (index: number) => {
    const card = document.querySelector<HTMLElement>(
      `.post-card[data-index="${index}"]`
    );
    if (card) {
      const top = card.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <nav className="toc-sidebar" aria-label="Navigasi artikel">
      <p className="toc-label">Daftar Artikel</p>
      <ul className="toc-list">
        {posts.map((post, i) => (
          <li key={post.id}>
            <button
              className={`toc-item${activeIndex === i ? " toc-active" : ""}`}
              onClick={() => scrollToCard(i)}
              title={post.title}
            >
              <span className="toc-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="toc-text">{post.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ─────────────────────────────────────────────
   Search & Filter Bar
───────────────────────────────────────────── */
function SearchBar({
  query,
  onChange,
}: {
  query: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="search-wrapper">
      <span className="search-icon" aria-hidden="true">
        ⌕
      </span>
      <input
        type="search"
        className="search-input"
        placeholder="Cari artikel..."
        value={query}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Cari artikel"
      />
      {query && (
        <button
          className="search-clear"
          onClick={() => onChange("")}
          aria-label="Hapus pencarian"
        >
          ✕
        </button>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Sort selector
───────────────────────────────────────────── */
type SortKey = "newest" | "oldest" | "az" | "za";

function SortSelect({
  value,
  onChange,
}: {
  value: SortKey;
  onChange: (v: SortKey) => void;
}) {
  return (
    <select
      className="sort-select"
      value={value}
      onChange={(e) => onChange(e.target.value as SortKey)}
      aria-label="Urutkan artikel"
    >
      <option value="newest">Terbaru</option>
      <option value="oldest">Terlama</option>
      <option value="az">A–Z</option>
      <option value="za">Z–A</option>
    </select>
  );
}

/* ─────────────────────────────────────────────
   Tag cloud
───────────────────────────────────────────── */
function TagCloud({
  allPosts,
  active,
  onToggle,
}: {
  allPosts: Post[];
  active: string[];
  onToggle: (tag: string) => void;
}) {
  const freq: Record<string, number> = {};
  allPosts.forEach((p) =>
    getTagList(p.tags).forEach((t) => {
      freq[t] = (freq[t] || 0) + 1;
    })
  );

  const sorted = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 16);

  return (
    <div className="tag-cloud" role="group" aria-label="Filter berdasarkan tag">
      {sorted.map(([tag, count]) => (
        <button
          key={tag}
          className={`tag-cloud-btn${
            active.includes(tag) ? " tag-active" : ""
          }`}
          onClick={() => onToggle(tag)}
        >
          {tag}
          <span className="tag-count">{count}</span>
        </button>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Stats strip
───────────────────────────────────────────── */
function StatsStrip({ total, showing }: { total: number; showing: number }) {
  return (
    <div className="stats-strip">
      <span>
        Menampilkan{" "}
        <strong>
          {showing} dari {total}
        </strong>{" "}
        artikel
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Page
───────────────────────────────────────────── */
export default function NewsIndex({ allPostsData }: Props) {
  const [query, setQuery] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>("newest");
  const [showToc, setShowToc] = useState(false);

  const toggleTag = useCallback((tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }, []);

  /* Filter */
  const filtered = allPostsData
    .filter((p) => {
      const text = `${p.title} ${p.desc} ${p.tags}`.toLowerCase();
      if (query && !text.includes(query.toLowerCase())) return false;
      if (activeTags.length) {
        const postTags = getTagList(p.tags);
        if (!activeTags.some((at) => postTags.includes(at))) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sort === "newest") return a.date < b.date ? 1 : -1;
      if (sort === "oldest") return a.date > b.date ? 1 : -1;
      if (sort === "az") return a.title.localeCompare(b.title);
      if (sort === "za") return b.title.localeCompare(a.title);
      return 0;
    });

  const pageTitle = "Berita & Artikel | Blog";
  const pageDesc =
    "Kumpulan artikel terbaru seputar teknologi, bisnis, dan digital marketing.";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <ScrollProgressBar />

      {/* ── Hero Header ── */}
      <header className="blog-hero">
        <div className="hero-inner">
          <div className="hero-eyebrow">Publikasi &amp; Wawasan</div>
          <h1 className="hero-title">Berita &amp; Artikel</h1>
          <p className="hero-subtitle">{pageDesc}</p>
        </div>
      </header>

      {/* ── Controls ── */}
      <div className="controls-bar">
        <div className="controls-inner">
          <SearchBar query={query} onChange={setQuery} />
          <SortSelect value={sort} onChange={setSort} />
          <button
            className={`toc-toggle-btn${showToc ? " toc-toggle-active" : ""}`}
            onClick={() => setShowToc((v) => !v)}
            aria-pressed={showToc}
          >
            ☰ Daftar Isi
          </button>
        </div>
      </div>

      {/* ── Tag Cloud ── */}
      <div className="tag-section">
        <div className="tag-section-inner">
          <TagCloud
            allPosts={allPostsData}
            active={activeTags}
            onToggle={toggleTag}
          />
          {activeTags.length > 0 && (
            <button
              className="clear-tags-btn"
              onClick={() => setActiveTags([])}
            >
              Hapus filter ({activeTags.length})
            </button>
          )}
        </div>
      </div>

      {/* ── Body ── */}
      <div className={`blog-layout${showToc ? " show-toc" : ""}`}>
        {/* TOC Sidebar */}
        {showToc && (
          <aside className="sidebar">
            <TableOfContents posts={filtered} />
          </aside>
        )}

        {/* Posts list */}
        <main className="posts-main">
          <StatsStrip total={allPostsData.length} showing={filtered.length} />

          {filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <p>Tidak ada artikel yang cocok dengan pencarian Anda.</p>
              <button
                className="reset-btn"
                onClick={() => {
                  setQuery("");
                  setActiveTags([]);
                }}
              >
                Reset filter
              </button>
            </div>
          ) : (
            <div className="post-list">
              {filtered.map((post, i) => (
                <PostCard key={post.id} post={post} index={i} />
              ))}
            </div>
          )}
        </main>
      </div>

      <BackToTop />

      <style jsx global>{`
        /* ── Fonts ── */
        .blog-hero,
        .controls-bar,
        .posts-main,
        .toc-sidebar {
          font-family: "Plus Jakarta Sans", sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        /* ── Reset ── */
        *,
        *::before,
        *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        /* ── Scroll progress ── */
        .scroll-progress-track {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: #e5e7eb;
          z-index: 9999;
        }
        .scroll-progress-bar {
          height: 100%;
          background: #111827;
          transition: width 0.1s linear;
        }

        /* ── Back to top ── */
        .back-to-top {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #111827;
          color: #fff;
          border: none;
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          pointer-events: none;
          transform: translateY(12px);
          transition: opacity 0.25s, transform 0.25s;
          z-index: 100;
        }
        .back-to-top.visible {
          opacity: 1;
          pointer-events: auto;
          transform: none;
        }

        /* ── Hero ── */
        .blog-hero {
          background: #0f172a;
          padding: 5rem 1.5rem 4rem;
          text-align: center;
        }
        .hero-inner {
          max-width: 720px;
          margin: 0 auto;
        }
        .hero-eyebrow {
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #94a3b8;
          margin-bottom: 1rem;
          font-weight: 500;
        }
        .hero-title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 700;
          color: #f8fafc;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin-bottom: 1rem;
          font-family: "Playfair Display", Georgia, serif;
        }
        .hero-subtitle {
          font-size: 1.05rem;
          color: #94a3b8;
          line-height: 1.7;
          max-width: 540px;
          margin: 0 auto;
        }

        /* ── Controls bar ── */
        .controls-bar {
          position: sticky;
          top: 3px;
          z-index: 50;
          background: #fff;
          border-bottom: 1px solid #e5e7eb;
          padding: 0.75rem 1.5rem;
        }
        .controls-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          gap: 0.75rem;
          align-items: center;
          flex-wrap: wrap;
        }

        /* Search */
        .search-wrapper {
          flex: 1;
          min-width: 200px;
          position: relative;
          display: flex;
          align-items: center;
        }
        .search-icon {
          position: absolute;
          left: 0.75rem;
          font-size: 1.2rem;
          color: #9ca3af;
          pointer-events: none;
        }
        .search-input {
          width: 100%;
          padding: 0.5rem 2.5rem 0.5rem 2.25rem;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 0.9rem;
          outline: none;
          color: #111827;
          transition: border-color 0.15s;
        }
        .search-input:focus {
          border-color: #111827;
        }
        .search-clear {
          position: absolute;
          right: 0.75rem;
          background: none;
          border: none;
          cursor: pointer;
          color: #9ca3af;
          font-size: 0.8rem;
          line-height: 1;
        }

        /* Sort */
        .sort-select {
          padding: 0.5rem 0.75rem;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 0.85rem;
          color: #374151;
          background: #fff;
          cursor: pointer;
          outline: none;
        }

        /* TOC toggle */
        .toc-toggle-btn {
          padding: 0.5rem 1rem;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 0.85rem;
          color: #374151;
          background: #fff;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.15s, color 0.15s;
        }
        .toc-toggle-btn:hover,
        .toc-toggle-btn.toc-toggle-active {
          background: #111827;
          color: #fff;
          border-color: #111827;
        }

        /* ── Tags ── */
        .tag-section {
          background: #f9fafb;
          border-bottom: 1px solid #e5e7eb;
          padding: 0.75rem 1.5rem;
        }
        .tag-section-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          gap: 0.5rem;
          align-items: center;
          flex-wrap: wrap;
        }
        .tag-cloud {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
          flex: 1;
        }
        .tag-cloud-btn {
          padding: 0.3rem 0.7rem;
          border: 1px solid #d1d5db;
          border-radius: 20px;
          font-size: 0.78rem;
          color: #374151;
          background: #fff;
          cursor: pointer;
          display: flex;
          gap: 0.35rem;
          align-items: center;
          transition: all 0.15s;
        }
        .tag-cloud-btn:hover {
          border-color: #111827;
          color: #111827;
        }
        .tag-cloud-btn.tag-active {
          background: #111827;
          color: #fff;
          border-color: #111827;
        }
        .tag-count {
          font-size: 0.7rem;
          opacity: 0.6;
        }
        .clear-tags-btn {
          font-size: 0.8rem;
          color: #6b7280;
          background: none;
          border: none;
          cursor: pointer;
          white-space: nowrap;
          text-decoration: underline;
        }

        /* ── Layout ── */
        .blog-layout {
          max-width: 1100px;
          margin: 0 auto;
          padding: 2rem 1.5rem;
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        .blog-layout.show-toc {
          grid-template-columns: 260px 1fr;
        }

        /* ── Sidebar TOC ── */
        .sidebar {
          position: sticky;
          top: 80px;
          height: calc(100vh - 100px);
          overflow-y: auto;
        }
        .toc-sidebar {
          padding-right: 1rem;
        }
        .toc-label {
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #9ca3af;
          font-weight: 600;
          margin-bottom: 0.75rem;
        }
        .toc-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .toc-item {
          display: flex;
          gap: 0.5rem;
          align-items: flex-start;
          text-align: left;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.35rem 0.5rem;
          border-radius: 6px;
          width: 100%;
          transition: background 0.12s;
        }
        .toc-item:hover {
          background: #f3f4f6;
        }
        .toc-item.toc-active {
          background: #f3f4f6;
        }
        .toc-num {
          font-size: 0.7rem;
          color: #9ca3af;
          font-variant-numeric: tabular-nums;
          flex-shrink: 0;
          padding-top: 1px;
          font-weight: 600;
        }
        .toc-item.toc-active .toc-num {
          color: #111827;
        }
        .toc-text {
          font-size: 0.8rem;
          color: #4b5563;
          line-height: 1.4;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .toc-item.toc-active .toc-text {
          color: #111827;
          font-weight: 500;
        }

        /* ── Stats ── */
        .stats-strip {
          font-size: 0.82rem;
          color: #9ca3af;
          margin-bottom: 1.25rem;
        }
        .stats-strip strong {
          color: #374151;
        }

        /* ── Post List ── */
        .post-list {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        /* ── Post Card ── */
        .post-card {
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
          padding: 1.5rem 0;
          border-bottom: 1px solid #f3f4f6;
          text-decoration: none;
          color: inherit;
          transition: background 0.15s;
          border-radius: 0;
          position: relative;
        }
        .post-card:first-child {
          border-top: 1px solid #f3f4f6;
        }
        .post-card:hover {
          background: #fafafa;
        }

        .card-number {
          font-size: 0.72rem;
          color: #d1d5db;
          font-variant-numeric: tabular-nums;
          font-weight: 700;
          letter-spacing: 0.05em;
          flex-shrink: 0;
          padding-top: 4px;
          min-width: 2rem;
          text-align: right;
        }

        .card-body {
          flex: 1;
          min-width: 0;
        }

        .card-title {
          font-size: 1.05rem;
          font-weight: 600;
          color: #111827;
          line-height: 1.45;
          margin-bottom: 0.5rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .post-card:hover .card-title {
          color: #1d4ed8;
        }

        .card-desc {
          font-size: 0.875rem;
          color: #6b7280;
          line-height: 1.6;
          margin-bottom: 0.75rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-meta {
          display: flex;
          gap: 0.5rem;
          align-items: center;
          font-size: 0.78rem;
          color: #9ca3af;
          margin-bottom: 0.6rem;
        }
        .meta-dot {
          color: #d1d5db;
        }

        .card-tags {
          display: flex;
          gap: 0.35rem;
          flex-wrap: wrap;
        }
        .tag {
          font-size: 0.7rem;
          padding: 0.2rem 0.55rem;
          background: #f3f4f6;
          color: #374151;
          border-radius: 4px;
          border: 1px solid #e5e7eb;
          white-space: nowrap;
        }

        .card-arrow {
          font-size: 1.1rem;
          color: #d1d5db;
          flex-shrink: 0;
          padding-top: 2px;
          transition: transform 0.15s, color 0.15s;
        }
        .post-card:hover .card-arrow {
          color: #111827;
          transform: translateX(4px);
        }

        /* ── Empty state ── */
        .empty-state {
          text-align: center;
          padding: 4rem 1rem;
          color: #9ca3af;
        }
        .empty-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        .empty-state p {
          margin-bottom: 1.25rem;
        }
        .reset-btn {
          padding: 0.5rem 1.25rem;
          background: #111827;
          color: #fff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.875rem;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .blog-layout.show-toc {
            grid-template-columns: 1fr;
          }
          .sidebar {
            display: none;
          }
          .hero-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </>
  );
}

/* ─────────────────────────────────────────────
   getStaticProps
───────────────────────────────────────────── */
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const allPostsData = getSortedPostsData("blog").map((post) => ({
    ...post,
    image: post.image || null, // Pastikan field image di-pass ke client
    category: "blog",
  }));

  return {
    props: {
      allPostsData,
      ...(await serverSideTranslations(locale ?? "id", ["common", "order"])),
    },
  };
};
