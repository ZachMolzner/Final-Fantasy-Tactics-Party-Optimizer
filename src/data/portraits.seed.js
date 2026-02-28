/* =========================================================
   UNIQUE CHARACTER PORTRAITS
========================================================= */

import FFT_Agrias from "../assets/portraits/FFT_Agrias_Portrait.webp";
import FFT_Alma from "../assets/portraits/FFT_Alma_Portrait.webp";
import FFT_Beowulf from "../assets/portraits/FFT_Beowulf_Portrait.webp";
import FFT_Cidolfus from "../assets/portraits/FFT_Cidolfus_Portrait.webp";
import FFT_Cloud from "../assets/portraits/FFT_Cloud_Portrait.webp";
import FFT_Delita from "../assets/portraits/FFT_Delita_Portrait.webp";
import FFT_Goffard from "../assets/portraits/FFT_Goffard_Portrait.webp";
import FFT_Marach from "../assets/portraits/FFT_Marach_Portrait.webp";
import FFT_Meliadoul from "../assets/portraits/FFT_Meliadoul_Portrait.webp";
import FFT_Mustadio from "../assets/portraits/FFT_Mustadio_Portrait.webp";
import FFT_Ovelia from "../assets/portraits/FFT_Ovelia_Portrait.webp";
import FFT_Ramza from "../assets/portraits/FFT_Ramza_Portrait.webp";
import FFT_Rapha from "../assets/portraits/FFT_Rapha_Portrait.webp";
import FFT_Reis from "../assets/portraits/FFT_Reis_Portrait.webp";

/* =========================================================
   GENERIC JOB PORTRAITS
========================================================= */

import FFT_Archer_F from "../assets/portraits/FFT_Archer_Female_Portrait.webp";
import FFT_Archer_M from "../assets/portraits/FFT_Archer_Male_Portrait.webp";
import FFT_Arith_F from "../assets/portraits/FFT_Arithmetician_Female_Portrait.webp";
import FFT_Arith_M from "../assets/portraits/FFT_Arithmetician_Male_Portrait.webp";
import FFT_Bard_M from "../assets/portraits/FFT_Bard_Male_Portrait.webp";
import FFT_BlackMage_F from "../assets/portraits/FFT_Black_Mage_Female_Portrait.webp";
import FFT_BlackMage_M from "../assets/portraits/FFT_Black_Mage_Male_Portrait.webp";
import FFT_Chemist_F from "../assets/portraits/FFT_Chemist_Female_Portrait.webp";
import FFT_Chemist_M from "../assets/portraits/FFT_Chemist_Male_Portrait.webp";
import FFT_Dancer_F from "../assets/portraits/FFT_Dancer_Female_Portrait.webp";
import FFT_Dragoon_F from "../assets/portraits/FFT_Dragoon_Female_Portrait.webp";
import FFT_Dragoon_M from "../assets/portraits/FFT_Dragoon_Male_Portrait.webp";
import FFT_Geomancer_F from "../assets/portraits/FFT_Geomancer_Female_Portrait.webp";
import FFT_Geomancer_M from "../assets/portraits/FFT_Geomancer_Male_Portrait.webp";
import FFT_Knight_F from "../assets/portraits/FFT_Knight_Female_Portrait.webp";
import FFT_Knight_M from "../assets/portraits/FFT_Knight_Male_Portrait.webp";
import FFT_Mime_F from "../assets/portraits/FFT_Mime_Female_Portrait.webp";
import FFT_Mime_M from "../assets/portraits/FFT_Mime_Male_Portrait.webp";
import FFT_Monk_F from "../assets/portraits/FFT_Monk_Female_Portrait.webp";
import FFT_Monk_M from "../assets/portraits/FFT_Monk_Male_Portrait.webp";
import FFT_Mystic_F from "../assets/portraits/FFT_Mystic_Female_Portrait.webp";
import FFT_Mystic_M from "../assets/portraits/FFT_Mystic_Male_Portrait.webp";
import FFT_Ninja_F from "../assets/portraits/FFT_Ninja_Female_Portrait.webp";
import FFT_Ninja_M from "../assets/portraits/FFT_Ninja_Male_Portrait.webp";
import FFT_Orator_F from "../assets/portraits/FFT_Orator_Female_Portrait.webp";
import FFT_Orator_M from "../assets/portraits/FFT_Orator_Male_Portrait.webp";
import FFT_Samurai_F from "../assets/portraits/FFT_Samurai_Female_Portrait.webp";
import FFT_Samurai_M from "../assets/portraits/FFT_Samurai_Male_Portrait.webp";
import FFT_Squire_F from "../assets/portraits/FFT_Squire_Female_Portrait.webp";
import FFT_Squire_M from "../assets/portraits/FFT_Squire_Male_Portrait.webp";
import FFT_Summoner_F from "../assets/portraits/FFT_Summoner_Female_Portrait.webp";
import FFT_Summoner_M from "../assets/portraits/FFT_Summoner_Male_Portrait.webp";
import FFT_Thief_F from "../assets/portraits/FFT_Thief_Female_Portrait.webp";
import FFT_Thief_M from "../assets/portraits/FFT_Thief_Male_Portrait.webp";
import FFT_TimeMage_F from "../assets/portraits/FFT_Time_Mage_Female_Portrait.webp";
import FFT_TimeMage_M from "../assets/portraits/FFT_Time_Mage_Male_Portrait.webp";
import FFT_WhiteMage_F from "../assets/portraits/FFT_White_Mage_Female_Portrait.webp";
import FFT_WhiteMage_M from "../assets/portraits/FFT_White_Mage_Male_Portrait.webp";

import FFT_Automaton from "../assets/portraits/FFT_Automaton_Portrait.webp";

/* =========================================================
   NORMALIZATION
========================================================= */

const norm = (v) =>
  String(v || "")
    .trim()
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ");

const normGender = (g) => {
  const x = norm(g);
  if (["m", "male"].includes(x)) return "male";
  if (["f", "female"].includes(x)) return "female";
  return "any";
};

/* =========================================================
   UNIQUE CHARACTER LOOKUP
========================================================= */

const UNIQUE_PORTRAITS = {
  ramza: FFT_Ramza,
  agrias: FFT_Agrias,
  delita: FFT_Delita,
  ovelia: FFT_Ovelia,
  alma: FFT_Alma,
  mustadio: FFT_Mustadio,
  cidolfus: FFT_Cidolfus,
  orlandeau: FFT_Cidolfus,
  beowulf: FFT_Beowulf,
  reis: FFT_Reis,
  rapha: FFT_Rapha,
  marach: FFT_Marach,
  meliadoul: FFT_Meliadoul,
  cloud: FFT_Cloud,
  goffard: FFT_Goffard,
};

/* =========================================================
   JOB PORTRAITS
========================================================= */

const JOB_PORTRAITS = {
  squire: { male: FFT_Squire_M, female: FFT_Squire_F },
  chemist: { male: FFT_Chemist_M, female: FFT_Chemist_F },
  knight: { male: FFT_Knight_M, female: FFT_Knight_F },
  archer: { male: FFT_Archer_M, female: FFT_Archer_F },
  monk: { male: FFT_Monk_M, female: FFT_Monk_F },
  thief: { male: FFT_Thief_M, female: FFT_Thief_F },

  "black mage": { male: FFT_BlackMage_M, female: FFT_BlackMage_F },
  "white mage": { male: FFT_WhiteMage_M, female: FFT_WhiteMage_F },
  "time mage": { male: FFT_TimeMage_M, female: FFT_TimeMage_F },

  summoner: { male: FFT_Summoner_M, female: FFT_Summoner_F },

  mystic: { male: FFT_Mystic_M, female: FFT_Mystic_F },
  orator: { male: FFT_Orator_M, female: FFT_Orator_F },
  arithmetician: { male: FFT_Arith_M, female: FFT_Arith_F },

  ninja: { male: FFT_Ninja_M, female: FFT_Ninja_F },
  dragoon: { male: FFT_Dragoon_M, female: FFT_Dragoon_F },
  geomancer: { male: FFT_Geomancer_M, female: FFT_Geomancer_F },
  samurai: { male: FFT_Samurai_M, female: FFT_Samurai_F },
  mime: { male: FFT_Mime_M, female: FFT_Mime_F },

  bard: { male: FFT_Bard_M, female: FFT_Bard_M },
  dancer: { male: FFT_Dancer_F, female: FFT_Dancer_F },

  automaton: { male: FFT_Automaton, female: FFT_Automaton, any: FFT_Automaton },
};

/* =========================================================
   ALIASES (PS1 / WotL / API Differences)
========================================================= */

const JOB_ALIASES = {
  calculator: "arithmetician",
  mediator: "orator",
  oracle: "mystic",
};

/* =========================================================
   NORMALIZE JOB KEY (OBJECT SAFE)
========================================================= */

function normalizeJobKey(primaryJob) {
  const raw =
    typeof primaryJob === "string"
      ? primaryJob
      : primaryJob?.id || primaryJob?.name || "";

  const key = norm(raw);
  return JOB_ALIASES[key] || key;
}

/* =========================================================
   DROPDOWN + RULES (REQUIRED EXPORTS)
========================================================= */

export const UNIQUE_CHARACTERS = [
  { id: "none", name: "Generic (No Unique)" },
  { id: "ramza", name: "Ramza" },
  { id: "agrias", name: "Agrias" },
  { id: "delita", name: "Delita" },
  { id: "ovelia", name: "Ovelia" },
  { id: "alma", name: "Alma" },
  { id: "mustadio", name: "Mustadio" },
  { id: "cidolfus", name: "Cidolfus (Orlandeau)" },
  { id: "beowulf", name: "Beowulf" },
  { id: "reis", name: "Reis" },
  { id: "rapha", name: "Rapha" },
  { id: "marach", name: "Marach" },
  { id: "meliadoul", name: "Meliadoul" },
  { id: "cloud", name: "Cloud" },
  { id: "goffard", name: "Goffard" },
];

export const UNIQUE_CHARACTER_RULES = {
  ramza: { gender: "male" },
  delita: { gender: "male" },
  cidolfus: { gender: "male" },
  beowulf: { gender: "male" },
  mustadio: { gender: "male" },
  marach: { gender: "male" },
  cloud: { gender: "male" },
  goffard: { gender: "male" },

  agrias: { gender: "female" },
  ovelia: { gender: "female" },
  alma: { gender: "female" },
  rapha: { gender: "female" },
  reis: { gender: "female" },
  meliadoul: { gender: "female" },
};

/* =========================================================
   MAIN RESOLVER
========================================================= */

export function getPortraitSrc({ primaryJob, gender, characterId } = {}) {
  const cid = norm(characterId);

  if (cid && UNIQUE_PORTRAITS[cid]) {
    return UNIQUE_PORTRAITS[cid];
  }

  const jobKey = normalizeJobKey(primaryJob);
  const g = normGender(gender);

  const entry = JOB_PORTRAITS[jobKey];
  if (entry) {
    return entry[g] || entry.any || entry.male || entry.female;
  }

  return FFT_Automaton;
}
