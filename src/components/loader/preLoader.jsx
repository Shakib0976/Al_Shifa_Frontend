
"use client";

import { useEffect, useState } from "react";

const PRELOADER_SESSION_KEY = "al-shifa-preloader-shown";

export default function Preloader() {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(PRELOADER_SESSION_KEY)) return;

    sessionStorage.setItem(PRELOADER_SESSION_KEY, "true");
    requestAnimationFrame(() => setShouldShow(true));
  }, []);

  if (!shouldShow) return null;

  return (
    <div
      className="preloader-overlay fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
      aria-hidden="true"
    >
      {/* Logo */}
      <div className="mb-5 text-3xl font-bold text-green-700">
        AL-SHIFA
      </div>

      {/* Loading Spinner */}
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-green-600" />

      {/* Loading Text */}
      <p className="mt-4 text-sm text-gray-500">
        Preparing your experience...
      </p>
    </div>
  );
}
