import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const userName = session?.user?.name ?? session?.user?.email ?? "";
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p>Welcome {userName}</p>
      <div className="flex gap-4">
        <Link href="/contacts" className="underline">
          Contacts
        </Link>
        <Link href="/companies" className="underline">
          Companies
        </Link>
        <Link href="/deals" className="underline">
          Deals
        </Link>
        <Link href="/activities" className="underline">
          Activities
        </Link>
      </div>
    </div>
  );
}

