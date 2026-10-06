#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const definitionPath = path.resolve(scriptDir, "../references/contract-definition.json");
const definition = JSON.parse(fs.readFileSync(definitionPath, "utf8"));
const args = process.argv.slice(2);
const option = (name) => args.find((arg) => arg.startsWith(`${name}=`))?.slice(name.length + 1);
const contractPath = path.resolve(
  option("--file") ?? path.join(process.cwd(), "docs", "README.md")
);
const allowInactive = args.includes("--allow-inactive");
const allowArchived = args.includes("--allow-archived");
const skipTree = args.includes("--no-tree");
const jsonOnly = args.includes("--json");
const errors = [];
const warnings = [];

function scalar(raw) {
  const value = raw.trim();
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

function inlineList(raw) {
  const value = raw.trim();
  if (!value.startsWith("[") || !value.endsWith("]")) return null;
  const inside = value.slice(1, -1).trim();
  return inside ? inside.split(",").map((item) => scalar(item)) : [];
}

function parse(content) {
  const match = /^---\s*\r?\n([\s\S]*?)\r?\n---/.exec(content);
  if (!match) throw new Error("missing YAML frontmatter");
  const platform = {};
  const documentation = {};
  const platformKeys = new Set();
  const documentationKeys = new Set();
  let inDocumentation = false;
  let listKey = null;

  for (const sourceLine of match[1].split(/\r?\n/)) {
    const line = sourceLine.replace(/\s+$/, "");
    if (!line.trim() || line.trimStart().startsWith("#")) continue;
    if (/^documentation:\s*$/.test(line)) {
      inDocumentation = true;
      listKey = null;
      continue;
    }
    if (!/^\s/.test(line)) {
      inDocumentation = false;
      listKey = null;
      const top = /^(\w+):\s*(.+)$/.exec(line);
      if (top) {
        if (platformKeys.has(top[1])) errors.push(`duplicate platform field: ${top[1]}`);
        platformKeys.add(top[1]);
        platform[top[1]] = scalar(top[2]);
      }
      continue;
    }
    if (!inDocumentation) continue;

    const item = /^\s{4}-\s*(.+)$/.exec(line);
    if (item && listKey) {
      documentation[listKey].push(scalar(item[1]));
      continue;
    }
    const field = /^\s{2}([a-z_]+):\s*(.*)$/.exec(line);
    if (!field) {
      errors.push(`unsupported contract syntax: ${line.trim()}`);
      continue;
    }
    const [, key, raw] = field;
    if (documentationKeys.has(key)) errors.push(`duplicate documentation field: ${key}`);
    documentationKeys.add(key);
    if (raw.trim() === "") {
      documentation[key] = [];
      listKey = key;
    } else {
      documentation[key] = inlineList(raw) ?? scalar(raw);
      listKey = null;
    }
  }
  return { platform, documentation };
}

const duplicateValues = (values) => [
  ...new Set(values.filter((value, index) => values.indexOf(value) !== index)),
];
const normalizedFolderName = (name) =>
  name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/^\d+[-_]/, "");
const isRealIsoDate = (value) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day
  );
};

let parsed = { platform: {}, documentation: {} };
if (!fs.existsSync(contractPath)) {
  errors.push(`contract file does not exist: ${contractPath}`);
} else {
  try {
    parsed = parse(fs.readFileSync(contractPath, "utf8"));
  } catch (error) {
    errors.push(error.message);
  }
}

const { platform, documentation: contract } = parsed;
for (const field of ["title", "status", "updated_at"]) {
  if (!platform[field]) errors.push(`missing platform field: ${field}`);
}
if (platform.updated_at && !isRealIsoDate(platform.updated_at))
  errors.push("updated_at must be a real date using YYYY-MM-DD");
if (platform.status && !["published", "draft", "review", "archived"].includes(platform.status))
  errors.push(`unsupported status: ${platform.status}`);
if (platform.status === "archived" && !allowArchived) {
  errors.push(
    "contract status is archived; use --allow-archived only for an explicit historical audit or migration"
  );
} else if (["draft", "review"].includes(platform.status) && !allowInactive) {
  errors.push(`contract status is ${platform.status}; content generation requires published`);
}

const allowedKeys = definition.behavioralFields;
for (const key of Object.keys(contract))
  if (!allowedKeys.includes(key)) errors.push(`unknown documentation field: ${key}`);
for (const key of ["active_version", "lifecycle_stage", "deliverable_type", "sections"]) {
  if (
    contract[key] === undefined ||
    contract[key] === "" ||
    (Array.isArray(contract[key]) && contract[key].length === 0)
  )
    errors.push(`missing documentation field: ${key}`);
}

if (contract.active_version && !/^v[1-9]\d*$/.test(contract.active_version))
  errors.push("active_version must match vN with N >= 1");
if (contract.lifecycle_stage && !definition.lifecycleStages.includes(contract.lifecycle_stage))
  errors.push(`unsupported lifecycle_stage: ${contract.lifecycle_stage}`);
if (contract.deliverable_type && !definition.deliverableTypes.includes(contract.deliverable_type))
  errors.push(`unsupported deliverable_type: ${contract.deliverable_type}`);

if (contract.sections !== undefined && !Array.isArray(contract.sections)) {
  errors.push("sections must be a YAML list");
} else if (Array.isArray(contract.sections)) {
  for (const value of contract.sections)
    if (!definition.sections[value]) errors.push(`unsupported section: ${value}`);
  for (const value of duplicateValues(contract.sections))
    errors.push(`duplicate section: ${value}`);
}

const hasFunctional = Array.isArray(contract.sections) && contract.sections.includes("functional");
if (contract.functional_views !== undefined && !Array.isArray(contract.functional_views)) {
  errors.push("functional_views must be a YAML list");
}
if (
  hasFunctional &&
  (!Array.isArray(contract.functional_views) || contract.functional_views.length === 0)
) {
  errors.push("functional_views is required and non-empty when functional is enabled");
} else if (!hasFunctional && contract.functional_views !== undefined) {
  errors.push("functional_views must be omitted when functional is not enabled");
}
if (Array.isArray(contract.functional_views)) {
  for (const value of contract.functional_views)
    if (!definition.functionalViews[value]) errors.push(`unsupported functional view: ${value}`);
  for (const value of duplicateValues(contract.functional_views))
    errors.push(`duplicate functional view: ${value}`);
}

if (!skipTree && contract.active_version && fs.existsSync(contractPath)) {
  const versionRoot = path.join(path.dirname(contractPath), contract.active_version);
  if (!fs.existsSync(versionRoot) || !fs.statSync(versionRoot).isDirectory()) {
    errors.push(`active version folder does not exist: ${versionRoot}`);
  } else if (Array.isArray(contract.sections)) {
    const folders = fs
      .readdirSync(versionRoot, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => ({
        name: entry.name,
        normalized: normalizedFolderName(entry.name),
        path: path.join(versionRoot, entry.name),
      }));
    const hasContent = (folderPath) => {
      for (const entry of fs.readdirSync(folderPath, { withFileTypes: true })) {
        if (entry.isFile()) return true;
        if (entry.isDirectory() && hasContent(path.join(folderPath, entry.name))) return true;
      }
      return false;
    };
    if (contract.deliverable_type !== "offer") {
      for (const section of contract.sections) {
        const aliases = definition.sections[section].directoryAliases.map(normalizedFolderName);
        const matches = folders.filter((folder) => aliases.includes(folder.normalized));
        if (matches.length === 0)
          warnings.push(`declared section has no recognized folder yet: ${section}`);
        if (matches.length > 1) {
          warnings.push(
            `multiple folders match declared section ${section}: ${matches.map((folder) => folder.name).join(", ")}`
          );
        }
      }
      for (const [section, details] of Object.entries(definition.sections)) {
        if (contract.sections.includes(section)) continue;
        const aliases = details.directoryAliases.map(normalizedFolderName);
        if (
          folders.some((folder) => aliases.includes(folder.normalized) && hasContent(folder.path))
        ) {
          warnings.push(`populated section is not declared: ${section}`);
        }
      }
    }

    const functionalAliases =
      definition.sections.functional.directoryAliases.map(normalizedFolderName);
    const functionalFolder = folders.find((folder) =>
      functionalAliases.includes(folder.normalized)
    );
    if (functionalFolder && Array.isArray(contract.functional_views)) {
      const viewFolders = fs
        .readdirSync(functionalFolder.path, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => ({
          name: entry.name,
          normalized: normalizedFolderName(entry.name),
          path: path.join(functionalFolder.path, entry.name),
        }))
        .sort((left, right) => left.name.localeCompare(right.name));
      const aliasesByView = Object.fromEntries(
        Object.entries(definition.functionalViewDirectoryAliases).map(([view, aliases]) => [
          view,
          aliases.map(normalizedFolderName),
        ])
      );
      const recognized = viewFolders
        .map((folder) => ({
          ...folder,
          view: Object.entries(aliasesByView).find(([, aliases]) =>
            aliases.includes(folder.normalized)
          )?.[0],
        }))
        .filter((folder) => folder.view);

      for (const view of contract.functional_views) {
        const matches = recognized.filter((folder) => folder.view === view);
        if (matches.length === 0)
          warnings.push(`declared functional view has no recognized group yet: ${view}`);
        if (matches.length > 1) {
          warnings.push(
            `multiple groups match functional view ${view}: ${matches.map((folder) => folder.name).join(", ")}`
          );
        }
      }
      for (const folder of recognized) {
        if (!contract.functional_views.includes(folder.view) && hasContent(folder.path)) {
          warnings.push(`populated functional view is not declared: ${folder.view}`);
        }
      }

      const actualDeclaredOrder = recognized
        .map((folder) => folder.view)
        .filter((view) => contract.functional_views.includes(view));
      const expectedExistingOrder = contract.functional_views.filter((view) =>
        actualDeclaredOrder.includes(view)
      );
      if (actualDeclaredOrder.join(",") !== expectedExistingOrder.join(",")) {
        warnings.push(
          `functional view folder order differs from contract: actual ${actualDeclaredOrder.join(", ")}; expected ${expectedExistingOrder.join(", ")}`
        );
      }
    }
  }
}

const artifactSkills = Array.isArray(contract.sections)
  ? Object.keys(definition.sections)
      .filter((section) => contract.sections.includes(section))
      .map((section) => definition.sections[section].skill)
  : [];
const result = {
  valid: errors.length === 0,
  file: contractPath,
  platform,
  contract,
  resolved: {
    primaryFunctionalView: Array.isArray(contract.functional_views)
      ? (contract.functional_views[0] ?? null)
      : null,
    artifactSkills,
    functionalResources: Array.isArray(contract.functional_views)
      ? contract.functional_views.map((view) => definition.functionalViews[view]).filter(Boolean)
      : [],
    reviewModel: "docs-review-v2",
  },
  warnings,
  errors,
};

if (jsonOnly) {
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
} else {
  process.stdout.write(`${result.valid ? "VALID" : "INVALID"}: ${contractPath}\n`);
  for (const warning of warnings) process.stdout.write(`warning: ${warning}\n`);
  for (const error of errors) process.stderr.write(`error: ${error}\n`);
  if (result.valid) process.stdout.write(`${JSON.stringify(result.resolved, null, 2)}\n`);
}
process.exitCode = result.valid ? 0 : 1;
