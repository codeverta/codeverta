import { handleRedirectToWhatsapp } from "@/components/WhatsappButton";
import React, { useEffect } from "react";
import { useTranslation } from "next-i18next";
import { withI18n } from "@/lib/withi18n";

export const getStaticProps = withI18n(["common"]);

function WhatsappRedirect() {
  const { t } = useTranslation("common");
  const message = t("ui.whatsapp.defaultMessage");

  useEffect(() => {
    handleRedirectToWhatsapp(message);
  }, [message]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">Redirecting...</p>
        <p className="text-gray-500 text-sm mt-2">
          Taking you to your destination
          <span
            onClick={() => handleRedirectToWhatsapp(message)}
            className="hover:underline"
          >
            Click here
          </span>{" "}
          if not redirected automatically.
        </p>
      </div>
    </div>
  );
}

export default WhatsappRedirect;
