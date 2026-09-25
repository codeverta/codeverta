// components/GAScript.tsx
// Google Analytics 4 - Next.js Script component
// Usage: Set NEXT_PUBLIC_GA_ID in .env.local
// Example: NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

import { useEffect } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function GAScript() {
  useEffect(() => {
    if (!GA_ID || typeof window === "undefined") return;

    const dataLayer = ((window as any).dataLayer =
      (window as any).dataLayer || []);
    (window as any).gtag =
      (window as any).gtag ||
      function gtag() {
        // Keep the queue format identical to Google's official snippet.
        dataLayer.push(arguments);
      };

    const gtag = (window as any).gtag as (...args: any[]) => void;
    gtag("js", new Date());
    // The GA4 stream has Enhanced Measurement page views enabled. It sends
    // the initial view and detects Next.js history changes automatically.
    gtag("config", GA_ID);

    if (!document.querySelector(`script[data-codeverta-ga="${GA_ID}"]`)) {
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      script.dataset.codevertaGa = GA_ID;
      document.head.appendChild(script);
    }
  }, []);

  return null;
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
