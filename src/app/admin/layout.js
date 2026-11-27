import { Suspense } from "react";
import Sidebar from "@/components/layout/sidebar";
import AdminToast from "@/components/admin/admin-toast";
import "react-toastify/dist/ReactToastify.css";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Suspense fallback={null}>
        <AdminToast />
      </Suspense>
      <Sidebar />

      <main className="min-w-0 flex-1 bg-zinc-50 p-4 sm:p-6">
        {children}
      </main>
    </div>
  );
}