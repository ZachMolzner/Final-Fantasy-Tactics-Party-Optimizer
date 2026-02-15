import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function SignInPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("Adventurer");

  const onSubmit = (e) => {
    e.preventDefault();
    login(name);
    navigate(location.state?.from || "/", { replace: true });
  };

  return (
    <section className="page-panel" style={{ maxWidth: 420, margin: "0 auto" }}>
      <h1>Sign In</h1>
      <form onSubmit={onSubmit}>
        <label>Display name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", margin: "8px 0 12px" }}
        />
        <button type="submit">Sign In</button>
      </form>
    </section>
  );
}
