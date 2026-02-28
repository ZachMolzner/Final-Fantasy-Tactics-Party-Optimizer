import { createContext, useMemo, useState } from "react";

const AuthContext = createContext(null);
const PROFILE_KEY = "fft_profile";

function readProfile() {
  try {
    return JSON.parse(localStorage.getItem(PROFILE_KEY)) || null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [profile, setProfile] = useState(readProfile);

  const login = (displayName = "Adventurer") => {
    const next = { displayName: displayName.trim() || "Adventurer" };
    setProfile(next);
    localStorage.setItem(PROFILE_KEY, JSON.stringify(next));
  };

  const logout = () => {
    setProfile(null);
    localStorage.removeItem(PROFILE_KEY);
  };

  const value = useMemo(
    () => ({
      profile,
      isAuthenticated: Boolean(profile),
      login,
      logout,
    }),
    [profile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
