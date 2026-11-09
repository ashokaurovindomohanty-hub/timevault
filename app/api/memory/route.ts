import { supabase } from '@/lib/supabase'
import { embed } from '@/lib/embed'
import { NextRequest, NextResponse } from 'next/server'
export async function POST(req: NextRequest){
  const {message, repo} = await req.json()
  const embedding = await embed(message)
  const {data, error} = await supabase.from('memories').insert({id: Date.now()+'', timestamp: new Date().toISOString(), repo, message, type:'decision', embedding})
  if(error) return NextResponse.json({error}, {status:500})
  return NextResponse.json(data)
}
