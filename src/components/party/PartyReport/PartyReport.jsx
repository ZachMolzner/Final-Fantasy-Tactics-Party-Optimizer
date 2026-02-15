import {
  applySuggestion,
  suggestFixes,
} from "../../../utils/optimizer/suggestFixes";
import "./PartyReport.css";

export default function PartyReport({ party, jobs, analysis, setParty }) {
  const fixes = suggestFixes(party, jobs, analysis);
  const apply = (s) => setParty((p) => applySuggestion(p, s, jobs));

  return (
    <div>
      <h2 className="party-customizer__panel-title">Party Report</h2>
      <p>
        <strong>Score:</strong> {analysis.score}/100
      </p>
      <ul className="party-report__checklist">
        {Object.entries(analysis.checklist).map(([k, v]) => (
          <li key={k}>
            {v ? "✅" : "❌"} {k}
          </li>
        ))}
      </ul>
      {analysis.warnings.length > 0 && (
        <div>
          <h3>Warnings</h3>
          <ul>
            {analysis.warnings.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <h3>Suggestions</h3>
        {fixes.map((s) => (
          <article key={s.id} className="party-report__suggestion">
            <strong>{s.title}</strong>
            <p>{s.reason}</p>
            <button
              className="party-customizer__button"
              onClick={() => apply(s)}
            >
              Apply
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
