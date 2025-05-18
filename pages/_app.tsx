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
  const getLayout = Component.getLayout || ((page: ReactNode) => page);
  // seo
  const pageTitle =
    "Produsen Lilin Terdekat di Jogja, Jakarta & Seluruh Indonesia";
  const pageDescription = `Million Candles adalah produsen lilin aromaterapi handmade dengan wangi menenangkan, cocok untuk dekorasi, kado, dan relaksasi. Tersedia pengiriman ke Jogja, Jakarta, Bandung, Bali, dan seluruh Indonesia.`;
  const ogImageUrl = "https://codeverta.com/og-image.png";
  const siteName = "UD Million Candles";
  const siteUrl = "https://codeverta.com";
  const twitterHandle = "@souvenirlilin";
  const keywords =
    "jual lilin, jual lilin jogja, lilin aromaterapi jogja, lilin batang, souvenir cantik, souvenir jogja, ud million candles, souvenir lilin, lilin warna, lilin hias, lilin berkualitas";

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
          cardType: "Jual Souvenir Lilin",
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
