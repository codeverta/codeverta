const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const localeDirectory = path.join(root, "public/locales");
const baseProjects = JSON.parse(
  fs.readFileSync(path.join(root, "projects.json"), "utf8")
).projects;
const visibleProjects = baseProjects.slice(0, 6);

function readProjects(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8")).projects || [];
  } catch {
    return [];
  }
}

for (const locale of fs.readdirSync(localeDirectory)) {
  const localePath = path.join(localeDirectory, locale);
  if (!fs.statSync(localePath).isDirectory()) continue;

  const translations = readProjects(path.join(localePath, "projects.json"));
  const byId = new Map(
    translations.map((project) => [project?.product?.id, project])
  );

  const navigation = {
    projects: visibleProjects.map((baseProject) => {
      const id = baseProject?.product?.id;
      const translated = byId.get(id) || baseProject;
      const product = translated.product || baseProject.product;

      return {
        name: translated.name || product.name || baseProject.product.name,
        product: {
          id,
          name: product.name || baseProject.product.name,
          description:
            product.description || baseProject.product.description || "",
          image: product.image || baseProject.product.image,
        },
      };
    }),
  };

  fs.writeFileSync(
    path.join(localePath, "navigation.json"),
    `${JSON.stringify(navigation)}\n`
  );
}
