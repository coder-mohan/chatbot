import React, { useState } from "react";
import axios from "axios";

export default function Login({ onLogin, switchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log("📤 Sending login request to:", BACKEND_URL);

      const res = await axios.post(`${BACKEND_URL}/api/auth/login`, {
        email,
        password,
      });

      console.log("✅ Login response:", res.data);

      localStorage.setItem("token", res.data.token);
      onLogin(); // Move to Chat page
    } catch (err) {
      console.log("❌ Login Error:", err.response?.data || err);
      alert(err.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#354157]">
      <form onSubmit={handleSubmit} className="bg-[#465167] p-8 rounded w-96">
        <h2 className="text-white text-2xl mb-4 font-semibold">Login</h2>

        <input
          type="email"
          className="w-full p-2 mb-3 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="w-full p-2 mb-4 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded mb-2"
        >
          Login
        </button>

        <button
          type="button"
          onClick={switchToRegister}
          className="w-full p-2 border text-white rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
}
