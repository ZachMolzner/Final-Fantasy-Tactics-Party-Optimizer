import { writeFile, mkdir } from "node:fs/promises";
import { fetchJobsFromFandom } from "../src/services/fandom/fandomJobs.js";

const outPath = new URL("../src/data/jobs.fandom.json", import.meta.url);

function now() {
  return new Date().toISOString().slice(11, 19);
}

async function main() {
  console.log(`[${now()}] sync:fandom starting…`);

  const jobs = await fetchJobsFromFandom({
    category: "Jobs in Final Fantasy Tactics",
  });

  if (!jobs.length) {
    throw new Error(
      "No jobs returned from Fandom API. Check category name/parser.",
    );
  }

  await mkdir(new URL("../src/data/", import.meta.url), { recursive: true });

  await writeFile(outPath, `${JSON.stringify(jobs, null, 2)}\n`, "utf8");

  const abilityCount = jobs.reduce(
    (sum, j) => sum + (j.abilities?.length || 0),
    0,
  );
  console.log(
    `[${now()}] ✅ wrote ${jobs.length} jobs / ${abilityCount} abilities`,
  );
  console.log(`[${now()}] -> ${outPath.pathname}`);
}

main().catch((err) => {
  console.error(`[${now()}] ❌ sync:fandom failed:`, err);
  process.exitCode = 1;
});
