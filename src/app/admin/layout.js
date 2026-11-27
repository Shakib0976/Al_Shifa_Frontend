import { Suspense } from "react";
import Sidebar from "@/components/layout/sidebar";
import AdminToast from "@/components/admin/admin-toast";
import "react-toastify/dist/ReactToastify.css";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Suspense fallback={null}>
        <AdminToast />
      </Suspense>
      {/* বাম দিকে সাইডবার */}
      <Sidebar />
      
      {/* ডান দিকে কনটেন্ট */}
      <main className="flex-1 bg-zinc-50 p-6">
        {children}
      </main>
    </div>
  );
}