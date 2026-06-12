import Link from "next/link";

async function getRequests() {
  const res = await fetch("http://localhost:3001/evidence-request", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch requests");
  }

  return res.json();
}

export default async function RequestsPage() {
  const requests = await getRequests();

  return (
    
    <div>
        <div className="flex justify-between items-center mb-4">
  <h2 className="text-2xl font-semibold">Evidence Requests</h2>
  <a
    href="/dashboard/new"
    className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
  >
    + New Request
  </a>
</div>

      {/* <h2 className="text-2xl font-semibold mb-6">Evidence Requests</h2> */}

      <div className="bg-white shadow rounded divide-y">
        {requests.map((req: any) => (
          <Link
  key={req.id}
  href={`/dashboard/requests/${req.id}`}
  className="p-4 flex justify-between items-center hover:bg-gray-50 block"
>
  <div>
    <div className="font-medium">{req.rawText}</div>
    <div className="text-sm text-gray-500">
      {new Date(req.createdAt).toLocaleString()}
    </div>
  </div>

  <span className={`px-3 py-1 text-sm rounded ${
    req.status === "pending"
      ? "bg-yellow-100 text-yellow-800"
      : req.status === "completed"
      ? "bg-green-100 text-green-800"
      : "bg-gray-100 text-gray-800"
  }`}>
    {req.status}
  </span>
</Link>
        ))}
      </div>
    </div>
  );
}
