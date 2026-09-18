export const WHATSAPP_NUMBER = "6285601347820";

export function buildWhatsAppLink(
  message: string,
  phoneNumber = WHATSAPP_NUMBER
) {
  const internationalNumber = phoneNumber.replace(/\D/g, "");
  return `https://wa.me/${internationalNumber}?text=${encodeURIComponent(
    message
  )}`;
}
