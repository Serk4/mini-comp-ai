export default function RequestDetailPage({ params }: { params: { id: string } }) {
  return (
    <div style={{ padding: 24 }}>
      <h1>Request #{params.id}</h1>
      <p>Details will appear here once the API is wired up.</p>
    </div>
  );
}
