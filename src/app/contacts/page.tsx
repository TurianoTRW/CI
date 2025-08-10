import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function ContactsPage() {
  const contacts = await prisma.contact.findMany({
    orderBy: { createdAt: "desc" },
    include: { company: true },
  });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Contacts</h1>
        <Link href="/contacts/new" className="underline">
          New contact
        </Link>
      </div>
      <div className="mt-4 divide-y">
        {contacts.map((c) => (
          <div key={c.id} className="py-3">
            <div className="font-medium">
              {c.firstName} {c.lastName}
            </div>
            <div className="text-sm text-gray-600">
              {c.email ?? "-"} {c.company ? `• ${c.company.name}` : ""}
            </div>
          </div>
        ))}
        {contacts.length === 0 && <p className="text-sm">No contacts yet.</p>}
      </div>
    </div>
  );
}

