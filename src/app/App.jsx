import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "../components/layout/Header/Header";
import Footer from "../components/layout/Footer/Footer";
import ProtectedRoute from "../components/layout/ProtectedRoute/ProtectedRoute";

import HomePage from "../routes/HomePage/HomePage";
import AboutPage from "../routes/AboutPage/AboutPage";
import CommunityPage from "../routes/CommunityPage/CommunityPage";
import PartyCustomizerPage from "../routes/PartyCustomizerPage/PartyCustomizerPage";
import JobsPage from "../routes/JobsPage/JobsPage";
import ProfilePage from "../routes/ProfilePage/ProfilePage";
import SignInPage from "../routes/SignInPage/SignInPage";

import { JOBS as JOBS_SEED } from "../data/jobs.seed";
import { fetchJobsFromFandom } from "../services/fandom/fandomJobs";

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
    if (apiAbilities.length === 0) return { ...seedJob, source: "seed+fandom" };

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

function App() {
  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [jobsError, setJobsError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadJobs() {
      try {
        setJobsLoading(true);
        setJobsError("");

        const data = await fetchJobsFromFandom({ signal: controller.signal });
        setJobs(mergeJobsWithSeed(data));
      } catch (err) {
        if (err?.name === "AbortError") return;
        setJobsError(err?.message || "Failed to load jobs from Fandom.");
      } finally {
        setJobsLoading(false);
      }
    }

    loadJobs();
    return () => controller.abort();
  }, []);

  return (
    <div className="app-shell">
      <Header />

      <main className="app-main">
        <div className="page-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />

            <Route
              path="/jobs"
              element={
                <JobsPage
                  jobs={jobs}
                  isLoading={jobsLoading}
                  errorMessage={jobsError}
                />
              }
            />

            <Route path="/signin" element={<SignInPage />} />
            <Route path="/party-customizer" element={<PartyCustomizerPage />} />

            <Route
              path="/community"
              element={
                <ProtectedRoute>
                  <CommunityPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
