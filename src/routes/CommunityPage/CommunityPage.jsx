import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  createId,
  readCommunityPosts,
  readSavedParties,
  writeCommunityPosts,
  writeSavedParties,
} from "../../services/storage/partyStorage";
import "./CommunityPage.css";

function toSnapshot(party) {
  const units = (party?.units || [])
    .slice(0, 5)
    .map((u) => ({
      name: u.name || "Unit",
      level: u.level ?? 1,
      zodiac: u.zodiac || "-",
      job: u.primaryJobId || "",
    }));
  while (units.length < 5)
    units.push({ name: "Empty", level: "-", zodiac: "-", job: "" });
  return units;
}

export default function CommunityPage() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const authorName = profile?.displayName || "Adventurer";
  const [savedParties, setSavedParties] = useState([]);
  const [posts, setPosts] = useState([]);
  const [selectedPartyId, setSelectedPartyId] = useState("");
  const [message, setMessage] = useState("");
  const [notice, setNotice] = useState("");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    setSavedParties(readSavedParties());
    setPosts(readCommunityPosts());
  }, []);
  const selectedParty = useMemo(
    () => savedParties.find((p) => p.id === selectedPartyId),
    [savedParties, selectedPartyId],
  );

  const filteredPosts = useMemo(() => {
    const q = query.toLowerCase();
    const out = posts.filter(
      (p) =>
        p.authorName.toLowerCase().includes(q) ||
        (p.message || "").toLowerCase().includes(q),
    );
    out.sort((a, b) =>
      sort === "newest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt),
    );
    return out;
  }, [posts, query, sort]);

  const handlePost = () => {
    if (!selectedParty) return setNotice("Must select a party to post.");
    const post = {
      postId: createId("post"),
      authorName,
      createdAt: new Date().toISOString(),
      message: message.trim(),
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

  const saveBuild = (post) => {
    const next = [
      {
        ...post.partyData,
        id: createId("party"),
        name: `${post.partyData?.name || "Shared Build"} (Saved)`,
        sourcePostId: post.postId,
        savedFrom: post.authorName,
      },
      ...savedParties,
    ];
    setSavedParties(next);
    writeSavedParties(next);
    setNotice("Saved to your builds.");
  };

  return (
    <main className="community">
      <header className="community__header">
        <h1 className="community__title">Community Builds</h1>
        <p className="community__subtitle">
          Share your team comps and save builds from others.
        </p>
        {notice && <p className="community__notice">{notice}</p>}
      </header>
      <section className="community__grid">
        <div className="community__panel community__composer">
          <h2 className="community__panel-title">Share a Build</h2>
          {savedParties.length === 0 ? (
            <div>
              <p className="community__notice">No saved parties yet.</p>
              <button
                className="community__button community__button--primary"
                onClick={() => navigate("/party-customizer")}
              >
                Go save a party
              </button>
            </div>
          ) : (
            <>
              <div className="community__field">
                <label className="community__label">Select saved party</label>
                <select
                  className="community__select"
                  value={selectedPartyId}
                  onChange={(e) => setSelectedPartyId(e.target.value)}
                >
                  <option value="">-- Choose a party --</option>
                  {savedParties.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name || "Unnamed Party"}
                    </option>
                  ))}
                </select>
              </div>
              <div className="community__field">
                <label className="community__label">
                  Message / strategy notes
                </label>
                <textarea
                  className="community__textarea"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <div className="community__actions">
                <button
                  className="community__button community__button--primary"
                  onClick={handlePost}
                >
                  Post Build
                </button>
                <button
                  className="community__button community__button--secondary"
                  onClick={() => {
                    setSelectedPartyId("");
                    setMessage("");
                  }}
                >
                  Clear
                </button>
              </div>
            </>
          )}
        </div>
        <div className="community__panel">
          <div className="community__controls">
            <input
              className="community__search"
              placeholder="Search posts..."
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
          <div className="community__feed">
            {filteredPosts.length === 0 ? (
              <p className="community__notice">No posts yet.</p>
            ) : (
              filteredPosts.map((post) => (
                <article key={post.postId} className="community__post">
                  <div className="community__post-header">
                    <span className="community__author">{post.authorName}</span>
                    <span className="community__date">
                      {new Date(post.createdAt).toLocaleString()}
                    </span>
                  </div>
                  {post.message ? (
                    <p className="community__message">{post.message}</p>
                  ) : (
                    <p className="community__message">(No message provided.)</p>
                  )}
                  <div className="community__snapshot">
                    {post.partySnapshot.map((u, idx) => (
                      <div
                        key={idx}
                        className={`community__unit-chip ${u.name === "Empty" ? "community__unit-chip--empty" : ""}`}
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
                      className="community__button"
                      onClick={() => saveBuild(post)}
                    >
                      Save to My Builds
                    </button>
                    <button
                      className="community__button"
                      onClick={() => {
                        localStorage.setItem(
                          "fft_active_party",
                          JSON.stringify(post.partyData),
                        );
                        navigate("/party-customizer");
                      }}
                    >
                      Open in Customizer
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
