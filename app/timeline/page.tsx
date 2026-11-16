"use client"
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function Timeline(){
  const [list,setList]=useState<any[]>([])
  const [q,setQ]=useState("")
  const [tagFilter,setTagFilter]=useState("")
  const [editingId,setEditingId]=useState<string|null>(null)
  const [editTitle,setEditTitle]=useState("")
  const [editDesc,setEditDesc]=useState("")
  useEffect(()=>{
    supabase.auth.getSession().then(async({data:{session}})=>{
      if(!session) location.href="/login"
      else {
        const user = session.user
        const {data}=await supabase.from('memories').select('*').eq('user_id',user.id).order('created_at',{ascending:false})
        if(data && data.length) setList(data.map(d=>({id:d.id,title:d.message,desc:d.repo, created_at:d.created_at, edited_at:d.edited_at})))
        else setList([{id:'1',title:'TimeVault Born',desc:'Your journey begins ✨', created_at: new Date().toISOString()}])
      }
    })
  },[])
async function deleteMemory(id:string){
  const {error}=await supabase.from('memories').delete().eq('id',id)
  if(!error) setList(prev=>prev.filter(x=>x.id!==id))
  else alert(error.message)
}
async function saveEdit(id:string){
  const {error}=await supabase.from('memories').update({message: editTitle, repo: editDesc, edited_at: new Date().toISOString()}).eq('id', id)
  if(!error){
    setList(prev=>prev.map(x=>x.id===id ? {...x, title: editTitle, desc: editDesc} : x))
    setEditingId(null)
  } else alert(error.message)
}
  const [mounted,setMounted]=useState(false)
  useEffect(()=>setMounted(true),[])
  if(!mounted) return null
  const filtered = list.filter(m => 
    (m.title.toLowerCase().includes(q.toLowerCase()) || (m.desc && m.desc.toLowerCase().includes(q.toLowerCase()))) &&
    (!tagFilter || (m.tags && m.tags.join(",").toLowerCase().includes(tagFilter.toLowerCase())))
  ).sort((a,b)=> (b.pinned?1:0)-(a.pinned?1:0))
  return(
  <main className="min-h-screen bg-[#04010f] text-white p-6 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-violet-900/30 via-transparent to-cyan-500/10" />
    <h1 className="relative text-4xl font-black bg-gradient-to-r from-violet-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent">TimeVault</h1>
    <div className="border border-violet-500/20 bg-white/[0.04] backdrop-blur p-4 rounded-2xl mb-4 text-center">
      <p className="text-xs opacity-60">Total Memories</p>
      <p className="text-2xl font-black text-violet-300">{list.length}</p>
    </div>
    <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search memories..." className="w-full bg-white/5 border border-white/10 rounded-xl p-3 mb-4 outline-none" />
    <input value={tagFilter} onChange={e=>setTagFilter(e.target.value)} placeholder="Filter by tag..." className="mt-2 w-full max-w-md bg-white/5 border border-white/10 rounded-xl p-3" />
    {filtered.map(i=>(
      <div key={i.id} className="relative border border-violet-500/20 bg-white/[0.04] backdrop-blur p-5 my-3 rounded-2xl hover:border-violet-400/40 transition" style={{boxShadow:'0 0 20px rgba(124,58,237,0.15)'}}>
        <h2 className="font-bold">{i.title}</h2>
        <p className="opacity-60 text-sm mt-1">{i.desc}</p>
	<p className="text-[10px] opacity-40 mt-1">
	  Created: {i.created_at ? new Date(i.created_at).toLocaleString() : 'just now'}
	  {i.edited_at && ` • Edited: ${new Date(i.edited_at).toLocaleString()}`}
	</p>
{i.tags && i.tags.length>0 && (
  <div className="flex flex-wrap gap-2 mt-3">
    {i.tags.map((t:string)=>(
      <span key={t} className="text-xs px-2 py-1 rounded-full bg-violet-500/20 border border-violet-500/30">#{t}</span>
    ))}
  </div>
)}
  {editingId===i.id ? (
    <div className="flex flex-col gap-2 w-full">
      <input 
        value={editTitle} 
        onChange={e=>setEditTitle(e.target.value)} 
        placeholder="Edit Memory ✨"
        className="border p-2 text-sm w-full rounded"
      />
      <textarea 
        value={editDesc} 
        onChange={e=>setEditDesc(e.target.value)} 
        placeholder="Description"
        className="border p-2 text-sm w-full rounded"
      />
      <div className="flex gap-2">
        <button onClick={()=>saveEdit(i.id)} className="bg-black text-white px-3 py-1 text-sm rounded">Save</button>
        <button onClick={()=>setEditingId(null)} className="border px-3 py-1 text-sm rounded">Cancel</button>
      </div>
    </div>
  ) : (
    <button onClick={()=>{setEditingId(i.id); setEditTitle(i.title); setEditDesc(i.desc || "")}} className="border px-3 py-1 text-sm rounded">Edit</button>
  )}
  <button onClick={()=>deleteMemory(i.id)} className="text-red-500 text-sm">Delete</button>
<button onClick={async()=>{
  const newPinned = !i.pinned
  const {error}=await supabase.from('memories').update({pinned:newPinned}).eq('id',i.id)
  if(!error) setList(prev=>prev.map(x=>x.id===i.id?{...x,pinned:newPinned}:x))
}} className="text-yellow-400 text-sm ml-2">
  {i.pinned ? "★ Pinned" : "☆ Pin"}
</button>
</div>
    ))}
    <a href="/add" className="fixed bottom-6 right-6 bg-gradient-to-r from-violet-600 to-fuchsia-600 w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(168,85,247,0.6)]">+</a>
  </main>
 )
}
