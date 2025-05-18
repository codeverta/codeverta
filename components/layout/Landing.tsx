import React, { useEffect } from "react";
import Head from "next/head";
import Footer from "components/Footer";
import { useRouter } from "next/router";
import Navbar from "@/components/navbar";

const DOMAIN = "https://www.codeverta.com";
interface Props {
  children: React.ReactNode;
}

export default function Landing({ children }: Props) {
  const router = useRouter();
  const canonicalUrl = `${DOMAIN}${router.asPath.split("?")[0]}`;

  return (
    <>
      <Head>
        <link rel="canonical" href={canonicalUrl} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* <meta property="og:type" content="website" />
        <meta property="fb:app_id" content="YOUR_FACEBOOK_APP_ID" / */}
      </Head>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
