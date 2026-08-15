import "../styles/globals.css";
import type { AppProps, AppLayoutProps } from "next/app";
import { getRelationship, getRelationships } from "utils";
import packageInfo from "../package.json";
import { appWithTranslation } from "next-i18next";
import Landing from "@/components/layout/Landing";
import { GAScript, useGAPageView } from "@/components/GAScript";

if (typeof window !== "undefined") {
  // @ts-ignore
  window.version = packageInfo.version;
}

function App({ Component, pageProps }: AppLayoutProps) {
  const appProps = { getRelationship, getRelationships };
  const page = <Component {...pageProps} {...appProps} />;
  const pageWithLayout = Component.getLayout ? (
    Component.getLayout(page)
  ) : (
    <Landing
      localizedPaths={pageProps.localizedPaths}
      availableLocales={pageProps.availableLocales}
    >
      {page}
    </Landing>
  );

  // GA page view tracking
  useGAPageView();

  return (
    <>
      <GAScript />
      {pageWithLayout}
    </>
  );
}

export default appWithTranslation(App);
