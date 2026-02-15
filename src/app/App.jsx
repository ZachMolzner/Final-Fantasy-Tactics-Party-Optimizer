// src/app/App.jsx
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "../components/layout/Header/Header";
import Footer from "../components/layout/Footer/Footer";
import ProtectedRoute from "../components/layout/ProtectedRoute/ProtectedRoute";

import HomePage from "../routes/HomePage/HomePage";
import AboutPage from "../routes/AboutPage/AboutPage";
import CommunityPage from "../routes/CommunityPage/CommunityPage";
import PartyCustomizerPage from "../routes/PartyCustomizerPage/PartyCustomizerPage";
import JobsPage from "../routes/JobsPage/JobsPage";
import ProfilePage from "../routes/ProfilePage/ProfilePage";
import SignInPage from "../routes/SignInPage/SignInPage";

function App() {
  return (
    <div className="app-shell">
      <Header />

      <main className="app-main">
        {/* Global layout container so every route has consistent width/padding */}
        <div className="page-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/party-customizer" element={<PartyCustomizerPage />} />

            <Route
              path="/community"
              element={
                <ProtectedRoute>
                  <CommunityPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
