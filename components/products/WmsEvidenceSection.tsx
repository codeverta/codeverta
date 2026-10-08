import Image from "next/image";
import type { WmsCopy } from "@/lib/wms-copy";

const SCREENSHOTS = [
  "/assets/warehouse/stock-entry.png",
  "/assets/warehouse/dashboard.png",
];

export default function WmsEvidenceSection({
  copy,
}: {
  copy: WmsCopy["evidence"];
}) {
  return (
    <section
      id="contoh-sistem"
      aria-labelledby="wms-evidence-title"
      className="bg-white py-20 dark:bg-slate-900"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-amber-600">
            {copy.eyebrow}
          </p>
          <h2
            id="wms-evidence-title"
            className="mb-4 text-3xl font-bold text-slate-900 dark:text-white md:text-4xl"
          >
            {copy.title}
          </h2>
          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            {copy.intro}
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          {copy.screenshots.map((screenshot, index) => (
            <figure
              key={screenshot.title}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-700">
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  {screenshot.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {screenshot.description}
                </p>
              </div>
              <Image
                src={SCREENSHOTS[index]}
                alt={screenshot.caption}
                width={1680}
                height={962}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-auto w-full bg-white"
              />
              <figcaption className="px-5 py-3 text-xs text-slate-500 dark:text-slate-400">
                {screenshot.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mx-auto mt-6 max-w-6xl rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-relaxed text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-100">
          {copy.sampleNote}
        </p>
      </div>
    </section>
  );
}
