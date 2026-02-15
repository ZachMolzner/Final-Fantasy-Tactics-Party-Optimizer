import { NavLink } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import "./Header.css";

export default function Header() {
  const { isAuthenticated, profile, logout } = useAuth();

  return (
    <header className="site-header">
      <div className="site-header__brand">Ivalice Chronicles</div>
      <nav className="site-header__nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/party-customizer">Party Customizer</NavLink>
        <NavLink to="/community">Community</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
      <div className="site-header__auth">
        {isAuthenticated ? (
          <>
            <span>{profile?.displayName}</span>
            <button onClick={logout}>Sign Out</button>
          </>
        ) : (
          <NavLink to="/signin">Sign In</NavLink>
        )}
      </div>
    </header>
  );
}
