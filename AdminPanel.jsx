import React, { useState } from 'react';

export default function AdminPanel(){
  const [form,setForm]=useState({name:'',email:'',password:'123456',phone:''});
  const [msg,setMsg]=useState('');

  const createUser = async (role)=>{
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:5000/api/auth/register/admin',{
      method:'POST',
      headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},
      body: JSON.stringify({...form, role})
    });
    const data = await res.json();
    setMsg(data.success? `${role} created: ${data.user.email}` : data.message);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Panel - Full Access</h1>
      <p className="text-xs text-gray-500">Only ADMIN can see 4 buttons to create each role</p>

      <div className="mt-6 bg-[#111] border border-[#1a1a1a] p-4 rounded-2xl max-w- space-y-3">
        <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Name" className="w-full bg-[#0a0a0a] border border-[#222] p-3 rounded-xl text-sm" />
        <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" className="w-full bg-[#0a0a0a] border border-[#222] p-3 rounded-xl text-sm" />
        <input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="Phone" className="w-full bg-[#0a0a0a] border border-[#222] p-3 rounded-xl text-sm" />

        <div className="grid grid-cols-2 gap-2 pt-4">
          <button onClick={()=>createUser('ADMIN')} className="bg-white text-black font-semibold p-3 rounded-xl text-xs">+ Create ADMIN - Full Data</button>
          <button onClick={()=>createUser('STAFF')} className="bg-[#222] text-white font-semibold p-3 rounded-xl text-xs border border-[#333]">+ Create STAFF - No Billing</button>
          <button onClick={()=>createUser('CUSTOMER')} className="bg-[#222] text-white font-semibold p-3 rounded-xl text-xs border border-[#333]">+ Create CUSTOMER - Own 2 only</button>
          <button onClick={()=>createUser('DRIVER')} className="bg-[#222] text-white font-semibold p-3 rounded-xl text-xs border border-[#333]">+ Create DRIVER - Own 1 only</button>
        </div>

        {msg && <p className="text-xs text-green-400 font-mono mt-3">{msg}</p>}
      </div>
    </div>
  );
}