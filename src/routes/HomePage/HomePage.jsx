import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./HomePage.css";

const tiles = [
  {
    title: "Party Customizer",
    desc: "Build and optimize 5-unit FFT parties.",
    to: "/party-customizer",
    protected: false,
    icon: "⚙️",
  },
  {
    title: "Community",
    desc: "Share comps and save builds from others.",
    to: "/community",
    protected: true,
    icon: "🧭",
  },
  {
    title: "Profile",
    desc: "Review your saved builds and identity.",
    to: "/profile",
    protected: true,
    icon: "👤",
  },
];

export default function HomePage() {
  const { isAuthenticated, profile, login, logout } = useAuth();
  const navigate = useNavigate();
  const [hint, setHint] = useState("");

  const friendlyRoute = (tile) => {
    localStorage.setItem("lastRoute", tile.to);
    if (tile.protected && !isAuthenticated) {
      setHint("Sign in required for that section.");
      navigate("/signin");
      return;
    }
    navigate(tile.to);
  };

  return (
    <main className="home">
      <section className="home__hero page-panel">
        <h1 className="home__title">Ivalice Chronicles: Party Builder</h1>
        <p className="home__subtitle">
          Build, evaluate, and share FFT party comps.
        </p>
        <p>
          Plan role coverage, detect synergy gaps, review zodiac compatibility,
          and share polished builds with your community in a few clicks.
        </p>
        <div className="home__cta">
          <button
            className="home__cta-button home__cta-button--primary"
            onClick={() => navigate("/party-customizer")}
          >
            Go to Party Customizer
          </button>
          <button
            className="home__cta-button home__cta-button--secondary"
            onClick={() => navigate("/jobs")}
          >
            Browse Jobs
          </button>
        </div>
      </section>

      <section className="home__panel page-panel">
        <h2 className="home__panel-title">Quick Links</h2>
        <div className="home__tiles">
          {tiles.map((tile) => (
            <button
              key={tile.title}
              className={`home__tile ${tile.protected && !isAuthenticated ? "home__tile--locked" : ""}`}
              onClick={() => friendlyRoute(tile)}
            >
              <span>{tile.icon}</span>
              <div className="home__tile-title">{tile.title}</div>
              <div className="home__tile-desc">{tile.desc}</div>
            </button>
          ))}
        </div>
        {hint && <p className="home__hint">{hint}</p>}
      </section>

      <section className="home__about page-panel">
        <div className="home__about-avatar">🧑‍💻</div>
        <div className="home__about-body">
          <h2 className="home__panel-title">About Me</h2>
          <p>
            <strong>Zach Molzner</strong> — builder of this FFT-inspired
            planning app.
          </p>
          <p>
            I enjoy systems design and tactical RPG tooling. This project
            focuses on clear, explainable party-building decisions.
          </p>
          <p>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              GitHub
            </a>{" "}
            ·{" "}
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </p>
        </div>
      </section>

      <section className="home__auth page-panel">
        <div className="home__auth-status">
          {isAuthenticated
            ? `Signed in as ${profile?.displayName || "Adventurer"}`
            : "Not signed in"}
        </div>
        <div className="home__auth-actions">
          {!isAuthenticated ? (
            <button onClick={() => login("Adventurer")}>Quick Sign In</button>
          ) : (
            <button onClick={logout}>Sign Out</button>
          )}
        </div>
        {!isAuthenticated && (
          <p className="home__hint">
            Sign in to save builds and post to the community.
          </p>
        )}
      </section>
    </main>
  );
}
