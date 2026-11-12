"use client"
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
export default function Edit({params}:{params:{id:string}}){
  const id = params.id
  const [msg,setMsg]=useState("")
  useEffect(()=>{ supabase.from('memories').select('desc').eq('id',id).single().then(({data})=> setMsg(data?.message||"")) },[id])
  const save=async()=>{
    await supabase.from('memories').update({desc:msg, edited_at: new Date().toISOString()}).eq('id',id)
    location.href="/timeline"
  }
  return(
    <main className="min-h-screen bg-[#04010f] text-white p-6 flex flex-col items-center">
      <h1 className="text-2xl font-black">Edit Memory ✨</h1>
      <input value={msg} onChange={e=>setMsg(e.target.value)} className="mt-6 w-full max-w-md bg-white/5 border border-white/10 rounded-xl p-3" />
      <button onClick={save} className="mt-4 bg-violet-600 px-6 py-2 rounded-xl">Save</button>
    </main>
  )
}
