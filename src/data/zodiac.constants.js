export const ZODIAC_SIGNS = [
  { id: "aries", name: "Aries", element: "fire", short: "Ari" },
  { id: "taurus", name: "Taurus", element: "earth", short: "Tau" },
  { id: "gemini", name: "Gemini", element: "air", short: "Gem" },
  { id: "cancer", name: "Cancer", element: "water", short: "Can" },
  { id: "leo", name: "Leo", element: "fire", short: "Leo" },
  { id: "virgo", name: "Virgo", element: "earth", short: "Vir" },
  { id: "libra", name: "Libra", element: "air", short: "Lib" },
  { id: "scorpio", name: "Scorpio", element: "water", short: "Sco" },
  { id: "sagittarius", name: "Sagittarius", element: "fire", short: "Sag" },
  { id: "capricorn", name: "Capricorn", element: "earth", short: "Cap" },
  { id: "aquarius", name: "Aquarius", element: "air", short: "Aqu" },
  { id: "pisces", name: "Pisces", element: "water", short: "Pis" },
];

const byId = Object.fromEntries(ZODIAC_SIGNS.map((z) => [z.id, z]));
const opposing = { fire: "water", water: "fire", earth: "air", air: "earth" };
export function getZodiacCompatibility(aId, bId) {
  const a = byId[aId];
  const b = byId[bId];
  if (!a || !b) return { tier: "neutral", label: "Neutral", modifier: 1 };
  if (a.id === b.id) return { tier: "best", label: "Best", modifier: 1.25 };
  if (a.element === b.element)
    return { tier: "good", label: "Good", modifier: 1.1 };
  if (opposing[a.element] === b.element)
    return { tier: "bad", label: "Bad", modifier: 0.9 };
  return { tier: "neutral", label: "Neutral", modifier: 1 };
}
