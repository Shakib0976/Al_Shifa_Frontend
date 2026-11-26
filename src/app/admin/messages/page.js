"use client";

import { useEffect, useState } from "react";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch("/api/contact");
        const data = await res.json();
        setMessages(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessages(messages.filter((m) => m._id !== id));
      } else {
        alert("Failed to delete message");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div className="p-10 text-center text-zinc-500">Loading messages...</div>;

  return (
    <div className="mx-auto max-w-5xl">
      {/* হেডার */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-800">Messages</h1>
        <p className="mt-1 text-sm text-zinc-500">
          View all messages from the contact form.
        </p>
      </div>

      {/* লিস্ট */}
      {messages.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-10 text-center">
          <p className="text-zinc-500">No messages yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-base font-semibold text-zinc-800">
                    {msg.name}
                  </h2>
                  <p className="text-sm text-zinc-500">{msg.email}</p>
                </div>
                <div className="text-xs text-zinc-400">
                  {new Date(msg.createdAt).toLocaleString()}
                </div>
              </div>
              <p className="mt-3 text-sm text-zinc-700">{msg.message}</p>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => handleDelete(msg._id)}
                  className="rounded-lg bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}