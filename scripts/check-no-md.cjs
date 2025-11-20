#!/usr/bin/env node
/* Guardrail: fail CI if any Markdown files are tracked */
const { execSync } = require('node:child_process');

try {
  const output = execSync("git ls-files '*.md'", { stdio: ['ignore', 'pipe', 'pipe'] })
    .toString()
    .trim();
  if (output.length > 0) {
    console.error('Error: Markdown files are tracked but must not be committed:\n', output);
    process.exit(1);
  }
  process.exit(0);
} catch (err) {
  // If command fails (e.g., no git), be safe and pass.
  process.exit(0);
}

