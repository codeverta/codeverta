// components/SeoHead.jsx
import Head from "next/head";

export default function SeoHead({
  title = "Codeverta – Solusi Digital Bisnis Anda",
  description = "Platform profesional untuk pembuatan E-commerce, ERP, POS, HRMS, dan sistem digital lainnya.",
  url = "https://bikinwebsitejogja.com",
  image = "https://bikinwebsitejogja.com/og-image.png",
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Canonical */}
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Codeverta" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Robots */}
      <meta name="robots" content="index, follow" />
    </Head>
  );
}
