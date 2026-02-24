import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  readSavedParties,
  writeActiveParty,
} from "../../services/storage/partyStorage";
import "./ProfilePage.css";

function fmtDate(iso) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return "";
  }
}

export default function ProfilePage() {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  const saved = useMemo(() => readSavedParties(), []);
  const filtered = useMemo(() => {
    const q = (query || "").trim().toLowerCase();
    if (!q) return saved;
    return saved.filter((p) =>
      (p.name || "Unnamed Party").toLowerCase().includes(q),
    );
  }, [query, saved]);

  const displayName = profile?.displayName || "Adventurer";

  const loadAsActive = (party) => {
    writeActiveParty(party);
    navigate("/party-customizer");
  };

  return (
    <main className="profile page-container">
      <section className="profile__hero page-panel">
        <div className="profile__hero-top">
          <span className="profile__badge">Profile • Saved Builds</span>
          <button className="profile__button" type="button" onClick={logout}>
            Sign Out
          </button>
        </div>

        <h1 className="profile__title">Profile</h1>
        <p className="profile__subtitle">
          Signed in as <strong>{displayName}</strong>
        </p>

        <div className="profile__stats">
          <div className="profile__stat">
            <div className="profile__stat-label">Saved Builds</div>
            <div className="profile__stat-value">{saved.length}</div>
          </div>

          <div className="profile__stat">
            <div className="profile__stat-label">Showing</div>
            <div className="profile__stat-value">{filtered.length}</div>
          </div>

          <div className="profile__stat profile__stat--cta">
            <button
              className="profile__button profile__button--primary"
              type="button"
              onClick={() => navigate("/party-customizer")}
            >
              Open Party Customizer
            </button>
          </div>
        </div>
      </section>

      <section className="profile__panel page-panel">
        <div className="profile__panel-head">
          <h2 className="profile__panel-title">Saved Builds</h2>

          <div className="profile__search">
            <input
              className="profile__input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search builds..."
            />
          </div>
        </div>

        {!saved.length ? (
          <div className="profile__empty">
            <div className="profile__empty-title">No saved builds yet.</div>
            <div className="profile__empty-text">
              Build a party in the Party Customizer and hit{" "}
              <strong>Save Build</strong>.
            </div>
            <button
              className="profile__button profile__button--primary"
              type="button"
              onClick={() => navigate("/party-customizer")}
            >
              Create your first build
            </button>
          </div>
        ) : !filtered.length ? (
          <div className="profile__empty">
            <div className="profile__empty-title">No matches.</div>
            <div className="profile__empty-text">Try a different search.</div>
            <button
              className="profile__button"
              type="button"
              onClick={() => setQuery("")}
            >
              Clear search
            </button>
          </div>
        ) : (
          <ul className="profile__list">
            {filtered.map((p) => (
              <li key={p.id} className="profile__card">
                <div className="profile__card-main">
                  <div className="profile__card-title">
                    {p.name || "Unnamed Party"}
                  </div>
                  <div className="profile__card-meta">
                    <span className="profile__chip">
                      {(p.units || []).length || 0} units
                    </span>
                    {p.updatedAt ? (
                      <span className="profile__meta">
                        Updated: <strong>{fmtDate(p.updatedAt)}</strong>
                      </span>
                    ) : (
                      <span className="profile__meta">Updated: —</span>
                    )}
                  </div>
                </div>

                <div className="profile__card-actions">
                  <button
                    className="profile__button profile__button--primary"
                    type="button"
                    onClick={() => loadAsActive(p)}
                    title="Set as active party and open the customizer"
                  >
                    Load
                  </button>

                  <button
                    className="profile__button"
                    type="button"
                    onClick={() => navigate("/party-customizer")}
                    title="Go to customizer (keeps current active party)"
                  >
                    Edit
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
