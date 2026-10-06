#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";

export const DIMENSIONS = Object.freeze([
  "evidence_correctness",
  "declared_scope_coverage",
  "traceability_consistency",
  "reader_value_top_down",
  "maintainability",
]);

export const LIFECYCLE_WEIGHTS = Object.freeze({
  discovery: Object.freeze({
    evidence_correctness: 25,
    declared_scope_coverage: 25,
    traceability_consistency: 20,
    reader_value_top_down: 20,
    maintainability: 10,
  }),
  "implementation-ready": Object.freeze({
    evidence_correctness: 30,
    declared_scope_coverage: 25,
    traceability_consistency: 25,
    reader_value_top_down: 10,
    maintainability: 10,
  }),
  "as-built": Object.freeze({
    evidence_correctness: 35,
    declared_scope_coverage: 20,
    traceability_consistency: 20,
    reader_value_top_down: 15,
    maintainability: 10,
  }),
});

const DELIVERABLE_TYPES = new Set(["documentation", "offer"]);
const SEVERITIES = new Set(["blocker", "major", "minor"]);
const STATUSES = new Set(["open", "fixed", "accepted-risk", "rejected-invalid"]);

function fail(message) {
  throw new Error(message);
}

function requireObject(value, label) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    fail(`${label} must be an object`);
  }
}

function requireNonEmptyString(value, label) {
  if (typeof value !== "string" || value.trim() === "") {
    fail(`${label} must be a non-empty string`);
  }
}

export function resolveWeights(lifecycleStage, deliverableType) {
  if (!Object.hasOwn(LIFECYCLE_WEIGHTS, lifecycleStage)) {
    fail(`unknown lifecycleStage: ${String(lifecycleStage)}`);
  }
  if (!DELIVERABLE_TYPES.has(deliverableType)) {
    fail(`unknown deliverableType: ${String(deliverableType)}`);
  }

  const weights = { ...LIFECYCLE_WEIGHTS[lifecycleStage] };
  if (deliverableType === "offer") {
    weights.traceability_consistency -= 5;
    weights.reader_value_top_down += 5;
  }

  const total = Object.values(weights).reduce((sum, weight) => sum + weight, 0);
  if (total !== 100) {
    fail(`resolved weights must total 100, received ${total}`);
  }
  return weights;
}

export function bandForScore(score) {
  if (!Number.isInteger(score) || score < 0 || score > 100) {
    fail("score must be an integer from 0 to 100");
  }
  if (score >= 90) return "Ready";
  if (score >= 80) return "Ready with minor fixes";
  if (score >= 60) return "Revise before approval";
  return "Not ready";
}

function validateDimensions(dimensions) {
  requireObject(dimensions, "dimensions");
  const supplied = Object.keys(dimensions);
  const missing = DIMENSIONS.filter((key) => !Object.hasOwn(dimensions, key));
  const unknown = supplied.filter((key) => !DIMENSIONS.includes(key));
  if (missing.length > 0) fail(`missing dimension ratings: ${missing.join(", ")}`);
  if (unknown.length > 0) fail(`unknown dimension ratings: ${unknown.join(", ")}`);

  for (const key of DIMENSIONS) {
    const rating = dimensions[key];
    if (!Number.isInteger(rating) || rating < 0 || rating > 4) {
      fail(`dimensions.${key} must be an integer from 0 to 4`);
    }
  }
}

function validateFindings(findings) {
  if (!Array.isArray(findings)) fail("findings must be an array");
  const ids = new Set();

  for (const [index, finding] of findings.entries()) {
    const label = `findings[${index}]`;
    requireObject(finding, label);
    requireNonEmptyString(finding.id, `${label}.id`);
    if (!/^F-\d{3,}$/.test(finding.id)) {
      fail(`${label}.id must match F-NNN`);
    }
    if (ids.has(finding.id)) fail(`duplicate finding id: ${finding.id}`);
    ids.add(finding.id);

    if (!SEVERITIES.has(finding.severity)) {
      fail(`${label}.severity must be blocker, major, or minor`);
    }
    if (!STATUSES.has(finding.status)) {
      fail(`${label}.status must be open, fixed, accepted-risk, or rejected-invalid`);
    }
    requireNonEmptyString(finding.targetSkill, `${label}.targetSkill`);

    if (finding.status === "fixed" && finding.rechecked !== true) {
      fail(`${label} cannot be fixed without rechecked: true`);
    }
    if (finding.status === "accepted-risk") {
      requireNonEmptyString(finding.rationale, `${label}.rationale`);
    }
    if (finding.status === "rejected-invalid") {
      requireNonEmptyString(finding.rationale, `${label}.rationale`);
    }
  }
}

export function calculateReviewScore(input) {
  requireObject(input, "input");
  const { lifecycleStage, deliverableType, dimensions, findings = [] } = input;

  const weights = resolveWeights(lifecycleStage, deliverableType);
  validateDimensions(dimensions);
  validateFindings(findings);

  const weightedValue = DIMENSIONS.reduce(
    (sum, key) => sum + (dimensions[key] / 4) * weights[key],
    0
  );
  const rawScore = Math.round(weightedValue);

  const openBlockers = findings.filter(
    (finding) => finding.status === "open" && finding.severity === "blocker"
  );
  const openMajors = findings.filter(
    (finding) => finding.status === "open" && finding.severity === "major"
  );
  const appliedCap = openBlockers.length > 0 ? 49 : openMajors.length > 0 ? 79 : null;
  const capReasons = (openBlockers.length > 0 ? openBlockers : openMajors).map(
    (finding) => finding.id
  );
  const finalScore = appliedCap === null ? rawScore : Math.min(rawScore, appliedCap);

  const findingCounts = {
    total: findings.length,
    open: findings.filter((finding) => finding.status === "open").length,
    fixed: findings.filter((finding) => finding.status === "fixed").length,
    acceptedRisk: findings.filter((finding) => finding.status === "accepted-risk").length,
    rejectedInvalid: findings.filter((finding) => finding.status === "rejected-invalid").length,
    scoreRelevant: findings.filter((finding) => finding.status !== "rejected-invalid").length,
  };

  return {
    reviewModel: "docs-review-v2",
    lifecycleStage,
    deliverableType,
    weights,
    dimensionScores: { ...dimensions },
    rawScore,
    appliedCap,
    capReasons,
    finalScore,
    band: bandForScore(finalScore),
    findingCounts,
  };
}

function usage() {
  return [
    "Usage: node score-review.mjs [--input <file>] [--pretty]",
    "Without --input, JSON is read from standard input.",
  ].join("\n");
}

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

async function runCli(argv) {
  let inputPath;
  let pretty = false;

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--help" || argument === "-h") {
      process.stdout.write(`${usage()}\n`);
      return;
    }
    if (argument === "--pretty") {
      pretty = true;
      continue;
    }
    if (argument === "--input" || argument === "-i") {
      index += 1;
      if (!argv[index]) fail(`${argument} requires a file path`);
      if (inputPath) fail("only one input file may be supplied");
      inputPath = argv[index];
      continue;
    }
    if (!argument.startsWith("-") && !inputPath) {
      inputPath = argument;
      continue;
    }
    fail(`unknown argument: ${argument}`);
  }

  const source = inputPath ? await readFile(resolve(inputPath), "utf8") : await readStdin();
  if (source.trim() === "") fail("score input is empty");

  let input;
  try {
    input = JSON.parse(source);
  } catch (error) {
    fail(`input is not valid JSON: ${error.message}`);
  }

  const output = calculateReviewScore(input);
  process.stdout.write(`${JSON.stringify(output, null, pretty ? 2 : 0)}\n`);
}

const isEntrypoint =
  process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url;

if (isEntrypoint) {
  runCli(process.argv.slice(2)).catch((error) => {
    process.stderr.write(`score-review: ${error.message}\n`);
    process.exitCode = 1;
  });
}
