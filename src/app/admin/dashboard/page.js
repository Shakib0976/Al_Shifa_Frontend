"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/dashboard");
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-10">
        <p className="text-zinc-500">Loading dashboard...</p>
      </div>
    );
  }

  if (!data) {
    return <p className="p-10 text-red-600">Failed to load dashboard.</p>;
  }

  const { counts, recentProducts, recentMessages } = data;

  const stats = [
    { label: "Products", value: counts.products, href: "/admin/products", accent: "text-blue-600" },
    { label: "News", value: counts.news, href: "/admin/news", accent: "text-purple-600" },
    { label: "Messages", value: counts.messages, href: "/admin/messages", accent: "text-orange-600" },
    { label: "Categories", value: counts.categories, href: "/admin/products", accent: "text-emerald-600" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-800">Dashboard</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Welcome back! Here's what's happening in your store.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-2xl border border-zinc-200 bg-white p-5 transition hover:shadow-md"
          >
            <p className="text-sm font-medium text-zinc-500">{stat.label}</p>
            <p className={`mt-2 text-3xl font-bold ${stat.accent}`}>
              {stat.value}
            </p>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Products */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-zinc-800">Recent Products</h2>
            <Link href="/admin/products" className="text-sm text-emerald-700 hover:underline">
              View all
            </Link>
          </div>
          <ul className="mt-4 space-y-3">
            {recentProducts.length === 0 && (
              <p className="text-sm text-zinc-500">No products yet.</p>
            )}
            {recentProducts.map((product) => (
              <li
                key={product._id}
                className="flex items-center justify-between border-b border-zinc-100 pb-2 last:border-0"
              >
                <span className="text-sm font-medium text-zinc-700">{product.name}</span>
                <span className="text-sm text-zinc-500">৳{product.price}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Messages */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-zinc-800">Recent Messages</h2>
            <Link href="/admin/messages" className="text-sm text-emerald-700 hover:underline">
              View all
            </Link>
          </div>
          <ul className="mt-4 space-y-3">
            {recentMessages.length === 0 && (
              <p className="text-sm text-zinc-500">No messages yet.</p>
            )}
            {recentMessages.map((msg) => (
              <li
                key={msg._id}
                className="border-b border-zinc-100 pb-2 last:border-0"
              >
                <p className="text-sm font-medium text-zinc-700">{msg.name}</p>
                <p className="text-xs text-zinc-500">{msg.email}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-zinc-800">Quick Actions</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/admin/products/new"
            className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800"
          >
            + Add Product
          </Link>
          <Link
            href="/admin/news/new"
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
          >
            + Add News
          </Link>
        </div>
      </div>
    </div>
  );
}