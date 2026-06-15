interface EvidenceRequest {
  id: string;
  rawText: string;
  status: string;
  createdAt: string;
}

async function getRequests(): Promise<EvidenceRequest[]> {
  const res = await fetch("http://localhost:3001/evidence-request", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch requests");
  }

  return res.json();
}

export default async function DashboardPage() {
  let requests: EvidenceRequest[] = [];
  let error: string | null = null;

  try {
    requests = await getRequests();
  } catch (e) {
    error = "Failed to load dashboard data. Please try again later.";
  }

  const sorted = [...requests].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const total = sorted.length;
  const pending = sorted.filter((r) => r.status === "pending").length;
  const completed = sorted.filter((r) => r.status === "completed").length;
  const mostRecent = sorted[0] ?? null;
  const recentFive = sorted.slice(0, 5);

  if (error) {
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>

      {/* Metric Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 shadow rounded">
          <div className="text-sm text-gray-500 mb-1">Total Requests</div>
          <div className="text-3xl font-bold">{total}</div>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <div className="text-sm text-gray-500 mb-1">Pending</div>
          <div className="text-3xl font-bold text-yellow-600">{pending}</div>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <div className="text-sm text-gray-500 mb-1">Completed</div>
          <div className="text-3xl font-bold text-green-600">{completed}</div>
        </div>
      </div>

      {/* Most Recent Request */}
      {mostRecent && (
        <div className="bg-white p-4 shadow rounded mb-6">
          <div className="text-sm text-gray-500 mb-1">Most Recent Request</div>
          <div className="font-medium line-clamp-1">{mostRecent.rawText}</div>
          <div className="text-xs text-gray-400 mt-1">
            {new Date(mostRecent.createdAt).toLocaleString()}
          </div>
        </div>
      )}

      {/* Recent 5 Requests */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Recent Requests</h3>
        <div className="bg-white shadow rounded divide-y">
          {recentFive.length === 0 ? (
            <div className="p-4 text-gray-500">No requests yet.</div>
          ) : (
            recentFive.map((req) => (
              <a
                key={req.id}
                href={`/dashboard/requests/${req.id}`}
                aria-label={`View details for request ${req.id}`}
                className="p-4 flex justify-between items-center hover:bg-gray-50 block"
              >
                <div className="flex-1 min-w-0 mr-4">
                  <div className="font-medium line-clamp-1">{req.rawText}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(req.createdAt).toLocaleString()}
                  </div>
                </div>
                <span
                  className={`px-3 py-1 text-sm rounded flex-shrink-0 ${
                    req.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : req.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {req.status}
                </span>
              </a>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
