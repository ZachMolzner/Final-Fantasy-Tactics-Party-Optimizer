const KEYS = {
  active: "fft_active_party",
  saved: "fft_saved_parties",
  posts: "fft_community_posts",
};

function read(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}
function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function readActiveParty() {
  return read(KEYS.active, null);
}
export function writeActiveParty(party) {
  write(KEYS.active, party);
}
export function readSavedParties() {
  return read(KEYS.saved, []);
}
export function writeSavedParties(parties) {
  write(KEYS.saved, parties);
}
export function readCommunityPosts() {
  return read(KEYS.posts, []);
}
export function writeCommunityPosts(posts) {
  write(KEYS.posts, posts);
}
export function createId(prefix = "id") {
  return `${prefix}-${crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`}`;
}
