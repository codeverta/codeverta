import React, { useEffect, useRef, useState } from "react";
import { MapPin, Users, TrendingUp, TrendingDown } from "lucide-react";
import { provinceNames, customerRegions } from "lib/map";

type PinPos = { x: number; y: number };

const IndonesiaCustomerMap = () => {
  const [svgContent, setSvgContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [pinPositions, setPinPositions] = useState<Record<string, PinPos>>({});
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Load the base SVG map and tint active provinces
  useEffect(() => {
    fetch("/assets/id.svg")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.text();
      })
      .then((svg) => {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svg, "image/svg+xml");

        Object.keys(provinceNames).forEach((id) => {
          const el = svgDoc.getElementById(id);
          if (!el) return;
          const isActive = !!customerRegions[id];
          el.setAttribute("fill", isActive ? "#DBEAFE" : "#E7EBF3");
          el.setAttribute("stroke", "#C7D0E0");
          el.setAttribute("stroke-width", "0.5");
          el.setAttribute("data-name", provinceNames[id]);
        });

        const serializer = new XMLSerializer();
        setSvgContent(serializer.serializeToString(svgDoc));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading SVG:", err);
        setLoading(false);
      });
  }, []);

  // 2. Once the SVG is actually in the DOM, compute pin positions from the
  //    real rendered bounding boxes of the target province paths.
  useEffect(() => {
    if (loading || !svgContent || !containerRef.current) return;

    const computePositions = () => {
      const container = containerRef.current;
      if (!container) return;
      const svgEl = container.querySelector("svg");
      if (!svgEl) return;

      const containerRect = container.getBoundingClientRect();
      const next: Record<string, PinPos> = {};

      Object.keys(customerRegions).forEach((id) => {
        const el = svgEl.querySelector(`#${id}`);
        if (!el) return;
        const bbox = (el as SVGGraphicsElement).getBoundingClientRect();
        next[id] = {
          x: bbox.left + bbox.width / 2 - containerRect.left,
          y: bbox.top + bbox.height / 2 - containerRect.top,
        };
      });

      setPinPositions(next);
    };

    // Give the browser a tick to paint before measuring
    const raf = requestAnimationFrame(computePositions);
    window.addEventListener("resize", computePositions);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", computePositions);
    };
  }, [loading, svgContent]);

  const selected = selectedId ? customerRegions[selectedId] : null;

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-slate-400">
        Memuat peta...
      </div>
    );
  }

  return (
    <section className="bg-slate-50 py-20">
      <div className="container mx-auto px-6">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600">
            Sebaran Customer
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Customer kami di seluruh{" "}
            <span className="text-blue-600">Indonesia</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Kami membantu bisnis membangun infrastruktur digital yang tersebar
            dari dari Jakarta hingga Papua. Di tahun ini, kami juga tengah
            mempersiapkan langkah untuk menghadirkan layanan kami ke pasar
            global.
          </p>
        </div>

        {/* Stat chips */}
        <div className="mb-8 flex flex-wrap gap-3">
          {Object.entries(customerRegions).map(([id, region]) => {
            const isPositive = !region.growth.startsWith("-");
            const isActive = selectedId === id;
            return (
              <button
                key={id}
                onClick={() => setSelectedId(isActive ? null : id)}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all ${
                  isActive
                    ? "border-blue-600 bg-white shadow-md"
                    : "border-slate-200 bg-white/60 hover:border-blue-300 hover:shadow-sm"
                }`}
              >
                <span className="rounded-lg bg-blue-50 p-2 text-blue-600">
                  <MapPin className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-slate-900">
                    {region.name}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-500">
                    <Users className="h-3 w-3" /> {region.customers} customer
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-1">
          {/* Map */}
          <div
            ref={containerRef}
            className="relative col-span-1 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:col-span-2"
          >
            <div
              className="w-full [&_svg]:h-auto [&_svg]:w-full"
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />

            {Object.entries(pinPositions).map(([id, pos]) => {
              const region = customerRegions[id];
              const isActive = selectedId === id || hoveredId === id;
              return (
                <button
                  key={id}
                  onClick={() => setSelectedId(id === selectedId ? null : id)}
                  onMouseEnter={() => setHoveredId(id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{ left: pos.x, top: pos.y }}
                  className="group absolute -translate-x-1/2 -translate-y-full cursor-pointer"
                  aria-label={region.name}
                >
                  {/* Floating label */}
                  <div
                    className={`pointer-events-none absolute bottom-full left-1/2 mb-1 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-900 px-2 py-1 text-xs font-medium text-white shadow-lg transition-opacity ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {region.name} · {region.customers} customer
                  </div>

                  {/* Pulse ring */}
                  <span
                    className={`absolute inset-0 -z-10 rounded-full bg-blue-500/40 ${
                      isActive ? "animate-ping" : "animate-ping"
                    }`}
                    style={{ animationDuration: "2s" }}
                  />

                  {/* Pin */}
                  <MapPin
                    className={`h-7 w-7 drop-shadow-md transition-transform ${
                      isActive ? "scale-125 text-blue-700" : "text-blue-600"
                    }`}
                    fill={isActive ? "#DBEAFE" : "white"}
                    strokeWidth={2}
                  />
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          {/* <div className="col-span-1 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            {selected ? (
              <div>
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {selected.name}
                    </h3>
                    <p className="text-sm text-slate-500">{selected.city}</p>
                  </div>
                  <span className="rounded-lg bg-blue-50 p-2 text-blue-600">
                    <MapPin className="h-5 w-5" />
                  </span>
                </div>

                <div className="mb-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      Customer
                    </p>
                    <p className="text-2xl font-bold tabular-nums text-slate-900">
                      {selected.customers}
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      Growth
                    </p>
                    <p
                      className={`text-2xl font-bold tabular-nums ${
                        selected.growth.startsWith("-")
                          ? "text-rose-600"
                          : "text-emerald-600"
                      }`}
                    >
                      {selected.growth}
                    </p>
                  </div>
                </div>

                <p className="mb-4 text-sm leading-relaxed text-slate-600">
                  {selected.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {selected.highlights.map((h) => (
                    <span
                      key={h}
                      className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <></>
            )}
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default IndonesiaCustomerMap;
