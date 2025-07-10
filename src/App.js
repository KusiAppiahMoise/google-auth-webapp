import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./styles/main.css";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
  const [user, setUser] = useState(() => {
    // Load user from localStorage if present
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    // Optionally clear tokens or session here
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <Navbar user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<HomePage user={user} />} />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;