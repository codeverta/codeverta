import { Head, Html, Main, NextScript } from "next/document";

export default function CodevertaDocument() {
  return (
    // Next.js Pages Router reads the active i18n locale from its server-side
    // document context and applies it to <html lang>. Keeping this server-only
    // avoids duplicating route parsing or changing the attribute after hydrate.
    <Html>
      <Head>
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
