import "../styles/globals.css";
import type { AppProps, AppLayoutProps } from "next/app";
import { getRelationship, getRelationships } from "utils";
import { ReactNode } from "react";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTimeFormat from "dayjs/plugin/relativeTime";
import indoFormat from "dayjs/locale/id";
import { NextSeo } from "next-seo";
import packageInfo from "../package.json";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { appWithTranslation } from "next-i18next";
import Landing from "@/components/layout/Landing";

dayjs.locale(indoFormat);
dayjs.extend(localizedFormat);
dayjs.extend(relativeTimeFormat);

if (typeof window !== "undefined") {
  // @ts-ignore
  window.version = packageInfo.version;
}

const steps = [
  {
    selector: ".first-step",
    content: "Klik untuk memunculkan menu",
  },
  {
    selector: ".second-step",
    content: "Kode Order",
  },
  {
    selector: ".third-step",
    content: "Status Order",
  },
  {
    selector: ".fourth-step",
    content: "Daftar Menu",
  },
];

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
  const pageDescription = `Codeverta adalah platform media digital yang berfokus pada dunia teknologi, inovasi digital, kecerdasan buatan, pengembangan perangkat lunak, dan masa depan industri digital. Kami menyajikan berita, opini, dan analisis yang relevan dan akurat untuk para profesional, pelajar, dan penggiat teknologi di Indonesia.`;
  const ogImageUrl = "https://codeverta.com/og-image.png";
  const siteName = "Codeverta";
  const siteUrl = "https://codeverta.com";
  const twitterHandle = "@codeverta";
  const keywords =
    "media teknologi, berita teknologi, inovasi digital, kecerdasan buatan, AI, software development, teknologi Indonesia, startup, tren teknologi, digitalisasi";

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
