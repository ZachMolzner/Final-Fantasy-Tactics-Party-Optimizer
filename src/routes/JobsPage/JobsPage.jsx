import { useMemo, useState } from "react";
import "./JobsPage.css";

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

export default function JobsPage({
  jobs = [],
  isLoading = false,
  errorMessage = "",
}) {
  const [query, setQuery] = useState("");

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
                      <ul
                        className="jobs-page__abilities"
                        aria-label={`${job.name} abilities`}
                      >
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
