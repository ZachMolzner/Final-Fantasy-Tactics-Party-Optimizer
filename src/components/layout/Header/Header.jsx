import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import "./Header.css";

export default function Header() {
  const { isAuthenticated, profile, logout } = useAuth();

  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const userMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const onDown = (e) => {
      // user dropdown
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setOpen(false);
      }

      // mobile drawer
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 900) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <NavLink to="/" className="site-header__brand" onClick={closeMobile}>
          <span className="site-header__brand-main">Ivalice Chronicles</span>
          <span className="site-header__brand-shimmer" aria-hidden="true" />
        </NavLink>

        {}
        <nav className="site-header__nav" aria-label="Primary navigation">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/jobs">Jobs</NavLink>
          <NavLink to="/party-customizer">Party Customizer</NavLink>
          <NavLink to="/community">Community</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>

        {}
        <div className="site-header__right">
          {}
          <button
            type="button"
            className="site-header__hamburger"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span
              className={`site-header__hamburgerIcon ${
                mobileOpen ? "is-open" : ""
              }`}
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
            </span>
          </button>

          {}
          <div className="site-header__auth" ref={userMenuRef}>
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

                      {}
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
                onClick={closeMobile}
              >
                Sign In
              </NavLink>
            )}
          </div>
        </div>
      </div>

      {}
      {mobileOpen ? (
        <div className="site-header__overlay" aria-hidden="true" />
      ) : null}

      <div
        id="mobile-nav"
        className={`site-header__mobile ${mobileOpen ? "is-open" : ""}`}
        ref={mobileMenuRef}
      >
        <nav className="site-header__mobileNav" aria-label="Mobile navigation">
          <NavLink to="/" end onClick={closeMobile}>
            Home
          </NavLink>
          <NavLink to="/jobs" onClick={closeMobile}>
            Jobs
          </NavLink>
          <NavLink to="/party-customizer" onClick={closeMobile}>
            Party Customizer
          </NavLink>
          <NavLink to="/community" onClick={closeMobile}>
            Community
          </NavLink>
          <NavLink to="/about" onClick={closeMobile}>
            About
          </NavLink>

          {isAuthenticated ? (
            <>
              <div className="site-header__mobileDivider" />

              <NavLink to="/profile" onClick={closeMobile}>
                Profile
              </NavLink>

              {}
              <NavLink to="/settings" onClick={closeMobile}>
                Settings
              </NavLink>

              <button
                type="button"
                className="site-header__mobileDanger"
                onClick={() => {
                  closeMobile();
                  setOpen(false);
                  logout();
                }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <div className="site-header__mobileDivider" />
              <NavLink to="/signin" onClick={closeMobile}>
                Sign In
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
