"use client"
import { useParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import { supabase } from '@/lib/supabase'
function ReplayInner(){
 const {date} = useParams<{date:string}>()
 const [m,setM]=useState<any[]>([])
 useEffect(()=>{ if(date) supabase.from('memories').select('*').then(({data})=>setM(data||[])) },[date])
 return <main className="min-h-screen bg-black text-white p-6"><h1 className="text-2xl font-bold">Replay {date}</h1>{m.map(x=><div key={x.id} className="border border-white/10 p-3 my-2 rounded-xl">{x.message}</div>)}</main>
}
export default function Replay(){ return <Suspense fallback={<div className="p-6 text-white">Loading...</div>}><ReplayInner/></Suspense> }
