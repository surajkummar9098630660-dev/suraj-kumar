import React, { useEffect, useState } from 'react';

export default function LiveTracking({ role }){
  // ALL INDIA + GLOBAL FLEET
  const [vehicles, setVehicles] = useState([
    { id: 'BR01-AB-1234', driver: 'Amit - Patna', city: 'Patna', lat: 25.5941, lng: 85.1376, speed: 62, status: 'Moving', fuel: 78, route: 'Patna → Delhi' },
    { id: 'DL01-XY-0001', driver: 'Rahul - Delhi', city: 'Delhi', lat: 28.6139, lng: 77.2090, speed: 45, status: 'Moving', fuel: 65, route: 'Delhi → Mumbai' },
    { id: 'MH01-MU-2024', driver: 'Vikram - Mumbai', city: 'Mumbai', lat: 19.0760, lng: 72.8777, speed: 0, status: 'Idle', fuel: 32, route: 'Mumbai → Pune' },
    { id: 'WB02-KO-1122', driver: 'Suman - Kolkata', city: 'Kolkata', lat: 22.5726, lng: 88.3639, speed: 58, status: 'Moving', fuel: 88, route: 'Kolkata → Patna' },
    { id: 'KA03-BL-3344', driver: 'Arjun - Bangalore', city: 'Bangalore', lat: 12.9716, lng: 77.5946, speed: 71, status: 'Moving', fuel: 55, route: 'Bangalore → Chennai' },
    { id: 'TN04-CH-5566', driver: 'Karthi - Chennai', city: 'Chennai', lat: 13.0827, lng: 80.2707, speed: 0, status: 'Loading', fuel: 95, route: 'Chennai → Hyderabad' },
    { id: 'RJ05-JP-7788', driver: 'Sunil - Jaipur', city: 'Jaipur', lat: 26.9124, lng: 75.7873, speed: 52, status: 'Moving', fuel: 42, route: 'Jaipur → Delhi' },
    { id: 'GJ06-AH-9900', driver: 'Global - Dubai', city: 'Dubai', lat: 25.2048, lng: 55.2708, speed: 80, status: 'Moving', fuel: 70, route: 'Dubai → India Import' },
  ]);

  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('ALL');

  // Live movement simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setVehicles(v => v.map(truck => ({
       ...truck,
        lat: truck.lat + (Math.random()-0.5)*0.02,
        lng: truck.lng + (Math.random()-0.5)*0.02,
        speed: truck.status === 'Moving'? Math.floor(30 + Math.random()*60) : 0,
        fuel: Math.max(5, truck.fuel - Math.random()*0.2)
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const filteredVehicles = filter === 'ALL'? vehicles : vehicles.filter(v => v.status === filter);

  // Convert lat/lng to % for India map view
  const latLngToPercent = (lat, lng) => {
    // India bounds: Lat 8-35, Lng 68-97
    const x = ((lng - 68) / (97 - 68)) * 100;
    const y = ((35 - lat) / (35 - 8)) * 100;
    return { x: Math.min(95, Math.max(5, x)), y: Math.min(90, Math.max(5, y)) };
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Live Tracking - All India & Global - {role}</h1>
        <div className="flex gap-2">
          {['ALL','Moving','Idle','Loading'].map(f => (
            <button key={f} onClick={()=>setFilter(f)} className={`px-3 py-1 rounded-full text-xs font-bold ${filter===f?'bg-white text-black':'bg-[#222] text-gray-400'}`}>{f}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#111] border border-[#222] p-4 rounded-2xl"><p className="text-xs text-gray-400">PAN INDIA FLEET</p><p className="text-2xl font-bold">{vehicles.length} Trucks</p><p className="text- text-gray-500">From Kashmir to Kanyakumari</p></div>
        <div className="bg-[#111] border border-green-900/50 p-4 rounded-2xl"><p className="text-xs text-green-400">MOVING</p><p className="text-2xl font-bold">{vehicles.filter(v=>v.status==='Moving').length}</p><p className="text- text-gray-500">Live on highways</p></div>
        <div className="bg-[#111] border border-yellow-900/50 p-4 rounded-2xl"><p className="text-xs text-yellow-400">COVERAGE</p><p className="text-2xl font-bold">12 States</p><p className="text- text-gray-500">+ 1 Global</p></div>
        <div className="bg-white text-black p-4 rounded-2xl"><p className="text-xs">TOTAL KM TODAY</p><p className="text-2xl font-bold">4,280 km</p><p className="text-">All India</p></div>
      </div>

      {/* INDIA MAP VIEW */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-[#0f0f0f] border border-[#222] rounded-2xl h- relative overflow-hidden">
          <div className="absolute top-3 left-3 z-10 bg-black/70 backdrop-blur px-3 py-2 rounded-xl border border-[#222]">
            <p className="text-xs font-bold">🇮🇳 ALL INDIA LIVE MAP</p>
            <p className="text- text-gray-400">Patna • Delhi • Mumbai • Kolkata • Chennai • Bangalore • Jaipur • Dubai</p>
          </div>
          <div className="absolute top-3 right-3 z-10 bg-[#111] border border-[#222] px-2 py-1 rounded-lg text-">● Live - Updates every 3s</div>

          {/* India Map Background */}
          <div className="w-full h-full relative bg-[#080808]" style={{ backgroundImage: `radial-gradient(#1a1a1a 1px, transparent 1px)`, backgroundSize: '30px 30px' }}>
            {/* India outline hint */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 text-">🇮🇳</div>

            {/* Grid lines */}
            <div className="absolute inset-0">
              {[...Array(6)].map((_,i)=><div key={i} className="absolute w-full h- bg-[#1a1a1a]" style={{ top: `${(i+1)*16.6}%` }}></div>)}
              {[...Array(6)].map((_,i)=><div key={i} className="absolute h-full w- bg-[#1a1a1a]" style={{ left: `${(i+1)*16.6}%` }}></div>)}
            </div>

            {/* Vehicle Markers - All India */}
            {filteredVehicles.map(v => {
              const pos = latLngToPercent(v.lat, v.lng);
              const isSelected = selected?.id === v.id;
              return (
                <div
                  key={v.id}
                  onClick={()=>setSelected(v)}
                  className={`absolute cursor-pointer transition-all duration-1000 ${isSelected?'z-20 scale-150':'z-10'}`}
                  style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%,-50%)' }}
                >
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text- font-bold shadow-lg ${v.status==='Moving'?'bg-green-500 border-green-300 animate-pulse':'bg-yellow-500 border-yellow-300'}`}>
                    🚚
                  </div>
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-black text-white text- px-1.5 py-0.5 rounded whitespace-nowrap border border-[#333]">
                    {v.city} - {v.speed}km/h
                  </div>
                  {isSelected && (
                    <div className="absolute -top-1 -left-1 w-10 h-10 border-2 border-white rounded-full animate-ping"></div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Map Legend */}
          <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur p-2 rounded-xl border border-[#222] text- space-y-1">
            <div className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> Moving - All India Highway</div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 bg-yellow-500 rounded-full"></div> Idle / Loading</div>
          </div>
        </div>

        {/* Vehicle List - All India */}
        <div className="bg-[#111] border border-[#1a1a1a] rounded-2xl overflow-hidden h- flex flex-col">
          <div className="p-4 border-b border-[#222] flex justify-between">
            <p className="font-bold text-sm">All India Fleet ({filteredVehicles.length})</p>
            <p className="text- text-gray-500">Global Coverage</p>
          </div>
          <div className="overflow-y-auto flex-1">
            {filteredVehicles.map(v => (
              <div key={v.id} onClick={()=>setSelected(v)} className={`p-3 border-b border-[#141414] flex justify-between items-center text-sm cursor-pointer hover:bg-[#1a1a1a] ${selected?.id===v.id?'bg-[#1a1a1a] border-l-2 border-l-white':''}`}>
                <div>
                  <p className="font-mono font-bold text-xs">{v.id}</p>
                  <p className="text- text-gray-400">{v.city} • {v.driver}</p>
                  <p className="text- text-gray-500">{v.route}</p>
                </div>
                <div className="text-right">
                  <p className={`text- px-2 py-0.5 rounded-full font-bold ${v.status==='Moving'?'bg-green-500/20 text-green-400':'bg-yellow-500/20 text-yellow-400'}`}>{v.status}</p>
                  <p className="text- text-gray-500 mt-1">{v.speed} km/h • {v.fuel.toFixed(0)}% fuel</p>
                </div>
              </div>
            ))}
          </div>
          {selected && (
            <div className="p-3 bg-white text-black">
              <p className="text-xs font-bold">Selected: {selected.id}</p>
              <p className="text-">📍 {selected.lat.toFixed(4)}, {selected.lng.toFixed(4)} - {selected.city}</p>
              <p className="text-">Route: {selected.route}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}