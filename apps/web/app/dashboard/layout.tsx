export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4 flex flex-col">
        <h1 className="text-xl font-bold mb-6">Comp AI</h1>

        <nav className="flex flex-col gap-3">
          <a href="/dashboard" className="text-gray-700 hover:text-black">Dashboard</a>
          <a href="/dashboard/requests" className="text-gray-700 hover:text-black">Requests</a>
          <a href="/dashboard/new" className="text-gray-700 hover:text-black">New Request</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
