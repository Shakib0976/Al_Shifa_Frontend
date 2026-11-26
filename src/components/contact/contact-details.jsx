
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  Mail,
  MapPin,
  Clock,
  ArrowUpRight,
  Send,
  CheckCircle2,
  MessageCircle,
  Globe,
  ShieldCheck,
  LoaderCircle,
  Headphones,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function ContactDetails() {
  const sectionRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  // GSAP Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        "(prefers-reduced-motion: no-preference)",
        () => {
          gsap.from(".contact-info", {
            x: -50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              once: true,
            },
          });

          gsap.from(".contact-form", {
            x: 50,
            opacity: 0,
            duration: 1,
            delay: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              once: true,
            },
          });

          gsap.from(".contact-item", {
            y: 25,
            opacity: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".contact-info",
              start: "top 75%",
              once: true,
            },
          });

          gsap.to(".contact-decoration", {
            y: -12,
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      );

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setStatus("idle");
    setFeedback("");

    const form = e.currentTarget;

    try {
      const fields = new FormData(form);
      const formData = {
        name: String(fields.get("name") ?? "").trim(),
        email: String(fields.get("email") ?? "").trim(),
        subject: String(fields.get("subject") ?? "").trim(),
        message: String(fields.get("message") ?? "").trim(),
        website: String(fields.get("website") ?? ""),
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to send message.");
      }

      setStatus("success");
      setFeedback(result.message || "Your message has been sent successfully.");

      form.reset();

    } catch (error) {
      setStatus("error");
      setFeedback(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const contactItems = [
    {
      icon: Mail,
      title: "Email Address",
      value: "web.shakib09@gmail.com",
      link: "mailto:web.shakib09@gmail.com",
    },
    {
      icon: Globe,
      title: "Our Business",
      value: "Veterinary Medicine & Animal Health",
      link: null,
    },
    {
      icon: MapPin,
      title: "Service Coverage",
      value: "Across Bangladesh",
      link: null,
    },
    {
      icon: Clock,
      title: "Business Inquiry",
      value: "Send us a message anytime",
      link: null,
    },
  ];

  const inputClass =
    "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/70 focus:border-primary focus:ring-4 focus:ring-primary/10";

  return (
    <div
      ref={sectionRef}
      className="grid items-stretch gap-7 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10"
    >

      {/* LEFT CONTACT INFORMATION */}
      <div className="contact-info relative isolate overflow-hidden rounded-3xl bg-[#14532D] p-6 text-white shadow-xl shadow-green-900/10 sm:p-9 lg:p-10">

        {/* Background decoration */}
        <div className="contact-decoration pointer-events-none absolute -right-16 -top-16 -z-10 h-64 w-64 rounded-full border-[35px] border-white/5" />

        <div className="pointer-events-none absolute -bottom-24 -left-20 -z-10 h-72 w-72 rounded-full bg-green-400/10 blur-3xl" />

        <div className="relative z-10">

          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-green-100">
            <MessageCircle size={14} />
            Contact Information
          </span>

          <h2 className="mt-7 font-heading text-3xl font-bold leading-tight text-white sm:text-4xl">
            We&apos;d Love To
            <span className="block text-green-300">
              Hear From You.
            </span>
          </h2>

          <p className="mt-5 max-w-md text-sm leading-7 text-green-50/80 sm:text-base">
            Whether you are looking for veterinary medicines,
            animal health products or business distribution
            information, feel free to reach out to us.
            Our team is ready to assist you.
          </p>

          {/* Contact Details */}
          <div className="mt-10 space-y-5">

            {contactItems.map((item, index) => {
              const Icon = item.icon;

              const content = (
                <>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-green-300 transition group-hover:bg-white group-hover:text-green-700">
                    <Icon size={21} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-green-200">
                      {item.title}
                    </p>

                    <p className="mt-1 break-words text-sm font-semibold text-white">
                      {item.value}
                    </p>
                  </div>

                  {item.link && (
                    <ArrowUpRight
                      size={17}
                      className="shrink-0 text-green-300 transition group-hover:-translate-y-1 group-hover:translate-x-1"
                    />
                  )}
                </>
              );

              return (
                <div
                  key={index}
                  className="contact-item"
                >
                  {item.link ? (
                    <a
                      href={item.link}
                      className="group flex items-center gap-4"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4">
                      {content}
                    </div>
                  )}
                </div>
              );
            })}

          </div>

          {/* Bottom trust card */}
          <div className="mt-12 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-400/20 text-green-300">
                <ShieldCheck size={23} />
              </div>

              <div>
                <h3 className="font-heading text-sm font-bold text-white">
                  Your Trusted Animal Health Partner
                </h3>
                <p className="mt-1 text-xs leading-5 text-green-100/70">
                  Quality-focused sourcing and nationwide distribution.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom icon */}
          <div className="mt-9 flex items-center gap-2 text-xs text-green-100/70">
            <Headphones size={16} />
            We welcome your business inquiries
          </div>

        </div>
      </div>


      {/* RIGHT CONTACT FORM */}
      <div className="contact-form rounded-3xl border border-border bg-card p-6 shadow-lg shadow-slate-900/5 sm:p-9 lg:p-10">

        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-[2px] text-primary">
            Send A Message
          </span>

          <h2 className="mt-3 font-heading text-2xl font-bold text-foreground sm:text-3xl">
            Get In Touch With Us
          </h2>

          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Fill out the form below. Our team will receive your
            inquiry through email.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name and Email */}
          <div className="grid gap-5 sm:grid-cols-2">

            <div>
              <label
                htmlFor="contact-name"
                className="text-sm font-semibold text-foreground"
              >
                Full Name <span className="text-red-500">*</span>
              </label>

              <input
                id="contact-name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                autoComplete="name"
                required
                minLength={2}
                maxLength={80}
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="text-sm font-semibold text-foreground"
              >
                Email Address <span className="text-red-500">*</span>
              </label>

              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder="example@email.com"
                autoComplete="email"
                required
                maxLength={254}
                className={inputClass}
              />
            </div>

          </div>

          {/* Subject */}
          <div>
            <label
              htmlFor="contact-subject"
              className="text-sm font-semibold text-foreground"
            >
              Subject <span className="text-red-500">*</span>
            </label>

            <input
              id="contact-subject"
              name="subject"
              type="text"
              placeholder="What is your inquiry about?"
              required
              minLength={3}
              maxLength={150}
              className={inputClass}
            />
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="contact-message"
              className="text-sm font-semibold text-foreground"
            >
              Your Message <span className="text-red-500">*</span>
            </label>

            <textarea
              id="contact-message"
              name="message"
              rows={6}
              placeholder="Write your message here..."
              required
              minLength={10}
              maxLength={3000}
              className={`${inputClass} resize-y`}
            />
          </div>

          {/* Honeypot - Spam protection */}
          <div
            className="absolute -left-[9999px] h-px w-px overflow-hidden"
            aria-hidden="true"
          >
            <label htmlFor="contact-website">
              Leave this field empty
            </label>

            <input
              id="contact-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Feedback */}
          {status !== "idle" && (
            <div
              role="status"
              aria-live="polite"
              className={`flex items-start gap-3 rounded-xl p-4 text-sm ${
                status === "success"
                  ? "border border-green-200 bg-green-50 text-green-800"
                  : "border border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {status === "success" ? (
                <CheckCircle2 size={20} className="shrink-0" />
              ) : (
                <MessageCircle size={20} className="shrink-0" />
              )}

              <p>{feedback}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="group flex w-full items-center justify-center gap-3 rounded-xl bg-primary px-6 py-4 font-sans text-sm font-bold text-primary-foreground shadow-lg shadow-green-800/15 transition-all duration-300 hover:-translate-y-1 hover:bg-green-800 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {loading ? (
              <>
                <LoaderCircle size={19} className="animate-spin" />
                Sending Message...
              </>
            ) : (
              <>
                <Send size={18} />
                Send Message

                <ArrowUpRight
                  size={18}
                  className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </>
            )}
          </button>

          <p className="text-center text-xs leading-6 text-muted-foreground">
            Your information will only be used to respond to your inquiry.
          </p>

        </form>
      </div>

    </div>
  );
}