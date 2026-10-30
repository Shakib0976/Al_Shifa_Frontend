import { ContactDetails } from "@/components/contact/contact-details";

export const metadata = {
  title: "Contact",
  description: "Contact the Al-Shifa Animal Science team.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-2 md:px-10">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
          We&apos;re here to help
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">Contact us</h1>
        <p className="mt-4 max-w-xl leading-7 text-zinc-600">
          Have a question about a product or animal care? Reach out and our team
          will be happy to point you in the right direction.
        </p>
      </div>
      <ContactDetails />
    </section>
  );
}
