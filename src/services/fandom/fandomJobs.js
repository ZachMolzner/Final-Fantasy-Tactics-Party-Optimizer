import {
  FANDOM_API_BASE,
  DEFAULT_FANDOM_CATEGORY,
  DEFAULT_BATCH_SIZE,
  DEFAULT_THROTTLE_MS,
} from "./config";
import { JOBS as JOBS_SEED } from "../../data/jobs.seed";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function slug(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");
}

function cleanWikiText(value) {
  return String(value || "")
    .replace(/\{\{[^}]+\}\}/g, "")
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, "$2")
    .replace(/\[\[([^\]]+)\]\]/g, "$1")
    .replace(/<ref[^>]*>.*?<\/ref>/gis, "")
    .replace(/<[^>]+>/g, "")
    .trim();
}

function splitList(value) {
  return cleanWikiText(value)
    .split(/<br\s*\/?\s*>|\n|,/i)
    .map((v) => v.trim())
    .filter(Boolean);
}

function inferTags(name, type, jobName) {
  const n = String(name || "").toLowerCase();
  const tags = new Set();

  if (type === "reaction") tags.add("reaction");
  if (type === "support") tags.add("support");
  if (type === "movement") tags.add("movement");

  if (/cure|potion|salve|chakra|regen/.test(n)) tags.add("heal");
  if (/raise|arise|phoenix down|revive/.test(n)) tags.add("revive");
  if (/esuna|purification|remedy|antidote|holy water/.test(n))
    tags.add("cleanse");

  if (/throw|aim|shot|jump|stone|shuriken|bomb/.test(n)) tags.add("ranged");
  if (/haste|protect|shell|wall|quick|tailwind|steel|shout/.test(n))
    tags.add("buff");

  if (
    /slow|stop|poison|toad|death|rend|blind|silence|sleep|confuse|berserk/.test(
      n,
    )
  ) {
    tags.add("debuff");
    tags.add("control");
  }

  if (/teleport|move\s*\+|move-hp|float/.test(n) || type === "movement")
    tags.add("mobility");

  if (
    /mage|summoner/.test(String(jobName || "").toLowerCase()) &&
    type === "action"
  )
    tags.add("magic");

  if (/fir|blizz|thund|flare|meteor|bahamut|zodiark|holy|gravity/.test(n)) {
    tags.add("damage");
    tags.add("aoe");
  }

  if (tags.size === 0 && type === "action") tags.add("damage");
  return [...tags];
}

function toAbilities(jobId, names, type, jobName) {
  return names.map((rawName) => {
    const name = cleanWikiText(rawName);
    return {
      id: `${jobId}_${slug(name)}`,
      name,
      type,
      jpCost: null,
      tags: inferTags(name, type, jobName),
      source: "fandom",
    };
  });
}

export function parseJobFromWikitext(title, wikitext) {
  const field = (names) => {
    for (const name of names) {
      const re = new RegExp(`^\\|\\s*${name}\\s*=\\s*(.+)$`, "gim");
      const match = re.exec(wikitext);
      if (match?.[1]) return match[1].trim();
    }
    return "";
  };

  const jobName =
    cleanWikiText(field(["name", "job", "title"])) || cleanWikiText(title);
  const category = cleanWikiText(field(["category", "tier"])) || "Generic";
  const actionCommand = cleanWikiText(
    field(["command", "action command", "action_command"]),
  );

  const action = splitList(
    field(["action abilities", "action_abilities", "abilities"]),
  );
  const reaction = splitList(
    field(["reaction abilities", "reaction_abilities"]),
  );
  const support = splitList(field(["support abilities", "support_abilities"]));
  const movement = splitList(
    field(["movement abilities", "movement_abilities"]),
  );

  const id = slug(jobName);

  return {
    id,
    name: jobName,
    tier: /advanced/i.test(category) ? 3 : /unique/i.test(category) ? 4 : 1,
    category,
    actionCommand,
    uniqueCharacterId: null,
    genderRequirement: null,
    source: "fandom",
    sourcePage: title,
    abilities: [
      ...toAbilities(id, action, "action", jobName),
      ...toAbilities(id, reaction, "reaction", jobName),
      ...toAbilities(id, support, "support", jobName),
      ...toAbilities(id, movement, "movement", jobName),
    ].filter((a) => a.name),
  };
}

/**
 * ✅ UPDATED: adds `origin=*` for CORS
 */
async function fandomQuery(params, { signal } = {}) {
  const query = new URLSearchParams({
    format: "json",
    formatversion: "2",
    redirects: "1",
    origin: "*", // ✅ REQUIRED for browser CORS requests to MediaWiki/Fandom
    ...params,
  });

  const res = await fetch(`${FANDOM_API_BASE}?${query}`, {
    signal,
    headers: {
      // Optional but fine:
      // In browsers, some headers may be ignored.
      Accept: "application/json",
    },
  });

  if (!res.ok) throw new Error(`Fandom API failed (${res.status})`);
  const data = await res.json();
  if (data?.error) throw new Error(data.error.info || "Fandom error");
  return data;
}

async function fandomQueryWithRetry(params, opts = {}) {
  const max = 4;

  for (let attempt = 1; attempt <= max; attempt++) {
    try {
      return await fandomQuery(params, opts);
    } catch (err) {
      const msg = String(err?.message || err);

      const retryable =
        err?.name === "AbortError" ||
        /429|5\d\d|timeout|ECONNRESET|network/i.test(msg);

      if (!retryable || attempt === max) throw err;

      await sleep(300 * Math.pow(2, attempt - 1));
    }
  }
}

async function fetchCategoryTitles(category, { signal } = {}) {
  const titles = [];
  let cmcontinue = "";

  do {
    const data = await fandomQueryWithRetry(
      {
        action: "query",
        list: "categorymembers",
        cmtitle: `Category:${category}`,
        cmlimit: "500",
        cmcontinue,
      },
      { signal },
    );

    for (const row of data?.query?.categorymembers || []) {
      if (row?.ns === 0 && row?.title) titles.push(row.title);
    }

    cmcontinue = data?.continue?.cmcontinue || "";
    if (cmcontinue) await sleep(150);
  } while (cmcontinue);

  return titles;
}

async function fetchWikitextBatch(titlesBatch, { signal } = {}) {
  const data = await fandomQueryWithRetry(
    {
      action: "query",
      prop: "revisions",
      titles: titlesBatch.join("|"),
      rvprop: "content",
      rvslots: "main",
    },
    { signal },
  );

  const pages = data?.query?.pages || [];
  return pages
    .map((p) => ({
      title: p?.title,
      content: p?.revisions?.[0]?.slots?.main?.content || "",
    }))
    .filter((p) => p.title && p.content);
}

export async function fetchJobsFromFandom({
  category = DEFAULT_FANDOM_CATEGORY,
  signal,
  batchSize = DEFAULT_BATCH_SIZE,
  throttleMs = DEFAULT_THROTTLE_MS,
} = {}) {
  const pageTitles = await fetchCategoryTitles(category, { signal });
  const filtered = pageTitles.filter(
    (t) => !/Category:|Template:|File:/i.test(t),
  );

  const jobs = [];
  const batches = chunk(filtered, batchSize);

  for (let i = 0; i < batches.length; i++) {
    const pages = await fetchWikitextBatch(batches[i], { signal });

    for (const { title, content } of pages) {
      const job = parseJobFromWikitext(title, content);
      if (job?.abilities?.length) jobs.push(job);
    }

    if (i < batches.length - 1) await sleep(throttleMs);
  }

  const deduped = new Map();
  for (const j of jobs) if (!deduped.has(j.id)) deduped.set(j.id, j);

  return Array.from(deduped.values()).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
}
