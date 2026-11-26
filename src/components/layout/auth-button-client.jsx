"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AuthButtonClient({ isAuthenticated }) {
  const [authenticated, setAuthenticated] = useState(isAuthenticated);

  useEffect(() => {
    const handleAuthStateChange = (event) => {
      setAuthenticated(Boolean(event.detail?.user));
    };

    window.addEventListener("auth-state-changed", handleAuthStateChange);
    return () => {
      window.removeEventListener("auth-state-changed", handleAuthStateChange);
    };
  }, []);

  return (
    <Link
      href={authenticated ? "/admin/dashboard" : "/login"}
      className="rounded-lg bg-emerald-700 px-4 py-1.5 text-sm font-medium text-white hover:bg-emerald-800"
    >
      {authenticated ? "Dashboard" : "Login"}
    </Link>
  );
}
