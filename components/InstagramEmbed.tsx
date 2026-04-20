"use client";
import { useEffect, useState } from "react";

export default function InstagramEmbed() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    // Check if script already exists to prevent duplicates on re-renders
    if (!document.getElementById("ig-embed-script")) {
      const script = document.createElement("script");
      script.id = "ig-embed-script";
      script.src = "//www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    } else if (window.instgrm) {
      // Re-process embeds if navigating back to this page via client router
      window.instgrm.Embeds.process();
    }
  }, []);

  // Return a placeholder or null during SSR to prevent hydration mismatch
  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <blockquote
        className="instagram-media"
        data-instgrm-permalink="https://www.instagram.com/p/DUYZFeogcCR/"
        data-instgrm-version="14"
        style={{
          background: "#000",
          border: "0",
          borderRadius: "12px",
          margin: "0 auto",
          maxWidth: "540px",
          width: "100%",
          minWidth: "326px",
        }}
      />
      <script async src="//www.instagram.com/embed.js" />
    </>
  );
}
