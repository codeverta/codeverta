import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export function withI18n(
  namespaces = ["common"],
  gssp: GetStaticProps | null = null
) {
  return async (context) => {
    const { locale } = context;
    const i18nProps = await serverSideTranslations(locale, namespaces);

    // Jika ada logic getStaticProps tambahan di halaman
    const pageProps = gssp ? await gssp(context) : { props: {} };

    return {
      ...pageProps,
      props: {
        ...i18nProps,
        ...pageProps.props,
      },
    };
  };
}
