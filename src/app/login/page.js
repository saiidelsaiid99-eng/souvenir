"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    localStorage.setItem("adminToken", data.token);
    router.push("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800/30 backdrop-blur-sm p-8 rounded-2xl border border-cyan-500/20 shadow-xl w-96 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-white">Admin Login</h2>

        {error && <p className="text-red-400 text-center bg-red-500/10 py-2 px-4 rounded-xl border border-red-500/30">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400/50"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400/50"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-3.5 rounded-xl hover:scale-105 transition-all font-bold">
          Login
        </button>
      </form>
    </div>
  );
}