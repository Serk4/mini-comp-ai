"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewRequestPage() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("http://localhost:3001/evidence-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rawText: text }),
    });

    const data = await res.json();

    // Redirect to the new request detail page
    router.push(`/dashboard/requests/${data.id}`);
  }

  return (
    
    <div className="space-y-6">
        
      <h2 className="text-2xl font-semibold">New Evidence Request</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-2">Evidence Text</label>
          <textarea
            className="w-full border rounded p-3 h-40"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste SOC 2 evidence, change request details, incident summary, etc."
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
}
