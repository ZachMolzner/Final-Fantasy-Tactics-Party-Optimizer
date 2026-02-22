// src/routes/HomePage/HomePage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import avatarPortrait from "../../assets/portraits/ZachMolzner_Author.jpg";

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
    <main className="home page-container">
      <section className="home__hero page-panel">
        <div className="home__hero-top">
          <span className="home__badge">FFT • Party Planning • Synergy</span>
          <span className="home__status">
            {isAuthenticated
              ? `Signed in as ${profile?.displayName || "Adventurer"}`
              : "Not signed in"}
          </span>
        </div>

        <h1 className="home__title">Ivalice Chronicles: Party Builder</h1>
        <p className="home__subtitle">
          Build, evaluate, and share FFT party comps.
        </p>

        <p className="home__lead">
          Plan role coverage, detect synergy gaps, review zodiac compatibility,
          and share polished builds with your community in a few clicks.
        </p>

        <div className="home__cta">
          <button
            className="home__cta-button home__cta-button--primary"
            onClick={() => navigate("/party-customizer")}
            type="button"
          >
            Go to Party Customizer
          </button>

          <button
            className="home__cta-button home__cta-button--secondary"
            onClick={() => navigate("/jobs")}
            type="button"
          >
            Browse Jobs
          </button>
        </div>
      </section>

      <section className="home__panel page-panel">
        <div className="home__panel-head">
          <h2 className="home__panel-title">Quick Links</h2>
          {hint && <p className="home__hint home__hint--inline">{hint}</p>}
        </div>

        <div className="home__tiles">
          {tiles.map((tile) => {
            const locked = tile.protected && !isAuthenticated;
            return (
              <button
                key={tile.title}
                className={`home__tile ${locked ? "home__tile--locked" : ""}`}
                onClick={() => friendlyRoute(tile)}
                type="button"
              >
                <div className="home__tile-icon" aria-hidden="true">
                  {tile.icon}
                </div>

                <div className="home__tile-main">
                  <div className="home__tile-title">{tile.title}</div>
                  <div className="home__tile-desc">{tile.desc}</div>
                </div>

                <div className="home__tile-arrow" aria-hidden="true">
                  →
                </div>
              </button>
            );
          })}
        </div>

        {hint && <p className="home__hint">{hint}</p>}
      </section>

      <section className="home__about page-panel">
        <div className="home__about-avatar">
          <img
            src={avatarPortrait}
            alt="Zach Molzner Avatar"
            className="home__about-avatar-img"
          />
        </div>

        <div className="home__about-body">
          <h2 className="home__panel-title">About Me</h2>
          <p>
            <strong>Zach Molzner</strong> — builder of this FFT-inspired
            planning app.
          </p>
          <p>
            I’m a full-stack software engineer and lifelong tactical RPG fan
            with a deep appreciation for systems design, optimization logic, and
            strategic decision-making. I enjoy building tools that turn complex
            mechanics into clear, actionable insights.
          </p>

          <p>
            Ivalice Chronicles is a passion project that combines my love for
            <em>Final Fantasy Tactics</em> with modern web development. The goal
            is to create transparent, explainable party-building analysis —
            highlighting role coverage, redundancy, synergy gaps, and zodiac
            compatibility in a way that feels both powerful and intuitive.
          </p>

          <p>
            Beyond gaming systems, I focus on writing clean, scalable React
            architecture, thoughtful UX, and modular logic that mirrors the
            structure of tactical design itself.
          </p>

          <p className="home__links">
            <a
              href="https://github.com/ZachMolzner"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>{" "}
            ·{" "}
            <a
              href="https://linkedin.com/in/zmolzner"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </p>
        </div>
      </section>

      <section className="home__auth page-panel">
        <div className="home__auth-left">
          <div className="home__auth-status">
            {isAuthenticated
              ? `Signed in as ${profile?.displayName || "Adventurer"}`
              : "Not signed in"}
          </div>

          {!isAuthenticated && (
            <p className="home__hint">
              Sign in to save builds and post to the community.
            </p>
          )}
        </div>

        <div className="home__auth-actions">
          {!isAuthenticated ? (
            <button
              className="home__auth-button"
              onClick={() => login("Adventurer")}
              type="button"
            >
              Quick Sign In
            </button>
          ) : (
            <button
              className="home__auth-button"
              onClick={logout}
              type="button"
            >
              Sign Out
            </button>
          )}
        </div>
      </section>
    </main>
  );
}
