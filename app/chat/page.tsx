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
return(<main className="min-h-screen bg-black text-white p-6">
<h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">TimeVault Agent</h1>
<input value={q} onChange={e=>setQ(e.target.value)} placeholder="Ask your past..." className="w-full mt-4 p-3 rounded-xl bg-white/10 outline-none"/>
<button onClick={ask} className="bg-violet-600 px-6 py-2 rounded-full mt-3">{loading?"Thinking...":"Ask"}</button>
{a && <div className="border border-white/10 p-4 rounded-xl mt-4 whitespace-pre-wrap">{a}</div>}
</main>)
}
