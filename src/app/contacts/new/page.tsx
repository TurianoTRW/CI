"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewContactPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email }),
    });
    setLoading(false);
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      setError(d.error ?? "Failed to create contact");
      return;
    }
    router.push("/contacts");
  }

  return (
    <div className="p-6 max-w-lg">
      <h1 className="text-2xl font-semibold mb-4">New contact</h1>
      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm mb-1">First name</label>
          <input className="border rounded px-3 py-2 w-full" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm mb-1">Last name</label>
          <input className="border rounded px-3 py-2 w-full" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input type="email" className="border rounded px-3 py-2 w-full" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button type="submit" className="bg-black text-white rounded px-4 py-2 disabled:opacity-50" disabled={loading}>
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
}

