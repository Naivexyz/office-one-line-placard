// Office Artifacts: The One-Line Placard Contest
// Entry program (program/v1): writes a single one-line museum placard
// for an ordinary office object, treated as an ancient artifact,
// to /output/entry.txt (UTF-8, 1-180 characters, non-blank).
//
// The placard: a stapler recast as a ritual binding instrument.
// Catalogue details (date, material, count, rite, omen) sell the joke
// in a deadpan curator's voice; every word earns its place.

import { mkdirSync, writeFileSync, chmodSync, readFileSync } from "node:fs";

const PLACARD =
  "Stapler, c. 1987, steel. Bound 4,112 contracts in the Rite of the Signature; its jam, on the third Tuesday, was read as an omen.";

const OUT_DIR = "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

function main(): void {
  const chars = [...PLACARD].length;
  if (chars < 1 || chars > 180) {
    throw new Error(`placard must be 1-180 characters, got ${chars}`);
  }
  if (PLACARD.trim().length === 0) {
    throw new Error("placard must not be only whitespace");
  }
  if (PLACARD.includes("\n") || PLACARD.includes("\r")) {
    throw new Error("placard must be a single line");
  }
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, PLACARD, "utf8");
  chmodSync(OUT_FILE, 0o644);
  // Read the file back and re-check it: the gate reads the file, not the
  // constant, so the program must prove what it actually wrote is valid.
  const written = readFileSync(OUT_FILE, "utf8");
  if (written !== PLACARD) {
    throw new Error("read-back mismatch: /output/entry.txt differs from the placard");
  }
  if ([...written].length > 180 || written.trim().length === 0) {
    throw new Error("written placard fails the 1-180 character gate");
  }
  console.log(`wrote ${OUT_FILE} (${chars} characters)`);
}

main();
