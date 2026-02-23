import { useMemo, useState } from "react";
import "./AbilitiesPanel.css";

function normalize(str) {
  return String(str || "").toLowerCase().trim();
}

export default function AbilitiesPanel({ job, unlockedIds = [], onToggle }) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("");

  const allTags = useMemo(() => {
    const set = new Set();
    (job?.abilities || []).forEach((a) =>
      (a.tags || []).forEach((t) => set.add(t)),
    );
    const priority = ["action", "reaction", "support", "movement"];
    return [...set].sort((a, b) => {
      const ia = priority.indexOf(a);
      const ib = priority.indexOf(b);
      if (ia !== -1 || ib !== -1) {
        return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
      }
      return a.localeCompare(b);
    });
  }, [job]);

  const filtered = useMemo(() => {
    const q = normalize(query);

    return (job?.abilities || []).filter((a) => {
      const name = normalize(a.name);
      const tags = (a.tags || []).map(normalize);

      const matchesQuery =
        !q || name.includes(q) || tags.some((t) => t.includes(q));

      const matchesTag = !activeTag || (a.tags || []).includes(activeTag);

      return matchesQuery && matchesTag;
    });
  }, [job, query, activeTag]);

  const searchId = "ability-search";

  return (
    <section className="party-customizer__abilities" aria-label="Abilities">
      <div className="party-customizer__field">
        <label className="party-customizer__label" htmlFor={searchId}>
          Search abilities
        </label>
        <input
          id={searchId}
          className="party-customizer__input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or tag (e.g., damage, heal, break, steal)"
        />
      </div>

      <div className="party-customizer__tags" role="group" aria-label="Tag filters">
        {allTags.map((t) => (
          <button
            key={t}
            type="button"
            className={`party-customizer__tag ${
              activeTag === t ? "party-customizer__tag--active" : ""
            }`}
            onClick={() => setActiveTag(activeTag === t ? "" : t)}
            title={`Filter: ${t}`}
            aria-pressed={activeTag === t}
          >
            {t}
          </button>
        ))}

        {(activeTag || query) && (
          <button
            type="button"
            className="party-customizer__tag party-customizer__tag--ghost"
            onClick={() => {
              setActiveTag("");
              setQuery("");
            }}
            title="Clear filters"
          >
            Clear
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="party-customizer__empty" role="status">
          No abilities match your search/filter.
        </div>
      ) : (
        <ul className="party-customizer__ability-list" aria-label="Ability list">
          {filtered.map((a) => (
            <li className="party-customizer__ability-item" key={a.id}>
              <article className="party-customizer__ability-card">
                <div className="party-customizer__ability-top">
                  <strong className="party-customizer__ability-name">
                    {a.name}
                  </strong>

                  <label className="party-customizer__toggle">
                    <input
                      type="checkbox"
                      checked={unlockedIds.includes(a.id)}
                      onChange={() => onToggle(a.id)}
                    />{" "}
                    Unlocked
                  </label>
                </div>

                <div className="party-customizer__tags" aria-label="Ability tags">
                  {(a.tags || []).map((tag) => (
                    <span className="party-customizer__tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
