import prisma from "@/lib/prisma";

export default async function CompaniesPage() {
  const companies = await prisma.company.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Companies</h1>
      <div className="mt-4 divide-y">
        {companies.map((c) => (
          <div key={c.id} className="py-3">
            <div className="font-medium">{c.name}</div>
            <div className="text-sm text-gray-600">{c.domain ?? "-"}</div>
          </div>
        ))}
        {companies.length === 0 && <p className="text-sm">No companies yet.</p>}
      </div>
    </div>
  );
}

