import { supabase } from './supabase'
export type Memory = { timestamp: string; repo: string; message: string; type: 'commit' | 'chat' | 'decision' }
export async function captureMemory(memory: Memory) {
  const { data, error } = await supabase.from('memories').insert(memory).select()
  if (error) console.error('Capture ERR:', error)
  else console.log('Captured:', data)
  return data?.[0] ?? memory
}
