"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage({ searchParams }) {
  const { error: errorCode } = use(searchParams);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(
    errorCode === "invalid-credentials"
      ? "Invalid email or password."
      : errorCode === "missing-fields"
        ? "Email and password are required."
        : errorCode === "login-unavailable"
          ? "Unable to log in right now. Please try again."
          : ""
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        if (!res.ok) {
          throw new Error(`Authentication check failed (${res.status}).`);
        }

        const data = await res.json();

        if (data.user) {
          router.replace("/admin/dashboard");
        }
      } catch (error) {
        console.error("Unable to check the current login state:", error);
      }
    };
    checkAuth();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        window.dispatchEvent(
          new CustomEvent("auth-state-changed", {
            detail: { user: data.user },
          })
        );
        router.replace("/admin/dashboard");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-center">Admin Login</h1>
        <p className="mt-2 text-center text-sm text-zinc-500">Sign in to manage your store</p>

        <form
          action="/api/auth/login"
          method="post"
          onSubmit={handleSubmit}
          className="mt-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-zinc-700">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
              placeholder="admin@alshifa.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>
          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-emerald-700 px-4 py-2 font-semibold text-white hover:bg-emerald-800 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}