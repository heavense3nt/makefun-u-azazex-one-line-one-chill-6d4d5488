import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, join } from "node:path";
import { fileURLToPath } from "node:url";

// One line of horror: a single sentence, under 200 characters.
// Concrete image (ultrasound, two heartbeats), a specific human reaction
// (the nurse going pale), and a twist that reframes everything in the
// last words -- neither heartbeat belongs to my baby, so something else
// with a heartbeat is inside me. No mirror, no doll, no basement, no
// announced fear: the dread is that the scare is still in the room --
// in the body -- after the line ends.
const ENTRY =
  "The ultrasound showed two heartbeats, and the nurse went pale when she realized neither one was my baby's.";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const rawOutputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "";
const outDir =
  rawOutputDir === ""
    ? join(repoRoot, "output")
    : isAbsolute(rawOutputDir)
      ? rawOutputDir
      : join(repoRoot, rawOutputDir);

// Gate (from the competition rules): entry.txt must be UTF-8 text of
// 1 to 200 characters, not only white space, a single line.
const chars = [...ENTRY].length;
if (chars < 1 || chars > 200) {
  throw new Error(`entry is ${chars} characters, must be 1-200`);
}
if (ENTRY.trim().length === 0 || ENTRY.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
