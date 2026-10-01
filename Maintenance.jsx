import React, { useState } from 'react';

export default function MaintenanceIndicator({ role }){
  const [vehicles,setVehicles]=useState([
    {number:'BR01-AB-1234', oil:9500, coolant:25, brake:15, tire_f:26, tire_r:32, tread:1.8, battery:11.5, air:15, odo:85500, health:'critical'},
    {number:'BR01-CD-5678', oil:6000, coolant:80, brake:65, tire_f:32, tire_r:35, tread:5.2, battery:12.6, air:70, odo:45200, health:'good'},
    {number:'BR01-EF-9012', oil:9200, coolant:60, brake:35, tire_f:30, tire_r:33, tread:3.0, battery:12.4, air:40, odo:67100, health:'warning'},
  ]);

  const getColor = (v,type)=>{
    if(type==='oil') return v>10000?'bg-red-500':v>9000?'bg-yellow-500':'bg-green-500';
    if(type==='coolant') return v<30?'bg-red-500':v<60?'bg-yellow-500':'bg-green-500';
    if(type==='brake') return v<20?'bg-red-500':v<40?'bg-yellow-500':'bg-green-500';
    if(type==='battery') return v<11.8?'bg-red-500':v<12.2?'bg-yellow-500':'bg-green-500';
    if(type==='tread') return v<2?'bg-red-500':v<4?'bg-yellow-500':'bg-green-500';
    return 'bg-green-500';
  };

  const filtered = role==='CUSTOMER'?vehicles.slice(0,2):role==='DRIVER'?vehicles.slice(0,1):vehicles;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Maintenance Parameter Indicator - {role}</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#111] border border-red-900/50 p-4 rounded-2xl"><p className="text-xs text-red-400">Critical</p><p className="text-2xl font-bold">{vehicles.filter(v=>v.health==='critical').length}</p></div>
        <div className="bg-[#111] border border-yellow-900/50 p-4 rounded-2xl"><p className="text-xs text-yellow-400">Warning</p><p className="text-2xl font-bold">{vehicles.filter(v=>v.health==='warning').length}</p></div>
        <div className="bg-[#111] border border-green-900/50 p-4 rounded-2xl"><p className="text-xs text-green-400">Good</p><p className="text-2xl font-bold">{vehicles.filter(v=>v.health==='good').length}</p></div>
      </div>
      {filtered.map(v=>(
        <div key={v.number} className={`bg-[#111] border ${v.health==='critical'?'border-red-500/50':v.health==='warning'?'border-yellow-500/50':'border-[#1a1a1a]'} p-4 rounded-2xl`}>
          <div className="flex justify-between">
            <p className="font-mono font-bold">{v.number} - {v.odo} km</p>
            <span className={`text-xs px-2 py-1 rounded-full ${v.health==='critical'?'bg-red-500':v.health==='warning'?'bg-yellow-500 text-black':'bg-green-500'} text-white font-bold`}>{v.health.toUpperCase()}</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            <div><p className="text-xs text-gray-500">Engine Oil</p><div className="flex items-center gap-2"><div className="w-full h-2 bg-[#222] rounded-full"><div className={`h-2 rounded-full ${getColor(v.oil,'oil')}`} style={{width:`${Math.min(v.oil/100,100)}%`}}></div></div><span className="text-xs font-mono">{v.oil} km</span></div></div>
            <div><p className="text-xs text-gray-500">Coolant</p><div className="flex items-center gap-2"><div className="w-full h-2 bg-[#222] rounded-full"><div className={`h-2 rounded-full ${getColor(v.coolant,'coolant')}`} style={{width:`${v.coolant}%`}}></div></div><span className="text-xs">{v.coolant}%</span></div></div>
            <div><p className="text-xs text-gray-500">Brake Pad</p><div className="flex items-center gap-2"><div className="w-full h-2 bg-[#222] rounded-full"><div className={`h-2 rounded-full ${getColor(v.brake,'brake')}`} style={{width:`${v.brake}%`}}></div></div><span className="text-xs">{v.brake}%</span></div></div>
            <div><p className="text-xs text-gray-500">Battery</p><div className="flex items-center gap-2"><div className="w-full h-2 bg-[#222] rounded-full"><div className={`h-2 rounded-full ${getColor(v.battery,'battery')}`} style={{width:`${(v.battery/12.6)*100}%`}}></div></div><span className="text-xs">{v.battery}V</span></div></div>
            <div><p className="text-xs text-gray-500">Tire Pressure</p><p className="text-xs font-mono">F:{v.tire_f} PSI R:{v.tire_r} PSI</p></div>
            <div><p className="text-xs text-gray-500">Tread Depth</p><div className="flex items-center gap-2"><div className={`w-2 h-2 rounded-full ${getColor(v.tread,'tread')}`}></div><span className="text-xs">{v.tread} mm</span></div></div>
            <div><p className="text-xs text-gray-500">Air Filter</p><div className="w-full h-2 bg-[#222] rounded-full"><div className="h-2 bg-green-500 rounded-full" style={{width:`${v.air}%`}}></div></div></div>
            <div className="flex gap-2">{(role==='ADMIN'||role==='STAFF') && <button className="bg-white text-black text-xs px-2 py-1 rounded">Service Done</button>}<button className="bg-[#222] text-xs px-2 py-1 rounded">History</button></div>
          </div>
        </div>
      ))}
    </div>
  );
}