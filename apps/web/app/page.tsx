"use client";

import { useState } from "react";

export default function Home() {
  const [rawText, setRawText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  async function submitEvidence() {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("http://localhost:3001/evidence-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawText }),
      });

      if (!res.ok) {
        throw new Error("Backend error");
      }

      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: "2rem", maxWidth: 800, margin: "0 auto" }}>
      <h1>SOC 2 Evidence Analyzer</h1>

      <textarea
        value={rawText}
        onChange={(e) => setRawText(e.target.value)}
        placeholder="Paste evidence text here..."
        style={{ width: "100%", height: 120, marginTop: 20 }}
      />

      <button
        onClick={submitEvidence}
        disabled={loading}
        style={{ marginTop: 20, padding: "10px 20px" }}
      >
        {loading ? "Analyzing..." : "Analyze Evidence"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div style={{ marginTop: 30 }}>
          <h2>Summary</h2>
          <p>{result.result.summary}</p>

          <h2>Missing Evidence</h2>
          <ul>
            {result.result.missingEvidence.map((m: string, i: number) => (
              <li key={i}>{m}</li>
            ))}
          </ul>

          <h2>Recommended Controls</h2>
          <ul>
            {result.result.recommendedControls.map((c: string, i: number) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
