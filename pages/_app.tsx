import "../styles/globals.css";
import type { AppProps, AppLayoutProps } from "next/app";
import { getRelationship, getRelationships } from "utils";
import { NextSeo } from "next-seo";
import packageInfo from "../package.json";
import { appWithTranslation } from "next-i18next";
import Landing from "@/components/layout/Landing";
import { buildSeoMeta, getAlternateLinks, SITE_NAME } from "@/lib/seo";
import { useRouter } from "next/router";
import { GAScript, useGAPageView } from "@/components/GAScript";

if (typeof window !== "undefined") {
  // @ts-ignore
  window.version = packageInfo.version;
}

function App({ Component, pageProps }: AppLayoutProps) {
  const router = useRouter();
  const appProps = { getRelationship, getRelationships };
  const seo = buildSeoMeta({
    locale: router.locale,
    path: router.asPath,
  });
  const page = <Component {...pageProps} {...appProps} />;
  const pageWithLayout = Component.getLayout ? (
    Component.getLayout(page)
  ) : (
    <Landing localizedPaths={pageProps.localizedPaths}>{page}</Landing>
  );

  // GA page view tracking
  useGAPageView();

  return (
    <>
      <GAScript />
      <NextSeo
        title={seo.title}
        description={seo.description}
        canonical={seo.canonical}
        openGraph={{
          title: seo.title,
          description: seo.description,
          images: [
            {
              url: seo.image,
              width: 1200,
              height: 630,
              alt: seo.title,
            },
          ],
          url: seo.canonical,
          type: "website",
          site_name: SITE_NAME,
          locale: seo.ogLocale,
        }}
        twitter={{
          handle: "@codeverta",
          site: "@codeverta",
          cardType: "summary_large_image",
        }}
        additionalMetaTags={[
          {
            name: "keywords",
            content: seo.keywords,
          },
          {
            name: "robots",
            content: "index,follow",
          },
          {
            httpEquiv: "content-language",
            content: seo.locale,
          } as any,
          {
            name: "author",
            content: SITE_NAME,
          },
        ]}
        additionalLinkTags={getAlternateLinks(seo.path)}
      />

      {pageWithLayout}
    </>
  );
}

export default appWithTranslation(App);
