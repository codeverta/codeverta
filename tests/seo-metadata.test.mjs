import assert from "node:assert/strict";
import test from "node:test";

const baseUrl = (
  process.env.SEO_TEST_BASE_URL || "http://127.0.0.1:3000"
).replace(/\/$/, "");

function attributes(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/([:\w-]+)=["']([^"']*)["']/g)].map((match) => [
      match[1].toLowerCase(),
      match[2],
    ])
  );
}

async function readMetadata(route) {
  const response = await fetch(`${baseUrl}${route}`, {
    headers: { "accept-language": "id" },
    redirect: "follow",
  });
  assert.equal(response.ok, true, `${route} returned HTTP ${response.status}`);

  const html = await response.text();
  const links = [...html.matchAll(/<link\b[^>]*>/gi)].map((match) =>
    attributes(match[0])
  );
  const metas = [...html.matchAll(/<meta\b[^>]*>/gi)].map((match) =>
    attributes(match[0])
  );

  return {
    html,
    title: html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] || "",
    canonical: links.filter((link) => link.rel === "canonical"),
    alternates: links.filter((link) => link.rel === "alternate"),
    descriptions: metas.filter((meta) => meta.name === "description"),
    robots: metas.filter((meta) => meta.name === "robots"),
    openGraph: metas.filter((meta) => meta.property?.startsWith("og:")),
    twitter: metas.filter((meta) => meta.name?.startsWith("twitter:")),
  };
}

const cases = [
  {
    route: "/",
    canonical: "https://www.codeverta.com",
    title: /Codeverta/i,
    description: /website|aplikasi|ERP/i,
  },
  {
    route: "/produk/point-of-sale",
    canonical: "https://www.codeverta.com/produk/point-of-sale",
    title: /POS|Kasir/i,
    description: /POS|stok|retail/i,
  },
];

for (const expected of cases) {
  test(`${expected.route} emits one effective SEO metadata set`, async () => {
    const metadata = await readMetadata(expected.route);

    assert.equal(metadata.canonical.length, 1);
    assert.equal(metadata.canonical[0].href, expected.canonical);
    assert.equal(metadata.descriptions.length, 1);
    assert.match(metadata.descriptions[0].content, expected.description);
    assert.equal(metadata.robots.length, 1);
    assert.match(
      metadata.robots[0].content,
      /^(index|noindex),(follow|nofollow)/
    );
    assert.match(metadata.title, expected.title);

    const alternatePairs = metadata.alternates.map(
      (link) => `${link.hreflang}|${link.href}`
    );
    assert.equal(new Set(alternatePairs).size, alternatePairs.length);
    assert.ok(metadata.alternates.some((link) => link.hreflang === "id"));
    assert.ok(
      metadata.alternates.some((link) => link.hreflang === "x-default")
    );

    assert.ok(metadata.openGraph.some((meta) => meta.property === "og:title"));
    assert.ok(metadata.twitter.some((meta) => meta.name === "twitter:card"));
    assert.match(metadata.html, /type=["']application\/ld\+json["']/i);
  });
}
