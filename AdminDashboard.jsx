export default function AdminDashboard({ vehicles }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard - Super Admin</h1>
      <p className="text-gray-400 text-sm mt-1">Full access • Users • Revenue • All fleets</p>
      <div className="grid grid-cols-4 gap-4 mt-6">
        <div className="bg-[#111] border border-[#222] p-4 rounded-xl"><p className="text-xs text-gray-400">Total Users</p><p className="text-2xl font-bold">3</p></div>
        <div className="bg-[#111] border border-[#222] p-4 rounded-xl"><p className="text-xs text-gray-400">Total Vehicles</p><p className="text-2xl font-bold">{vehicles.length}</p></div>
        <div className="bg-[#111] border border-[#222] p-4 rounded-xl"><p className="text-xs text-gray-400">Revenue</p><p className="text-2xl font-bold text-green-400">Rs 1,24,500</p></div>
        <div className="bg-[#111] border border-[#222] p-4 rounded-xl"><p className="text-xs text-gray-400">SaaS per vehicle</p><p className="text-2xl font-bold">Rs 99/mo</p></div>
      </div>
    </div>
  );
}