import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export async function getServerSideProps(context: {
  locale?: string;
  locales?: string[];
}) {
  const locale =
    context.locale && context.locales?.includes(context.locale)
      ? context.locale
      : "id";
  const content = await readFile(
    join(process.cwd(), "public", "locales", locale, "common.json"),
    "utf8"
  );
  const translations = JSON.parse(content);
  const message = translations.ui.whatsapp.defaultMessage as string;

  return {
    redirect: {
      destination: buildWhatsAppLink(message),
      permanent: false,
    },
  };
}

export default function WhatsappRedirect() {
  return null;
}
