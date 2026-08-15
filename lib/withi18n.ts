import type { GetStaticProps, GetStaticPropsContext } from "next/dist/types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export function withI18n(
  namespaces = ["common"],
  gssp: GetStaticProps | null = null
) {
  return async (context: GetStaticPropsContext) => {
    const locale = context.locale ?? context.defaultLocale ?? "id";
    const i18nProps = await serverSideTranslations(locale, namespaces);

    // Jika ada logic getStaticProps tambahan di halaman
    const pageProps = gssp ? await gssp(context) : { props: {} };

    if ("redirect" in pageProps || "notFound" in pageProps) {
      return pageProps;
    }

    return {
      ...pageProps,
      props: {
        ...i18nProps,
        ...pageProps.props,
      },
    };
  };
}
