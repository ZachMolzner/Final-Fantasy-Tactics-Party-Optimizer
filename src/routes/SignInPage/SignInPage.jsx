// src/routes/SignInPage/SignInPage.jsx
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./SignInPage.css";

function normalizeName(value) {
  return (value || "").replace(/\s+/g, " ").trim();
}

export default function SignInPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState("Adventurer");
  const [touched, setTouched] = useState(false);

  const cleanName = useMemo(() => normalizeName(name), [name]);

  const error = useMemo(() => {
    if (!touched) return "";
    if (!cleanName) return "Display name is required.";
    if (cleanName.length < 2)
      return "Display name must be at least 2 characters.";
    if (cleanName.length > 24) return "Keep it under 24 characters.";
    return "";
  }, [cleanName, touched]);

  const redirectTo = location.state?.from || "/";

  const onSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (error) return;

    login(cleanName);
    navigate(redirectTo, { replace: true });
  };

  return (
    <main className="signin page-container">
      <section
        className="signin__panel page-panel"
        aria-labelledby="signin-title"
      >
        <header className="signin__header">
          <div className="signin__badge">Account • Local Profile</div>
          <h1 id="signin-title" className="signin__title">
            Sign In
          </h1>
          <p className="signin__subtitle">
            Choose a display name to save builds and use the community features.
          </p>
        </header>

        <form className="signin__form" onSubmit={onSubmit} noValidate>
          <label className="signin__field">
            <span className="signin__label">Display name</span>

            <input
              className={`signin__input ${error ? "signin__input--error" : ""}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setTouched(true)}
              placeholder="Adventurer"
              autoComplete="nickname"
              required
              minLength={2}
              maxLength={24}
            />

            <span className="signin__help">
              Use 2–24 characters. This is just for your local profile.
            </span>

            {error ? <div className="signin__error">{error}</div> : null}
          </label>

          <div className="signin__actions">
            <button
              className="signin__button signin__button--primary"
              type="submit"
            >
              Enter Ivalice
            </button>

            <button
              className="signin__button"
              type="button"
              onClick={() => navigate("/", { replace: true })}
            >
              Back to Home
            </button>
          </div>

          <div className="signin__footnote">
            You’ll be redirected to{" "}
            <span className="signin__route">{redirectTo}</span> after signing
            in.
          </div>
        </form>
      </section>
    </main>
  );
}
