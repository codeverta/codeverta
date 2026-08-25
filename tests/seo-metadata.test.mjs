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
    head: html.split(/<\/head>/i)[0],
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
    route: "/products/point-of-sale",
    canonical: "https://www.codeverta.com/products/point-of-sale",
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

test("Japanese product recommendations use valid Japanese articles", async () => {
  const response = await fetch(`${baseUrl}/ja/products/e-commerce-platform`, {
    redirect: "follow",
  });
  assert.equal(response.ok, true);

  const html = await response.text();
  assert.match(html, /Codevertaとインドネシア医療のデジタル化/);
  assert.doesNotMatch(html, /Coba Baca Artikel/);
  assert.doesNotMatch(
    html,
    /26-codeverta-membantu-digitalisasi-healthcare-indonesia-integrasi-satusehat/
  );

  const articlePath = html.match(/href=["'](\/ja\/blog\/[^"']+)["']/)?.[1];
  assert.ok(articlePath, "Japanese product page has no Japanese article link");

  const articleResponse = await fetch(`${baseUrl}${articlePath}`);
  assert.equal(
    articleResponse.ok,
    true,
    `${articlePath} returned HTTP ${articleResponse.status}`
  );
});

test("legacy localized product URLs redirect permanently to /products", async () => {
  const response = await fetch(`${baseUrl}/ja/produk/e-commerce-platform`, {
    redirect: "manual",
  });

  assert.ok([301, 308].includes(response.status));
  assert.equal(
    new URL(response.headers.get("location"), baseUrl).pathname,
    "/ja/products/e-commerce-platform"
  );
});

for (const expected of [
  {
    locale: "zh",
    title: /定制开发服务.*上海/,
    description: /上海.*北京.*深圳/,
  },
  {
    locale: "ja",
    title: /開発サービス.*東京/,
    description: /東京.*大阪.*名古屋/,
  },
  {
    locale: "en",
    title: /Development in New York/,
    description: /New York.*San Francisco.*London/,
  },
]) {
  test(`${expected.locale} product metadata uses its localized market`, async () => {
    const metadata = await readMetadata(
      `/${expected.locale}/products/gym-management-system`
    );

    assert.match(metadata.title, expected.title);
    assert.doesNotMatch(metadata.title, /Jasa Pembuatan/);
    assert.match(metadata.descriptions[0].content, expected.description);
    assert.doesNotMatch(metadata.descriptions[0].content, /Jl\.? Kaliurang/i);
    assert.doesNotMatch(metadata.descriptions[0].content, /Ngaglik/i);
    assert.doesNotMatch(metadata.head, /Jl\.? Kaliurang/i);
    assert.doesNotMatch(metadata.head, /Ngaglik/i);
    assert.doesNotMatch(metadata.head, /Jasa Pembuatan/);
  });
}
