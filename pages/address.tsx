// import { useRef, useEffect } from 'react'
import dynamic from "next/dynamic";
import Layout from "components/layout/Landing";
import Head from "next/head";
import AdSense from "components/AdSense";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
const DynamicMap = dynamic(() => import("components/Map"), {
  ssr: false,
});

function Address(props: any) {
  return (
    <main>
      <Head>
        <title>
          Alamat Kami | UD Codeverta - Produsen Lilin Aromaterapi Souvenir
          Lilin Jogja, Lilin Warna, Lilin Hias dan Lain-lain
        </title>
      </Head>
      <DynamicMap {...props} />
      <AdSense />
    </main>
  );
}

Address.getLayout = function (page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "order"])), // <- fixed to load 'order' not 'common'
    },
  };
}

export default Address;
