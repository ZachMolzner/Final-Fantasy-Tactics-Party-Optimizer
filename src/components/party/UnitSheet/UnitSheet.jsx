import AbilitiesPanel from "../AbilitiesPanel/AbilitiesPanel";
import "./UnitSheet.css";

export default function UnitSheet({
  unit,
  jobs,
  portraits,
  zodiacs,
  onUpdate,
}) {
  if (!unit) return null;
  const primaryJob = jobs.find((j) => j.id === unit.primaryJobId) || jobs[0];

  const setField = (field, value) =>
    onUpdate((u) => ({ ...u, [field]: value }));
  const setNum = (field, value, min, max) =>
    setField(field, Math.max(min, Math.min(max, Number(value) || min)));
  const isJobAllowed = (job) =>
    !job.genderRequirement || job.genderRequirement === unit.gender;

  const toggleAbility = (abilityId) => {
    onUpdate((u) => {
      const next = {
        ...u,
        unlockedAbilities: { ...(u.unlockedAbilities || {}) },
      };
      const bucket = [...(next.unlockedAbilities[primaryJob.id] || [])];
      next.unlockedAbilities[primaryJob.id] = bucket.includes(abilityId)
        ? bucket.filter((id) => id !== abilityId)
        : [...bucket, abilityId];
      return next;
    });
  };

  return (
    <div>
      <h2 className="party-customizer__panel-title">Unit Sheet</h2>
      <section className="unit-sheet__identity">
        <div className="party-customizer__portrait unit-sheet__portrait">
          {portraits.find((p) => p.id === unit.portraitId)?.emoji || "🧙"}
        </div>
        <div className="unit-sheet__grid">
          <label className="party-customizer__field">
            <span className="party-customizer__label">Name</span>
            <input
              className="party-customizer__input"
              value={unit.name}
              onChange={(e) => setField("name", e.target.value)}
            />
          </label>
          <label className="party-customizer__field">
            <span className="party-customizer__label">Level</span>
            <input
              type="number"
              min="1"
              max="99"
              className="party-customizer__input"
              value={unit.level}
              onChange={(e) => setNum("level", e.target.value, 1, 99)}
            />
          </label>
          <label className="party-customizer__field">
            <span className="party-customizer__label">Gender</span>
            <select
              className="party-customizer__select"
              value={unit.gender}
              onChange={(e) => setField("gender", e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
          <label className="party-customizer__field">
            <span className="party-customizer__label">Zodiac</span>
            <select
              className="party-customizer__select"
              value={unit.zodiac}
              onChange={(e) => setField("zodiac", e.target.value)}
            >
              {zodiacs.map((z) => (
                <option key={z.id} value={z.id}>
                  {z.name}
                </option>
              ))}
            </select>
          </label>
          <label className="party-customizer__field">
            <span className="party-customizer__label">Brave</span>
            <input
              type="range"
              min="0"
              max="100"
              value={unit.brave}
              onChange={(e) => setNum("brave", e.target.value, 0, 100)}
            />
          </label>
          <label className="party-customizer__field">
            <span className="party-customizer__label">Faith</span>
            <input
              type="range"
              min="0"
              max="100"
              value={unit.faith}
              onChange={(e) => setNum("faith", e.target.value, 0, 100)}
            />
          </label>
        </div>
      </section>

      <section className="unit-sheet__grid">
        <label className="party-customizer__field">
          <span className="party-customizer__label">Primary job</span>
          <select
            className="party-customizer__select"
            value={unit.primaryJobId}
            onChange={(e) => setField("primaryJobId", e.target.value)}
          >
            {jobs.map((j) => (
              <option key={j.id} value={j.id} disabled={!isJobAllowed(j)}>
                {j.name}
                {!isJobAllowed(j) ? " (locked)" : ""}
              </option>
            ))}
          </select>
        </label>
        <label className="party-customizer__field">
          <span className="party-customizer__label">Secondary set</span>
          <select
            className="party-customizer__select"
            value={unit.secondaryJobId}
            onChange={(e) => setField("secondaryJobId", e.target.value)}
          >
            {jobs.map((j) => (
              <option key={j.id} value={j.id} disabled={!isJobAllowed(j)}>
                {j.name}
                {!isJobAllowed(j) ? " (locked)" : ""}
              </option>
            ))}
          </select>
        </label>
      </section>

      <AbilitiesPanel
        job={primaryJob}
        unlockedIds={unit.unlockedAbilities?.[primaryJob.id] || []}
        onToggle={toggleAbility}
      />

      <section className="unit-sheet__equip">
        <h3>Equipment (visual)</h3>
        <div className="unit-sheet__grid">
          {["weapon", "shield", "head", "body", "accessory"].map((slot) => (
            <div className="unit-sheet__slot" key={slot}>
              {slot}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
