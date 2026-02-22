// src/data/jobs.seed.js

const RAW_JOBS = [
  // ============================================================
  // GENERIC JOBS
  // ============================================================
  {
    job: "Squire",
    category: "Generic",
    action_command: "Fundaments",
    action_abilities: ["Focus", "Rush", "Throw Stone", "Salve"],
    reaction_abilities: ["Counter Tackle"],
    support_abilities: ["Equip Axe"],
    movement_abilities: ["Move +1"],
  },
  {
    job: "Chemist",
    category: "Generic",
    action_command: "Items",
    action_abilities: [
      "Potion",
      "Hi-Potion",
      "X-Potion",
      "Ether",
      "Hi-Ether",
      "Antidote",
      "Eye Drops",
      "Echo Herbs",
      "Maiden's Kiss",
      "Gold Needle",
      "Holy Water",
      "Remedy",
      "Phoenix Down",
    ],
    reaction_abilities: ["Auto-Potion"],
    support_abilities: ["Throw Items"],
    movement_abilities: [],
  },
  {
    job: "Knight",
    category: "Generic",
    action_command: "Arts of War",
    action_abilities: [
      "Rend Helm",
      "Rend Armor",
      "Rend Shield",
      "Rend Weapon",
      "Rend Power",
      "Rend Speed",
      "Rend MP",
      "Rend Magick",
    ],
    reaction_abilities: ["Parry"],
    support_abilities: ["Equip Heavy Armor"],
    movement_abilities: [],
  },
  {
    job: "Archer",
    category: "Generic",
    action_command: "Aim",
    action_abilities: [
      "Aim +1",
      "Aim +2",
      "Aim +3",
      "Aim +4",
      "Aim +5",
      "Aim +7",
      "Aim +10",
      "Aim +20",
    ],
    reaction_abilities: ["Concentration"],
    support_abilities: ["Equip Crossbow"],
    movement_abilities: [],
  },
  {
    job: "Monk",
    category: "Generic",
    action_command: "Martial Arts",
    action_abilities: [
      "Cyclone",
      "Pummel",
      "Aurablast",
      "Shockwave",
      "Doom Fist",
      "Purification",
      "Chakra",
      "Revive",
    ],
    reaction_abilities: ["Counter"],
    support_abilities: ["Martial Arts"],
    movement_abilities: ["Move-HP Up"],
  },
  {
    job: "Thief",
    category: "Generic",
    action_command: "Steal",
    action_abilities: [
      "Steal Gil",
      "Steal Heart",
      "Steal Helmet",
      "Steal Armor",
      "Steal Weapon",
      "Steal Shield",
      "Steal Accessory",
    ],
    reaction_abilities: ["Catch"],
    support_abilities: ["Move +2"],
    movement_abilities: ["Move-Find Item"],
  },
  {
    job: "White Mage",
    category: "Generic",
    action_command: "White Magicks",
    action_abilities: [
      "Cure",
      "Cura",
      "Curaga",
      "Curaja",
      "Raise",
      "Arise",
      "Reraise",
      "Regen",
      "Protect",
      "Protectja",
      "Shell",
      "Shellja",
      "Wall",
      "Esuna",
      "Holy",
    ],
    reaction_abilities: ["Regenerator"],
    support_abilities: ["Arcane Defense"],
    movement_abilities: [],
  },
  {
    job: "Black Mage",
    category: "Generic",
    action_command: "Black Magicks",
    action_abilities: [
      "Fire",
      "Fira",
      "Firaga",
      "Firaja",
      "Thunder",
      "Thundara",
      "Thundaga",
      "Thundaja",
      "Blizzard",
      "Blizzara",
      "Blizzaga",
      "Blizzaja",
      "Poison",
      "Toad",
      "Death",
      "Flare",
    ],
    reaction_abilities: ["Magick Counter"],
    support_abilities: ["Arcane Strength"],
    movement_abilities: [],
  },
  {
    job: "Time Mage",
    category: "Generic",
    action_command: "Time Magicks",
    action_abilities: [
      "Haste",
      "Hasteja",
      "Slow",
      "Slowja",
      "Stop",
      "Immobilize",
      "Float",
      "Reflect",
      "Quick",
      "Gravity",
      "Graviga",
      "Meteor",
    ],
    reaction_abilities: ["Critical: Quick"],
    support_abilities: ["Swiftness"],
    movement_abilities: ["Teleport"],
  },

  {
    job: "Oracle",
    category: "Generic",
    action_command: "Mystic Arts",
    action_abilities: [
      "Blind",
      "Silence",
      "Sleep",
      "Petrify",
      "Confuse",
      "Berserk",
      "Doubt (Faith)",
      "Disbelief (Innocent)",
      "Zombie",
      "Dispel Magick",
    ],
    reaction_abilities: ["Mana Shield"],
    support_abilities: ["Short Charge"],
    movement_abilities: [],
  },
  {
    job: "Mediator",
    category: "Generic",
    action_command: "Talk Skill",
    action_abilities: [
      "Praise",
      "Threaten",
      "Cheer Up",
      "Insult",
      "Preach",
      "Solution",
      "Invitation",
      "Mimic Daravon",
    ],
    reaction_abilities: ["Counter Tackle"],
    support_abilities: ["Equip Gun"],
    movement_abilities: [],
  },
  {
    job: "Geomancer",
    category: "Generic",
    action_command: "Elemental",
    action_abilities: [
      "Pitfall",
      "Carve Model",
      "Tornado",
      "Quake",
      "Demi",
      "Freeze",
      "Blast",
      "Flood",
    ],
    reaction_abilities: ["Counter"],
    support_abilities: ["Attack Up"],
    movement_abilities: ["Ignore Terrain", "Lava Walking"],
  },
  {
    job: "Calculator",
    category: "Generic",
    action_command: "Arithmeticks",
    action_abilities: [
      "CT",
      "Level",
      "Exp",
      "Height",
      "Prime",
      "Multiple of 5",
      "Multiple of 4",
      "Multiple of 3",
    ],
    reaction_abilities: [],
    support_abilities: [],
    movement_abilities: [],
  },

  // ============================================================
  // ADVANCED JOBS
  // ============================================================
  {
    job: "Summoner",
    category: "Advanced",
    action_command: "Summon",
    action_abilities: [
      "Moogle",
      "Shiva",
      "Ramuh",
      "Ifrit",
      "Titan",
      "Golem",
      "Carbuncle",
      "Bahamut",
      "Odin",
      "Leviathan",
      "Salamander",
      "Sylph",
      "Faerie",
      "Lich",
      "Cyclops",
      "Zodiark",
    ],
    reaction_abilities: ["Mana Shield"],
    support_abilities: ["Half of MP"],
    movement_abilities: [],
  },
  {
    job: "Ninja",
    category: "Advanced",
    action_command: "Throw",
    action_abilities: [
      "Shuriken",
      "Bomb",
      "Knife",
      "Sword",
      "Flail",
      "Katana",
      "Ninja Blade",
      "Axe",
      "Polearm",
      "Pole",
      "Knight's Sword",
      "Book",
    ],
    reaction_abilities: ["Reflexes"],
    support_abilities: ["Dual Wield"],
    movement_abilities: ["Move +2"],
  },
  {
    job: "Dragoon",
    category: "Advanced",
    action_command: "Jump",
    action_abilities: [
      "Horizontal Jump 2",
      "Horizontal Jump 3",
      "Horizontal Jump 4",
      "Horizontal Jump 5",
      "Horizontal Jump 6",
      "Horizontal Jump 7",
      "Horizontal Jump 8",
      "Vertical Jump 2",
      "Vertical Jump 3",
      "Vertical Jump 4",
      "Vertical Jump 5",
      "Vertical Jump 6",
      "Vertical Jump 7",
      "Vertical Jump 8",
    ],
    reaction_abilities: ["Dragon Spirit"],
    support_abilities: ["Equip Spear"],
    movement_abilities: [],
  },
  {
    job: "Samurai",
    category: "Advanced",
    action_command: "Iaido",
    action_abilities: [
      "Ashura",
      "Kotetsu",
      "Osafune",
      "Murasame",
      "Ame-no-Murakumo",
      "Kiyomori",
      "Muramasa",
      "Kiku-ichimonji",
      "Masamune",
      "Chirijiraden",
    ],
    reaction_abilities: ["Shirahadori", "Bonecrusher"],
    support_abilities: ["Doublehand"],
    movement_abilities: ["Swim"],
  },
  {
    job: "Bard",
    category: "Advanced",
    genderRequirement: "male",
    action_command: "Sing",
    action_abilities: [
      "Cheer Song",
      "Battle Song",
      "Life Song",
      "Magic Song",
      "Hero's Song",
    ],
    reaction_abilities: ["Magick Surge", "Faith Boost"],
    support_abilities: [],
    movement_abilities: ["Movement +3", "Fly"],
  },
  {
    job: "Dancer",
    category: "Advanced",
    genderRequirement: "female",
    action_command: "Dance",
    action_abilities: [
      "Witch Hunt",
      "Nameless Dance",
      "Last Dance",
      "Polka Polka",
    ],
    reaction_abilities: ["Fury", "Bravery Boost"],
    support_abilities: [],
    movement_abilities: ["Jump +3", "Fly"],
  },

  {
    job: "Mime",
    category: "Advanced",
    action_command: "Mimic",
    action_abilities: ["Mimic"],
    reaction_abilities: [],
    support_abilities: [],
    movement_abilities: [],
  },

  // ============================================================
  // UNIQUE JOBS (locked unless matching unique character selected)
  // ============================================================

  {
    job: "Gallant Knight",
    category: "Unique",
    uniqueCharacterId: "ramza",
    action_command: "Gallantry",
    action_abilities: ["Tailwind", "Steel", "Shout", "Ultima"],
    reaction_abilities: [],
    support_abilities: [],
    movement_abilities: [],
  },

  {
    job: "Holy Knight",
    category: "Unique",
    uniqueCharacterId: "delita",
    action_command: "Holy Sword",
    action_abilities: [
      "Judgement Blade (Holy Knight)",
      "Cleansing Strike (Holy Knight)",
      "Northswain's Strike (Holy Knight)",
      "Hallowed Bolt (Holy Knight)",
      "Divine Ruination (Holy Knight)",
    ],
    reaction_abilities: [],
    support_abilities: [],
    movement_abilities: [],
  },

  {
    job: "Holy Knight",
    category: "Unique",
    uniqueCharacterId: "agrias",
    action_command: "Holy Sword",
    action_abilities: [
      "Judgement Blade (Holy Knight)",
      "Cleansing Strike (Holy Knight)",
      "Northswain's Strike (Holy Knight)",
      "Hallowed Bolt (Holy Knight)",
      "Divine Ruination (Holy Knight)",
    ],
    reaction_abilities: [],
    support_abilities: [],
    movement_abilities: [],
  },

  {
    job: "Sword Saint",
    category: "Unique",
    uniqueCharacterId: "cidolfus",
    action_command: "Swordplay",
    action_abilities: [
      "Judgement Blade (Sword Saint)",
      "Cleansing Strike (Sword Saint)",
      "Northswain's Strike (Sword Saint)",
      "Hallowed Bolt (Sword Saint)",
      "Divine Ruination (Sword Saint)",
      "Crush Armor (Sword Saint)",
      "Crush Helm (Sword Saint)",
      "Crush Weapon (Sword Saint)",
      "Crush Accessory (Sword Saint)",
      "Duskblade",
      "Shadowblade",
    ],
    reaction_abilities: [],
    support_abilities: [],
    movement_abilities: [],
  },

  {
    job: "Templar",
    category: "Unique",
    uniqueCharacterId: "beowulf",
    action_command: "Spellblade",
    action_abilities: [
      "Blind",
      "Syphon",
      "Drain",
      "Faith",
      "Doubt",
      "Zombie",
      "Silence",
      "Berserk",
      "Chicken",
      "Confuse",
      "Dispel",
      "Disable",
      "Sleep",
      "Break",
      "Vengeance",
    ],
    reaction_abilities: [],
    support_abilities: [],
    movement_abilities: [],
  },

  {
    job: "Divine Knight",
    category: "Unique",
    uniqueCharacterId: "meliadoul",
    action_command: "Unyielding Blade",
    action_abilities: [
      "Crush Armor (Divine Knight)",
      "Crush Helm (Divine Knight)",
      "Crush Weapon (Divine Knight)",
      "Crush Accessory (Divine Knight)",
    ],
    reaction_abilities: [],
    support_abilities: [],
    movement_abilities: [],
  },

  {
    job: "Skyseer",
    category: "Unique",
    uniqueCharacterId: "rapha",
    action_command: "Sky Mantra",
    action_abilities: [
      "Heaven's Wrath",
      "Ashura",
      "Adamantine Blade",
      "Maelstrom",
      "Celestial Void",
      "Divinity",
    ],
    reaction_abilities: [],
    support_abilities: [],
    movement_abilities: [],
  },

  {
    job: "Machinist",
    category: "Unique",
    uniqueCharacterId: "mustadio",
    action_command: "Aimed Shot",
    action_abilities: ["Leg Shot", "Arm Shot", "Seal Evil"],
    reaction_abilities: [],
    support_abilities: [],
    movement_abilities: [],
  },

  {
    job: "Dragonkin",
    category: "Unique",
    uniqueCharacterId: "reis",
    action_command: "Dragon",
    action_abilities: [
      "Ice Breath",
      "Fire Breath",
      "Thunder Breath",
      "Dragon's Charm",
      "Dragon's Gift",
      "Dragon's Might",
      "Dragon's Speed",
      "Holy Breath",
    ],
    reaction_abilities: [],
    support_abilities: [],
    movement_abilities: [],
  },

  {
    job: "Soldier",
    category: "Unique",
    uniqueCharacterId: "cloud",
    action_command: "Limit (requires Materia Blade / Materia Blade+)",
    action_abilities: [
      "Braver",
      "Cross Slash",
      "Blade Burst",
      "Ascension",
      "Meteorain",
      "Finishing Touch",
      "Omnislash",
      "Cherry Blossom",
    ],
    reaction_abilities: [],
    support_abilities: [],
    movement_abilities: [],
  },
];

function slug(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");
}

function inferTags(name, type, jobName) {
  const n = name.toLowerCase();
  const tags = new Set();

  if (type === "reaction") tags.add("reaction");
  if (type === "support") tags.add("support");
  if (type === "movement") tags.add("movement");

  if (/cure|potion|salve|chakra|moogle|faerie|regen/.test(n)) tags.add("heal");
  if (/raise|arise|reraise|phoenix down|revive/.test(n)) tags.add("revive");
  if (
    /antidote|eye drops|echo herbs|kiss|needle|holy water|remedy|esuna|purification/.test(
      n,
    )
  )
    tags.add("cleanse");

  if (/throw|aim|shot|breath|shockwave|jump|shuriken|bomb|stone/.test(n))
    tags.add("ranged");

  if (
    /focus|haste|protect|shell|wall|reflect|quick|golem|carbuncle|masamune|arcane defense|gift|charm|speed|might|tailwind|steel|shout/.test(
      n,
    )
  )
    tags.add("buff");

  if (
    /slow|stop|immobilize|poison|toad|death|rend|doom|blind|silence|sleep|disable|confuse|berserk|break|doubt|zombie/.test(
      n,
    )
  ) {
    tags.add("debuff");
    tags.add("control");
  }

  if (/teleport|move\s*\+|move-hp|float/.test(n) || type === "movement")
    tags.add("mobility");

  if (/mage|summoner/.test(jobName.toLowerCase()) && type === "action")
    tags.add("magic");

  if (
    /fir|blizz|thund|flare|meteor|bahamut|zodiark|holy|gravity|graviga|maelstrom|void|ruination|bolt|wrath|ultima/.test(
      n,
    )
  ) {
    tags.add("damage");
    tags.add("aoe");
  }

  // Cloud limits should count as damage/control
  if (
    /braver|cross slash|blade burst|ascension|meteorain|omnislash|cherry blossom/.test(
      n,
    )
  ) {
    tags.add("damage");
  }
  if (/finishing touch/.test(n)) {
    tags.add("control");
  }

  if (tags.size === 0 && type === "action") tags.add("damage");
  return [...tags];
}

function toAbilities(jobId, names, type, jobName) {
  return names.map((name) => ({
    id: `${jobId}_${slug(name)}`,
    name,
    type,
    tags: inferTags(name, type, jobName),
  }));
}

export const JOBS = RAW_JOBS.map((job, index) => {
  const id = slug(
    `${job.job}${job.uniqueCharacterId ? `_${job.uniqueCharacterId}` : ""}`,
  );

  return {
    id,
    name: job.job,
    tier: job.category === "Advanced" ? 3 : job.category === "Unique" ? 4 : 1,
    category: job.category,
    actionCommand: job.action_command,
    uniqueCharacterId: job.uniqueCharacterId || null,
    genderRequirement: job.genderRequirement || null,
    abilities: [
      ...toAbilities(id, job.action_abilities, "action", job.job),
      ...toAbilities(id, job.reaction_abilities, "reaction", job.job),
      ...toAbilities(id, job.support_abilities, "support", job.job),
      ...toAbilities(id, job.movement_abilities, "movement", job.job),
    ],
    order: index,
  };
});
