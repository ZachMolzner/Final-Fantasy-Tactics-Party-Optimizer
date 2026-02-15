const roles = ["healing", "damage", "ranged", "buffer", "debuffer"];
const map = {
  heal: "healing",
  damage: "damage",
  ranged: "ranged",
  buff: "buffer",
  debuff: "debuffer",
  revive: "revive",
};

export function analyzeParty(party, jobs) {
  const byJob = Object.fromEntries(jobs.map((j) => [j.id, j]));
  const covered = new Set();
  const unitRoles = [];

  (party.units || []).forEach((u) => {
    const local = new Set();
    Object.entries(u.unlockedAbilities || {}).forEach(([jobId, ids]) => {
      const job = byJob[jobId];
      if (!job) return;
      ids.forEach((id) => {
        const ability = job.abilities.find((a) => a.id === id);
        if (!ability) return;
        ability.tags.forEach((tag) => {
          const r = map[tag];
          if (r) {
            covered.add(r);
            local.add(r);
          }
        });
      });
    });
    unitRoles.push([...local][0] || "flex");
  });

  const checklist = Object.fromEntries(roles.map((r) => [r, covered.has(r)]));
  let score = 100;
  roles.forEach((r) => {
    if (!checklist[r]) score -= r === "healing" ? 25 : 15;
  });
  if (!covered.has("revive")) score -= 8;
  const roleCounts = unitRoles.reduce(
    (acc, r) => ({ ...acc, [r]: (acc[r] || 0) + 1 }),
    {},
  );
  const warnings = Object.entries(roleCounts)
    .filter(([r, c]) => r !== "flex" && c > 2)
    .map(([r, c]) => `Redundancy: ${c} units lean ${r}.`);
  if (!checklist.buffer && !checklist.debuffer)
    warnings.push("Support gap: no buffer/debuffer utility.");
  const suggestions = [];
  if (!checklist.healing)
    suggestions.push({
      id: "heal",
      title: "Add Healing",
      reason: "Unlock Cure/Potion or switch a set to healer.",
    });
  if (!checklist.ranged)
    suggestions.push({
      id: "ranged",
      title: "Add Ranged",
      reason: "Unlock Throw Stone or Charge.",
    });
  if (!covered.has("revive"))
    suggestions.push({
      id: "revive",
      title: "Add Revive",
      reason: "Unlock Raise or Phoenix Down.",
    });

  return {
    score: Math.max(0, Math.min(100, score)),
    checklist,
    warnings,
    suggestions: suggestions.slice(0, 3),
    roleCounts,
  };
}
