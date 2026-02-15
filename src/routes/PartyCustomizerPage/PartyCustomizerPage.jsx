import { useEffect, useMemo, useState } from "react";
import PartyRoster from "../../components/party/PartyRoster/PartyRoster";
import UnitSheet from "../../components/party/UnitSheet/UnitSheet";
import PartyReport from "../../components/party/PartyReport/PartyReport";
import { JOBS } from "../../data/jobs.seed";
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
    unlockedAbilities: {
      squire: ["squire_throw_stone"],
      chemist: ["chemist_potion"],
    },
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

// Clipboard helper with fallback
async function copyToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return true;
  }

  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    return true;
  } catch {
    return false;
  }
}

export default function PartyCustomizerPage() {
  const [party, setParty] = useState(readActiveParty() || defaultParty());
  const [activeUnitId, setActiveUnitId] = useState(party.units[0]?.id);

  // Build name input
  const [saveName, setSaveName] = useState(party.name);

  // Saved builds list (so UI refreshes immediately after save)
  const [savedBuilds, setSavedBuilds] = useState(() => readSavedParties());

  // Controlled select (tracks which build is loaded)
  const [selectedBuildId, setSelectedBuildId] = useState("");

  // tiny feedback message
  const [toast, setToast] = useState("");

  const analysis = useMemo(() => analyzeParty(party, JOBS), [party]);

  // keep active party persisted
  useEffect(() => {
    writeActiveParty(party);
  }, [party]);

  // if party name changes from load/default, sync input (but don't fight user typing)
  useEffect(() => {
    // Only sync when a build is loaded or first mount-ish behavior:
    // If user is typing in saveName, they control it.
    if (!saveName) setSaveName(party.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [party.id]);

  // clear toast after a moment
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 1600);
    return () => clearTimeout(t);
  }, [toast]);

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

  // ✅ SAVE: overwrites if a build is currently selected, otherwise creates new
  const saveBuild = () => {
    const name = saveName.trim();
    if (!name) {
      setToast("Name your build first.");
      return;
    }

    const all = readSavedParties();
    const now = new Date().toISOString();

    const idToUse = selectedBuildId || createId("party");

    const buildToSave = {
      ...party,
      id: idToUse,
      name,
      updatedAt: now,
    };

    const next = [buildToSave, ...all.filter((p) => p.id !== idToUse)];

    writeSavedParties(next);
    setSavedBuilds(next);
    setSelectedBuildId(idToUse);
    setToast("Saved!");
  };

  // ✅ LOAD: controlled select + updates name input + active unit
  const loadBuild = (id) => {
    if (!id) return;

    const picked = readSavedParties().find((p) => p.id === id);
    if (picked) {
      setParty(picked);
      setActiveUnitId(picked.units[0]?.id);
      setSaveName(picked.name || "");
      setSelectedBuildId(id);
      setToast("Loaded!");
    }
  };

  // ✅ COPY: exports a wrapped payload (versioned), with error handling
  const copyBuild = async () => {
    const payload = {
      v: 1,
      exportedAt: new Date().toISOString(),
      build: {
        ...party,
        name: saveName.trim() || party.name,
      },
    };

    const ok = await copyToClipboard(JSON.stringify(payload));
    setToast(ok ? "Copied!" : "Copy failed.");
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
          type="button"
          onClick={saveBuild}
        >
          Save Build
        </button>

        <select
          className="party-customizer__select"
          value={selectedBuildId}
          onChange={(e) => loadBuild(e.target.value)}
        >
          <option value="">Load Build</option>
          {savedBuilds.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <button
          className="party-customizer__button party-customizer__button--secondary"
          type="button"
          onClick={copyBuild}
        >
          Copy Build Code
        </button>
      </div>

      {toast ? <div className="party-customizer__toast">{toast}</div> : null}

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
            zodiacs={ZODIAC_SIGNS}
            onUpdate={(updater) => updateUnit(activeUnit.id, updater)}
          />
        </section>

        <aside className="party-customizer__report party-customizer__panel">
          <PartyReport party={party} jobs={JOBS} analysis={analysis} />
        </aside>
      </div>
    </main>
  );
}
