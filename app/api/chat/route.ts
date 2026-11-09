import { supabase } from '@/lib/supabase'
export async function POST(req: Request){
 try{
  const {question} = await req.json()
  const {data, error} = await supabase.from('memories').select('message')
  console.log('MEM:', data, 'ERR:', error)
  const context = data?.map(m=>m.message).join(', ') || 'No memories yet'
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({contents:[{parts:[{text:`You are TimeVault agent. Context: ${context}
User: ${question}`}]}]})
  })
  const j = await r.json()
  if(j.error) throw new Error(j.error.message)
  return Response.json({answer: j.candidates[0].content.parts[0].text})
 }catch(e:any){ return Response.json({answer: 'Error: '+e.message},{status:500}) }
}
