import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";

const require = createRequire(import.meta.url);
const { i18n } = require("../next-i18next.config.js");
const baseUrl = (
  process.env.HTML_LANG_BASE_URL || "http://127.0.0.1:3000"
).replace(/\/$/, "");

function getHtmlLanguage(html) {
  return html.match(/<html\b[^>]*\blang=["']([^"']+)["']/i)?.[1] || null;
}

async function getServerRenderedLanguage(
  route,
  acceptLanguage,
  extraHeaders = {}
) {
  const response = await fetch(`${baseUrl}${route}`, {
    headers: { "accept-language": acceptLanguage, ...extraHeaders },
    redirect: "follow",
  });

  assert.equal(response.ok, true, `${route} returned HTTP ${response.status}`);
  return getHtmlLanguage(await response.text());
}

test("an English browser visiting an unprefixed page is sent to English", async () => {
  assert.equal(await getServerRenderedLanguage("/about", "en-US"), "en");
});

test("a Swedish browser falls back to English", async () => {
  assert.equal(await getServerRenderedLanguage("/products", "sv-SE,sv"), "en");
});

test("a saved Indonesian choice overrides automatic detection", async () => {
  assert.equal(
    await getServerRenderedLanguage("/", "en-US", {
      cookie: "NEXT_LOCALE=id",
    }),
    "id"
  );
});

test("a Swedish visitor with an Indonesian browser sees English", async () => {
  assert.equal(
    await getServerRenderedLanguage("/", "id-ID", {
      "cf-ipcountry": "SE",
    }),
    "en"
  );
});

test("an Indonesian browser on the default route stays Indonesian", async () => {
  assert.equal(await getServerRenderedLanguage("/", "id-ID"), "id");
});

for (const locale of i18n.locales) {
  const route = locale === i18n.defaultLocale ? "/" : `/${locale}`;

  test(`SSR uses lang="${locale}" for ${route}`, async () => {
    assert.equal(await getServerRenderedLanguage(route, locale), locale);
  });
}
