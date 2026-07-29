import "dotenv/config";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

const root = process.cwd();
const sourceId =
  "26-codeverta-membantu-digitalisasi-healthcare-indonesia-integrasi-satusehat";
const sourcePath = path.join(root, "blog", "blog", `${sourceId}.md`);
const source = await fs.readFile(sourcePath, "utf8");
const expectedImages = [...source.matchAll(/!\[[^\]]*]\(([^)]+)\)/g)].map(
  (match) => match[1]
);

const locales = [
  ["en-US", "English (United States)"],
  ["en-GB", "English (United Kingdom), using British spelling"],
  ["zh", "Simplified Chinese"],
  ["ja", "Japanese"],
  ["ko", "Korean"],
  ["ms", "Malay (Malaysia)"],
  ["de", "German"],
  ["fr", "French"],
  ["es", "Spanish"],
  ["ar", "Modern Standard Arabic"],
  ["hi", "Hindi"],
  ["th", "Thai"],
  ["vi", "Vietnamese"],
  ["ru", "Russian"],
  ["nl", "Dutch"],
];

const targetSlugs = {
  "en-US":
    "codeverta-healthcare-digitalization-indonesia-satusehat-integration",
  "en-GB":
    "codeverta-healthcare-digitalisation-indonesia-satusehat-integration",
  zh: "codeverta-yinni-yiliao-shuzi-hua-satusehat-jicheng",
  ja: "codeverta-indonesia-iryo-digital-ka-satusehat-togo",
  ko: "codeverta-indonesia-helseukeeo-dijiteolhwa-satusehat-tonghap",
  ms: "codeverta-pendigitalan-penjagaan-kesihatan-indonesia-integrasi-satusehat",
  de: "codeverta-digitalisierung-gesundheitswesen-indonesien-satusehat-integration",
  fr: "codeverta-numerisation-sante-indonesie-integration-satusehat",
  es: "codeverta-digitalizacion-salud-indonesia-integracion-satusehat",
  ar: "codeverta-raqmana-riaya-sihhiya-indunisia-satusehat",
  hi: "codeverta-indonesia-swasthya-seva-digitalikaran-satusehat-ekikaran",
  th: "codeverta-digital-healthcare-indonesia-satusehat-integration",
  vi: "codeverta-so-hoa-y-te-indonesia-tich-hop-satusehat",
  ru: "codeverta-cifrovizaciya-zdravoohraneniya-indonezii-integraciya-satusehat",
  nl: "codeverta-digitalisering-gezondheidszorg-indonesie-satusehat-integratie",
};

if (!process.env.DEEPSEEK_API_KEY) {
  throw new Error("DEEPSEEK_API_KEY is not configured.");
}

const deepseekEndpoint = "https://api.deepseek.com/chat/completions";
const deepseekModel = "deepseek-v4-flash";

function cleanMarkdown(value) {
  return value
    .replace(/^```(?:markdown)?\s*\n/i, "")
    .replace(/\n```\s*$/i, "")
    .trim()
    .concat("\n");
}

function validate(markdown, locale) {
  const errors = [];
  let frontmatter;
  try {
    frontmatter = matter(markdown).data;
  } catch (error) {
    errors.push(`invalid YAML frontmatter: ${error.message}`);
  }
  const images = [...markdown.matchAll(/!\[[^\]]*]\(([^)]+)\)/g)].map(
    (match) => match[1]
  );

  if (frontmatter?.translationOf !== sourceId) {
    errors.push("missing or incorrect translationOf");
  }
  if (!frontmatter?.title || !frontmatter?.desc || !frontmatter?.tags) {
    errors.push("required frontmatter fields are missing");
  }
  if (!markdown.startsWith("---\n")) {
    errors.push("missing frontmatter");
  }
  if (images.length !== expectedImages.length) {
    errors.push(
      `expected ${expectedImages.length} images, found ${images.length}`
    );
  }
  if (JSON.stringify(images) !== JSON.stringify(expectedImages)) {
    errors.push("image paths or order changed");
  }
  if (!markdown.includes("https://satusehat.kemkes.go.id/")) {
    errors.push("official SATUSEHAT links missing");
  }
  const minimumLengthRatio = locale === "zh" ? 0.25 : 0.45;
  if (markdown.length < source.length * minimumLengthRatio) {
    errors.push("translation is unexpectedly short");
  }

  if (errors.length) {
    throw new Error(`${locale}: ${errors.join("; ")}`);
  }
}

async function translate(locale, language) {
  const targetDir = path.join(root, "blog", "blog", locale);
  const targetPath = path.join(targetDir, `${targetSlugs[locale]}.md`);
  try {
    const existing = await fs.readFile(targetPath, "utf8");
    validate(existing, locale);
    console.log(`SKIP ${locale} ${targetPath}`);
    return;
  } catch {
    // Generate the missing translation or replace an invalid partial result.
  }

  const prompt = `Translate the complete Markdown article below from Indonesian into ${language}.

Requirements:
- Return only the complete translated Markdown document. Do not use a code fence and do not add commentary.
- Preserve the YAML frontmatter structure. Translate title, desc, and tags naturally for local search intent.
- Keep date and image unchanged.
- Add this exact frontmatter field before the closing delimiter:
translationOf: "${sourceId}"
- The YAML frontmatter must begin and end with a line containing exactly three hyphens (---).
- Translate every heading, paragraph, list item, image alt text, and italic image caption. Do not summarise, shorten, expand, or omit anything.
- Write fluent editorial prose that sounds native and human, not literal machine translation.
- Keep Codeverta, SATUSEHAT, Kementerian Kesehatan, RME, HL7 FHIR, API, IHS Number, Master Patient Index, sandbox, production, HTTP, and all FHIR resource names unchanged.
- Preserve all Markdown formatting, every image path, every URL, and the order of all 17 body images exactly.
- Do not translate text inside inline code.
- Preserve the factual distinction that SATUSEHAT is managed by Indonesia's Ministry of Health and Codeverta helps healthcare facilities and RME systems prepare and integrate.

SOURCE:
${source}`;

  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(deepseekEndpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: deepseekModel,
          messages: [
            {
              role: "system",
              content:
                "You are a professional editorial translator. Return only the requested Markdown document.",
            },
            { role: "user", content: prompt },
          ],
          temperature: 0.2,
          max_tokens: 8192,
          stream: false,
        }),
      });

      if (!response.ok) {
        const details = (await response.text()).slice(0, 500);
        throw new Error(`DeepSeek HTTP ${response.status}: ${details}`);
      }

      const result = await response.json();
      const translated = cleanMarkdown(
        result.choices?.[0]?.message?.content || ""
      );
      validate(translated, locale);
      await fs.mkdir(targetDir, { recursive: true });
      await fs.writeFile(targetPath, translated, "utf8");
      console.log(`DONE ${locale} ${targetPath}`);
      return;
    } catch (error) {
      lastError = error;
      console.error(`RETRY ${locale} ${attempt}: ${error.message}`);
    }
  }
  throw lastError;
}

const concurrency = 2;
for (let index = 0; index < locales.length; index += concurrency) {
  await Promise.all(
    locales
      .slice(index, index + concurrency)
      .map(([locale, language]) => translate(locale, language))
  );
}

console.log(`Translated ${locales.length} locales.`);
