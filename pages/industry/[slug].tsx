// app/industry/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import industries from "../../industries.json";
import { GetStaticPaths, GetStaticProps } from "next";
/* ── Types ── */
/* ── Types ── */
interface Industry {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  accentColor: string;
  heroStat: { value: string; label: string };
  challenges: string[];
  solutions: { title: string; description: string }[];
  testimonial: { quote: string; author: string; company: string };
  featuredClients: string[];
}

/* ── getStaticPaths ── */
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = industries.map((ind) => ({
    params: { slug: ind.slug }, // Harus 'slug' karena nama filenya [slug].tsx
  }));
  return { paths, fallback: "blocking" };
};

/* ── getStaticProps ── */
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const industry = industries.find((i) => i.slug === slug);

  if (!industry) {
    return { notFound: true };
  }

  return {
    props: {
      industry,
      others: industries.filter((i) => i.slug !== slug).slice(0, 4),
    },
  };
};

/* ── Page ── */
export default function IndustryDetailPage({
  industry,
  others,
}: {
  industry: Industry;
  others: Industry[];
}) {
  if (!industry) notFound();

  // Other industries for the "Explore more" strip (exclude current)
  return (
    <main
      className="detail-page"
      style={{ "--accent": industry.accentColor } as React.CSSProperties}
    >
      {/* ── Breadcrumb ── */}
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/" className="bc-link">
          Home
        </Link>
        <span className="bc-sep">/</span>
        <Link href="/industry" className="bc-link">
          Industries
        </Link>
        <span className="bc-sep">/</span>
        <span className="bc-current">{industry.name}</span>
      </nav>

      {/* ── Hero ── */}
      <section className="detail-hero">
        <div className="hero-glow" />
        <div className="hero-content">
          <div className="hero-icon">{industry.icon}</div>
          <div className="hero-label">Industry Solution</div>
          <h1 className="hero-title">{industry.name}</h1>
          <p className="hero-tagline">{industry.tagline}</p>
          <p className="hero-desc">{industry.description}</p>
          <div className="hero-actions">
            <a href="/contact" className="btn-primary">
              Get started
            </a>
            <a href="/contact" className="btn-ghost">
              Request a demo
            </a>
          </div>
        </div>
        <div className="hero-stat-card">
          <div className="stat-value">{industry.heroStat.value}</div>
          <div className="stat-label">{industry.heroStat.label}</div>
          <div className="stat-source">Codeverta customer average</div>
        </div>
      </section>

      {/* ── Featured Clients Marquee ── */}
      <div className="clients-strip">
        <span className="clients-eyebrow">Trusted by companies in</span>
        <div className="clients-list">
          {[...industry.featuredClients, ...industry.featuredClients].map(
            (client, i) => (
              <span key={i} className="client-pill">
                {client}
              </span>
            )
          )}
        </div>
      </div>

      {/* ── Body grid ── */}
      <div className="body-grid">
        {/* ── Challenges ── */}
        <section className="section challenges-section">
          <div className="section-label">The Problem</div>
          <h2 className="section-title">
            Challenges {industry.name} teams face
          </h2>
          <ul className="challenges-list">
            {industry.challenges.map((c, i) => (
              <li key={i} className="challenge-item">
                <span className="challenge-dot" />
                {c}
              </li>
            ))}
          </ul>
        </section>

        {/* ── Solutions ── */}
        <section className="section solutions-section">
          <div className="section-label">What We Offer</div>
          <h2 className="section-title">How Codeverta solves it</h2>
          <div className="solutions-grid">
            {industry.solutions.map((sol, i) => (
              <div key={i} className="solution-card">
                <div className="sol-num">0{i + 1}</div>
                <h3 className="sol-title">{sol.title}</h3>
                <p className="sol-desc">{sol.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── Testimonial ── */}
      <section className="testimonial-section">
        <div className="quote-mark">"</div>
        <blockquote className="quote-text">
          {industry.testimonial.quote}
        </blockquote>
        <div className="quote-attribution">
          <div className="attribution-avatar">
            {industry.testimonial.author.charAt(0)}
          </div>
          <div>
            <div className="attribution-name">
              {industry.testimonial.author}
            </div>
            <div className="attribution-company">
              {industry.testimonial.company}
            </div>
          </div>
        </div>
      </section>

      {/* ── Explore more industries ── */}
      <section className="explore-section">
        <div className="section-label" style={{ textAlign: "center" }}>
          More Industries
        </div>
        <h2 className="section-title" style={{ textAlign: "center" }}>
          Explore our other solutions
        </h2>
        <div className="explore-grid">
          {others.map((ind) => (
            <Link
              key={ind.slug}
              href={`/industry/${ind.slug}`}
              className="explore-card"
              style={
                { "--card-accent": ind.accentColor } as React.CSSProperties
              }
            >
              <span className="explore-icon">{ind.icon}</span>
              <div>
                <div className="explore-name">{ind.name}</div>
                <div className="explore-tag">{ind.tagline}</div>
              </div>
              <span className="explore-arrow">→</span>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 32 }}>
          <Link href="/industry" className="btn-ghost">
            View all industries
          </Link>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bottom-cta">
        <h2 className="bottom-cta-title">
          Ready to transform your {industry.name.toLowerCase()} operations?
        </h2>
        <p className="bottom-cta-sub">
          Talk to a Codeverta specialist who understands your industry.
        </p>
        <a href="/contact" className="btn-primary btn-large">
          Book a free consultation
        </a>
      </section>

      <style>{`
        /* ── Base ── */
        .detail-page {
          font-family: 'DM Sans', 'Segoe UI', sans-serif;
          background: #0a0c10;
          color: #e8eaf0;
          min-height: 100vh;
        }

        /* ── Breadcrumb ── */
        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 20px 40px;
          font-size: 0.8rem;
          color: #4b5563;
          max-width: 1200px;
          margin: 0 auto;
        }
        .bc-link {
          color: #4b5563;
          text-decoration: none;
          transition: color 0.2s;
        }
        .bc-link:hover { color: var(--accent); }
        .bc-sep { color: #2d3341; }
        .bc-current { color: #9ca3af; }

        /* ── Hero ── */
        .detail-hero {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 40px 64px;
          display: grid;
          grid-template-columns: 1fr 260px;
          gap: 48px;
          align-items: start;
          overflow: hidden;
        }
        .hero-glow {
          position: absolute;
          top: -40px;
          left: -80px;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, var(--accent) 0%, transparent 70%);
          opacity: 0.07;
          pointer-events: none;
          border-radius: 50%;
        }
        .hero-content { position: relative; }
        .hero-icon {
          font-size: 3rem;
          line-height: 1;
          margin-bottom: 20px;
          display: block;
        }
        .hero-label {
          display: inline-block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 14px;
          border: 1px solid var(--accent);
          border-radius: 100px;
          padding: 4px 12px;
          opacity: 0.85;
        }
        .hero-title {
          font-size: clamp(2.2rem, 4vw, 3.2rem);
          font-weight: 750;
          letter-spacing: -0.03em;
          color: #f1f3f8;
          margin: 0 0 14px;
          line-height: 1.1;
        }
        .hero-tagline {
          font-size: 1.05rem;
          font-weight: 500;
          color: var(--accent);
          margin: 0 0 18px;
          opacity: 0.9;
        }
        .hero-desc {
          font-size: 0.95rem;
          line-height: 1.75;
          color: #6b7280;
          margin: 0 0 32px;
          max-width: 560px;
        }
        .hero-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        /* ── Stat card ── */
        .hero-stat-card {
          position: sticky;
          top: 24px;
          background: #111420;
          border: 1px solid #1b1f2e;
          border-top: 3px solid var(--accent);
          border-radius: 16px;
          padding: 32px 28px;
          text-align: center;
        }
        .stat-value {
          font-size: 3rem;
          font-weight: 800;
          color: var(--accent);
          letter-spacing: -0.04em;
          line-height: 1;
          margin-bottom: 10px;
        }
        .stat-label {
          font-size: 0.9rem;
          font-weight: 600;
          color: #d1d5db;
          line-height: 1.4;
          margin-bottom: 12px;
        }
        .stat-source {
          font-size: 0.72rem;
          color: #374151;
          font-style: italic;
        }

        /* ── Clients strip ── */
        .clients-strip {
          border-top: 1px solid #111420;
          border-bottom: 1px solid #111420;
          padding: 20px 40px;
          display: flex;
          align-items: center;
          gap: 24px;
          overflow: hidden;
          max-width: 100%;
        }
        .clients-eyebrow {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #374151;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .clients-list {
          display: flex;
          gap: 10px;
          overflow: hidden;
          mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
        }
        .client-pill {
          flex-shrink: 0;
          font-size: 0.75rem;
          font-weight: 600;
          color: #4b5563;
          background: #111420;
          border: 1px solid #1b1f2e;
          border-radius: 100px;
          padding: 5px 14px;
          white-space: nowrap;
        }

        /* ── Body grid ── */
        .body-grid {
          max-width: 1200px;
          margin: 0 auto;
          padding: 64px 40px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
        }

        /* ── Section common ── */
        .section-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 12px;
          opacity: 0.85;
        }
        .section-title {
          font-size: clamp(1.3rem, 2.5vw, 1.75rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #f1f3f8;
          margin: 0 0 32px;
          line-height: 1.25;
        }

        /* ── Challenges ── */
        .challenges-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .challenge-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 0.9rem;
          line-height: 1.6;
          color: #9ca3af;
        }
        .challenge-dot {
          flex-shrink: 0;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
          margin-top: 7px;
          opacity: 0.7;
        }

        /* ── Solutions ── */
        .solutions-grid {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .solution-card {
          background: #111420;
          border: 1px solid #1b1f2e;
          border-radius: 12px;
          padding: 20px;
          transition: border-color 0.2s;
        }
        .solution-card:hover {
          border-color: var(--accent);
        }
        .sol-num {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--accent);
          letter-spacing: 0.08em;
          margin-bottom: 8px;
          opacity: 0.7;
        }
        .sol-title {
          font-size: 0.95rem;
          font-weight: 650;
          color: #e5e7eb;
          margin: 0 0 8px;
        }
        .sol-desc {
          font-size: 0.83rem;
          line-height: 1.6;
          color: #6b7280;
          margin: 0;
        }

        /* ── Testimonial ── */
        .testimonial-section {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px 40px 72px;
          text-align: center;
        }
        .quote-mark {
          font-size: 6rem;
          line-height: 0.6;
          color: var(--accent);
          opacity: 0.25;
          font-family: Georgia, serif;
          margin-bottom: 12px;
        }
        .quote-text {
          font-size: clamp(1.1rem, 2vw, 1.35rem);
          line-height: 1.65;
          color: #d1d5db;
          font-style: italic;
          margin: 0 0 28px;
          font-weight: 400;
        }
        .quote-attribution {
          display: inline-flex;
          align-items: center;
          gap: 14px;
        }
        .attribution-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--accent);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.95rem;
          font-weight: 700;
          opacity: 0.85;
          flex-shrink: 0;
        }
        .attribution-name {
          font-size: 0.85rem;
          font-weight: 600;
          color: #e5e7eb;
          text-align: left;
        }
        .attribution-company {
          font-size: 0.75rem;
          color: #4b5563;
          text-align: left;
        }

        /* ── Explore more ── */
        .explore-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px 40px 72px;
        }
        .explore-section .section-title {
          margin-bottom: 28px;
        }
        .explore-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 12px;
        }
        .explore-card {
          display: flex;
          align-items: center;
          gap: 14px;
          background: #111420;
          border: 1px solid #1b1f2e;
          border-radius: 12px;
          padding: 16px 18px;
          text-decoration: none;
          color: inherit;
          transition: border-color 0.2s, transform 0.2s;
        }
        .explore-card:hover {
          border-color: var(--card-accent);
          transform: translateY(-2px);
        }
        .explore-icon { font-size: 1.4rem; flex-shrink: 0; }
        .explore-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: #e5e7eb;
          margin-bottom: 2px;
        }
        .explore-tag {
          font-size: 0.72rem;
          color: #4b5563;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .explore-arrow {
          margin-left: auto;
          color: #2d3341;
          font-size: 0.9rem;
          transition: color 0.2s, transform 0.2s;
        }
        .explore-card:hover .explore-arrow {
          color: var(--card-accent);
          transform: translateX(3px);
        }

        /* ── Bottom CTA ── */
        .bottom-cta {
          text-align: center;
          padding: 72px 40px 96px;
          background: linear-gradient(to bottom, transparent, #0d0f17);
        }
        .bottom-cta-title {
          font-size: clamp(1.5rem, 3vw, 2.2rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #f1f3f8;
          margin: 0 0 14px;
        }
        .bottom-cta-sub {
          font-size: 0.95rem;
          color: #6b7280;
          margin: 0 0 28px;
        }

        /* ── Buttons ── */
        .btn-primary {
          display: inline-block;
          background: var(--accent);
          color: #fff;
          font-size: 0.875rem;
          font-weight: 650;
          padding: 12px 24px;
          border-radius: 10px;
          text-decoration: none;
          transition: opacity 0.2s, transform 0.2s;
          letter-spacing: 0.01em;
        }
        .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
        .btn-large { padding: 16px 36px; font-size: 1rem; }
        .btn-ghost {
          display: inline-block;
          color: #9ca3af;
          font-size: 0.875rem;
          font-weight: 500;
          padding: 12px 22px;
          border-radius: 10px;
          text-decoration: none;
          border: 1px solid #1b1f2e;
          transition: border-color 0.2s, color 0.2s;
        }
        .btn-ghost:hover { border-color: #374151; color: #e5e7eb; }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .detail-hero {
            grid-template-columns: 1fr;
            padding: 24px 20px 40px;
          }
          .hero-stat-card { position: static; }
          .body-grid {
            grid-template-columns: 1fr;
            padding: 40px 20px;
            gap: 48px;
          }
          .breadcrumb { padding: 16px 20px; }
          .testimonial-section { padding: 20px 20px 48px; }
          .explore-section { padding: 20px 20px 48px; }
          .clients-strip { padding: 16px 20px; flex-direction: column; align-items: flex-start; gap: 12px; }
          .bottom-cta { padding: 48px 20px 72px; }
        }
      `}</style>
    </main>
  );
}
