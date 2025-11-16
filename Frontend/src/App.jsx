import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Chat from "./Chat";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [view, setView] = useState("login"); // "login" | "register" | "chat"

  if (!isLoggedIn) {
    return view === "register" ? (
      <Register onRegistered={() => setView("login")} onLogin={() => { setIsLoggedIn(true); setView("chat"); }} />
    ) : (
      <Login onLogin={() => { setIsLoggedIn(true); setView("chat"); }} switchToRegister={() => setView("register")} />
    );
  }

  return <Chat />;
}
