import { suggestFixes } from "../../../utils/optimizer/suggestFixes";
import "./PartyReport.css";

export default function PartyReport({ party, jobs, analysis }) {
  const fixes = suggestFixes(party, jobs, analysis);
  const score = Math.max(0, Math.min(100, analysis?.score ?? 0));

  const checklistEntries = Object.entries(analysis?.checklist || {});
  const warnings = analysis?.warnings || [];

  return (
    <div className="report">
      {/* Title Bar */}
      <div className="report__titlebar">
        <h2 className="report__title">Party Report</h2>
        <div className="report__scorechip">{score}/100</div>
      </div>

      {/* Score Meter */}
      <section className="report__panel">
        <div className="report__scoreline">
          <span className="report__label">Party Score</span>
          <span className="report__value">{score}/100</span>
        </div>

        <div className="report__meter" aria-hidden="true">
          <div className="report__meter-fill" style={{ width: `${score}%` }} />
        </div>

        <div className="report__hint">
          Higher score = better role coverage, synergy, and fewer conflicts.
        </div>
      </section>

      {/* Checklist */}
      <section className="report__panel">
        <h3 className="report__section-title">Checklist</h3>

        <ul className="report__checklist">
          {checklistEntries.map(([k, v]) => (
            <li
              key={k}
              className={`report__check ${v ? "report__check--ok" : "report__check--bad"}`}
              title={k}
            >
              <span className="report__check-icon">{v ? "✓" : "!"}</span>
              <span className="report__check-text">{k}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Warnings */}
      {warnings.length > 0 && (
        <section className="report__panel report__panel--warn">
          <h3 className="report__section-title">Warnings</h3>

          <ul className="report__warnings">
            {warnings.map((w) => (
              <li key={w} className="report__warning">
                {w}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Suggestions */}
      <section className="report__panel">
        <div className="report__section-head">
          <h3 className="report__section-title">Suggestions</h3>
          <span className="report__section-sub">
            {fixes.length ? `${fixes.length} available` : "None"}
          </span>
        </div>

        {fixes.length === 0 ? (
          <div className="report__empty">
            Your party looks solid. No fixes recommended right now.
          </div>
        ) : (
          <div className="report__suggestions">
            {fixes.map((s, idx) => {
              const label = (s.kind || s.type || "Tip").toString();
              const sev = (s.severity || "").toString().toLowerCase(); // "high" | "med" | "low" (optional)

              const severityClass =
                sev === "high"
                  ? "report__badge--high"
                  : sev === "med" || sev === "medium"
                    ? "report__badge--med"
                    : sev === "low"
                      ? "report__badge--low"
                      : "report__badge--neutral";

              return (
                <article
                  key={s.id || `${label}-${idx}`}
                  className="report__suggestion"
                >
                  <div className="report__suggestion-head">
                    <span className={`report__badge ${severityClass}`}>
                      {label}
                    </span>

                    <strong className="report__suggestion-title">
                      {s.title}
                    </strong>
                  </div>

                  <p className="report__suggestion-reason">{s.reason}</p>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
