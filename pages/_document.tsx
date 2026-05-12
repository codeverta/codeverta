import { Html, Head, Main, NextScript } from "next/document";
import { GA_TRACKING_ID } from "lib/gtag";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2242816010232507"
          crossOrigin="anonymous"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `{
            "@context": "https://schema.org",
            "@type": "Organization",
            "url": "https://www.codeverta.com",
            "logo": "https://www.codeverta.com/logolilin.png"
          }`,
          }}
          type="application/ld+json"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico"></link>
        <meta name="google-adsense-account" content="ca-pub-2242816010232507" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
