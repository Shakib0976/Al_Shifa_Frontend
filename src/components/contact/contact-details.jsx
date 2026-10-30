import { contactDetails } from "@/data/navigation";

export function ContactDetails() {
  return (
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
  );
}
