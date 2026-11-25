
import { ContactDetails } from "@/components/contact/contact-details";

export const metadata = {
  title: "Contact | Al-Shifa Animal Science",
  description:
    "Get in touch with Al-Shifa Animal Science for veterinary medicine, animal health products and distribution inquiries.",
};

export const instant = false;

export default function ContactPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-background">

      {/* Page Header */}
      <section className="relative border-b border-border bg-muted/50 py-16 sm:py-20">

        <div className="container-responsive relative z-10 text-center">

          <div className="contact-header inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-xs font-bold uppercase tracking-[2px] text-primary">
              Get In Touch
            </span>
          </div>

          <h1 className="contact-header mt-6 font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Let&apos;s Start a
            <span className="block text-primary">
              Conversation
            </span>
          </h1>

          <p className="contact-header mx-auto mt-5 max-w-2xl font-sans text-sm leading-7 text-muted-foreground sm:text-base">
            Have questions about our veterinary medicines, animal
            health products or distribution services? We are here
            to help. Send us a message and connect with our team.
          </p>

        </div>

        {/* Decorative backgrounds */}
        <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-green-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-blue-200/30 blur-3xl" />

      </section>

      {/* Contact Section */}
      <section className="container-responsive py-14 sm:py-20 lg:py-24">
        <ContactDetails />
      </section>

    </div>
  );
}
