import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { useEffect, useState } from "react";

import Auth from "./pages/Auth.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import FindConnection from "./pages/FindConnection.jsx";
import Chats from "./pages/Chats.jsx";
import Navbar from "./components/Navbar.jsx";
import PublicNavbar from "./components/PublicNavbar.jsx";
import Footer from "./components/Footer.jsx";
import DashboardHome from "./pages/DashboardHome.jsx";

function AppContent() {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
    setLoading(false);

    const handleStorageChange = () => {
      setUserId(localStorage.getItem("userId"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <>
      {userId ? <Navbar /> : <PublicNavbar />}

      <Routes>
        <Route path="/" element={userId ? <Navigate to="/dashboard" replace /> : <Home />} />
        <Route path="/dashboard" element={userId ? <DashboardHome /> : <Navigate to="/auth" replace />} />
        <Route path="/findconnection" element={userId ? <FindConnection /> : <Navigate to="/auth" replace />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/chats" element={userId ? <Chats /> : <Navigate to="/auth" replace />} />
        <Route path="/auth" element={userId ? <Navigate to="/dashboard" replace /> : <Auth />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}