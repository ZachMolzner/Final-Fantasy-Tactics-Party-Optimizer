import { JOBS } from "../../data/jobs.seed";

export default function JobsPage() {
  return (
    <section className="page-panel" style={{ maxWidth: 900, margin: "0 auto" }}>
      <h1>Jobs</h1>
      <ul>
        {JOBS.map((job) => (
          <li key={job.id}>
            <strong>{job.name}</strong> —{" "}
            {job.abilities.map((a) => a.name).join(", ")}
          </li>
        ))}
      </ul>
    </section>
  );
}
