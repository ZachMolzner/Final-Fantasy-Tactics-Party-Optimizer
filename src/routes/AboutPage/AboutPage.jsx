import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AboutPage.css";

const API_BASE_URL = "https://finalfantasy.fandom.com/api.php";

export default function AboutPage() {
  const navigate = useNavigate();
  const [notice, setNotice] = useState("");
  const go = (path) => navigate(path);

  const copyApi = async () => {
    try {
      await navigator.clipboard.writeText(API_BASE_URL);
      setNotice("Copied API endpoint to clipboard.");
    } catch {
      setNotice("Could not copy endpoint.");
    }
  };

  return (
    <main className="about">
      <header className="about__header about__panel">
        <h1 className="about__title">About Ivalice Chronicles</h1>
        <p className="about__subtitle">
          A Final Fantasy Tactics-inspired party planning and optimization tool.
        </p>
        {notice && <p className="about__callout">{notice}</p>}
      </header>
      <section className="about__grid">
        <article className="about__panel">
          <h2 className="about__panel-title">Project Overview</h2>
          <p className="about__text">
            Build parties, evaluate coverage, compare zodiac compatibility, and
            share builds.
          </p>
          <p className="about__callout about__callout--warning">
            Not affiliated with Square Enix; not a playable game; no copyrighted
            assets.
          </p>
        </article>
        <article className="about__panel">
          <h2 className="about__panel-title">Features</h2>
          <ul className="about__list">
            <li className="about__list-item">Party Customizer</li>
            <li className="about__list-item">Role Optimizer</li>
            <li className="about__list-item">Zodiac Compatibility Report</li>
            <li className="about__list-item">Save & Share Builds</li>
          </ul>
        </article>
        <article className="about__panel">
          <h2 className="about__panel-title">How it works</h2>
          <ul className="about__list">
            <li className="about__list-item">
              Coverage rules for healer/damage/ranged/buffer/debuffer
            </li>
            <li className="about__list-item">Redundancy warnings</li>
            <li className="about__list-item">Party score 0–100</li>
            <li className="about__list-item">Suggestions generation</li>
          </ul>
        </article>
        <article className="about__panel">
          <h2 className="about__panel-title">Zodiac Compatibility</h2>
          <p className="about__text">
            Best / Good / Neutral / Bad / Worst tiers with summary and pair
            breakdown.
          </p>
        </article>
        <article className="about__panel">
          <h2 className="about__panel-title">Data Source / API</h2>
          <div className="about__code">{API_BASE_URL}</div>
          <div className="about__actions">
            <button className="about__button" onClick={copyApi}>
              Copy API Endpoint
            </button>
          </div>
        </article>
        <article className="about__panel">
          <h2 className="about__panel-title">Get Started</h2>
          <div className="about__actions">
            <button
              className="about__button about__button--primary"
              onClick={() => go("/party-customizer")}
            >
              Go to Party Customizer
            </button>
            <button
              className="about__button about__button--secondary"
              onClick={() => go("/jobs")}
            >
              Browse Jobs
            </button>
            <button className="about__button" onClick={() => go("/community")}>
              Visit Community
            </button>
          </div>
        </article>
      </section>
    </main>
  );
}
