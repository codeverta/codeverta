import { getSafeAnalyticsSource, trackEvent } from "@/components/GAScript";

// Kept as an alias for older imports; the active GA ID comes from deployment
// configuration in GAScript rather than a second hard-coded value.
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

export const pageView = (url: string) => {
  if (
    typeof window === "undefined" ||
    !GA_TRACKING_ID ||
    !(window as any).gtag
  ) {
    return;
  }
  const pagePath = getSafeAnalyticsSource(url);
  // Preserve the legacy helper for explicit consumers. GAScript itself relies
  // on the stream's existing automatic initial and history page views.
  (window as any).gtag("config", GA_TRACKING_ID, {
    page_path: pagePath,
    page_location: `${window.location.origin}${pagePath}`,
  });
};

export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value: string | number;
}) => {
  // The legacy helper used to forward arbitrary category/label text to GA.
  // Keep its signature but only forward the event name and numeric value
  // through the same allowlisted path as the app's active instrumentation.
  void category;
  void label;
  trackEvent(action, typeof value === "number" ? { value } : {});
};
