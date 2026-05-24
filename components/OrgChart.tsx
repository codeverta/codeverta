import { useState } from "react";

// ─── Data (Sama persis) ──────────────────────────────────────────────────────

const orgData = {
  id: "ceo",
  role: "CEO / Co-founder",
  sub: "Visi, strategi",
  color: "purple",
  children: [
    {
      id: "cto",
      role: "CTO",
      sub: "Arsitektur & teknis",
      color: "blue",
      children: [
        {
          id: "eng",
          role: "Engineering",
          sub: "Frontend, backend, mobile",
          color: "blue",
          children: [
            {
              id: "fe",
              role: "Frontend",
              sub: "React / Vue / UI",
              color: "slate",
              children: [],
            },
            {
              id: "be",
              role: "Backend",
              sub: "API, DB, services",
              color: "slate",
              children: [],
            },
            {
              id: "mob",
              role: "Mobile",
              sub: "iOS & Android",
              color: "slate",
              children: [],
            },
          ],
        },
        {
          id: "devops",
          role: "DevOps / Infra",
          sub: "Cloud, CI/CD, SRE",
          color: "blue",
          children: [],
        },
        {
          id: "qa",
          role: "QA / Testing",
          sub: "Manual & automation",
          color: "blue",
          children: [],
        },
      ],
    },
    {
      id: "cpo",
      role: "CPO",
      sub: "Roadmap produk",
      color: "teal",
      children: [
        {
          id: "pm",
          role: "Product Manager",
          sub: "Fitur, backlog, OKR",
          color: "slate",
          children: [],
        },
        {
          id: "uxd",
          role: "UI/UX Design",
          sub: "Figma & research",
          color: "slate",
          children: [],
        },
      ],
    },
    {
      id: "cmo",
      role: "CMO",
      sub: "Marketing & growth",
      color: "orange",
      children: [
        {
          id: "growth",
          role: "Growth / SEO",
          sub: "Konten, ads, SEO",
          color: "slate",
          children: [],
        },
        {
          id: "sales",
          role: "Sales / BD",
          sub: "Lead, closing, mitra",
          color: "slate",
          children: [],
        },
      ],
    },
    {
      id: "cfo",
      role: "CFO",
      sub: "Keuangan & legal",
      color: "violet",
      children: [
        {
          id: "fin",
          role: "Finance",
          sub: "Pembukuan, pajak",
          color: "slate",
          children: [],
        },
        {
          id: "hr",
          role: "HR / People",
          sub: "Rekrut & kultur",
          color: "slate",
          children: [],
        },
      ],
    },
  ],
};

const descriptions = {
  ceo: "Memimpin perusahaan, menentukan visi jangka panjang.",
  cto: "Bertanggung jawab atas arsitektur teknis, stack teknologi, dan kualitas engineering.",
  cpo: "Mendefinisikan roadmap produk dan memprioritaskan fitur berdasarkan data pengguna.",
  cmo: "Merancang strategi pemasaran, brand awareness, dan pertumbuhan pengguna.",
  cfo: "Mengelola keuangan, legal, compliance, dan perencanaan anggaran.",
  eng: "Tim inti pengembang — frontend, backend, dan mobile.",
  devops:
    "Mengelola infrastruktur cloud, pipeline CI/CD, dan keandalan sistem (SRE).",
  qa: "Memastikan kualitas produk melalui pengujian manual dan automation.",
  fe: "Membangun antarmuka pengguna dengan React, Vue, atau framework modern lainnya.",
  be: "Mengembangkan API, logika bisnis, dan pengelolaan database.",
  mob: "Mengembangkan aplikasi native atau cross-platform untuk iOS dan Android.",
  pm: "Mengelola backlog, menentukan prioritas fitur, dan memastikan OKR terpenuhi.",
  uxd: "Merancang pengalaman pengguna dan antarmuka menggunakan Figma dan riset UX.",
  growth:
    "Menjalankan strategi konten, SEO, dan iklan untuk akuisisi pengguna.",
  sales:
    "Mengidentifikasi prospek, melakukan closing, dan membangun kemitraan bisnis.",
  fin: "Mengelola pembukuan, laporan keuangan, pajak, dan audit.",
  hr: "Rekrutmen, onboarding, pengembangan budaya, dan retensi talenta.",
};

// ─── Color map (Light Mode) ──────────────────────────────────────────────────

const colorMap = {
  purple: {
    card: "bg-purple-50 border-purple-200",
    role: "text-purple-900",
    sub: "text-purple-600",
    badge: "bg-purple-200 text-purple-800 hover:bg-purple-300",
    line: "bg-purple-300",
    detail: "text-purple-800 border-purple-200",
  },
  blue: {
    card: "bg-blue-50 border-blue-200",
    role: "text-blue-900",
    sub: "text-blue-600",
    badge: "bg-blue-200 text-blue-800 hover:bg-blue-300",
    line: "bg-blue-300",
    detail: "text-blue-800 border-blue-200",
  },
  teal: {
    card: "bg-teal-50 border-teal-200",
    role: "text-teal-900",
    sub: "text-teal-600",
    badge: "bg-teal-200 text-teal-800 hover:bg-teal-300",
    line: "bg-teal-300",
    detail: "text-teal-800 border-teal-200",
  },
  orange: {
    card: "bg-orange-50 border-orange-200",
    role: "text-orange-900",
    sub: "text-orange-600",
    badge: "bg-orange-200 text-orange-800 hover:bg-orange-300",
    line: "bg-orange-300",
    detail: "text-orange-800 border-orange-200",
  },
  violet: {
    card: "bg-violet-50 border-violet-200",
    role: "text-violet-900",
    sub: "text-violet-600",
    badge: "bg-violet-200 text-violet-800 hover:bg-violet-300",
    line: "bg-violet-300",
    detail: "text-violet-800 border-violet-200",
  },
  slate: {
    card: "bg-white border-slate-200",
    role: "text-slate-800",
    sub: "text-slate-500",
    badge: "bg-slate-100 text-slate-700 hover:bg-slate-200",
    line: "bg-slate-300",
    detail: "text-slate-700 border-slate-200",
  },
};

// ─── OrgNode component ────────────────────────────────────────────────────────

function OrgNode({ node, depth = 0 }) {
  const [expanded, setExpanded] = useState(depth < 2);
  const [showDetail, setShowDetail] = useState(false);

  const c = colorMap[node.color] || colorMap.slate;
  const hasChildren = node.children && node.children.length > 0;
  const desc = descriptions[node.id];

  const cardWidth = depth === 0 ? "w-60" : depth === 1 ? "w-48" : "w-44";

  return (
    <div className="flex flex-col items-center">
      {/* Card */}
      <div
        className={`
          ${cardWidth} rounded-xl border px-4 py-3 cursor-pointer select-none
          transition-all duration-200 hover:-translate-y-0.5
          ${c.card}
        `}
        style={{
          boxShadow: showDetail
            ? "0 0 0 1.5px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.08)"
            : "0 2px 8px rgba(0,0,0,0.04)",
        }}
        onClick={() => setShowDetail((v) => !v)}
      >
        {/* Menggunakan items-center agar badge selalu sejajar di tengah, tidak berantakan ke atas/bawah */}
        <div className="flex items-center justify-between gap-3 w-full">
          <div className="flex-1 min-w-0 text-left">
            <p
              className={`font-semibold truncate leading-tight ${c.role}`}
              style={{ fontSize: depth === 0 ? 14 : 13 }}
            >
              {node.role}
            </p>
            <p className={`text-xs mt-0.5 truncate ${c.sub}`}>{node.sub}</p>
          </div>

          {hasChildren && (
            <button
              className={`flex-shrink-0 rounded-md px-2 py-1 text-xs font-mono font-medium transition-colors ${c.badge}`}
              style={{ fontSize: 11 }}
              onClick={(e) => {
                e.stopPropagation();
                setExpanded((v) => !v);
              }}
              aria-label={expanded ? "Collapse" : "Expand"}
            >
              {expanded ? "−" : `+${node.children.length}`}
            </button>
          )}
        </div>

        {/* Detail panel */}
        {showDetail && desc && (
          <p
            className={`mt-3 pt-2 text-xs text-left leading-relaxed border-t ${c.detail}`}
          >
            {desc}
          </p>
        )}
      </div>

      {/* Children tree */}
      {hasChildren && expanded && (
        <div className="flex flex-col items-center">
          {/* Vertical stem */}
          <div className={`w-px h-6 ${c.line}`} />

          {/* Horizontal bar + children */}
          <div className="relative flex items-start gap-4">
            {node.children.length > 1 && (
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 h-px bg-slate-300"
                style={{
                  width: `calc(100% - ${
                    node.children.length <= 2 ? 80 : 60
                  }px)`,
                }}
              />
            )}

            {node.children.map((child) => (
              <div key={child.id} className="flex flex-col items-center">
                <div
                  className={`w-px h-6 ${
                    (colorMap[child.color] || colorMap.slate).line
                  }`}
                />
                <OrgNode node={child} depth={depth + 1} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Legend ───────────────────────────────────────────────────────────────────

const legend = [
  { label: "C-Suite", color: "bg-purple-400" },
  { label: "Engineering", color: "bg-blue-400" },
  { label: "Product", color: "bg-teal-400" },
  { label: "Marketing", color: "bg-orange-400" },
  { label: "Finance & HR", color: "bg-violet-400" },
  { label: "Sub-team", color: "bg-slate-400" },
];

// ─── Main component ───────────────────────────────────────────────────────────

export default function OrgChart() {
  return (
    <div className="bg-slate-50 p-8 font-sans">
      {/* Header */}
      <div className="mb-8 md:mb-10 flex flex-col md:flex-row items-start md:items-end justify-between max-w-5xl mx-auto w-full gap-4">
        <div>
          <h2 className="text-3xl font-bold mb-6 text-slate-900 text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Struktur Organisasi
          </h2>
        </div>
      </div>
      {/* Tree */}
      <div className="overflow-x-auto pb-8 w-full hide-scrollbar">
        <div className="w-max mx-auto px-4 md:px-0">
          <OrgNode node={orgData} depth={0} />
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-3 mt-8">
        {legend.map(({ label, color }) => (
          <div
            key={label}
            className="flex items-center gap-2 rounded-full px-4 py-1.5 bg-white border border-slate-200 shadow-sm"
          >
            <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
            <span className="text-xs font-medium text-slate-600">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
