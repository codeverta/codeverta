// components/GAScript.tsx
// Google Analytics 4 - Next.js Script component
// Usage: Set NEXT_PUBLIC_GA_ID in .env.local
// Example: NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

import { useRouter } from "next/router";
import { useEffect } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function GAScript() {
  useEffect(() => {
    if (!GA_ID || typeof window === "undefined") return;

    const load = () => {
      if (document.querySelector(`script[data-codeverta-ga="${GA_ID}"]`))
        return;
      const dataLayer = ((window as any).dataLayer =
        (window as any).dataLayer || []);
      (window as any).gtag =
        (window as any).gtag ||
        function gtag(...args: any[]) {
          dataLayer.push(args);
        };
      (window as any).gtag("js", new Date());
      (window as any).gtag("config", GA_ID, {
        page_path: window.location.pathname,
      });
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      script.dataset.codevertaGa = GA_ID;
      document.head.appendChild(script);
    };

    const idle =
      "requestIdleCallback" in window
        ? (window as any).requestIdleCallback(load, { timeout: 4000 })
        : window.setTimeout(load, 2500);
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

// Hook untuk fire events
export function useGAPageView() {
  const router = useRouter();

  useEffect(() => {
    if (!GA_ID) return;

    const handleRouteChange = (url: string) => {
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("config", GA_ID, {
          page_path: url,
        });
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
}

// Event tracking helpers
export function trackEvent(
  action: string,
  params: Record<string, string | number> = {}
) {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", action, params);
  }
}
