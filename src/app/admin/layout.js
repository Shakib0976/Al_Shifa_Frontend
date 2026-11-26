import Sidebar from "@/components/layout/sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* বাম দিকে সাইডবার */}
      <Sidebar />
      
      {/* ডান দিকে কনটেন্ট */}
      <main className="flex-1 bg-zinc-50 p-6">
        {children}
      </main>
    </div>
  );
}