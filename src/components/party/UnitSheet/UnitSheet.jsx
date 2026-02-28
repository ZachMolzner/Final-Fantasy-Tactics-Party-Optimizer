import { useEffect, useMemo, useState } from "react";
import {
  getPortraitSrc,
  UNIQUE_CHARACTERS,
  UNIQUE_CHARACTER_RULES,
} from "../../../data/portraits.seed.js";
import "./UnitSheet.css";

function UnitPortrait({ unit, primaryJob, zodiacLabel }) {
  const portraitSrc = getPortraitSrc({
    primaryJob: primaryJob?.name,
    gender: unit?.gender,
    unitName: unit?.name,
    characterId: unit?.characterId,
  });

  return (
    <div className="unit-sheet__portraitFrame">
      <div className="unit-sheet__portrait">
        <div className="unit-sheet__zodiacWatermark" aria-hidden="true">
          {zodiacLabel?.slice(0, 3) || ""}
        </div>

        <img
          className="unit-sheet__portrait-image"
          src={portraitSrc}
          alt={`${primaryJob?.name || "Unit"} portrait`}
          loading="lazy"
        />
      </div>

      <div className="unit-sheet__nameplate">
        <span className="unit-sheet__nameplate-name">{unit?.name}</span>
      </div>
    </div>
  );
}

function AbilityGroup({ title, abilities, checkedIds, onToggle, query }) {
  const q = (query || "").trim().toLowerCase();

  const filtered = useMemo(() => {
    const list = abilities || [];
    if (!q) return list;

    return list.filter((a) => {
      const nameHit = a.name?.toLowerCase().includes(q);
      const tagHit = (a.tags || []).some((t) => t.toLowerCase().includes(q));
      return nameHit || tagHit;
    });
  }, [abilities, q]);

  if (!filtered.length) return null;

  // semantic list: ul > li > article
  return (
    <section className="unit-sheet__abilityGroup" aria-label={title}>
      <header className="unit-sheet__abilityGroupTitle">{title}</header>

      <ul className="unit-sheet__abilityList" role="list">
        {filtered.map((a) => {
          const isOn = (checkedIds || []).includes(a.id);
          const tags = a.tags || [];

          return (
            <li key={a.id} className="unit-sheet__abilityItem">
              <article className="unit-sheet__abilityCard">
                <label
                  className={`unit-sheet__abilityRow ${
                    isOn ? "unit-sheet__abilityRow--on" : ""
                  }`}
                  title={tags.join(", ")}
                >
                  <input
                    type="checkbox"
                    className="unit-sheet__abilityCheckbox"
                    checked={isOn}
                    onChange={() => onToggle(a.id)}
                    aria-label={`Toggle ${a.name}`}
                  />

                  <div className="unit-sheet__abilityMain">
                    <div className="unit-sheet__abilityLine">
                      <span className="unit-sheet__abilityName">{a.name}</span>
                      {a.jpCost ? (
                        <span className="unit-sheet__abilityMeta">
                          {a.jpCost} JP
                        </span>
                      ) : null}
                    </div>

                    <div className="unit-sheet__abilityTags">
                      {tags.length ? (
                        tags.map((t) => (
                          <span
                            key={`${a.id}-${t}`}
                            className="unit-sheet__tag"
                          >
                            {t}
                          </span>
                        ))
                      ) : (
                        <span className="unit-sheet__tag unit-sheet__tag--muted">
                          untagged
                        </span>
                      )}
                    </div>
                  </div>
                </label>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default function UnitSheet({ unit, jobs = [], zodiacs = [], onUpdate }) {
  // Hooks must run every render (even when unit is null)
  const [abilityQuery, setAbilityQuery] = useState("");

  // Provide safe fallbacks so hooks can compute without crashing
  const safeUnit = unit ?? {
    characterId: "none",
    name: "",
    level: 1,
    gender: "male",
    zodiac: "",
    brave: 70,
    faith: 70,
    primaryJobId: "squire",
    secondaryJobId: "chemist",
    unlockedAbilities: {},
    reactionAbilityId: "",
    supportAbilityId: "",
    movementAbilityId: "",
  };

  const setField = (field, value) => {
    if (!onUpdate) return;
    onUpdate((u) => ({ ...u, [field]: value }));
  };

  const setNum = (field, value, min, max) =>
    setField(field, Math.max(min, Math.min(max, Number(value) || min)));

  // --- Unique character logic ---
  const characterId = safeUnit.characterId || "none";
  const isUnique = characterId !== "none";
  const uniqueRule = isUnique ? UNIQUE_CHARACTER_RULES[characterId] : null;

  // Auto-lock gender when a unique is selected
  useEffect(() => {
    if (!unit) return;
    if (uniqueRule?.gender && unit.gender !== uniqueRule.gender) {
      setField("gender", uniqueRule.gender);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterId]);

  // Determine the unique job that belongs to this selected character
  const uniqueJobForSelected = useMemo(() => {
    if (!isUnique) return null;
    return jobs.find(
      (j) => j.category === "Unique" && j.uniqueCharacterId === characterId,
    );
  }, [jobs, characterId, isUnique]);

  // Filter job options:
  // - Allow Generic + Advanced
  // - Allow Unique ONLY if it matches the selected character
  // - Enforce genderRequirement (Bard/Dancer)
  const filteredJobs = useMemo(() => {
    return jobs.filter((j) => {
      // Unique job gating
      if (j.category === "Unique") {
        if (!isUnique) return false;
        if (j.uniqueCharacterId !== characterId) return false;
      }

      // Gender gating
      if (j.genderRequirement && j.genderRequirement !== safeUnit.gender) {
        return false;
      }

      return true;
    });
  }, [jobs, isUnique, characterId, safeUnit.gender]);

  // Safety net: if gender changes and a now-illegal job is selected, reset it
  useEffect(() => {
    if (!unit) return;

    const primary = jobs.find((j) => j.id === unit.primaryJobId);
    const secondary = jobs.find((j) => j.id === unit.secondaryJobId);

    const invalidForGender = (job) =>
      job?.genderRequirement && job.genderRequirement !== unit.gender;

    if (invalidForGender(primary)) setField("primaryJobId", "squire");
    if (invalidForGender(secondary)) setField("secondaryJobId", "chemist");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safeUnit.gender]);

  // If switching to generic while having unique jobs selected, snap back
  useEffect(() => {
    if (!unit) return;

    const currentPrimary = jobs.find((j) => j.id === unit.primaryJobId);
    if (!isUnique && currentPrimary?.category === "Unique") {
      setField("primaryJobId", "squire");
    }

    const currentSecondary = jobs.find((j) => j.id === unit.secondaryJobId);
    if (!isUnique && currentSecondary?.category === "Unique") {
      setField("secondaryJobId", "chemist");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterId]);

  const primaryJob =
    filteredJobs.find((j) => j.id === safeUnit.primaryJobId) ||
    filteredJobs.find((j) => j.id === "squire") ||
    filteredJobs[0];

  const secondaryJob =
    filteredJobs.find((j) => j.id === safeUnit.secondaryJobId) ||
    filteredJobs.find((j) => j.id === "chemist") ||
    filteredJobs[0];

  const zodiacLabel =
    zodiacs.find((z) => z.id === safeUnit.zodiac)?.name || safeUnit.zodiac;

  // Ability sources (PRIMARY: action + support + movement)
  const primaryAbilities = primaryJob?.abilities || [];
  const primaryActionAbilities = primaryAbilities.filter(
    (a) => a.type === "action",
  );
  const primarySupportAbilities = primaryAbilities.filter(
    (a) => a.type === "support",
  );
  const primaryMovementAbilities = primaryAbilities.filter(
    (a) => a.type === "movement",
  );

  // Ability sources (SECONDARY: ACTION ONLY)
  const secondaryActionAbilities = useMemo(() => {
    const list = secondaryJob?.abilities || [];
    return list.filter((a) => a.type === "action");
  }, [secondaryJob]);

  // Buckets for checkboxes (per job)
  const checkedPrimary = safeUnit.unlockedAbilities?.[primaryJob?.id] || [];
  const checkedSecondary = safeUnit.unlockedAbilities?.[secondaryJob?.id] || [];

  // Toggle ability checkbox for a specific job bucket
  const toggleAbilityForJob = (jobId, abilityId) => {
    if (!unit) return;
    onUpdate((u) => {
      const next = {
        ...u,
        unlockedAbilities: { ...(u.unlockedAbilities || {}) },
      };

      const bucket = [...(next.unlockedAbilities[jobId] || [])];
      next.unlockedAbilities[jobId] = bucket.includes(abilityId)
        ? bucket.filter((id) => id !== abilityId)
        : [...bucket, abilityId];

      return next;
    });
  };

  // Dropdown options for equipped reaction/support/movement (cross-job list, filtered)
  const reactionOptions = filteredJobs.flatMap((job) =>
    (job.abilities || []).filter((a) => a.type === "reaction"),
  );
  const supportOptions = filteredJobs.flatMap((job) =>
    (job.abilities || []).filter((a) => a.type === "support"),
  );
  const movementOptions = filteredJobs.flatMap((job) =>
    (job.abilities || []).filter((a) => a.type === "movement"),
  );

  // Now it’s safe to early-return (after hooks)
  if (!unit || !primaryJob || !secondaryJob) return null;

  return (
    <section className="unit-sheet" aria-label="Unit Sheet">
      <h2 className="party-customizer__panel-title">Unit Sheet</h2>

      <div className="unit-sheet__identity">
        <UnitPortrait
          unit={unit}
          primaryJob={primaryJob}
          zodiacLabel={zodiacLabel}
        />

        <div className="unit-sheet__details">
          <div className="unit-sheet__grid">
            <label className="party-customizer__field">
              <span className="party-customizer__label">Character</span>
              <select
                className="party-customizer__select"
                value={characterId}
                onChange={(e) => setField("characterId", e.target.value)}
                required
              >
                {UNIQUE_CHARACTERS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              {isUnique && uniqueJobForSelected ? (
                <div className="unit-sheet__hint">
                  Unique Job available:{" "}
                  <strong>{uniqueJobForSelected.name}</strong>
                </div>
              ) : null}
            </label>

            <label className="party-customizer__field">
              <span className="party-customizer__label">Name</span>
              <input
                className="party-customizer__input"
                value={unit.name}
                onChange={(e) => setField("name", e.target.value)}
                placeholder="Unit name"
                required
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
                required
              />
            </label>

            <label className="party-customizer__field">
              <span className="party-customizer__label">Gender</span>
              <select
                className="party-customizer__select"
                value={unit.gender}
                disabled={!!uniqueRule?.gender}
                onChange={(e) => setField("gender", e.target.value)}
                title={uniqueRule?.gender ? "Locked for this character" : ""}
                required
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
                required
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
                type="number"
                min="0"
                max="100"
                className="party-customizer__input"
                value={unit.brave}
                onChange={(e) => setNum("brave", e.target.value, 0, 100)}
                required
              />
            </label>

            <label className="party-customizer__field">
              <span className="party-customizer__label">Faith</span>
              <input
                type="number"
                min="0"
                max="100"
                className="party-customizer__input"
                value={unit.faith}
                onChange={(e) => setNum("faith", e.target.value, 0, 100)}
                required
              />
            </label>
          </div>

          <div className="unit-sheet__grid unit-sheet__jobs">
            <label className="party-customizer__field">
              <span className="party-customizer__label">Primary job</span>
              <select
                className="party-customizer__select"
                value={unit.primaryJobId}
                onChange={(e) => setField("primaryJobId", e.target.value)}
                required
              >
                {filteredJobs.map((j) => (
                  <option
                    key={`${j.id}-${j.uniqueCharacterId || "g"}`}
                    value={j.id}
                  >
                    {j.name}
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
                required
              >
                {filteredJobs.map((j) => (
                  <option
                    key={`${j.id}-${j.uniqueCharacterId || "g"}`}
                    value={j.id}
                  >
                    {j.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="unit-sheet__grid">
            <label className="party-customizer__field">
              <span className="party-customizer__label">Reaction ability</span>
              <select
                className="party-customizer__select"
                value={unit.reactionAbilityId || ""}
                onChange={(e) => setField("reactionAbilityId", e.target.value)}
              >
                <option value="">None</option>
                {reactionOptions.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="party-customizer__field">
              <span className="party-customizer__label">Support ability</span>
              <select
                className="party-customizer__select"
                value={unit.supportAbilityId || ""}
                onChange={(e) => setField("supportAbilityId", e.target.value)}
              >
                <option value="">None</option>
                {supportOptions.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="unit-sheet__grid">
            <label className="party-customizer__field">
              <span className="party-customizer__label">Movement ability</span>
              <select
                className="party-customizer__select"
                value={unit.movementAbilityId || ""}
                onChange={(e) => setField("movementAbilityId", e.target.value)}
              >
                <option value="">None</option>
                {movementOptions.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="party-customizer__field">
              <span className="party-customizer__label">Search abilities</span>
              <input
                className="party-customizer__input"
                value={abilityQuery}
                onChange={(e) => setAbilityQuery(e.target.value)}
                placeholder="Search name or tag: damage, ranged, heal, buff..."
              />
            </label>
          </div>
        </div>
      </div>

      {/* PRIMARY: Action */}
      <AbilityGroup
        title={`${primaryJob?.actionCommand || "Actions"} (${primaryJob?.name})`}
        abilities={primaryActionAbilities}
        checkedIds={checkedPrimary}
        onToggle={(abilityId) => toggleAbilityForJob(primaryJob.id, abilityId)}
        query={abilityQuery}
      />

      {/* SECONDARY: Action ONLY */}
      <AbilityGroup
        title={`Secondary Actions (${secondaryJob?.name})`}
        abilities={secondaryActionAbilities}
        checkedIds={checkedSecondary}
        onToggle={(abilityId) =>
          toggleAbilityForJob(secondaryJob.id, abilityId)
        }
        query={abilityQuery}
      />

      {/* PRIMARY: Support + Movement */}
      <AbilityGroup
        title={`Support Abilities (${primaryJob?.name})`}
        abilities={primarySupportAbilities}
        checkedIds={checkedPrimary}
        onToggle={(abilityId) => toggleAbilityForJob(primaryJob.id, abilityId)}
        query={abilityQuery}
      />

      <AbilityGroup
        title={`Movement Abilities (${primaryJob?.name})`}
        abilities={primaryMovementAbilities}
        checkedIds={checkedPrimary}
        onToggle={(abilityId) => toggleAbilityForJob(primaryJob.id, abilityId)}
        query={abilityQuery}
      />
    </section>
  );
}
