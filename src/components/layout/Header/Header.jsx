import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import "./Header.css";

export default function Header() {
  const { isAuthenticated, profile, logout } = useAuth();

  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const onDown = (e) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="site-header__brand">
          <span className="site-header__brand-main">Ivalice Chronicles</span>
          <span className="site-header__brand-shimmer" aria-hidden="true" />
        </div>

        <nav className="site-header__nav">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/jobs">Jobs</NavLink>
          <NavLink to="/party-customizer">Party Customizer</NavLink>
          <NavLink to="/community">Community</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>

        <div className="site-header__auth" ref={menuRef}>
          {isAuthenticated ? (
            <div className="site-header__user">
              <button
                type="button"
                className="site-header__userButton"
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={open}
              >
                <span className="site-header__userName">
                  {profile?.displayName || "Commander"}
                </span>
                <span className={`site-header__chev ${open ? "is-open" : ""}`}>
                  ▾
                </span>
              </button>

              {open ? (
                <div className="site-header__menu" role="menu">
                  <div className="site-header__menuHeader">
                    <div className="site-header__menuTitle">
                      {profile?.displayName || "Commander"}
                    </div>
                    <div className="site-header__menuSub">Signed in</div>
                  </div>

                  <div className="site-header__menuItems">
                    <NavLink
                      to="/profile"
                      className="site-header__menuItem"
                      role="menuitem"
                      onClick={() => setOpen(false)}
                    >
                      Profile
                    </NavLink>

                    <NavLink
                      to="/settings"
                      className="site-header__menuItem"
                      role="menuitem"
                      onClick={() => setOpen(false)}
                    >
                      Settings
                    </NavLink>

                    <button
                      type="button"
                      className="site-header__menuItem site-header__menuItem--danger"
                      role="menuitem"
                      onClick={() => {
                        setOpen(false);
                        logout();
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <NavLink
              to="/signin"
              className="site-header__button site-header__button--primary"
            >
              Sign In
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
}
