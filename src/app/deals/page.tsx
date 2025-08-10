import prisma from "@/lib/prisma";

export default async function DealsPage() {
  const deals = await prisma.deal.findMany({ orderBy: { createdAt: "desc" }, include: { contact: true, company: true } });
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Deals</h1>
      <div className="mt-4 divide-y">
        {deals.map((d) => (
          <div key={d.id} className="py-3">
            <div className="font-medium">{d.title}</div>
            <div className="text-sm text-gray-600">
              {(d.company?.name || d.contact?.firstName) ?? "-"} • {d.stage ?? "-"} • ${d.amount ?? 0}
            </div>
          </div>
        ))}
        {deals.length === 0 && <p className="text-sm">No deals yet.</p>}
      </div>
    </div>
  );
}

