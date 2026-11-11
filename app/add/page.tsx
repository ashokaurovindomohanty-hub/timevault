"use client"
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
export default function Add(){
 const [msg,setMsg]=useState("")
 const [repo,setRepo]=useState("")
const save=async()=>{
  const {data:{session}} = await supabase.auth.getSession()
  if(!session?.user) return location.href="/login"
  const {error}=await supabase.from('memories').insert({message:msg, repo, user_id: session.user.id})
  if(error) return alert(error.message)
  alert("Saved to TimeVault ✨")
  location.href="/timeline"
}
 return(
  <main className="min-h-screen bg-[#04010f] text-white p-6 flex flex-col items-center">
    <h1 className="text-3xl font-black bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent">Add Memory ✨</h1>
    <input value={msg} onChange={e=>setMsg(e.target.value)} placeholder="What happened?" className="mt-6 w-full max-w-md bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-violet-400/50" />
    <input value={repo} onChange={e=>setRepo(e.target.value)} placeholder="Tag / repo (optional)" className="mt-3 w-full max-w-md bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-violet-400/50" />
    <button onClick={save} className="mt-6 bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded-full font-bold shadow-[0_0_20px_rgba(168,85,247,0.6)]">Save to Vault</button>
  </main>
 )
}
