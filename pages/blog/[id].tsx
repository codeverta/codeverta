import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { getPostData, getAllPostIds, getSortedPostsData } from "lib/posts";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
interface Heading {
  id: string;
  text: string;
  level: number;
}

interface RelatedPost {
  id: string;
  title: string;
  desc?: string;
  date: string;
  image?: string;
  tags?: string;
  readTime?: string;
}

interface PostData {
  id: string;
  lang: string;
  title: string;
  date: string;
  image?: string;
  desc: string;
  tags: string;
  contentHtml: string;
  headings: Heading[];
  relatedPosts: RelatedPost[];
  faq?: { question: string; answer: string }[];
  howTo?: { step: string; description: string }[];
}

interface OtherPost {
  id: string;
  title: string;
  date: string;
  desc: string;
  image?: string;
  tags: string;
}

interface Props {
  postData: PostData;
  otherPosts: OtherPost[];
}

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */
function formatDate(d: string) {
  return new Date(d).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function estimateReadTime(html: string) {
  const words = html
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return `${Math.max(2, Math.ceil(words / 200))} menit baca`;
}

function getTagList(tags: string): string[] {
  return tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

/* ─────────────────────────────────────────────
   Scroll Progress
───────────────────────────────────────────── */
function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const fn = () => {
      const el = document.documentElement;
      setPct(
        el.scrollHeight - el.clientHeight > 0
          ? (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100
          : 0
      );
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <div
      className="sp-track"
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="sp-bar" style={{ width: `${pct}%` }} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Back to Top
───────────────────────────────────────────── */
function BackToTop() {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const fn = () => setVis(window.scrollY > 500);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <button
      className={`btt${vis ? " btt-vis" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Kembali ke atas"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
}

/* ─────────────────────────────────────────────
   Table of Contents (floating sidebar)
───────────────────────────────────────────── */
function TableOfContents({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!headings.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting);
        if (vis.length) setActive(vis[0].target.id);
      },
      { rootMargin: "-15% 0px -70% 0px" }
    );
    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <div className="toc-float">
      <button className="toc-hdr" onClick={() => setOpen((v) => !v)}>
        <span>Daftar Isi</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform .2s",
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <nav>
          <ul className="toc-ul">
            {headings.map((h) => (
              <li key={h.id} style={{ paddingLeft: `${(h.level - 2) * 12}px` }}>
                <a
                  href={`#${h.id}`}
                  className={`toc-a${active === h.id ? " toc-a-active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById(h.id)
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Share Buttons
───────────────────────────────────────────── */
function ShareBar({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const enc = encodeURIComponent;

  return (
    <div className="share-bar">
      <span className="share-label">Bagikan:</span>
      <a
        className="share-btn share-wa"
        href={`https://wa.me/?text=${enc(title + " " + url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Bagikan ke WhatsApp"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>
      <a
        className="share-btn share-tw"
        href={`https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(
          url
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Bagikan ke X/Twitter"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>
      <a
        className="share-btn share-fb"
        href={`https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Bagikan ke Facebook"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </a>
      <button
        className="share-btn share-copy"
        onClick={copy}
        aria-label="Salin tautan"
      >
        {copied ? (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        )}
        <span>{copied ? "Tersalin!" : "Salin"}</span>
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Related / Other Posts Card
───────────────────────────────────────────── */
function PostMiniCard({ post }: { post: OtherPost }) {
  const tags = getTagList(post.tags);
  return (
    <Link href={`/news/${post.id}`} className="mini-card">
      <div className="mini-img-wrap">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            style={{ objectFit: "cover" }}
            sizes="200px"
          />
        ) : (
          <div className="mini-img-placeholder">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}
      </div>
      <div className="mini-body">
        <div className="mini-tags">
          {tags.slice(0, 2).map((t) => (
            <span key={t} className="mini-tag">
              {t}
            </span>
          ))}
        </div>
        <h3 className="mini-title">{post.title}</h3>
        <p className="mini-date">{formatDate(post.date)}</p>
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────────
   Sticky Reading Header (shows on scroll)
───────────────────────────────────────────── */
function StickyHeader({ title }: { title: string }) {
  const [vis, setVis] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const fn = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setVis(scrolled > 280);
      setPct(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className={`sticky-hdr${vis ? " sticky-hdr-vis" : ""}`}>
      <div className="sticky-hdr-inner">
        <Link href="/news" className="sticky-back">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Artikel
        </Link>
        <span className="sticky-title">{title}</span>
        <div className="sticky-pct">{Math.round(pct)}%</div>
      </div>
      <div className="sticky-prog">
        <div className="sticky-prog-bar" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Page
───────────────────────────────────────────── */
export default function BlogDetail({ postData, otherPosts }: Props) {
  const {
    title,
    date,
    image,
    desc,
    tags,
    contentHtml,
    headings,
    relatedPosts,
  } = postData;

  const tagList = getTagList(tags);
  const readTime = estimateReadTime(contentHtml);
  const [pageUrl, setPageUrl] = useState("");

  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  const related: OtherPost[] = [
    ...(relatedPosts || []).map((p) => ({
      ...p,
      tags: p.tags || "",
      desc: p.desc || "",
    })),
    ...otherPosts.filter((p) => p.id !== postData.id),
  ]
    .filter((v, i, a) => a.findIndex((x) => x.id === v.id) === i)
    .slice(0, 4);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        {image && <meta property="og:image" content={image} />}
        <meta property="og:type" content="article" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Top scroll progress bar */}
      {/* <ScrollProgress /> */}

      {/* Sticky reading header */}
      <StickyHeader title={title} />

      {/* ── Cover Image Hero ── */}
      <div className="cover-wrap">
        {image ? (
          <div className="cover-img-wrap">
            <Image
              src={image}
              alt={title}
              fill
              priority
              style={{ objectFit: "cover" }}
              sizes="100vw"
            />
            <div className="cover-overlay" />
          </div>
        ) : (
          <div className="cover-placeholder" />
        )}
        <div className="cover-meta">
          <Link href="/blog" className="cover-back">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Semua Artikel
          </Link>
          <div className="cover-tags">
            {tagList.map((t) => (
              <span key={t} className="cover-tag">
                {t}
              </span>
            ))}
          </div>
          <h1 className="cover-title">{title}</h1>
          <div className="cover-info">
            <span>{formatDate(date)}</span>
            <span className="cover-dot">·</span>
            <span>{readTime}</span>
          </div>
        </div>
      </div>

      {/* ── Body Layout ── */}
      <div className="detail-layout">
        {/* ── Article Content ── */}
        <article className="article-col">
          {/* Lead / desc */}
          <p className="article-lead">{desc}</p>

          {/* TOC (inline, mobile) */}
          {headings.length >= 3 && (
            <div className="toc-inline">
              <TableOfContents headings={headings} />
            </div>
          )}

          {/* Content */}
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {/* Tags */}
          <div className="article-tags">
            {tagList.map((t) => (
              <Link
                key={t}
                href={`/news?tag=${encodeURIComponent(t)}`}
                className="a-tag"
              >
                #{t}
              </Link>
            ))}
          </div>

          {/* Share */}
          <ShareBar title={title} url={pageUrl} />

          {/* Divider */}
          <hr className="section-hr" />

          {/* Other Articles */}
          {related.length > 0 && (
            <section className="other-articles">
              <h2 className="other-title">Artikel Lainnya</h2>
              <div className="other-grid">
                {related.map((p) => (
                  <PostMiniCard key={p.id} post={p} />
                ))}
              </div>
            </section>
          )}
        </article>

        {/* ── Right Sidebar ── */}
        <aside className="sidebar-col">
          {/* TOC desktop */}
          {headings.length >= 3 && (
            <div className="toc-desktop">
              <TableOfContents headings={headings} />
            </div>
          )}

          {/* Article info card */}
          <div className="info-card">
            <div className="info-row">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>{formatDate(date)}</span>
            </div>
            <div className="info-row">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>{readTime}</span>
            </div>
            <div className="info-row">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                <line x1="7" y1="7" x2="7.01" y2="7" />
              </svg>
              <span>{tagList.slice(0, 2).join(", ")}</span>
            </div>
          </div>

          {/* CTA */}
          <div className="cta-card">
            <div className="cta-icon">🚀</div>
            <h3 className="cta-title">Siap Meningkatkan Bisnis?</h3>
            <p className="cta-desc">
              Konsultasi gratis dengan tim kami dan temukan solusi terbaik untuk
              bisnis Anda.
            </p>
            <Link href="/contact" className="cta-btn">
              Hubungi Kami →
            </Link>
          </div>
        </aside>
      </div>

      <BackToTop />

      <style jsx global>{`
        /* ── Fonts scoped ── */
        .cover-wrap,
        .detail-layout,
        .sticky-hdr {
          font-family: "DM Sans", sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        .prose,
        .article-lead,
        .cover-title {
          font-family: "Lora", Georgia, serif;
        }

        /* ── Scroll Progress ── */
        .sp-track {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: #e5e7eb;
          z-index: 9999;
        }
        .sp-bar {
          height: 100%;
          background: #1a1a1a;
          transition: width 0.12s linear;
        }

        /* ── Back to Top ── */
        .btt {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: #1a1a1a;
          color: #fff;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          pointer-events: none;
          transform: translateY(10px);
          transition: opacity 0.25s, transform 0.25s;
          z-index: 200;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
        .btt.btt-vis {
          opacity: 1;
          pointer-events: auto;
          transform: none;
        }

        /* ── Sticky Header ── */
        .sticky-hdr {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 500;
          background: #fff;
          border-bottom: 1px solid #e5e7eb;
          transform: translateY(-100%);
          transition: transform 0.25s;
        }
        .sticky-hdr.sticky-hdr-vis {
          transform: none;
        }
        .sticky-hdr-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 2rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .sticky-back {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.8rem;
          color: #6b7280;
          text-decoration: none;
          white-space: nowrap;
        }
        .sticky-back:hover {
          color: #111;
        }
        .sticky-title {
          flex: 1;
          font-size: 0.85rem;
          font-weight: 500;
          color: #111;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .sticky-pct {
          font-size: 0.75rem;
          color: #9ca3af;
          font-variant-numeric: tabular-nums;
          white-space: nowrap;
        }
        .sticky-prog {
          height: 2px;
          background: #f3f4f6;
        }
        .sticky-prog-bar {
          height: 100%;
          background: #1a1a1a;
          transition: width 0.12s linear;
        }

        /* ── Cover ── */
        .cover-wrap {
          position: relative;
          height: clamp(340px, 55vh, 620px);
          overflow: hidden;
          background: #1a1a1a;
        }
        .cover-img-wrap {
          position: absolute;
          inset: 0;
        }
        .cover-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.15) 0%,
            rgba(0, 0, 0, 0.7) 100%
          );
        }
        .cover-placeholder {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
        }
        .cover-meta {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 2rem 5vw 2.5rem;
          max-width: 860px;
        }
        .cover-back {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.78rem;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          margin-bottom: 1rem;
          transition: color 0.15s;
        }
        .cover-back:hover {
          color: #fff;
        }
        .cover-tags {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
          margin-bottom: 0.75rem;
        }
        .cover-tag {
          font-size: 0.7rem;
          padding: 0.2rem 0.6rem;
          background: rgba(255, 255, 255, 0.15);
          color: rgba(255, 255, 255, 0.9);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(4px);
          font-family: "DM Sans", sans-serif;
        }
        .cover-title {
          font-size: clamp(1.4rem, 3vw, 2.6rem);
          font-weight: 600;
          color: #fff;
          line-height: 1.25;
          margin-bottom: 0.75rem;
          letter-spacing: -0.01em;
        }
        .cover-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.6);
          font-family: "DM Sans", sans-serif;
        }
        .cover-dot {
          opacity: 0.4;
        }

        /* ── Layout ── */
        .detail-layout {
          max-width: 1100px;
          margin: 0 auto;
          padding: 2.5rem 1.5rem 4rem;
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 3rem;
          align-items: start;
        }

        /* ── Article ── */
        .article-col {
          min-width: 0;
        }
        .article-lead {
          font-size: 1.15rem;
          color: #4b5563;
          line-height: 1.8;
          margin-bottom: 2rem;
          font-style: italic;
          border-left: 3px solid #e5e7eb;
          padding-left: 1.25rem;
        }

        /* ── TOC inline (mobile only) ── */
        .toc-inline {
          display: none;
          margin-bottom: 2rem;
        }

        /* ── TOC float ── */
        .toc-float {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          overflow: hidden;
          font-family: "DM Sans", sans-serif;
        }
        .toc-hdr {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 0.8rem;
          font-weight: 600;
          color: #374151;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .toc-ul {
          list-style: none;
          padding: 0.25rem 0 0.75rem;
          max-height: 360px;
          overflow-y: auto;
        }
        .toc-a {
          display: block;
          padding: 0.3rem 1rem;
          font-size: 0.8rem;
          color: #6b7280;
          text-decoration: none;
          line-height: 1.45;
          border-left: 2px solid transparent;
          transition: color 0.12s, border-color 0.12s, background 0.12s;
        }
        .toc-a:hover {
          color: #111;
          background: #f3f4f6;
        }
        .toc-a.toc-a-active {
          color: #111;
          font-weight: 500;
          border-left-color: #1a1a1a;
          background: #f3f4f6;
        }

        /* ── Prose ── */
        .prose {
          color: #1f2937;
          line-height: 1.85;
          font-size: 1.05rem;
        }
        .prose h2 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #111;
          margin: 2.5rem 0 1rem;
          line-height: 1.3;
          border-bottom: 1px solid #f3f4f6;
          padding-bottom: 0.5rem;
        }
        .prose h3 {
          font-size: 1.2rem;
          font-weight: 600;
          color: #1f2937;
          margin: 2rem 0 0.75rem;
        }
        .prose h4 {
          font-size: 1rem;
          font-weight: 600;
          color: #374151;
          margin: 1.5rem 0 0.5rem;
        }
        .prose p {
          margin-bottom: 1.4rem;
        }
        .prose ul,
        .prose ol {
          margin: 0 0 1.4rem 1.5rem;
        }
        .prose li {
          margin-bottom: 0.4rem;
        }
        .prose a {
          color: #1d4ed8;
          text-decoration: underline;
        }
        .prose a:hover {
          color: #1e40af;
        }
        .prose blockquote {
          border-left: 3px solid #d1d5db;
          padding-left: 1.25rem;
          margin: 1.5rem 0;
          color: #6b7280;
          font-style: italic;
        }
        .prose code {
          background: #f3f4f6;
          padding: 0.15rem 0.4rem;
          border-radius: 4px;
          font-size: 0.875em;
          font-family: "Courier New", monospace;
        }
        .prose pre {
          background: #1a1a1a;
          color: #e5e7eb;
          padding: 1.25rem;
          border-radius: 8px;
          overflow-x: auto;
          margin-bottom: 1.5rem;
        }
        .prose pre code {
          background: none;
          color: inherit;
          padding: 0;
        }
        .prose img {
          width: 100%;
          border-radius: 8px;
          margin: 1.5rem 0;
        }
        .prose table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
          font-size: 0.9rem;
          font-family: "DM Sans", sans-serif;
        }
        .prose th {
          background: #f9fafb;
          padding: 0.6rem 0.8rem;
          text-align: left;
          font-weight: 600;
          color: #374151;
          border-bottom: 2px solid #e5e7eb;
          font-size: 0.82rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .prose td {
          padding: 0.6rem 0.8rem;
          border-bottom: 1px solid #f3f4f6;
          color: #4b5563;
        }
        .prose tr:hover td {
          background: #f9fafb;
        }

        /* ── Article Tags ── */
        .article-tags {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin: 2rem 0 1.5rem;
        }
        .a-tag {
          font-size: 0.78rem;
          padding: 0.3rem 0.75rem;
          border: 1px solid #e5e7eb;
          border-radius: 20px;
          color: #6b7280;
          text-decoration: none;
          font-family: "DM Sans", sans-serif;
          transition: all 0.15s;
        }
        .a-tag:hover {
          border-color: #1a1a1a;
          color: #1a1a1a;
        }

        /* ── Share ── */
        .share-bar {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          padding: 1.25rem 0;
          border-top: 1px solid #f3f4f6;
          font-family: "DM Sans", sans-serif;
        }
        .share-label {
          font-size: 0.8rem;
          color: #9ca3af;
          margin-right: 0.25rem;
        }
        .share-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.45rem 0.75rem;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          cursor: pointer;
          font-size: 0.8rem;
          text-decoration: none;
          color: #fff;
          transition: opacity 0.15s, transform 0.12s;
        }
        .share-btn:hover {
          opacity: 0.85;
          transform: translateY(-1px);
        }
        .share-wa {
          background: #25d366;
          border-color: #25d366;
        }
        .share-tw {
          background: #000;
          border-color: #000;
        }
        .share-fb {
          background: #1877f2;
          border-color: #1877f2;
        }
        .share-copy {
          background: #fff;
          color: #374151;
          border-color: #e5e7eb;
        }
        .share-copy:hover {
          background: #f9fafb;
        }

        /* ── Divider ── */
        .section-hr {
          border: none;
          border-top: 1px solid #f3f4f6;
          margin: 2rem 0;
        }

        /* ── Other Articles ── */
        .other-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #111;
          margin-bottom: 1.25rem;
          font-family: "DM Sans", sans-serif;
        }
        .other-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 1rem;
        }
        .mini-card {
          display: flex;
          flex-direction: column;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          transition: box-shadow 0.15s, transform 0.15s;
        }
        .mini-card:hover {
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transform: translateY(-2px);
        }
        .mini-img-wrap {
          position: relative;
          height: 130px;
          background: #f3f4f6;
          flex-shrink: 0;
        }
        .mini-img-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #d1d5db;
        }
        .mini-body {
          padding: 0.875rem;
          flex: 1;
        }
        .mini-tags {
          display: flex;
          gap: 0.3rem;
          flex-wrap: wrap;
          margin-bottom: 0.5rem;
        }
        .mini-tag {
          font-size: 0.65rem;
          padding: 0.15rem 0.45rem;
          background: #f3f4f6;
          color: #6b7280;
          border-radius: 4px;
          font-family: "DM Sans", sans-serif;
        }
        .mini-title {
          font-size: 0.85rem;
          font-weight: 600;
          color: #111;
          line-height: 1.4;
          margin-bottom: 0.4rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          font-family: "DM Sans", sans-serif;
        }
        .mini-date {
          font-size: 0.72rem;
          color: #9ca3af;
          font-family: "DM Sans", sans-serif;
        }

        /* ── Sidebar ── */
        .sidebar-col {
          position: sticky;
          top: 56px;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .toc-desktop {
          display: block;
        }

        /* ── Info Card ── */
        .info-card {
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 1rem 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          font-family: "DM Sans", sans-serif;
        }
        .info-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.82rem;
          color: #4b5563;
        }
        .info-row svg {
          flex-shrink: 0;
          color: #9ca3af;
        }

        /* ── CTA Card ── */
        .cta-card {
          border-radius: 12px;
          padding: 1.5rem;
          background: #0f172a;
          color: #fff;
          font-family: "DM Sans", sans-serif;
        }
        .cta-icon {
          font-size: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .cta-title {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        .cta-desc {
          font-size: 0.82rem;
          color: #94a3b8;
          line-height: 1.6;
          margin-bottom: 1rem;
        }
        .cta-btn {
          display: inline-block;
          padding: 0.6rem 1.25rem;
          background: #fff;
          color: #0f172a;
          border-radius: 8px;
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 600;
          transition: background 0.15s;
        }
        .cta-btn:hover {
          background: #f1f5f9;
        }

        /* ── Responsive ── */
        @media (max-width: 860px) {
          .detail-layout {
            grid-template-columns: 1fr;
          }
          .sidebar-col {
            position: static;
          }
          .toc-desktop {
            display: none;
          }
          .toc-inline {
            display: block;
          }
        }
        @media (max-width: 600px) {
          .cover-meta {
            padding: 1.25rem 1.25rem 2rem;
          }
          .cover-title {
            font-size: 1.4rem;
          }
          .other-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}

/* ─────────────────────────────────────────────
   getStaticPaths
───────────────────────────────────────────── */
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds("news").map(({ params }) => ({
    params: { id: params.id },
  }));
  return { paths, fallback: "blocking" };
};

/* ─────────────────────────────────────────────
   getStaticProps
───────────────────────────────────────────── */
export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const id = params?.id as string;

  try {
    const postData = await getPostData(id, "news");
    const otherPosts = getSortedPostsData("news")
      .filter((p) => p.id !== id)
      .slice(0, 4)
      .map((p) => ({
        id: p.id,
        title: p.title,
        date: p.date,
        desc: p.desc || "",
        image: p.image || null,
        tags: p.tags || "",
      }));

    return {
      props: {
        postData,
        otherPosts,
        ...(await serverSideTranslations(locale ?? "id", ["common", "order"])),
      },
    };
  } catch {
    return { notFound: true };
  }
};
