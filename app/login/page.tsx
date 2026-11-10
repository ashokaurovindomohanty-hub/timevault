"use client"
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
export default function Login(){
 const [email,setEmail]=useState("")
 const [pass,setPass]=useState("")
 const [show,setShow]=useState(false)
 const login=async()=>{
  const {error}=await supabase.auth.signInWithPassword({email,password:pass})
  if(error) alert(error.message); else location.href="/timeline"
 }
 const signup=async()=>{
  const {error}=await supabase.auth.signUp({email,password:pass})
  if(error) alert(error.message); else alert("Check email to confirm ✨")
 }
 return(
  <main className="min-h-screen bg-[#04010f] text-white p-6 flex flex-col items-center">
    <h1 className="text-3xl font-black bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent">Welcome to TimeVault ✨</h1>
    <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="mt-6 w-full max-w-md bg-white/5 border border-white/10 rounded-xl p-3 outline-none" />
    <div className="relative w-full max-w-md mt-3">
    <input type={show?"text":"password"} value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 pr-12 outline-none" />
      <button type="button" onClick={()=>setShow(!show)} className="absolute right-3 top-3 text-sm opacity-60">{show?"Hide":"View"}</button>
    </div>
    <div className="flex gap-3 mt-6">
      <button onClick={login} className="bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded-full font-bold">Login</button>
      <button onClick={signup} className="bg-white/10 border border-white/10 px-8 py-3 rounded-full font-bold">Sign Up</button>
    </div>
<p className="mt-8 text-center text-sm opacity-60 max-w-md leading-relaxed">
  ✨ New here? Click <span className="text-violet-300 font-bold">Sign Up</span> to create your private vault.<br/>
  Already have an account? <span className="text-cyan-300 font-bold">Login</span> and your memories await on the Timeline.
</p>
  </main>
 )
}

