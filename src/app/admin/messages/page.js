import MessagesList from "@/components/admin/messages-list";
import { getApiUrl } from "@/lib/api-url";

export default async function AdminMessagesPage() {
  const response = await fetch(getApiUrl("/api/contact"), {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Unable to load contact messages (${response.status}).`);
  }

  const messages = await response.json();

  if (!Array.isArray(messages)) {
    throw new Error("The contact messages API returned an invalid response.");
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-800">Messages</h1>
        <p className="mt-1 text-sm text-zinc-500">
          View all messages from the contact form.
        </p>
      </div>

      <MessagesList initialMessages={messages} />
    </div>
  );
}
