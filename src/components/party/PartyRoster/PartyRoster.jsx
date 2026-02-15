import "./PartyRoster.css";

export default function PartyRoster({
  units,
  activeUnitId,
  onSelect,
  onAdd,
  onRemove,
  jobs,
}) {
  const jobName = (id) => jobs.find((j) => j.id === id)?.name || id;
  return (
    <div>
      <h2 className="party-customizer__panel-title">Party Roster</h2>
      {units.map((u) => (
        <button
          key={u.id}
          className={`party-customizer__unit-row ${u.id === activeUnitId ? "party-customizer__unit-row--active" : ""}`}
          onClick={() => onSelect(u.id)}
        >
          <span className="party-customizer__portrait">🧙</span>
          <span>
            {u.name} · Lv {u.level}
            <br />
            {jobName(u.primaryJobId)} · {u.zodiac.slice(0, 3)}
          </span>
        </button>
      ))}
      <div className="party-customizer__actions">
        <button className="party-customizer__button" onClick={onAdd}>
          + Add Unit
        </button>
        <button className="party-customizer__button" onClick={onRemove}>
          Remove Unit
        </button>
      </div>
    </div>
  );
}
