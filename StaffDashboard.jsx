export default function StaffDashboard() {
  const trips = [{ id:1, from:'Barh', to:'Patna', vehicle:'BR01-AB-1234', driver:'Ramesh', status:'IN_TRIP' }];
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Staff Dashboard - Dispatcher</h1>
      <p className="text-gray-400 text-sm mt-1">Assign trips • Manage drivers • Cannot see billing</p>
      <div className="mt-6 bg-[#111] border border-[#222] p-4 rounded-xl">
        <div className="flex justify-between"><p className="font-bold">Assigned trips</p><button className="bg-white text-black text-xs px-3 py-1.5 rounded-lg font-bold">Create trip with optimization</button></div>
        <table className="w-full mt-4 text-sm"><thead className="text-gray-500 text-xs"><tr><th className="text-left p-2">Route</th><th>Vehicle</th><th>Driver</th><th>Status</th></tr></thead>
          <tbody>{trips.map(t=><tr key={t.id} className="border-t border-[#1a1a1a]"><td className="p-2">{t.from} → {t.to}</td><td>{t.vehicle}</td><td>{t.driver}</td><td><span className="bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full text-xs">{t.status}</span></td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}