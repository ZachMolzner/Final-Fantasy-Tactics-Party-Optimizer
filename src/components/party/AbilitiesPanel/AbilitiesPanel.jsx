import { useMemo, useState } from "react";
import "./AbilitiesPanel.css";

function normalize(str) {
  return String(str || "")
    .toLowerCase()
    .trim();
}

export default function AbilitiesPanel({ job, unlockedIds, onToggle }) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("");

  const allTags = useMemo(() => {
    const set = new Set();
    (job?.abilities || []).forEach((a) =>
      (a.tags || []).forEach((t) => set.add(t)),
    );
    // make it stable + nice order (type-ish tags first, then alphabetical)
    const priority = ["action", "reaction", "support", "movement"];
    return [...set].sort((a, b) => {
      const ia = priority.indexOf(a);
      const ib = priority.indexOf(b);
      if (ia !== -1 || ib !== -1)
        return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
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

  return (
    <section className="party-customizer__abilities">
      <div className="party-customizer__field">
        <label className="party-customizer__label">Search abilities</label>
        <input
          className="party-customizer__input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or tag (e.g., damage, heal, break, steal)"
        />
      </div>

      <div className="party-customizer__tags">
        {allTags.map((t) => (
          <button
            key={t}
            type="button"
            className={`party-customizer__tag ${
              activeTag === t ? "party-customizer__tag--active" : ""
            }`}
            onClick={() => setActiveTag(activeTag === t ? "" : t)}
            title={`Filter: ${t}`}
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

      <div className="party-customizer__ability-list">
        {filtered.length === 0 ? (
          <div className="party-customizer__empty">
            No abilities match your search/filter.
          </div>
        ) : (
          filtered.map((a) => (
            <article className="party-customizer__ability-card" key={a.id}>
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

              <div className="party-customizer__tags">
                {(a.tags || []).map((tag) => (
                  <span className="party-customizer__tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
