"use client"
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
export default function Timeline(){
const [list,setList]=useState<any[]>([])
useEffect(()=>{
supabase.from('memories').select('*').then(({data})=>{
if(data && data.length) setList(data.map(d=>({id:d.id,title:d.message,desc:d.repo})))
else setList([{id:'1',title:'TimeVault Born',desc:'Your journey begins'}])
})
},[])
const [mounted,setMounted]=useState(false)
useEffect(()=>setMounted(true),[])
if(!mounted) return null
return(
<main className="min-h-screen bg-black text-white p-6">
<h1 className="text-4xl font-black bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">TimeVault</h1>
{list.map(i=>(
<div key={i.id} className="border border-violet-500/20 bg-white/[0.04] backdrop-blur p-5 my-3 rounded-2xl hover:border-violet-400/40 hover:bg-white/[0.06] transition style={{boxShadow:'0 0 20px rgba(124,58,237,0.15)'}}">
  <h2 className="text-lg font-bold text-white">{i.title}</h2>
  <p className="opacity-60 text-sm mt-1">{i.desc}</p>
</div>
))}
<button className="bg-violet-600 px-6 py-2 rounded-full mt-4" onClick={()=>{let t=prompt("New title"); if(t){const n={id:Date.now()+'',title:t,desc:'New memory'}; setList([...list,n]); fetch('/api/memory',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:n.title,repo:n.desc})})}}}>+ Add Memory</button>
</main>
)
}
