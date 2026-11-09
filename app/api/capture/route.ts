import { NextResponse } from 'next/server'
import { captureMemory } from '@/lib/capture'
export async function POST(req: Request) {
  const memory = await req.json()
  const saved = await captureMemory({ ...memory, timestamp: new Date().toISOString() })
  return NextResponse.json({ success: true, saved })
}
