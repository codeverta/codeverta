import React from "react";

// WhatsApp Icon Component (since we can't import from MUI)
export const WhatsAppIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516" />
  </svg>
);

const InstagramIcon = ({ size = 28 }) => (
  <svg
    role="img"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Instagram</title>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);

const FacebookIcon = ({ size = 28 }) => (
  <svg
    role="img"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Facebook</title>
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
  </svg>
);

export const handleRedirectToWhatsapp = () => {
  window.location.replace(
    "https://wa.me/+6285601347820?text=Halo%20saya%20tertarik%20dengan%20produk%20website%20Anda"
  );
};

export const WhatsappWrapper = ({ children, title = "" }) => {
  return <a href={"/whatsappRedirect"}>{children}</a>;
};

const WhatsAppButton = () => {
  const instagramUsername = "bikinwebsitejogja";
  const facebookUsername = "bikinwebsiteejogja";
  // --- ---

  const handleRedirect = (platform) => {
    let url = "";
    switch (platform) {
      case "whatsapp":
        url = `/whatsappRedirect`;
        break;
      case "instagram":
        url = `https://instagram.com/${instagramUsername}`;
        break;
      case "facebook":
        url = `https://facebook.com/${facebookUsername}`;
        break;
      default:
        return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };
  return (
    <>
      <div className="fixed bottom-6 right-6 flex flex-col items-center space-y-4 z-50">
        {/* Tombol Facebook */}
        <button
          onClick={() => handleRedirect("facebook")}
          className="cursor-pointer text-white p-2 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110"
          style={{
            background: "linear-gradient(135deg, #1877F2 0%, #3b5998 100%)",
            boxShadow: "0 8px 25px rgba(24, 119, 242, 0.3)",
          }}
          aria-label="Kunjungi Facebook kami"
        >
          <FacebookIcon size={18} />
        </button>

        {/* Tombol Instagram */}
        {/* <button
          onClick={() => handleRedirect("instagram")}
          className="cursor-pointer text-white p-2 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110"
          style={{
            background:
              "linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)",
            boxShadow: "0 8px 25px rgba(253, 29, 29, 0.3)",
          }}
          aria-label="Kunjungi Instagram kami"
        >
          <InstagramIcon size={18} />
        </button> */}
        {/* Tombol WhatsApp */}
        <button
          onClick={() => handleRedirect("whatsapp")}
          className="cursor-pointer text-white p-2 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110"
          style={{
            background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
            boxShadow: "0 8px 25px rgba(37, 211, 102, 0.3)",
          }}
          aria-label="Hubungi via WhatsApp"
        >
          <WhatsAppIcon />
        </button>
      </div>
    </>
  );
};

export default WhatsAppButton;
