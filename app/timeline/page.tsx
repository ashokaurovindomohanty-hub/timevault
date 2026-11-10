"use client"
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function Timeline(){
 const [list,setList]=useState<any[]>([])
 useEffect(()=>{
  supabase.from('memories').select('*').then(({data})=>{
   if(data && data.length) setList(data.map(d=>({id:d.id,title:d.message,desc:d.repo})))
   else setList([{id:'1',title:'TimeVault Born',desc:'Your journey begins ✨'}])
  })
 },[])
 const [mounted,setMounted]=useState(false)
 useEffect(()=>setMounted(true),[])
 if(!mounted) return null
 return(
  <main className="min-h-screen bg-[#04010f] text-white p-6 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-violet-900/30 via-transparent to-cyan-500/10" />
    <h1 className="relative text-4xl font-black bg-gradient-to-r from-violet-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]">TimeVault</h1>
    {list.map(i=>(
      <div key={i.id} className="relative border border-violet-500/20 bg-white/[0.04] backdrop-blur p-5 my-3 rounded-2xl hover:border-violet-400/40 hover:bg-white/[0.06] transition" style={{boxShadow:'0 0 20px rgba(124,58,237,0.15)'}}>
        <h2 className="font-bold text-white">{i.title}</h2>
        <p className="opacity-60 text-sm mt-1">{i.desc}</p>
      </div>
    ))}
    <a href="/add" className="fixed bottom-6 right-6 bg-gradient-to-r from-violet-600 to-fuchsia-600 w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(168,85,247,0.6)]">+</a>
  </main>
 )
}
