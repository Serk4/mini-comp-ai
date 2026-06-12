export default function DashboardPage() {
  return (
    
    <div>
        
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow rounded">Total Requests</div>
        <div className="bg-white p-4 shadow rounded">Pending</div>
        <div className="bg-white p-4 shadow rounded">Completed</div>
      </div>
    </div>
  );
}
