import prisma from "@/lib/prisma";

export default async function ActivitiesPage() {
  const activities = await prisma.activity.findMany({
    orderBy: { createdAt: "desc" },
    include: { contact: true, deal: true },
  });
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Activities</h1>
      <div className="mt-4 divide-y">
        {activities.map((a) => (
          <div key={a.id} className="py-3">
            <div className="font-medium">{a.type}</div>
            <div className="text-sm text-gray-600">
              {a.note ?? ""} {a.contact ? `• ${a.contact.firstName}` : ""} {a.deal ? `• ${a.deal.title}` : ""}
            </div>
          </div>
        ))}
        {activities.length === 0 && <p className="text-sm">No activities yet.</p>}
      </div>
    </div>
  );
}

