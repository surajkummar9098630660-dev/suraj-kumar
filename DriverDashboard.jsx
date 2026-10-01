export default function DriverDashboard({ vehicles }){
  const myVehicle = vehicles[0];
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Driver Dashboard - {myVehicle?.vehicle_number}</h1>
      <p className="text-xs text-gray-500">See ONLY own trip • Cannot see other vehicles</p>
      <div className="mt-6 bg-[#111] border border-[#1a1a1a] p-6 rounded-2xl">
        <p className="text-sm">Current Trip: Barh → Patna • 62 km/h</p>
        <button className="mt-4 bg-white text-black px-4 py-2 rounded-xl text-sm font-semibold">Complete Trip</button>
        <p className="text-xs text-red-400 mt-4">✗ Cannot see: Other vehicles, Revenue, Fuel cost of fleet, All trips</p>
      </div>
    </div>
  );
}