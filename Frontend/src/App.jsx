import React, { useState, useEffect } from "react";
import Login from "./Login";
import Register from "./Register";
import Chat from "./Chat";

export default function App() {
  // ✅ KEEP this
  const [view, setView] = useState("login");

  // ✅ REPLACED login logic
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.exp * 1000 > Date.now()) {
        setIsLoggedIn(true);
        setView("chat");
      } else {
        localStorage.removeItem("token");
      }
    } catch {
      localStorage.removeItem("token");
    }
  }, []);

  if (!isLoggedIn) {
    return view === "register" ? (
      <Register onRegistered={() => setView("login")} />
    ) : (
      <Login
        onLogin={() => {
          setIsLoggedIn(true);
          setView("chat");
        }}
        switchToRegister={() => setView("register")}
      />
    );
  }

  return <Chat />;
}
