import type { GetServerSideProps } from "next";
import { getLegacyPostDestination } from "@/lib/posts";

export default function LegacyPostRedirect() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = String(params?.id || "");
  const destination = getLegacyPostDestination(id);

  return destination
    ? { redirect: { destination, permanent: true } }
    : { notFound: true };
};
