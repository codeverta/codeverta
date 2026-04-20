"use client";
import InstagramEmbed from "@/components/InstagramEmbed";
import { WhatsappWrapper } from "@/components/WhatsappButton";
import { getSortedPostsData } from "@/lib/posts";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState, useEffect, useRef } from "react";

const WA_NUMBER = "6288101169261";
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=Halo%20Codeverta%2C%20saya%20tertarik%20dengan%20sistem%20ticketing%20Trail%20Running!`;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

const features = [
  {
    icon: "⚡",
    title: "50.000+ Request/Detik",
    desc: "Tidak ada server crash. Tidak ada overbook. Sistem kami menangani lonjakan trafik saat war tiket dengan arsitektur Go yang dioptimasi.",
  },
  {
    icon: "🛡️",
    title: "Anti-Bot & Fraud",
    desc: "Pendaftar asli. Slot aman. Bot dieliminasi sebelum sempat masuk antrian.",
  },
  {
    icon: "⏳",
    title: "Virtual Waiting Room",
    desc: "Antrean virtual yang adil — peserta masuk berurutan, server tetap stabil meski ribuan orang masuk bersamaan.",
  },
  {
    icon: "🏅",
    title: "Validasi ITRA/UTMB",
    desc: "Verifikasi otomatis poin kualifikasi peserta langsung dari API resmi.",
  },
  {
    icon: "💳",
    title: "Multi Payment Gateway",
    desc: "Xendit, Midtrans, TIAS — semua terintegrasi dengan rekonsiliasi otomatis.",
  },
  {
    icon: "🔒",
    title: "Zero Overbook",
    desc: "Distributed locking memastikan satu slot hanya untuk satu peserta. Selamanya.",
  },
];

const metrics = [
  { value: "10K+", label: "Concurrent Users" },
  { value: "<150ms", label: "Response Time (P99)" },
  { value: "100%", label: "Inventory Accuracy" },
  { value: "0", label: "Overbooking" },
];

const steps = [
  {
    num: "01",
    title: "Masuk Antrian Virtual",
    desc: "Peserta ditempatkan di waiting room saat trafik padat.",
  },
  {
    num: "02",
    title: "Validasi Kualifikasi",
    desc: "ITRA index & data pelari diverifikasi otomatis.",
  },
  {
    num: "03",
    title: "Slot Terkunci 15 Menit",
    desc: "Distributed lock memblokir slot agar tidak bisa diambil orang lain.",
  },
  {
    num: "04",
    title: "Pembayaran Aman",
    desc: "Transaksi terenkripsi real-time via gateway pilihan.",
  },
  {
    num: "05",
    title: "QR Tiket & Konfirmasi",
    desc: "QR dikirim ke email & tersedia di dashboard peserta.",
  },
];

export default function TrailLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((s) => (s + 1) % steps.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.root}>
      <style>{globalCSS}</style>

      {/* HERO */}
      <section style={styles.hero} ref={heroRef}>
        <div style={styles.heroBg}>
          <div style={styles.heroDiag1} />
          <div style={styles.heroDiag2} />
          <div style={styles.heroGrid} />
        </div>
        <div style={styles.heroContent}>
          <div style={styles.heroBadge}>
            <span style={styles.badgeDot} />
            Production Ready · v2.1.0 · Partner: malabartrailrun.id dan
            mangalyangacademia.id
          </div>
          <h1 style={styles.heroTitle}>
            Sistem Ticketing
            <br />
            <span style={styles.heroHighlight}>Trail Running</span>
            <br />
            yang Tidak Bisa
            <br />
            <span style={styles.heroStroke}>Dikalahkan</span>
          </h1>
          <p style={styles.heroSub}>
            Ribuan pendaftar. Satu detik pembukaan. Nol server crash.
            <br />
            Kami bangun infrastruktur registrasi yang mampu bertahan di tengah{" "}
            <strong style={{ color: "#f97316" }}>
              war tiket terparah sekalipun.
            </strong>
          </p>
          <div style={styles.heroActions}>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.btnPrimary}
              className="btn-pulse"
            >
              💬 Hubungi via WhatsApp
            </a>
            <a href="#demo" style={styles.btnGhost}>
              Lihat Demo ↓
            </a>
          </div>
          <div style={styles.heroMetrics}>
            {metrics.map((m) => (
              <div key={m.label} style={styles.metricItem}>
                <span style={styles.metricValue}>{m.value}</span>
                <span style={styles.metricLabel}>{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM BANNER */}
      <section style={styles.problemBanner}>
        <div style={styles.problemInner}>
          <span style={styles.problemIcon}>⚠️</span>
          <p style={styles.problemText}>
            <strong>
              Event trail running populer biasanya kehilangan ratusan juta
              rupiah
            </strong>{" "}
            akibat server crash, slot ganda, dan fraud saat pembukaan
            registrasi. Kami hadir untuk menghentikan itu.
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionTag}>KENAPA CODEVERTA</span>
            <h2 style={styles.sectionTitle}>Dibangun untuk Tekanan Ekstrem</h2>
          </div>
          <div style={styles.featuresGrid}>
            {features.map((f, i) => (
              <div key={i} style={styles.featureCard} className="feature-card">
                <span style={styles.featureIcon}>{f.icon}</span>
                <h3 style={styles.featureTitle}>{f.title}</h3>
                <p style={styles.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section style={{ ...styles.section, background: "#0a0a0a" }}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionTag}>ALUR SISTEM</span>
            <h2 style={styles.sectionTitle}>
              Dari Klik ke Tiket, Dalam Hitungan Detik
            </h2>
          </div>
          <div style={styles.workflow}>
            <div style={styles.workflowSteps}>
              {steps.map((s, i) => (
                <div
                  key={i}
                  style={{
                    ...styles.workflowStep,
                    ...(activeStep === i ? styles.workflowStepActive : {}),
                  }}
                  onClick={() => setActiveStep(i)}
                >
                  <span
                    style={{
                      ...styles.stepNum,
                      ...(activeStep === i ? styles.stepNumActive : {}),
                    }}
                  >
                    {s.num}
                  </span>
                  <div>
                    <div style={styles.stepTitle}>{s.title}</div>
                    <div
                      style={{
                        ...styles.stepDesc,
                        ...(activeStep === i
                          ? { opacity: 1, maxHeight: "60px" }
                          : {}),
                      }}
                    >
                      {s.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={styles.workflowVisual}>
              <div style={styles.workflowCard}>
                <div style={styles.wcNum}>{steps[activeStep].num}</div>
                <div style={styles.wcTitle}>{steps[activeStep].title}</div>
                <div style={styles.wcDesc}>{steps[activeStep].desc}</div>
                <div style={styles.wcBar}>
                  <div
                    style={{
                      ...styles.wcBarFill,
                      width: `${((activeStep + 1) / steps.length) * 100}%`,
                    }}
                  />
                </div>
                <div style={styles.wcStep}>
                  Step {activeStep + 1} / {steps.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO / INSTAGRAM */}
      <section id="demo" style={styles.section}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionTag}>LIVE DEMO</span>
            <h2 style={styles.sectionTitle}>Lihat Sistem Bekerja Nyata</h2>
            <p style={styles.sectionSub}>
              Tonton demonstrasi real sistem registrasi event trail running kami
              di lapangan.
            </p>
          </div>
          <div style={styles.videoWrapper}>
            <div style={styles.videoContainer}>
              <InstagramEmbed />
            </div>
          </div>
        </div>
      </section>

      {/* TECH STACK — minimal mention */}
      <section style={{ ...styles.section, background: "#0a0a0a" }}>
        <div style={styles.container}>
          <div style={styles.techRow}>
            <div style={styles.techLeft}>
              <span style={styles.sectionTag}>TEKNOLOGI</span>
              <h2
                style={{
                  ...styles.sectionTitle,
                  textAlign: "left",
                  marginBottom: "16px",
                }}
              >
                Stack Kelas Enterprise
              </h2>
              <p style={styles.techDesc}>
                Sistem ini menggunakan teknologi yang sama dengan platform
                ticketing skala global — bukan framework generik. Setiap
                komponen dipilih untuk satu tujuan:{" "}
                <strong style={{ color: "#f97316" }}>
                  tidak pernah down saat war tiket.
                </strong>
              </p>
              <div style={styles.techTags}>
                {[
                  "Go",
                  "Next.js",
                  "Redis",
                  "PostgreSQL",
                  "Kafka",
                  "Kubernetes",
                  "Cloudflare",
                ].map((t) => (
                  <span key={t} style={styles.techTag}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div style={styles.techRight}>
              <div style={styles.slaCard}>
                <div style={styles.slaTitle}>SLA Kami</div>
                {[
                  ["Uptime Guarantee", "99.9%"],
                  ["Max Concurrent Users", "10.000+"],
                  ["Response Time", "< 150ms"],
                  ["Overbooking", "0 kasus"],
                ].map(([label, val]) => (
                  <div key={label} style={styles.slaRow}>
                    <span style={styles.slaLabel}>{label}</span>
                    <span style={styles.slaVal}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL / CLIENT */}
      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.quoteWrapper}>
            <div style={styles.quoteMark}>"</div>
            <p style={styles.quoteText}>
              Ribuan pelari mendaftar di detik yang sama — sistem berjalan mulus
              tanpa satu pun overbook. Ini yang kami butuhkan untuk event skala
              internasional.
            </p>
            <div style={styles.quoteAuthor}>
              <span style={styles.quoteAuthorName}>
                Malabar & Manglayang Academia Team
              </span>
              <span style={styles.quoteAuthorRole}>
                Partner · Trail Running Event Organizer
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaBg} />
        <div style={styles.ctaContent}>
          <span style={styles.sectionTag}>MULAI SEKARANG</span>
          <h2 style={styles.ctaTitle}>
            Event Anda Layak Mendapat
            <br />
            Infrastruktur Terbaik
          </h2>
          <p style={styles.ctaSub}>
            Konsultasikan kebutuhan event trail running Anda. Gratis. Tanpa
            komitmen.
            <br />
            Tim kami siap membantu dari arsitektur hingga go-live.
          </p>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.ctaBtn}
            className="btn-pulse"
          >
            💬 Chat WhatsApp Sekarang
          </a>
          <div style={styles.ctaNote}>
            Respon dalam &lt; 1 jam · Senin–Sabtu 08.00–21.00 WIB
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <span style={styles.logo}>
            <span style={styles.logoAccent}>CODE</span>VERTA
          </span>
          <span style={styles.footerSub}>
            © 2026 Codeverta. High-Performance Software for Demanding Events.
          </span>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.footerWa}
          >
            +62 881-0116-92615
          </a>
        </div>
      </footer>
    </div>
  );
}

const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;900&family=DM+Sans:wght@300;400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #111; }
  html { scroll-behavior: smooth; }

  .btn-pulse {
    animation: pulse 2.4s ease-in-out infinite;
  }
  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(249,115,22,0.5); }
    50% { box-shadow: 0 0 0 14px rgba(249,115,22,0); }
  }

  .feature-card:hover {
    transform: translateY(-4px) !important;
    border-color: #f97316 !important;
    background: #1a1a1a !important;
  }
  .feature-card { transition: all 0.25s ease; }

  @media (max-width: 768px) {
    h1 { font-size: 2.6rem !important; }
    .hero-metrics { flex-wrap: wrap; gap: 16px !important; }
  }
`;

const styles = {
  root: {
    fontFamily: "'DM Sans', sans-serif",
    background: "#111111",
    color: "#e8e8e8",
    minHeight: "100vh",
    overflowX: "hidden",
  },
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 40px",
    transition: "all 0.3s",
  },
  navScrolled: {
    background: "rgba(10,10,10,0.95)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid #222",
    padding: "14px 40px",
  },
  logo: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 900,
    fontSize: "1.5rem",
    letterSpacing: "0.08em",
    color: "#fff",
  },
  logoAccent: { color: "#f97316" },
  navCta: {
    background: "#f97316",
    color: "#000",
    fontWeight: 600,
    padding: "9px 22px",
    borderRadius: "6px",
    textDecoration: "none",
    fontSize: "0.88rem",
    letterSpacing: "0.02em",
    transition: "background 0.2s",
  },

  // HERO
  hero: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    padding: "120px 40px 80px",
  },
  heroBg: {
    position: "absolute",
    inset: 0,
    overflow: "hidden",
    background: "#0d0d0d",
  },
  heroDiag1: {
    position: "absolute",
    top: "-20%",
    right: "-10%",
    width: "70vw",
    height: "140vh",
    background: "linear-gradient(135deg, #f97316 0%, transparent 55%)",
    opacity: 0.07,
    transform: "rotate(-15deg)",
  },
  heroDiag2: {
    position: "absolute",
    bottom: "-30%",
    left: "-5%",
    width: "50vw",
    height: "80vh",
    background: "linear-gradient(45deg, #ea580c 0%, transparent 60%)",
    opacity: 0.05,
  },
  heroGrid: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
    backgroundSize: "60px 60px",
  },
  heroContent: {
    position: "relative",
    maxWidth: "900px",
    margin: "0 auto",
    width: "100%",
  },
  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    background: "rgba(249,115,22,0.12)",
    border: "1px solid rgba(249,115,22,0.3)",
    color: "#f97316",
    borderRadius: "100px",
    padding: "6px 16px",
    fontSize: "0.78rem",
    fontWeight: 500,
    letterSpacing: "0.04em",
    marginBottom: "28px",
  },
  badgeDot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "#f97316",
    boxShadow: "0 0 8px #f97316",
    animation: "pulse 1.5s infinite",
  },
  heroTitle: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 900,
    fontSize: "5rem",
    lineHeight: 1,
    letterSpacing: "-0.01em",
    color: "#fff",
    marginBottom: "28px",
    textTransform: "uppercase",
  },
  heroHighlight: {
    color: "#f97316",
    WebkitTextStroke: "0px",
  },
  heroStroke: {
    WebkitTextStroke: "2px #f97316",
    color: "transparent",
  },
  heroSub: {
    fontSize: "1.1rem",
    lineHeight: 1.75,
    color: "#aaa",
    marginBottom: "40px",
    maxWidth: "580px",
  },
  heroActions: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
    marginBottom: "60px",
  },
  btnPrimary: {
    background: "#f97316",
    color: "#000",
    fontWeight: 700,
    padding: "16px 36px",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "1rem",
    letterSpacing: "0.01em",
    display: "inline-block",
  },
  btnGhost: {
    border: "1px solid #444",
    color: "#ccc",
    fontWeight: 500,
    padding: "16px 28px",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "1rem",
    display: "inline-block",
  },
  heroMetrics: {
    display: "flex",
    gap: "40px",
    flexWrap: "wrap",
  },
  metricItem: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  metricValue: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 900,
    fontSize: "2rem",
    color: "#f97316",
    letterSpacing: "-0.01em",
  },
  metricLabel: {
    fontSize: "0.75rem",
    color: "#666",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  },

  // PROBLEM
  problemBanner: {
    background: "linear-gradient(90deg, #431407, #7c2d12)",
    padding: "24px 40px",
  },
  problemInner: {
    maxWidth: "900px",
    margin: "0 auto",
    display: "flex",
    gap: "16px",
    alignItems: "flex-start",
  },
  problemIcon: { fontSize: "1.4rem", flexShrink: 0, marginTop: "2px" },
  problemText: {
    fontSize: "0.95rem",
    lineHeight: 1.7,
    color: "#fed7aa",
  },

  // SECTIONS
  section: {
    padding: "100px 40px",
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
  },
  sectionHeader: {
    textAlign: "center",
    marginBottom: "64px",
  },
  sectionTag: {
    fontSize: "0.72rem",
    fontWeight: 700,
    letterSpacing: "0.18em",
    color: "#f97316",
    textTransform: "uppercase",
    display: "block",
    marginBottom: "14px",
  },
  sectionTitle: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 900,
    fontSize: "3rem",
    color: "#fff",
    textTransform: "uppercase",
    letterSpacing: "0.02em",
    lineHeight: 1.1,
    marginBottom: "16px",
  },
  sectionSub: {
    color: "#888",
    fontSize: "1rem",
    maxWidth: "480px",
    margin: "0 auto",
    lineHeight: 1.7,
  },

  // FEATURES
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  featureCard: {
    background: "#161616",
    border: "1px solid #222",
    borderRadius: "12px",
    padding: "32px 28px",
    cursor: "default",
  },
  featureIcon: { fontSize: "2rem", display: "block", marginBottom: "16px" },
  featureTitle: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 700,
    fontSize: "1.25rem",
    color: "#fff",
    marginBottom: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.03em",
  },
  featureDesc: { color: "#888", fontSize: "0.9rem", lineHeight: 1.7 },

  // WORKFLOW
  workflow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "60px",
    alignItems: "center",
  },
  workflowSteps: { display: "flex", flexDirection: "column", gap: "8px" },
  workflowStep: {
    display: "flex",
    gap: "20px",
    alignItems: "flex-start",
    padding: "16px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "background 0.2s",
    borderLeft: "2px solid transparent",
  },
  workflowStepActive: {
    background: "#1a1a1a",
    borderColor: "#f97316",
  },
  stepNum: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 900,
    fontSize: "1.8rem",
    color: "#333",
    minWidth: "48px",
    transition: "color 0.2s",
    lineHeight: 1,
  },
  stepNumActive: { color: "#f97316" },
  stepTitle: {
    fontWeight: 600,
    color: "#ddd",
    fontSize: "0.95rem",
    marginBottom: "4px",
  },
  stepDesc: {
    color: "#666",
    fontSize: "0.85rem",
    lineHeight: 1.6,
    maxHeight: 0,
    overflow: "hidden",
    opacity: 0,
    transition: "all 0.3s",
  },
  workflowVisual: { display: "flex", justifyContent: "center" },
  workflowCard: {
    background: "linear-gradient(135deg, #1a1a1a, #0f0f0f)",
    border: "1px solid #2a2a2a",
    borderRadius: "16px",
    padding: "48px 40px",
    width: "100%",
    maxWidth: "400px",
  },
  wcNum: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 900,
    fontSize: "5rem",
    color: "#f97316",
    lineHeight: 1,
    opacity: 0.15,
    marginBottom: "12px",
  },
  wcTitle: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 700,
    fontSize: "1.6rem",
    color: "#fff",
    textTransform: "uppercase",
    marginBottom: "12px",
  },
  wcDesc: {
    color: "#888",
    fontSize: "0.92rem",
    lineHeight: 1.7,
    marginBottom: "32px",
  },
  wcBar: {
    background: "#222",
    borderRadius: "100px",
    height: "4px",
    marginBottom: "12px",
  },
  wcBarFill: {
    background: "#f97316",
    height: "100%",
    borderRadius: "100px",
    transition: "width 0.4s ease",
  },
  wcStep: { fontSize: "0.75rem", color: "#555", letterSpacing: "0.06em" },

  // VIDEO
  videoWrapper: { display: "flex", justifyContent: "center" },
  videoContainer: { width: "100%", maxWidth: "540px" },

  // TECH
  techRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "80px",
    alignItems: "center",
  },
  techLeft: {},
  techDesc: {
    color: "#888",
    fontSize: "0.95rem",
    lineHeight: 1.8,
    marginBottom: "32px",
  },
  techTags: { display: "flex", flexWrap: "wrap", gap: "10px" },
  techTag: {
    background: "#1a1a1a",
    border: "1px solid #333",
    color: "#ccc",
    padding: "6px 16px",
    borderRadius: "100px",
    fontSize: "0.82rem",
    fontWeight: 500,
  },
  techRight: {},
  slaCard: {
    background: "#0f0f0f",
    border: "1px solid #2a2a2a",
    borderRadius: "14px",
    padding: "36px 32px",
  },
  slaTitle: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 700,
    fontSize: "1.1rem",
    letterSpacing: "0.1em",
    color: "#f97316",
    textTransform: "uppercase",
    marginBottom: "24px",
  },
  slaRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #1a1a1a",
    padding: "14px 0",
  },
  slaLabel: { color: "#777", fontSize: "0.88rem" },
  slaVal: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 700,
    fontSize: "1.1rem",
    color: "#fff",
  },

  // QUOTE
  quoteWrapper: {
    maxWidth: "700px",
    margin: "0 auto",
    textAlign: "center",
  },
  quoteMark: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "8rem",
    lineHeight: 0.8,
    color: "#f97316",
    opacity: 0.25,
    marginBottom: "16px",
  },
  quoteText: {
    fontSize: "1.35rem",
    lineHeight: 1.7,
    color: "#ddd",
    fontStyle: "italic",
    marginBottom: "32px",
  },
  quoteAuthor: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    alignItems: "center",
  },
  quoteAuthorName: { fontWeight: 700, color: "#f97316", fontSize: "1rem" },
  quoteAuthorRole: { color: "#666", fontSize: "0.82rem" },

  // CTA
  ctaSection: {
    position: "relative",
    padding: "120px 40px",
    textAlign: "center",
    overflow: "hidden",
    background: "#0a0a0a",
  },
  ctaBg: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(249,115,22,0.08) 0%, transparent 70%)",
  },
  ctaContent: { position: "relative", maxWidth: "700px", margin: "0 auto" },
  ctaTitle: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 900,
    fontSize: "3.5rem",
    color: "#fff",
    textTransform: "uppercase",
    lineHeight: 1.1,
    marginBottom: "24px",
  },
  ctaSub: {
    color: "#888",
    fontSize: "1rem",
    lineHeight: 1.8,
    marginBottom: "48px",
  },
  ctaBtn: {
    display: "inline-block",
    background: "#f97316",
    color: "#000",
    fontWeight: 800,
    padding: "20px 52px",
    borderRadius: "10px",
    fontSize: "1.1rem",
    textDecoration: "none",
    letterSpacing: "0.01em",
    marginBottom: "20px",
  },
  ctaNote: { color: "#555", fontSize: "0.8rem", letterSpacing: "0.04em" },

  // FOOTER
  footer: {
    background: "#080808",
    borderTop: "1px solid #1a1a1a",
    padding: "32px 40px",
  },
  footerInner: {
    maxWidth: "1100px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "12px",
  },
  footerSub: { color: "#444", fontSize: "0.78rem" },
  footerWa: {
    color: "#f97316",
    textDecoration: "none",
    fontSize: "0.88rem",
    fontWeight: 600,
  },
};
