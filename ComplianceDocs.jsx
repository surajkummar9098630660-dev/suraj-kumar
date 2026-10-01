import React, { useEffect, useState } from 'react';

export default function ComplianceDocs({role}){
  const [docs,setDocs]=useState([
    {vehicle_number:'BR01-AB-1234', rc_expiry:'2025-08-10', insurance_expiry:'2026-09-25', puc_expiry:'2026-09-20', fitness_expiry:'2026-10-15', permit_expiry:'2027-01-01', overall_status:'expired', alerts:[{doc:'rc_expiry',message:'RC Expired 38 days ago'}]},
    {vehicle_number:'BR01-CD-5678', rc_expiry:'2027-05-10', insurance_expiry:'2026-09-28', puc_expiry:'2026-12-01', fitness_expiry:'2027-02-10', permit_expiry:'2027-03-01', overall_status:'expiring', alerts:[{doc:'insurance_expiry',message:'Insurance expiring in 11 days'}]},
    {vehicle_number:'BR01-EF-9012', rc_expiry:'2028-01-01', insurance_expiry:'2027-06-01', puc_expiry:'2027-01-10', fitness_expiry:'2027-04-20', permit_expiry:'2027-05-01', overall_status:'valid', alerts:[]},
  ]);

  const getDays = (dateStr)=>{
    const days = Math.ceil((new Date(dateStr) - new Date())/(1000*60*60*24));
    return days;
  };

  const getBadge = (dateStr)=>{
    const d = getDays(dateStr);
    if(d<0) return {color:'bg-red-500', text:`Expired ${Math.abs(d)}d`};
    if(d<=7) return {color:'bg-red-500 animate-pulse', text:`${d}d URGENT`};
    if(d<=30) return {color:'bg-yellow-500 text-black', text:`${d}d left`};
    return {color:'bg-green-500', text:`${d}d`};
  };

  const filtered = role==='CUSTOMER'?docs.slice(0,2):role==='DRIVER'?docs.slice(0,1):docs;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Compliance & Documents - {role}</h1>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#111] border border-red-900/50 p-4 rounded-2xl"><p className="text-xs text-red-400">Expired</p><p className="text-2xl font-bold">{docs.filter(d=>d.overall_status==='expired').length}</p></div>
        <div className="bg-[#111] border border-yellow-900/50 p-4 rounded-2xl"><p className="text-xs text-yellow-400">Expiring in 30d</p><p className="text-2xl font-bold">{docs.filter(d=>d.overall_status==='expiring').length}</p></div>
        <div className="bg-[#111] border border-green-900/50 p-4 rounded-2xl"><p className="text-xs text-green-400">Valid</p><p className="text-2xl font-bold">{docs.filter(d=>d.overall_status==='valid').length}</p></div>
        <div className="bg-white text-black p-4 rounded-2xl"><p className="text-xs">Total Vehicles</p><p className="text-2xl font-bold">{docs.length}</p></div>
      </div>

      {filtered.map(d=>(
        <div key={d.vehicle_number} className={`bg-[#111] border ${d.overall_status==='expired'?'border-red-500/50':d.overall_status==='expiring'?'border-yellow-500/50':'border-[#1a1a1a]'} p-4 rounded-2xl`}>
          <div className="flex justify-between">
            <p className="font-mono font-bold">{d.vehicle_number}</p>
            <span className={`text- px-2 py-1 rounded-full font-bold ${d.overall_status==='expired'?'bg-red-500':d.overall_status==='expiring'?'bg-yellow-500 text-black':'bg-green-500'} text-white`}>{d.overall_status.toUpperCase()}</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4 text-xs">
            {[
              {label:'RC', key:'rc_expiry'},
              {label:'Insurance', key:'insurance_expiry'},
              {label:'PUC', key:'puc_expiry'},
              {label:'Fitness', key:'fitness_expiry'},
              {label:'Permit', key:'permit_expiry'},
            ].map(item=>{
              const b = getBadge(d[item.key]);
              return (
                <div key={item.key} className="bg-[#0a0a0a] border border-[#1a1a1a] p-3 rounded-xl flex justify-between items-center">
                  <div><p className="text- text-gray-500">{item.label}</p><p className="font-mono text-">{d[item.key]}</p></div>
                  <span className={`${b.color} text- px-2 py-1 rounded-full font-bold`}>{b.text}</span>
                </div>
              );
            })}
          </div>

          {d.alerts?.length>0 && <div className="mt-3 bg-red-500/10 border border-red-500/20 p-2 rounded-xl text- text-red-400">{d.alerts.map(a=>a.message).join(' • ')}</div>}

          {(role==='ADMIN'||role==='STAFF') && (
            <div className="mt-3 flex gap-2">
              <button className="bg-white text-black text- px-3 py-1 rounded">Upload Doc</button>
              <button className="bg-[#222] text- px-3 py-1 rounded">Renew</button>
              <button className="bg-[#222] text- px-3 py-1 rounded">View PDF</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}