module.exports = {
  i18n: {
    defaultLocale: "id",
    locales: [
      "id",
      "en",
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
      "nl",
    ],
    localeDetection: false,
  },
  fallbackLng: {
    default: ["id"],
    nl: ["en"],
  },
  localePath: "./public/locales",
  reloadOnPrerender: process.env.NODE_ENV === "development",
};
