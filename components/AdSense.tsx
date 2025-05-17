"use client";

import { useEffect } from "react";

export default function AdSense({ adType = 1 }: { adType?: 1 | 2 | 3 }) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error(err);
    }
  }, []);
  if (adType === 1) {
    return (
      <>
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-2242816010232507"
          data-ad-slot="7002409118"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      </>
    );
  } else if (adType === 2) {
    return (
      <>
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-format="autorelaxed"
          data-ad-client="ca-pub-2242816010232507"
          data-ad-slot="2192935561"
        ></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      </>
    );
  } else {
    return (
      <>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2242816010232507"
          crossOrigin="anonymous"
        ></script>
        <ins
          className="adsbygoogle"
          style={{ display: "block", textAlign: "center" }}
          data-ad-layout="in-article"
          data-ad-format="fluid"
          data-ad-client="ca-pub-2242816010232507"
          data-ad-slot="1387120353"
        ></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      </>
    );
  }
}
