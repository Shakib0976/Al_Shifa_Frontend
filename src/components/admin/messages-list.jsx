"use client";

import { useState } from "react";
import { toast } from "react-toastify";

export default function MessagesList({ initialMessages }) {
  const [messages, setMessages] = useState(initialMessages);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        toast.error("Failed to delete message.");
        return;
      }

      setMessages((currentMessages) =>
        currentMessages.filter((message) => message._id !== id)
      );
      toast.success("Message deleted successfully.");
    } catch (error) {
      console.error("Unable to delete contact message:", error);
      toast.error("Failed to delete message.");
    }
  };

  if (messages.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-10 text-center">
        <p className="text-zinc-500">No messages yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message._id}
          className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm"
        >
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base font-semibold text-zinc-800">
                {message.name}
              </h2>
              <p className="text-sm text-zinc-500">{message.email}</p>
              {message.subject && (
                <p className="mt-1 text-sm font-medium text-zinc-700">
                  {message.subject}
                </p>
              )}
            </div>
            <div className="text-xs text-zinc-400">
              {new Date(message.createdAt).toLocaleString()}
            </div>
          </div>
          <p className="mt-3 text-sm text-zinc-700">{message.message}</p>
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => handleDelete(message._id)}
              className="rounded-lg bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
