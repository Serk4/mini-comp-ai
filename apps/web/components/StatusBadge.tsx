export function StatusBadge({ status }: { status: string }) {
  const styles =
    status === "pending"
      ? "bg-yellow-100 text-yellow-800"
      : status === "completed"
      ? "bg-green-100 text-green-800"
      : "bg-gray-100 text-gray-800";

  return (
    <span className={`px-3 py-1 text-sm rounded ${styles}`}>
      {status}
    </span>
  );
}
