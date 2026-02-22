import { JOBS as JOBS_SEED } from "../../data/jobs.seed";
import { useEffect, useState } from "react";
import { fetchJobsFromFandom } from "../../services/fandom/fandomJobs";

// Allow ONLY jobs in your seed list
const ALLOWED_JOB_IDS = new Set(JOBS_SEED.map((j) => j.id));

const normalizeName = (value) =>
  String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const isPlaceholderAbilityName = (name) => {
  const s = String(name || "")
    .trim()
    .toLowerCase();
  return (
    s === "none" ||
    s === "n/a" ||
    s.startsWith("see ") ||
    s.includes("see reaction") ||
    s.includes("see support") ||
    s.includes("see movement") ||
    s.includes("see innate")
  );
};

const stripPlaceholders = (abilities) =>
  (abilities || []).filter((a) => !isPlaceholderAbilityName(a?.name));

function mergeJobsWithSeed(apiJobs) {
  const apiByName = new Map(
    (apiJobs || []).map((j) => [normalizeName(j.name), j]),
  );

  const merged = JOBS_SEED.map((seedJob) => {
    const apiMatch = apiByName.get(normalizeName(seedJob.name));

    if (!apiMatch) return { ...seedJob, source: "seed" };

    const apiAbilities = stripPlaceholders(apiMatch.abilities);

    if (apiAbilities.length === 0) {
      return { ...seedJob, source: "seed+fandom" };
    }

    const apiNames = new Set(apiAbilities.map((a) => a.name));
    const extras = seedJob.abilities.filter((a) => !apiNames.has(a.name));

    return {
      ...seedJob,
      abilities: [...apiAbilities, ...extras],
      source: "seed+fandom",
    };
  });

  return merged
    .filter((job) => ALLOWED_JOB_IDS.has(job.id))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadJobs() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const data = await fetchJobsFromFandom({
          signal: controller.signal,
        });

        setJobs(mergeJobsWithSeed(data));
      } catch (err) {
        if (err?.name === "AbortError") return;
        setErrorMessage(err?.message || "Failed to load jobs from Fandom.");
      } finally {
        setIsLoading(false);
      }
    }

    loadJobs();
    return () => controller.abort();
  }, []);

  return (
    <section className="page-panel" style={{ maxWidth: 900, margin: "0 auto" }}>
      <h1>Jobs</h1>

      {isLoading && <p>Loading jobs…</p>}

      {errorMessage && (
        <p role="alert" style={{ fontWeight: 600 }}>
          {errorMessage}
        </p>
      )}

      {!isLoading && !errorMessage && jobs.length === 0 && (
        <p>No jobs found.</p>
      )}

      {!isLoading && !errorMessage && jobs.length > 0 && (
        <ul>
          {jobs.map((job) => (
            <li key={job.id}>
              <strong>{job.name}</strong> —{" "}
              {job.abilities
                .filter((a) => !isPlaceholderAbilityName(a?.name))
                .map((a) => a.name)
                .join(", ")}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
