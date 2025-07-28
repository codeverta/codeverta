import "../styles/globals.css";
import type { AppProps, AppLayoutProps } from "next/app";
import { getRelationship, getRelationships } from "utils";
import { ReactNode } from "react";
import { NextSeo } from "next-seo";
import packageInfo from "../package.json";
import { appWithTranslation } from "next-i18next";
import Landing from "@/components/layout/Landing";


if (typeof window !== "undefined") {
  // @ts-ignore
  window.version = packageInfo.version;
}

function App({ Component, pageProps }: AppLayoutProps) {
  const appProps = { getRelationship, getRelationships };
  const getLayout =
    Component.getLayout ||
    ((page: ReactNode) => (
      <Landing>
        {page}
      </Landing>
    ));
  // seo
  const pageTitle =
    "Codeverta - Media Teknologi, Inovasi Digital & AI, Startup";
  const pageDescription = `Codeverta menyediakan jasa pembuatan, perbaikan, pengembangan website profesional dan layanan IT untuk mendorong pertumbuhan bisnis Anda di era digital untuk bisnis skala kecil sampai menengah.`;
  const ogImageUrl = "https://bikinwebsitejogja.com/og-image.png";
  const siteName = "Codeverta";
  const siteUrl = "https://bikinwebsitejogja.com";
  const twitterHandle = "@codeverta";
  const keywords =
    "jasa software, teknologi, inovasi digital, kecerdasan buatan, AI, software development, teknologi Indonesia, digitalisasi";

  return (
    <>
      <NextSeo
        title={pageTitle}
        description={pageDescription}
        openGraph={{
          title: pageTitle,
          description: pageDescription,
          images: [
            {
              url: ogImageUrl,
              alt: pageTitle,
            },
          ],
          url: siteUrl,
          type: "website",
          site_name: siteName,
        }}
        twitter={{
          handle: twitterHandle,
          site: siteUrl,
          cardType: "Media Teknologi, Inovasi Digital & AI",
        }}
        additionalMetaTags={[
          {
            name: "keywords",
            content: keywords,
          },
        ]}
      />

      {getLayout(<Component {...pageProps} {...appProps} />)}
    </>
  );
}

export default appWithTranslation(App);
