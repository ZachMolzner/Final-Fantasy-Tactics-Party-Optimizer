import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  createId,
  readCommunityPosts,
  readSavedParties,
  writeActiveParty,
  writeCommunityPosts,
  writeSavedParties,
} from "../../services/storage/partyStorage";
import "./CommunityPage.css";

function toSnapshot(party) {
  const units = (party?.units || []).slice(0, 5).map((u) => ({
    name: u.name || "Unit",
    level: u.level ?? 1,
    zodiac: u.zodiac || "-",
    job: u.primaryJobId || "",
  }));

  while (units.length < 5)
    units.push({ name: "Empty", level: "-", zodiac: "-", job: "" });

  return units;
}

function fmtDate(iso) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return "";
  }
}

export default function CommunityPage() {
  const navigate = useNavigate();
  const { profile } = useAuth();

  const authorName = profile?.displayName || "Adventurer";

  // Lazy-init from storage (fixes react-hooks/set-state-in-effect)
  const [savedParties, setSavedParties] = useState(() => readSavedParties());
  const [posts, setPosts] = useState(() => readCommunityPosts());

  const [selectedPartyId, setSelectedPartyId] = useState("");
  const [message, setMessage] = useState("");

  const [notice, setNotice] = useState("");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("newest");

  // auto-clear notice
  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(""), 1700);
    return () => clearTimeout(t);
  }, [notice]);

  const selectedParty = useMemo(
    () => savedParties.find((p) => p.id === selectedPartyId),
    [savedParties, selectedPartyId],
  );

  const filteredPosts = useMemo(() => {
    const q = (query || "").trim().toLowerCase();

    const out = posts.filter((p) => {
      const authorHit = (p.authorName || "").toLowerCase().includes(q);
      const msgHit = (p.message || "").toLowerCase().includes(q);
      const nameHit = (p.partyData?.name || "").toLowerCase().includes(q);
      return authorHit || msgHit || nameHit;
    });

    out.sort((a, b) =>
      sort === "newest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt),
    );

    return out;
  }, [posts, query, sort]);

  const handlePost = () => {
    if (!selectedParty) {
      setNotice("Select a party to post.");
      return;
    }

    const trimmed = (message || "").trim();

    const post = {
      postId: createId("post"),
      authorName,
      createdAt: new Date().toISOString(),
      message: trimmed,
      partyData: selectedParty,
      partySnapshot: toSnapshot(selectedParty),
    };

    const next = [post, ...posts];
    setPosts(next);
    writeCommunityPosts(next);

    setSelectedPartyId("");
    setMessage("");
    setNotice("Posted!");
  };

  // Prevent duplicate saves from same post
  const saveBuildFromPost = (post) => {
    const alreadySaved = savedParties.some(
      (p) => p.sourcePostId === post.postId,
    );
    if (alreadySaved) {
      setNotice("Already saved from this post.");
      return;
    }

    const next = [
      {
        ...post.partyData,
        id: createId("party"),
        name: `${post.partyData?.name || "Shared Build"} (Saved)`,
        sourcePostId: post.postId,
        savedFrom: post.authorName,
        updatedAt: new Date().toISOString(),
      },
      ...savedParties,
    ];

    setSavedParties(next);
    writeSavedParties(next);
    setNotice("Saved to your builds.");
  };

  // Use your storage helper (KEYS.active = "fft_active_party")
  const openInCustomizer = (post) => {
    writeActiveParty(post.partyData);
    navigate("/party-customizer");
  };

  // Delete post (author-only via UI)
  const deletePost = (postId) => {
    const next = posts.filter((p) => p.postId !== postId);
    setPosts(next);
    writeCommunityPosts(next);
    setNotice("Deleted.");
  };

  return (
    <main className="community page-container">
      <header className="community__hero page-panel">
        <div className="community__hero-top">
          <span className="community__badge">Community • Shared Builds</span>
          {notice ? <span className="community__toast">{notice}</span> : null}
        </div>

        <h1 className="community__title">Community Builds</h1>
        <p className="community__subtitle">
          Share team comps and save builds from other adventurers.
        </p>
      </header>

      <section className="community__grid">
        {/* Composer */}
        <aside className="community__panel page-panel">
          <h2 className="community__panel-title">Share a Build</h2>
          <p className="community__panel-sub">
            Posting as <strong>{authorName}</strong>
          </p>

          {savedParties.length === 0 ? (
            <div className="community__empty">
              <div className="community__empty-title">No saved builds yet.</div>
              <div className="community__empty-text">
                Create one in the Party Customizer, then come back to share it.
              </div>
              <button
                className="community__button community__button--primary"
                type="button"
                onClick={() => navigate("/party-customizer")}
              >
                Go save a party
              </button>
            </div>
          ) : (
            <>
              <label className="community__field">
                <span className="community__label">Select saved party</span>
                <select
                  className="community__select"
                  value={selectedPartyId}
                  onChange={(e) => setSelectedPartyId(e.target.value)}
                >
                  <option value="">— Choose a party —</option>
                  {savedParties.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name || "Unnamed Party"}
                    </option>
                  ))}
                </select>
              </label>

              <label className="community__field">
                <span className="community__label">
                  Message / strategy notes
                </span>
                <textarea
                  className="community__textarea"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Example: 2 supports + fast physical core, built for zodiac coverage…"
                />
              </label>

              <div className="community__actions">
                <button
                  className="community__button community__button--primary"
                  type="button"
                  onClick={handlePost}
                >
                  Post Build
                </button>

                <button
                  className="community__button"
                  type="button"
                  onClick={() => {
                    setSelectedPartyId("");
                    setMessage("");
                    setNotice("Cleared.");
                  }}
                >
                  Clear
                </button>
              </div>

              {selectedParty ? (
                <div className="community__preview">
                  <div className="community__preview-title">Preview</div>
                  <div className="community__snapshot">
                    {toSnapshot(selectedParty).map((u, idx) => (
                      <div
                        key={idx}
                        className={`community__unit-chip ${
                          u.name === "Empty"
                            ? "community__unit-chip--empty"
                            : ""
                        }`}
                      >
                        <div className="community__unit-name">{u.name}</div>
                        <div className="community__unit-meta">
                          Lv {u.level} • {u.zodiac}
                          {u.job ? ` • ${u.job}` : ""}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </>
          )}
        </aside>

        {/* Feed */}
        <section className="community__panel page-panel">
          <div className="community__controls">
            <input
              className="community__search"
              placeholder="Search posts, authors, or build names..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <select
              className="community__sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="community__empty">
              <div className="community__empty-title">No posts yet.</div>
              <div className="community__empty-text">
                Be the first to share a build.
              </div>
            </div>
          ) : (
            <div className="community__feed">
              {filteredPosts.map((post) => (
                <article key={post.postId} className="community__post">
                  <div className="community__post-top">
                    <div className="community__post-ident">
                      <div className="community__author">{post.authorName}</div>
                      <div className="community__date">
                        {fmtDate(post.createdAt)}
                      </div>
                    </div>

                    <div className="community__post-badges">
                      <span className="community__chip">
                        {(post.partyData?.units || []).length || 0} units
                      </span>
                      <span className="community__chip community__chip--soft">
                        {post.partyData?.name || "Shared Build"}
                      </span>
                    </div>
                  </div>

                  <div className="community__message">
                    {post.message ? (
                      post.message
                    ) : (
                      <em>(No message provided.)</em>
                    )}
                  </div>

                  <div className="community__snapshot">
                    {post.partySnapshot.map((u, idx) => (
                      <div
                        key={idx}
                        className={`community__unit-chip ${
                          u.name === "Empty"
                            ? "community__unit-chip--empty"
                            : ""
                        }`}
                      >
                        <div className="community__unit-name">{u.name}</div>
                        <div className="community__unit-meta">
                          Lv {u.level} • {u.zodiac}
                          {u.job ? ` • ${u.job}` : ""}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="community__post-actions">
                    <button
                      className="community__button community__button--primary"
                      type="button"
                      onClick={() => saveBuildFromPost(post)}
                    >
                      Save to My Builds
                    </button>

                    <button
                      className="community__button"
                      type="button"
                      onClick={() => openInCustomizer(post)}
                    >
                      Open in Customizer
                    </button>

                    {post.authorName === authorName ? (
                      <button
                        className="community__button community__button--danger"
                        type="button"
                        onClick={() => deletePost(post.postId)}
                      >
                        Delete Post
                      </button>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
