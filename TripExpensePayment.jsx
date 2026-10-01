import React, { useState, useEffect } from 'react';

export default function TripExpensePayment({ role }){
  const [trips,setTrips]=useState([]);
  const [expenses,setExpenses]=useState([]);
  const [payments,setPayments]=useState([]);
  const [profit,setProfit]=useState(null);
  const [ai,setAi]=useState(null);
  const [form,setForm]=useState({from:'Barh',to:'Patna',distance:70});

  const fetchAll = async ()=>{
    const token = localStorage.getItem('token');
    const h={'Authorization':'Bearer '+token};
    const t = await fetch('http://localhost:5000/api/fleet/trips',{headers:h}).then(r=>r.json());
    const e = await fetch('http://localhost:5000/api/fleet/expenses',{headers:h}).then(r=>r.json());
    const p = await fetch('http://localhost:5000/api/fleet/payments',{headers:h}).then(r=>r.json());
    const pr = await fetch('http://localhost:5000/api/fleet/profit',{headers:h}).then(r=>r.json());
    if(t.success) setTrips(t.data);
    if(e.success) setExpenses(e.data);
    if(p.success) setPayments(p.data);
    if(pr.success) setProfit(pr);
  };

  useEffect(()=>{fetchAll()},[]);

  const createTripWithAI = async ()=>{
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:5000/api/fleet/trips/create',{
      method:'POST',
      headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},
      body: JSON.stringify({from:form.from,to:form.to,vehicle_id:'mock',driver_id:'mock'})
    }).then(r=>r.json());
    if(res.success){ alert(res.ai); fetchAll(); }
  };

  const runAI = async ()=>{
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:5000/api/fleet/ai/optimize',{
      method:'POST',
      headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},
      body: JSON.stringify({from:form.from,to:form.to,distance:form.distance})
    }).then(r=>r.json());
    if(res.success) setAi(res.ai);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Trip + Expense + Payment + Profit + AI</h1>

      {/* AI BOX */}
      <div className="bg-[#111] border border-[#1a1a1a] p-4 rounded-2xl">
        <p className="font-bold text-sm">AI Route & Fuel Optimization</p>
        <div className="flex gap-2 mt-3">
          <input value={form.from} onChange={e=>setForm({...form,from:e.target.value})} className="bg-[#0a0a0a] border border-[#222] p-2 rounded-xl text-xs" placeholder="From"/>
          <input value={form.to} onChange={e=>setForm({...form,to:e.target.value})} className="bg-[#0a0a0a] border border-[#222] p-2 rounded-xl text-xs" placeholder="To"/>
          <input value={form.distance} onChange={e=>setForm({...form,distance:+e.target.value})} type="number" className="bg-[#0a0a0a] border border-[#222] p-2 rounded-xl text-xs w-20" placeholder="km"/>
          <button onClick={runAI} className="bg-white text-black px-3 py-2 rounded-xl text-xs font-semibold">AI Predict</button>
          {(role==='ADMIN'||role==='STAFF') && <button onClick={createTripWithAI} className="bg-yellow-500 text-black px-3 py-2 rounded-xl text-xs font-semibold">Create Trip with AI Optimization</button>}
        </div>
        {ai && <div className="mt-3 bg-[#0a0a0a] border border-[#222] p-3 rounded-xl text-xs font-mono">
          <p>Fuel: {ai.fuelPredicted} - {ai.costPredicted}</p>
          <p>Best Route: {ai.bestRoute}</p>
          <p>Toll Save: {ai.tollSave} - Time Save: {ai.timeSave}</p>
          <p className="text-yellow-400">{ai.suggestion}</p>
        </div>}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#111] border border-[#1a1a1a] p-4 rounded-2xl"><p className="text-xs text-gray-400">Trips</p><p className="text-xl font-bold">{trips.length}</p></div>
        <div className="bg-[#111] border border-[#1a1a1a] p-4 rounded-2xl"><p className="text-xs text-gray-400">Total Expense</p><p className="text-xl font-bold">Rs {expenses.reduce((s,e)=>s+e.amount,0)}</p></div>
        <div className="bg-[#111] border border-[#1a1a1a] p-4 rounded-2xl"><p className="text-xs text-gray-400">Total Revenue</p><p className="text-xl font-bold">Rs {payments.reduce((s,p)=>s+(p.freight_amount||p.amount),0)}</p></div>
      </div>

      {profit && role==='ADMIN' && (
        <div className="bg-white text-black p-4 rounded-2xl">
          <p className="font-bold">Profit & Loss (ADMIN only)</p>
          <p>Revenue: Rs {profit.revenue} - Expense: Rs {profit.expense} = Profit: Rs {profit.profit} ({profit.profitPercent}%)</p>
          <p className="text-">STAFF/DRIVER cannot see this - CUSTOMER sees own only</p>
        </div>
      )}

      <div className="bg-[#111] border border-[#1a1a1a] p-4 rounded-2xl">
        <p className="font-bold text-sm">Trips (Role filtered: {role})</p>
        {trips.map(t=><div key={t._id||t.id} className="mt-2 bg-[#0a0a0a] border border-[#1a1a1a] p-2 rounded-xl text-xs flex justify-between"><span>{t.from} → {t.to} - {t.distance_km}km</span><span className="text-yellow-400">{t.optimization?.best_route||'AI optimized'}</span></div>)}
      </div>
    </div>
  );
}