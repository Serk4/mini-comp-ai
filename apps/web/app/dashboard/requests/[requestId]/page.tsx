'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
  const res = await fetch(`http://localhost:3001/evidence-request/${id}`);

  if (!res.ok) {
    throw new Error('Failed to fetch request');
  }

  return res.json();
}

export default function RequestDetailPage({
  params,
}: {
  params: { requestId: string };
}) {
  const { requestId } = params;
  const router = useRouter();
  const [request, setRequest] = useState<EvidenceRequest | null>(null);
  const [isLoadingRequest, setIsLoadingRequest] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    getRequest(requestId)
      .then((data: EvidenceRequest) => {
        if (isActive) {
          setRequest(data);
        }
      })
      .catch(() => {
        if (isActive) {
          setErrorMessage('Failed to fetch request');
        }
      })
      .finally(() => {
        if (isActive) {
          setIsLoadingRequest(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [requestId]);

  const handleMarkCompleted = async () => {
    if (!request || request.status !== 'pending') {
      return;
    }

    setIsUpdating(true);
    setErrorMessage(null);

    try {
      const res = await fetch(
        `http://localhost:3001/evidence-request/${request.id}/status`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: 'completed' }),
        },
      );

      if (!res.ok) {
        throw new Error('Failed to update request status');
      }

      const updatedRequest = (await res.json()) as EvidenceRequest;
      setRequest(updatedRequest);
      router.refresh();
    } catch {
      setErrorMessage('Failed to update request status');
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoadingRequest) {
    return <div className="text-gray-600">Loading request...</div>;
  }

  if (!request) {
    return <div className="text-red-600">Request not found.</div>;
  }

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
            request.status === 'pending'
              ? 'bg-yellow-100 text-yellow-800'
              : request.status === 'completed'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
          }`}
        >
          {request.status}
        </span>
        {request.status === 'pending' && (
          <div className="mt-3">
            <button
              type="button"
              onClick={handleMarkCompleted}
              disabled={isUpdating}
              className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed"
            >
              {isUpdating ? 'Marking as Completed...' : 'Mark as Completed'}
            </button>
          </div>
        )}
        {errorMessage && <p className="mt-2 text-sm text-red-600">{errorMessage}</p>}
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
