import { useEffect } from "react";

const ADSENSE_CLIENT = "ca-pub-2242816010232507";

export default function DeferredAdSense() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const load = () => {
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      if (
        document.querySelector(`script[data-codeverta-ads="${ADSENSE_CLIENT}"]`)
      )
        return;
      const script = document.createElement("script");
      script.async = true;
      script.crossOrigin = "anonymous";
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
      script.dataset.codevertaAds = ADSENSE_CLIENT;
      document.head.appendChild(script);
    };

    const idle =
      "requestIdleCallback" in window
        ? (window as any).requestIdleCallback(load, { timeout: 5000 })
        : window.setTimeout(load, 3500);
    return () => {
      if ("cancelIdleCallback" in window && typeof idle === "number") {
        (window as any).cancelIdleCallback(idle);
      } else {
        window.clearTimeout(idle);
      }
    };
  }, []);

  return null;
}
