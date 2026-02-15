import { useAuth } from "../../hooks/useAuth";
import { readSavedParties } from "../../services/storage/partyStorage";

export default function ProfilePage() {
  const { profile } = useAuth();
  const saved = readSavedParties();
  return (
    <section className="page-panel" style={{ maxWidth: 900, margin: "0 auto" }}>
      <h1>Profile</h1>
      <p>
        Signed in as <strong>{profile?.displayName}</strong>
      </p>
      <h2>Saved Builds ({saved.length})</h2>
      <ul>
        {saved.map((p) => (
          <li key={p.id}>{p.name || "Unnamed Party"}</li>
        ))}
      </ul>
    </section>
  );
}
