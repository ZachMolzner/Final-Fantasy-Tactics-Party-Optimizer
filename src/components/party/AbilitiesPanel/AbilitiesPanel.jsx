import { useMemo, useState } from "react";
import "./AbilitiesPanel.css";

const tags = ["heal", "damage", "buff", "debuff", "ranged", "mobility"];

export default function AbilitiesPanel({ job, unlockedIds, onToggle }) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("");

  const filtered = useMemo(
    () =>
      (job?.abilities || []).filter(
        (a) =>
          a.name.toLowerCase().includes(query.toLowerCase()) &&
          (!activeTag || a.tags.includes(activeTag)),
      ),
    [job, query, activeTag],
  );

  return (
    <section className="party-customizer__abilities">
      <div className="party-customizer__field">
        <label className="party-customizer__label">Search abilities</label>
        <input
          className="party-customizer__input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="party-customizer__tags">
        {tags.map((t) => (
          <button
            key={t}
            className="party-customizer__tag"
            onClick={() => setActiveTag(activeTag === t ? "" : t)}
          >
            {t}
          </button>
        ))}
      </div>
      <div>
        {filtered.map((a) => (
          <article className="party-customizer__ability-card" key={a.id}>
            <div>
              <strong>{a.name}</strong> · {a.jpCost} JP
            </div>
            <div className="party-customizer__tags">
              {a.tags.map((tag) => (
                <span className="party-customizer__tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <label className="party-customizer__toggle">
              <input
                type="checkbox"
                checked={unlockedIds.includes(a.id)}
                onChange={() => onToggle(a.id)}
              />{" "}
              Unlocked
            </label>
          </article>
        ))}
      </div>
    </section>
  );
}
