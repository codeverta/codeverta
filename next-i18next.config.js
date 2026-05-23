module.exports = {
  i18n: {
    defaultLocale: "id",
    locales: [
      "id",
      "en-US",
      "en-GB",
      "zh",
      "ja",
      "ko",
      "ms",
      "de",
      "fr",
      "es",
      "ar",
      "hi",
      "th",
      "vi",
      "ru",
    ],
    localeDetection: false,
  },
  fallbackLng: {
    default: ["id"],
    "en-GB": ["en-US"],
  },
  localePath: "./public/locales",
  reloadOnPrerender: process.env.NODE_ENV === "development",
};
