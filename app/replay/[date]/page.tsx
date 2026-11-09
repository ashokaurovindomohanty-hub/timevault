"use client"
import { use, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
export const dynamic = 'force-dynamic'
export default function Replay({params}:{params:Promise<{date:string}>}){
const {date} = use(params)
const [m,setM]=useState<any[]>([])
useEffect(()=>{
supabase.from('memories').select('*').ilike('timestamp', `%${date}%`).then(({data})=>{if(data) setM(data)})
},[date])
return(<main className="min-h-screen bg-black text-white p-6"><h1 className="text-3xl font-bold">Replay: {date}</h1>{m.map(x=><div key={x.id} className="border border-white/10 p-4 my-2 rounded-xl">{x.message}</div>)}{m.length===0 && <p className="opacity-60 mt-4">No memories for this date</p>}</main>)
}
