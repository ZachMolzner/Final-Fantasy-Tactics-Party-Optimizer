// src/app/providers.jsx
import { AuthProvider } from "../context/AuthContext";
// Future providers can be added here later:
// import { ThemeProvider } from "../context/ThemeContext";
// import { ModalProvider } from "../context/ModalContext";

export function AppProviders({ children }) {
  return (
    <AuthProvider>
      {/* Add future providers here without changing main.jsx */}
      {children}
    </AuthProvider>
  );
}
