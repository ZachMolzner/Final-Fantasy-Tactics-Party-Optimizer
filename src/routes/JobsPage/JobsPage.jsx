import { JOBS as JOBS_SEED } from "../../data/jobs.seed";
import { useEffect, useState, useMemo } from "react";
import { fetchJobsFromFandom } from "../../services/fandom/fandomJobs";
import "./JobsPage.css";

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
  const apiByName = new Map((apiJobs || []).map((j) => [normalizeName(j.name), j]));

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

  const [query, setQuery] = useState("");

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

  const filteredJobs = useMemo(() => {
    const q = normalizeName(query);
    if (!q) return jobs;
    return jobs.filter((job) => normalizeName(job.name).includes(q));
  }, [jobs, query]);

  return (
    <main className="jobs-page">
      <section className="page-panel jobs-page__panel">
        <header className="jobs-page__header">
          <h1 className="jobs-page__title">Jobs</h1>
          <p className="jobs-page__intro">
            Browse job ability lists (seed data merged with Fandom where available).
          </p>
        </header>

        <div className="jobs-page__controls">
          <label className="party-customizer__field jobs-page__search">
            <span className="party-customizer__label">Search jobs</span>
            <input
              className="party-customizer__input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a job name (e.g., Squire, Wizard, Ninja)"
            />
          </label>
        </div>

        {isLoading && <p className="jobs-page__status">Loading jobs…</p>}

        {errorMessage && (
          <p role="alert" className="jobs-page__error">
            {errorMessage}
          </p>
        )}

        {!isLoading && !errorMessage && filteredJobs.length === 0 && (
          <p className="jobs-page__empty">No jobs found.</p>
        )}

        {!isLoading && !errorMessage && filteredJobs.length > 0 && (
          <ul className="jobs-page__list" aria-label="Job list">
            {filteredJobs.map((job) => {
              const abilities = stripPlaceholders(job.abilities);

              return (
                <li key={job.id} className="jobs-page__item">
                  <article className="jobs-page__card">
                    <header className="jobs-page__card-head">
                      <h2 className="jobs-page__job-name">{job.name}</h2>
                      <span className="jobs-page__job-meta">
                        {job.source === "seed" ? "Seed" : "Seed + Fandom"}
                      </span>
                    </header>

                    {abilities.length ? (
                      <ul className="jobs-page__abilities" aria-label={`${job.name} abilities`}>
                        {abilities.map((a) => (
                          <li key={a.id || a.name} className="jobs-page__ability">
                            {a.name}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="jobs-page__desc">No abilities listed for this job.</p>
                    )}
                  </article>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
}
