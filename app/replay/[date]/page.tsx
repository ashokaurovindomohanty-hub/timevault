"use client"
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
export default function Replay(){
 const {date} = useParams<{date:string}>()
 const [m,setM]=useState<any[]>([])
 useEffect(()=>{ supabase.from('memories').select('*').eq('timestamp', date).then(({data})=>setM(data||[])) },[date])
 return <main className="min-h-screen bg-black text-white p-6"><h1 className="text-2xl font-bold">Replay {date}</h1>{m.map(x=><div key={x.id} className="border border-white/10 p-3 my-2 rounded-xl">{x.message}</div>)}</main>
}
