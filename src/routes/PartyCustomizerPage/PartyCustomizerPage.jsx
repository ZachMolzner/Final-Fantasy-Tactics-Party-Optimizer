import { useEffect, useMemo, useState } from "react";
import PartyRoster from "../../components/party/PartyRoster/PartyRoster";
import UnitSheet from "../../components/party/UnitSheet/UnitSheet";
import PartyReport from "../../components/party/PartyReport/PartyReport";
import { JOBS } from "../../data/jobs.seed";
import { PORTRAITS } from "../../data/portraits.seed";
import { ZODIAC_SIGNS } from "../../data/zodiac.constants";
import { analyzeParty } from "../../utils/optimizer/analyzeParty";
import {
  createId,
  readActiveParty,
  readSavedParties,
  writeActiveParty,
  writeSavedParties,
} from "../../services/storage/partyStorage";
import "./PartyCustomizerPage.css";

function defaultUnit(idx = 1) {
  return {
    id: createId("unit"),
    portraitId: PORTRAITS[idx % PORTRAITS.length].id,
    name: `Unit ${idx}`,
    level: 1,
    gender: "male",
    zodiac: ZODIAC_SIGNS[idx % ZODIAC_SIGNS.length].id,
    brave: 70,
    faith: 60,
    primaryJobId: "squire",
    secondaryJobId: "chemist",
    reactionAbilityId: "",
    supportAbilityId: "",
    movementAbilityId: "",
    unlockedAbilities: { squire: ["throw_stone"], chemist: ["potion"] },
    equipment: { weapon: "", shield: "", head: "", body: "", accessory: "" },
  };
}
function defaultParty() {
  return {
    id: createId("party"),
    name: "Main Party",
    units: [1, 2, 3, 4, 5].map((i) => defaultUnit(i)),
    updatedAt: new Date().toISOString(),
  };
}

export default function PartyCustomizerPage() {
  const [party, setParty] = useState(readActiveParty() || defaultParty());
  const [activeUnitId, setActiveUnitId] = useState(party.units[0]?.id);
  const [saveName, setSaveName] = useState(party.name);
  const analysis = useMemo(() => analyzeParty(party, JOBS), [party]);

  useEffect(() => {
    writeActiveParty(party);
  }, [party]);
  const activeUnit =
    party.units.find((u) => u.id === activeUnitId) || party.units[0];

  const updateUnit = (unitId, updater) => {
    setParty((prev) => ({
      ...prev,
      updatedAt: new Date().toISOString(),
      units: prev.units.map((u) => (u.id === unitId ? updater(u) : u)),
    }));
  };

  const addUnit = () => {
    if (party.units.length >= 5) return;
    const next = defaultUnit(party.units.length + 1);
    setParty((p) => ({
      ...p,
      units: [...p.units, next],
      updatedAt: new Date().toISOString(),
    }));
    setActiveUnitId(next.id);
  };

  const removeUnit = () => {
    if (party.units.length <= 1) return;
    const nextUnits = party.units.filter((u) => u.id !== activeUnitId);
    setParty((p) => ({
      ...p,
      units: nextUnits,
      updatedAt: new Date().toISOString(),
    }));
    setActiveUnitId(nextUnits[0].id);
  };

  const saveBuild = () => {
    const all = readSavedParties();
    const next = [
      { ...party, id: createId("party"), name: saveName || party.name },
      ...all,
    ];
    writeSavedParties(next);
  };

  const loadBuild = (id) => {
    const picked = readSavedParties().find((p) => p.id === id);
    if (picked) {
      setParty(picked);
      setActiveUnitId(picked.units[0]?.id);
      setSaveName(picked.name);
    }
  };

  const copyBuild = async () => {
    await navigator.clipboard.writeText(JSON.stringify(party));
  };

  return (
    <main className="party-customizer">
      <div className="party-customizer__actions">
        <input
          className="party-customizer__input"
          value={saveName}
          onChange={(e) => setSaveName(e.target.value)}
          placeholder="Build name"
        />
        <button
          className="party-customizer__button party-customizer__button--primary"
          onClick={saveBuild}
        >
          Save Build
        </button>
        <select
          className="party-customizer__select"
          defaultValue=""
          onChange={(e) => loadBuild(e.target.value)}
        >
          <option value="">Load Build</option>
          {readSavedParties().map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <button
          className="party-customizer__button party-customizer__button--secondary"
          onClick={copyBuild}
        >
          Copy Build Code
        </button>
      </div>
      <div className="party-customizer__layout">
        <aside className="party-customizer__roster party-customizer__panel">
          <PartyRoster
            units={party.units}
            activeUnitId={activeUnitId}
            onSelect={setActiveUnitId}
            onAdd={addUnit}
            onRemove={removeUnit}
            jobs={JOBS}
          />
        </aside>
        <section className="party-customizer__sheet party-customizer__panel">
          <UnitSheet
            unit={activeUnit}
            jobs={JOBS}
            portraits={PORTRAITS}
            zodiacs={ZODIAC_SIGNS}
            onUpdate={(updater) => updateUnit(activeUnit.id, updater)}
          />
        </section>
        <aside className="party-customizer__report party-customizer__panel">
          <PartyReport
            party={party}
            jobs={JOBS}
            analysis={analysis}
            setParty={setParty}
          />
        </aside>
      </div>
    </main>
  );
}
