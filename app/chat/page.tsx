"use client"
import { useState } from 'react'
export default function Chat(){
 const [q,setQ]=useState(""), [a,setA]=useState(""), [loading,setLoading]=useState(false)
 async function ask(){
  setLoading(true)
  const r=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question:q})})
  const j=await r.json()
  setA(j.answer); setLoading(false)
 }
 return(
 <main className="min-h-screen bg-[#04010f] text-white p-6 flex flex-col items-center relative overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-b from-violet-900/30 via-transparent to-cyan-500/10" />
  <h1 className="relative text-3xl font-black bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent">TimeVault Agent ✨</h1>
  <div className="relative w-full max-w-md mt-6 flex gap-2">
    <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Ask your past..." className="flex-1 p-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-violet-400/50"/>
    <button onClick={ask} className="bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-2 rounded-full font-bold shadow-[0_0_20px_rgba(168,85,247,0.6)]">{loading?"Thinking...":"Ask"}</button>
  </div>
  {a && <div className="relative w-full max-w-md border border-white/10 bg-white/[0.04] backdrop-blur p-4 rounded-2xl mt-4 whitespace-pre-wrap">{a}</div>}
 </main>)
}
