interface EvidenceRequest {
  id: number;
  rawText: string;
  status: string;
  createdAt: string;
  result: {
    summary: string;
    recommendedControls: string[];
    missingEvidence: string[];
  } | null;
}

async function getRequest(id: string) {
  const res = await fetch(`http://localhost:3001/evidence-request/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch request");
  }

  return res.json();
}

export default async function RequestDetailPage({ params,}: {
  params: { requestId: string };
}) {
  const { requestId } = await params;
  const request = await getRequest(requestId);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Request #{request.id}</h2>

      <div className="bg-white p-4 shadow rounded">
        <h3 className="font-semibold mb-2">Raw Text</h3>
        <p className="text-gray-700 whitespace-pre-line">{request.rawText}</p>
      </div>

      <div className="bg-white p-4 shadow rounded">
        <h3 className="font-semibold mb-2">Status</h3>
        <span
          className={`px-3 py-1 text-sm rounded ${
            request.status === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : request.status === "completed"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {request.status}
        </span>
      </div>

      {request.result && (
        <>
          <div className="bg-white p-4 shadow rounded">
            <h3 className="font-semibold mb-2">Summary</h3>
            <p className="text-gray-700">{request.result.summary}</p>
          </div>

          <div className="bg-white p-4 shadow rounded">
            <h3 className="font-semibold mb-2">Recommended Controls</h3>
            <ul className="list-disc ml-6 text-gray-700">
              {request.result.recommendedControls.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-4 shadow rounded">
            <h3 className="font-semibold mb-2">Missing Evidence</h3>
            <ul className="list-disc ml-6 text-gray-700">
              {request.result.missingEvidence.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
