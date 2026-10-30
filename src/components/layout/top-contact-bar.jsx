"use client";

import { Share2, Mail, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/data/navigation";

export default function TopContactBar() {
  const { contact } = siteConfig;

  return (
    <div className="w-full bg-primary text-primary-foreground">
      <div className="mx-auto flex h-10 max-w-11/12 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Social */}
        <div className="flex items-center gap-5">
          <a
            href={`mailto:${contact.email}`}
            className="hidden items-center gap-1.5 transition-opacity hover:opacity-80 sm:flex"
          >
            <Mail className="h-3.5 w-3.5" />
            <span className="hidden md:inline">{contact.email}</span>
          </a>
          <a
            href={`tel:${contact.phone}`}
            className="flex items-center gap-1.5 transition-opacity hover:opacity-80"
          >
            <Phone className="h-3.5 w-3.5" />
            <span>{contact.phone}</span>
          </a>
        </div>

        {/* Contact */}
        <div className="flex items-center gap-3 text-xs sm:gap-4 sm:text-sm">
          <a
            href={contact.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-foreground"
          >
            <Share2 className="h-4 w-4" />
          </a>
          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-foreground"
          >
            <MessageCircle className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
