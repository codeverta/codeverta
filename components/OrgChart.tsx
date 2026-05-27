import { useState } from "react";
import { useTranslation } from "next-i18next";

type ColorKey = "purple" | "blue" | "teal" | "orange" | "violet" | "slate";

type OrgNodeData = {
  id: string;
  color: ColorKey;
  children: OrgNodeData[];
};

type OrgTranslate = (key: string) => string;

const orgData: OrgNodeData = {
  id: "ceo",
  color: "purple",
  children: [
    {
      id: "cto",
      color: "blue",
      children: [
        {
          id: "eng",
          color: "blue",
          children: [
            {
              id: "fe",
              color: "slate",
              children: [],
            },
            {
              id: "be",
              color: "slate",
              children: [],
            },
            {
              id: "mob",
              color: "slate",
              children: [],
            },
          ],
        },
        {
          id: "devops",
          color: "blue",
          children: [],
        },
        {
          id: "qa",
          color: "blue",
          children: [],
        },
      ],
    },
    {
      id: "cpo",
      color: "teal",
      children: [
        {
          id: "pm",
          color: "slate",
          children: [],
        },
        {
          id: "uxd",
          color: "slate",
          children: [],
        },
      ],
    },
    {
      id: "cmo",
      color: "orange",
      children: [
        {
          id: "growth",
          color: "slate",
          children: [],
        },
        {
          id: "sales",
          color: "slate",
          children: [],
        },
      ],
    },
    {
      id: "cfo",
      color: "violet",
      children: [
        {
          id: "fin",
          color: "slate",
          children: [],
        },
        {
          id: "hr",
          color: "slate",
          children: [],
        },
      ],
    },
  ],
};

// ─── Color map (Light Mode) ──────────────────────────────────────────────────

const colorMap: Record<
  ColorKey,
  {
    card: string;
    role: string;
    sub: string;
    badge: string;
    line: string;
    detail: string;
  }
> = {
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

function OrgNode({
  node,
  depth = 0,
  t,
}: {
  node: OrgNodeData;
  depth?: number;
  t: OrgTranslate;
}) {
  const [expanded, setExpanded] = useState(depth < 2);
  const [showDetail, setShowDetail] = useState(false);

  const c = colorMap[node.color] || colorMap.slate;
  const hasChildren = node.children && node.children.length > 0;
  const role = t(`orgChart.nodes.${node.id}.role`);
  const sub = t(`orgChart.nodes.${node.id}.sub`);
  const desc = t(`orgChart.nodes.${node.id}.description`);

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
              {role}
            </p>
            <p className={`text-xs mt-0.5 truncate ${c.sub}`}>{sub}</p>
          </div>

          {hasChildren && (
            <button
              className={`flex-shrink-0 rounded-md px-2 py-1 text-xs font-mono font-medium transition-colors ${c.badge}`}
              style={{ fontSize: 11 }}
              onClick={(e) => {
                e.stopPropagation();
                setExpanded((v) => !v);
              }}
              aria-label={
                expanded
                  ? t("orgChart.actions.collapse")
                  : t("orgChart.actions.expand")
              }
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
                <OrgNode node={child} depth={depth + 1} t={t} />
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
  { key: "cSuite", color: "bg-purple-400" },
  { key: "engineering", color: "bg-blue-400" },
  { key: "product", color: "bg-teal-400" },
  { key: "marketing", color: "bg-orange-400" },
  { key: "financeHr", color: "bg-violet-400" },
  { key: "subTeam", color: "bg-slate-400" },
];

// ─── Main component ───────────────────────────────────────────────────────────

export default function OrgChart() {
  const { t } = useTranslation("about");

  return (
    <div className="bg-slate-50 p-8 font-sans">
      {/* Header */}
      <div className="mb-8 md:mb-10 text-center">
        <h2 className="text-3xl font-bold text-slate-900 md:text-4xl tracking-tight dark:text-white">
          {t("orgChart.heading")}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-400">
          {t("orgChart.description")}
        </p>
      </div>
      {/* Tree */}
      <div className="overflow-x-auto pb-8 w-full hide-scrollbar">
        <div className="w-max mx-auto px-4 md:px-0">
          <OrgNode node={orgData} depth={0} t={t} />
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-3 mt-8">
        {legend.map(({ key, color }) => (
          <div
            key={key}
            className="flex items-center gap-2 rounded-full px-4 py-1.5 bg-white border border-slate-200 shadow-sm"
          >
            <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
            <span className="text-xs font-medium text-slate-600">
              {t(`orgChart.legend.${key}`)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
