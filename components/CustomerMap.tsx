import React, { useEffect, useMemo, useRef, useState } from "react";
import { MapPin, Users } from "lucide-react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { getCustomerMap } from "@/lib/customer-maps";

type PinPosition = { x: number; y: number };

export default function CustomerMap() {
  const { t } = useTranslation("about");
  const { locale } = useRouter();
  const map = useMemo(() => getCustomerMap(locale), [locale]);
  const [svgContent, setSvgContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [pinPositions, setPinPositions] = useState<Record<string, PinPosition>>(
    {}
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setSvgContent("");
    setPinPositions({});
    setSelectedId(null);
    setHoveredId(null);

    fetch(map.asset)
      .then((response) => {
        if (!response.ok) throw new Error(`Unable to load ${map.asset}`);
        return response.text();
      })
      .then((svg) => {
        if (cancelled) return;
        const document = new DOMParser().parseFromString(svg, "image/svg+xml");
        const svgRoot = document.documentElement;

        // MapSVG assets only define pixel dimensions. Without a viewBox,
        // max-height shortens the SVG viewport but leaves the paths at their
        // original coordinates, which clips tall maps such as the UK. Convert
        // those dimensions into a responsive coordinate system first.
        if (!svgRoot.hasAttribute("viewBox")) {
          const width = Number.parseFloat(svgRoot.getAttribute("width") || "");
          const height = Number.parseFloat(
            svgRoot.getAttribute("height") || ""
          );
          if (Number.isFinite(width) && Number.isFinite(height)) {
            svgRoot.setAttribute("viewBox", `0 0 ${width} ${height}`);
          }
        }
        svgRoot.removeAttribute("width");
        svgRoot.removeAttribute("height");
        svgRoot.setAttribute("preserveAspectRatio", "xMidYMid meet");

        document.querySelectorAll("path[id]").forEach((element) => {
          const location = map.locations[element.id];
          element.setAttribute("fill", location ? "#DBEAFE" : "#E7EBF3");
          element.setAttribute("stroke", "#C7D0E0");
          element.setAttribute("stroke-width", "0.5");
          if (location) {
            element.setAttribute(
              "data-name",
              `${location.city}, ${location.region}`
            );
          }
        });

        setSvgContent(new XMLSerializer().serializeToString(document));
        setLoading(false);
      })
      .catch((error) => {
        if (!cancelled) {
          console.error("Error loading customer map:", error);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [map]);

  useEffect(() => {
    if (loading || !svgContent || !containerRef.current) return;

    const computePositions = () => {
      const container = containerRef.current;
      const svg = container?.querySelector("svg");
      if (!container || !svg) return;

      const containerRect = container.getBoundingClientRect();
      const positions: Record<string, PinPosition> = {};

      Object.keys(map.locations).forEach((id) => {
        const element = svg.querySelector(`[id="${id}"]`);
        if (!element) return;
        const bounds = element.getBoundingClientRect();
        positions[id] = {
          x: bounds.left + bounds.width / 2 - containerRect.left,
          y: bounds.top + bounds.height / 2 - containerRect.top,
        };
      });

      setPinPositions(positions);
    };

    const frame = requestAnimationFrame(computePositions);
    window.addEventListener("resize", computePositions);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", computePositions);
    };
  }, [loading, map, svgContent]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-slate-400">
        {t("customerMap.loading", { defaultValue: "Loading map..." })}
      </div>
    );
  }

  return (
    <section className="bg-slate-50 py-20">
      <div className="container mx-auto px-6">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600">
            {t("customerMap.badge", { defaultValue: "Service coverage" })}
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            {t("customerMap.heading.before", {
              defaultValue: "Supporting businesses across ",
            })}
            <span className="text-blue-600">{map.country}</span>
            {t("customerMap.heading.after", { defaultValue: "" })}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            {t("customerMap.description", {
              defaultValue:
                "We help businesses build dependable digital infrastructure and prepare for global growth.",
            })}
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          {Object.entries(map.locations).map(([id, location]) => {
            const active = selectedId === id;
            return (
              <button
                type="button"
                key={id}
                onClick={() => setSelectedId(active ? null : id)}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all ${
                  active
                    ? "border-blue-600 bg-white shadow-md"
                    : "border-slate-200 bg-white/60 hover:border-blue-300 hover:shadow-sm"
                }`}
              >
                <span className="rounded-lg bg-blue-50 p-2 text-blue-600">
                  <MapPin className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-slate-900">
                    {location.city}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-500">
                    {location.customers ? (
                      <>
                        <Users className="h-3 w-3" /> {location.customers}{" "}
                        {t("customerMap.customerUnit", {
                          defaultValue: "customers",
                        })}
                      </>
                    ) : (
                      location.region
                    )}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div
          ref={containerRef}
          className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <div
            className="mx-auto w-full max-w-5xl [&_svg]:h-auto [&_svg]:max-h-[42rem] [&_svg]:w-full"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />

          {Object.entries(pinPositions).map(([id, position]) => {
            const location = map.locations[id];
            // Locale changes render once before the effect above clears pin
            // positions from the previous map. Ignore those stale entries.
            if (!location) return null;

            const active = selectedId === id || hoveredId === id;
            return (
              <button
                type="button"
                key={id}
                onClick={() => setSelectedId(id === selectedId ? null : id)}
                onMouseEnter={() => setHoveredId(id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{ left: position.x, top: position.y }}
                className="group absolute -translate-x-1/2 -translate-y-full cursor-pointer"
                aria-label={`${location.city}, ${location.region}`}
              >
                <span
                  className={`pointer-events-none absolute bottom-full left-1/2 mb-1 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-900 px-2 py-1 text-xs font-medium text-white shadow-lg transition-opacity ${
                    active ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {location.city} · {location.region}
                </span>
                <span
                  className="absolute inset-0 -z-10 animate-ping rounded-full bg-blue-500/40"
                  style={{ animationDuration: "2s" }}
                />
                <MapPin
                  className={`h-7 w-7 drop-shadow-md transition-transform ${
                    active ? "scale-125 text-blue-700" : "text-blue-600"
                  }`}
                  fill={active ? "#DBEAFE" : "white"}
                  strokeWidth={2}
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
