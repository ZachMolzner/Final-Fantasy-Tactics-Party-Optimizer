export const JOBS = [
  {
    id: "squire",
    name: "Squire",
    tier: 1,
    genderRequirement: null,
    abilities: [
      { id: "focus", name: "Focus", jpCost: 50, tags: ["buff"] },
      {
        id: "throw_stone",
        name: "Throw Stone",
        jpCost: 90,
        tags: ["ranged", "damage"],
      },
      { id: "accumulate", name: "Accumulate", jpCost: 100, tags: ["buff"] },
    ],
  },
  {
    id: "chemist",
    name: "Chemist",
    tier: 1,
    genderRequirement: null,
    abilities: [
      { id: "potion", name: "Potion", jpCost: 30, tags: ["heal"] },
      {
        id: "phoenix_down",
        name: "Phoenix Down",
        jpCost: 90,
        tags: ["revive"],
      },
    ],
  },
  {
    id: "archer",
    name: "Archer",
    tier: 2,
    genderRequirement: null,
    abilities: [
      {
        id: "charge_1",
        name: "Charge +1",
        jpCost: 50,
        tags: ["ranged", "damage"],
      },
      { id: "concentrate", name: "Concentrate", jpCost: 400, tags: ["buff"] },
    ],
  },
  {
    id: "white_mage",
    name: "White Mage",
    tier: 2,
    genderRequirement: null,
    abilities: [
      { id: "cure", name: "Cure", jpCost: 50, tags: ["heal"] },
      { id: "raise", name: "Raise", jpCost: 300, tags: ["revive"] },
      { id: "protect", name: "Protect", jpCost: 200, tags: ["buff"] },
    ],
  },
  {
    id: "black_mage",
    name: "Black Mage",
    tier: 2,
    genderRequirement: null,
    abilities: [
      { id: "fire", name: "Fire", jpCost: 50, tags: ["magic", "damage"] },
      {
        id: "fira",
        name: "Fira",
        jpCost: 200,
        tags: ["magic", "damage", "aoe"],
      },
    ],
  },
  {
    id: "time_mage",
    name: "Time Mage",
    tier: 3,
    genderRequirement: null,
    abilities: [
      { id: "haste", name: "Haste", jpCost: 300, tags: ["buff"] },
      { id: "slow", name: "Slow", jpCost: 200, tags: ["debuff"] },
      { id: "teleport", name: "Teleport", jpCost: 600, tags: ["movement"] },
    ],
  },
  {
    id: "oracle",
    name: "Oracle",
    tier: 3,
    genderRequirement: null,
    abilities: [
      {
        id: "silence_song",
        name: "Silence Song",
        jpCost: 200,
        tags: ["debuff"],
      },
    ],
  },
  {
    id: "bard",
    name: "Bard",
    tier: 4,
    genderRequirement: "male",
    abilities: [
      { id: "battle_song", name: "Battle Song", jpCost: 300, tags: ["buff"] },
    ],
  },
  {
    id: "dancer",
    name: "Dancer",
    tier: 4,
    genderRequirement: "female",
    abilities: [
      { id: "slow_dance", name: "Slow Dance", jpCost: 500, tags: ["debuff"] },
    ],
  },
];
