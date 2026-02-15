import { analyzeParty } from "./analyzeParty";

export function suggestFixes(party, jobs) {
  return analyzeParty(party, jobs).suggestions.map((s) => ({
    ...s,
    actions: [{ type: "AUTO_UNLOCK", suggestionId: s.id }],
  }));
}

export function applySuggestion(party, suggestion, jobs) {
  const next = structuredClone(party);
  const id = suggestion?.id;
  const nextUnit = next.units[0];
  nextUnit.unlockedAbilities ||= {};

  const pick = (tags) => {
    const job = jobs.find((j) => j.id === nextUnit.primaryJobId) || jobs[0];
    const ability = job.abilities.find((a) =>
      a.tags.some((t) => tags.includes(t)),
    );
    if (!ability) return;
    nextUnit.unlockedAbilities[job.id] ||= [];
    if (!nextUnit.unlockedAbilities[job.id].includes(ability.id))
      nextUnit.unlockedAbilities[job.id].push(ability.id);
  };

  if (id === "heal") pick(["heal"]);
  if (id === "ranged") pick(["ranged"]);
  if (id === "revive") pick(["revive"]);
  next.updatedAt = new Date().toISOString();
  return next;
}
