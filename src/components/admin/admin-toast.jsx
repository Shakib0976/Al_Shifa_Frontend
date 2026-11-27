"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

export default function AdminToast() {
  const searchParams = useSearchParams();
  const successMessage = searchParams.get("success");
  const errorMessage = searchParams.get("error");

  useEffect(() => {
    if (!successMessage && !errorMessage) return;

    if (successMessage) toast.success(successMessage);
    if (errorMessage) toast.error(errorMessage);

    const url = new URL(window.location.href);
    url.searchParams.delete("success");
    url.searchParams.delete("error");
    window.history.replaceState(
      window.history.state,
      "",
      `${url.pathname}${url.search}${url.hash}`,
    );
  }, [errorMessage, successMessage]);

  return (
    <ToastContainer
      position="top-right"
      autoClose={4000}
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  );
}
