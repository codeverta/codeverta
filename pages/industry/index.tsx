// app/industry/page.tsx
import Link from "next/link";
import industries from "../../industries.json";

export const metadata = {
  title: "Solutions for Every Industry | Codeverta",
  description:
    "From manufacturing plants to healthcare systems, Codeverta adapts to meet the unique demands of your industry.",
};

export default function IndustryPage() {
  return (
    <main className="industry-page">
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-label">Industry Solutions</div>
        <h1 className="hero-title">
          Solutions for <span className="hero-highlight">Every Industry</span>
        </h1>
        <p className="hero-sub">
          From manufacturing plants to healthcare systems, Codeverta adapts to
          meet the unique demands of your industry. Simplify operations,
          optimize resources, and grow faster.
        </p>
        <div className="hero-count">
          <span className="hero-count-number">{industries.length}</span>
          <span className="hero-count-label">Industries Served</span>
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="grid-section">
        <div className="industry-grid">
          {industries.map((industry, i) => (
            <Link
              key={industry.slug}
              href={`/industry/${industry.slug}`}
              className="industry-card"
              style={
                {
                  "--accent": industry.accentColor,
                  animationDelay: `${i * 60}ms`,
                } as React.CSSProperties
              }
            >
              {/* Accent bar */}
              <div className="card-accent-bar" />

              <div className="card-inner">
                <div className="card-icon">{industry.icon}</div>
                <div className="card-body">
                  <h2 className="card-name">{industry.name}</h2>
                  <p className="card-tagline">{industry.tagline}</p>
                </div>
                <div className="card-arrow">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 10H16M16 10L10 4M16 10L10 16"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Stat pill */}
              <div className="card-stat">
                <span className="stat-value">{industry.heroStat.value}</span>
                <span className="stat-label">{industry.heroStat.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <p className="cta-eyebrow">Don't see your industry?</p>
        <h2 className="cta-title">Let's build your custom solution</h2>
        <p className="cta-body">
          Codeverta is highly configurable. Our team will work with you to
          tailor every module to your specific workflows and compliance
          requirements.
        </p>
        <a href="/contact" className="cta-btn">
          Talk to our team
        </a>
      </section>

      <style>{`
        /* ── Reset & base ── */
        .industry-page {
          font-family: 'DM Sans', 'Segoe UI', sans-serif;
          background: #0a0c10;
          color: #e8eaf0;
          min-height: 100vh;
        }

        /* ── Hero ── */
        .hero {
          max-width: 780px;
          margin: 0 auto;
          padding: 96px 24px 72px;
          text-align: center;
        }
        .hero-label {
          display: inline-block;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #6b7280;
          border: 1px solid #1f2535;
          border-radius: 100px;
          padding: 5px 14px;
          margin-bottom: 24px;
        }
        .hero-title {
          font-size: clamp(2.2rem, 5vw, 3.6rem);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin: 0 0 20px;
          color: #f1f3f8;
        }
        .hero-highlight {
          background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-sub {
          font-size: 1.05rem;
          line-height: 1.7;
          color: #9ca3af;
          margin: 0 0 36px;
        }
        .hero-count {
          display: inline-flex;
          align-items: baseline;
          gap: 10px;
          background: #111420;
          border: 1px solid #1f2535;
          border-radius: 12px;
          padding: 12px 24px;
        }
        .hero-count-number {
          font-size: 2rem;
          font-weight: 700;
          color: #f1f3f8;
          letter-spacing: -0.03em;
        }
        .hero-count-label {
          font-size: 0.85rem;
          color: #6b7280;
          font-weight: 500;
        }

        /* ── Grid ── */
        .grid-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px 80px;
        }
        .industry-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 16px;
        }
        .industry-card {
          position: relative;
          display: flex;
          flex-direction: column;
          background: #111420;
          border: 1px solid #1b1f2e;
          border-radius: 16px;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          transition: border-color 0.25s, transform 0.2s, box-shadow 0.25s;
          animation: fadeUp 0.5s ease both;
        }
        .industry-card:hover {
          border-color: var(--accent);
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px var(--accent) inset;
        }
        .industry-card:hover .card-accent-bar {
          opacity: 1;
        }
        .industry-card:hover .card-arrow {
          color: var(--accent);
          transform: translate(3px, -3px);
        }

        .card-accent-bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--accent);
          opacity: 0;
          transition: opacity 0.25s;
        }

        .card-inner {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 24px 24px 16px;
        }
        .card-icon {
          font-size: 1.8rem;
          line-height: 1;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .card-body {
          flex: 1;
        }
        .card-name {
          font-size: 1rem;
          font-weight: 650;
          color: #f1f3f8;
          margin: 0 0 6px;
          letter-spacing: -0.01em;
        }
        .card-tagline {
          font-size: 0.82rem;
          line-height: 1.55;
          color: #6b7280;
          margin: 0;
        }
        .card-arrow {
          flex-shrink: 0;
          color: #374151;
          transition: color 0.25s, transform 0.25s;
          margin-top: 2px;
        }

        .card-stat {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 24px;
          border-top: 1px solid #1b1f2e;
          margin-top: auto;
        }
        .stat-value {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--accent);
          letter-spacing: -0.02em;
        }
        .stat-label {
          font-size: 0.75rem;
          color: #4b5563;
          line-height: 1.3;
        }

        /* ── CTA ── */
        .cta-section {
          max-width: 640px;
          margin: 0 auto;
          padding: 40px 24px 100px;
          text-align: center;
        }
        .cta-eyebrow {
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #4b5563;
          margin: 0 0 14px;
        }
        .cta-title {
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #f1f3f8;
          margin: 0 0 16px;
        }
        .cta-body {
          font-size: 0.95rem;
          line-height: 1.7;
          color: #6b7280;
          margin: 0 0 28px;
        }
        .cta-btn {
          display: inline-block;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          color: #fff;
          font-size: 0.9rem;
          font-weight: 600;
          padding: 14px 32px;
          border-radius: 10px;
          text-decoration: none;
          transition: opacity 0.2s, transform 0.2s;
          letter-spacing: 0.01em;
        }
        .cta-btn:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 600px) {
          .industry-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
