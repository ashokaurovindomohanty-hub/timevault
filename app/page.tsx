export default function Home(){
 return (
  <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
    <h1 className="text-5xl font-black bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">TimeVault</h1>
    <p className="opacity-60 mt-3">Your past, remembered.</p>
    <div className="flex gap-3 mt-6">
      <a href="/timeline" className="bg-violet-600 px-6 py-3 rounded-full font-bold">Open Timeline</a>
      <a href="/chat" className="border border-white/20 px-6 py-3 rounded-full">Ask Past</a>
    </div>
  </main>
 )
}
