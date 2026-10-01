import React, { useState } from 'react';

export default function StaffPanel(){
  const [form,setForm]=useState({name:'',email:'',password:'123456',phone:'',license_number:''});
  const [msg,setMsg]=useState('');

  const createDriverOnly = async ()=>{
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:5000/api/staff/create-driver',{
      method:'POST',
      headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},
      body: JSON.stringify({...form, role:'DRIVER'})
    });
    const data = await res.json();
    setMsg(data.success? `DRIVER created by STAFF: ${data.user.email}` : data.message);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Staff Panel - Dispatcher</h1>
      <p className="text-xs text-gray-500">STAFF can create ONLY DRIVER - No other buttons</p>

      <div className="mt-6 bg-[#111] border border-[#1a1a1a] p-4 rounded-2xl max-w- space-y-3">
        <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Driver Name" className="w-full bg-[#0a0a0a] border border-[#222] p-3 rounded-xl text-sm" />
        <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Driver Email" className="w-full bg-[#0a0a0a] border border-[#222] p-3 rounded-xl text-sm" />
        <input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="Driver Phone" className="w-full bg-[#0a0a0a] border border-[#222] p-3 rounded-xl text-sm" />
        <input value={form.license_number} onChange={e=>setForm({...form,license_number:e.target.value})} placeholder="License Number" className="w-full bg-[#0a0a0a] border border-[#222] p-3 rounded-xl text-sm" />

        <button onClick={createDriverOnly} className="w-full bg-white text-black font-semibold p-3 rounded-xl text-sm mt-4">
          + Create DRIVER Account Only (Staff Limit)
        </button>

        <p className="text- text-red-400">STAFF cannot create ADMIN/STAFF/CUSTOMER - Only DRIVER button allowed</p>
        {msg && <p className="text-xs text-green-400 font-mono">{msg}</p>}
      </div>
    </div>
  );
}