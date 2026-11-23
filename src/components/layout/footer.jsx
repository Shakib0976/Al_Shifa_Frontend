// components/footer.tsx
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, Share2, MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/navigation";

async function CurrentYear() {
  "use cache";
  return new Date().getFullYear();
}

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "/categories" },
];

const importantLinks = [
  { label: "News & Advice", href: "/news" },
  { label: "Contact Us", href: "/contact" },
];

export default async function Footer() {
  const year = await CurrentYear();

  return (
    <footer className="w-full border-t border-border bg-background bg-gray-100">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-11/12 px-4 py-12 sm:px-6  lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand + Description */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/Al_Shifa_Logo.png" // same logo as navbar
                alt={`${siteConfig.name} logo`}
                width={56}
                height={56}
                className="h-14 w-14 rounded-full object-contain"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-lg font-semibold text-primary">
                  {siteConfig.name}
                </span>
                <span className="text-[11px] font-medium tracking-widest text-muted-foreground">
                  {siteConfig.subtitle}
                </span>
              </div>
            </Link>

            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description ||
                "NutriSun Animal Health is a jointly owned veterinary medicine company based on import, trade & distribution."}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Important Links
            </h3>
            <ul className="space-y-2.5">
              {importantLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Contact Info
            </h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">
                {siteConfig.name}
              </p>

              <a
                href="tel:+8801712490705"
                className="flex items-center gap-2 transition-colors hover:text-primary"
              >
                <Phone className="h-4 w-4 shrink-0" />
                +8801712490705
              </a>

              <a
                href="mailto:nutrisunah@gmail.com"
                className="flex items-center gap-2 transition-colors hover:text-primary"
              >
                <Mail className="h-4 w-4 shrink-0" />
                nutrisunah@gmail.com
              </a>

              {/* Social Icons */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://facebook.com" // replace with real link
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  aria-label="Facebook"
                >
                  <Share2 className="h-4 w-4" />
                </a>
                <a
                  href="https://wa.me/8801712490705"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border bg-green-800">
        <div className="mx-auto flex max-w-11/12 flex-col items-center justify-between gap-2 px-4 py-4 text-center text-xs text-white sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {year}{" "}
            {siteConfig.name} | All Rights Reserved
          </p>
          <p>
            Developed By{" "}
            <span className="font-medium ">Md . Shakib Khan Noyon</span>
          </p>
        </div>
      </div>
    </footer>
  );
}