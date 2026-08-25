import fs from "fs";
import path from "path";

type ProjectData = {
  projects: any[];
};

function readProjectsFile(filePath: string): ProjectData | null {
  if (!fs.existsSync(filePath)) return null;

  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch (error) {
    console.error(`Failed to read projects file: ${filePath}`, error);
    return null;
  }
}

function getLocalizedProjectsFile(locale = "id") {
  const localeCandidates = [locale, locale.split("-")[0]].filter(Boolean);

  for (const candidate of localeCandidates) {
    const filePath = path.join(
      process.cwd(),
      "public",
      "locales",
      candidate,
      "projects.json"
    );

    if (fs.existsSync(filePath)) return filePath;
  }

  return null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function mergeProjectObject(base: any, localized: any): any {
  if (!isRecord(base) || !isRecord(localized)) return localized ?? base;

  const merged: Record<string, unknown> = { ...base };

  for (const [key, value] of Object.entries(localized)) {
    if (isRecord(value) && isRecord(merged[key])) {
      merged[key] = mergeProjectObject(merged[key], value);
    } else {
      merged[key] = value;
    }
  }

  return merged;
}

function mergeProjects(baseProjects: any[], localizedProjects: any[]) {
  const localizedById = new Map(
    localizedProjects.map((project) => [project?.product?.id, project])
  );
  const seenIds = new Set<string>();

  const merged = baseProjects.map((project) => {
    const id = project?.product?.id;
    seenIds.add(id);
    const localizedProject = localizedById.get(id);
    return localizedProject
      ? mergeProjectObject(project, localizedProject)
      : project;
  });

  for (const project of localizedProjects) {
    const id = project?.product?.id;
    if (!seenIds.has(id)) merged.push(project);
  }

  return merged;
}

export function getProjectsData(locale = "id"): ProjectData {
  const rootProjectsPath = path.join(process.cwd(), "projects.json");
  const rootData = readProjectsFile(rootProjectsPath) || { projects: [] };
  const localizedFilePath = getLocalizedProjectsFile(locale);

  if (!localizedFilePath) return rootData;

  const localizedData = readProjectsFile(localizedFilePath);
  if (!localizedData) return rootData;

  return {
    ...rootData,
    ...localizedData,
    projects: mergeProjects(
      rootData.projects || [],
      localizedData.projects || []
    ),
  };
}

export function getProjects(locale = "id") {
  return getProjectsData(locale).projects || [];
}

export function getLocalizedProjects(locale = "id") {
  if (locale === "id") return getProjects("id");
  const localizedFile = getLocalizedProjectsFile(locale);
  return localizedFile ? readProjectsFile(localizedFile)?.projects || [] : [];
}

export function getAvailableProjectIndexLocales() {
  return [
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
  ].filter(
    (locale) => locale === "id" || Boolean(getLocalizedProjectsFile(locale))
  );
}

export function getAllProjectIds() {
  return getProjects("id").map((project) => project.product.id);
}

export function getProjectById(id: string, locale = "id") {
  return getProjects(locale).find((project) => project.product.id === id);
}

export function getAvailableProjectLocales(id: string) {
  const locales = [
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
  ];

  return locales.filter(
    (locale) =>
      locale === "id" || getProjectContentLocale(id, locale) === locale
  );
}

export function getProjectContentLocale(id: string, locale = "id") {
  if (locale === "id") return "id";

  const localizedFilePath = getLocalizedProjectsFile(locale);
  const localizedData = localizedFilePath
    ? readProjectsFile(localizedFilePath)
    : null;
  const hasLocalizedProject = localizedData?.projects?.some(
    (project) => project?.product?.id === id
  );

  if (hasLocalizedProject) return locale;
  return "id";
}
