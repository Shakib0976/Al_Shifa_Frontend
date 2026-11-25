"use client"; // ফর্ম সাবমিটের জন্য ক্লায়েন্ট কম্পোনেন্ট হতে হবে

import { useState } from "react";
import { contactDetails } from "@/data/navigation";

export function ContactDetails() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // success or error
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" }); // ফর্ম খালি করা
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* তোমার বন্ধুর আগের কার্ড */}
      <address className="not-italic">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <h2 className="text-xl font-semibold">Get in touch</h2>
          <dl className="mt-5 space-y-5">
            <div>
              <dt className="text-sm font-medium text-zinc-500">Phone</dt>
              <dd className="mt-1">
                <a
                  className="font-semibold text-emerald-800 hover:text-emerald-600"
                  href={`tel:${contactDetails.phone.replaceAll(" ", "")}`}
                >
                  {contactDetails.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-zinc-500">Email</dt>
              <dd className="mt-1">
                <a
                  className="font-semibold text-emerald-800 hover:text-emerald-600"
                  href={`mailto:${contactDetails.email}`}
                >
                  {contactDetails.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-zinc-500">Address</dt>
              <dd className="mt-1 font-medium text-zinc-900">
                {contactDetails.address}
              </dd>
            </div>
          </dl>
        </div>
      </address>

      {/* ⭐ নতুন কন্টাক্ট ফর্ম */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h2 className="text-xl font-semibold">Send us a message</h2>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-emerald-700 px-4 py-2 font-semibold text-white hover:bg-emerald-800 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
          
          {status === "success" && (
            <p className="text-sm text-green-600">Message sent successfully!</p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
          )}
        </form>
      </div>
    </div>
  );
}