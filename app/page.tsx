export default function Home(){
 return (
  <main className="min-h-screen bg-[#04010f] text-white flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-violet-900/40 via-fuchsia-600/20 to-cyan-500/20" />
    <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-violet-600/30 blur-[120px] rounded-full" />
    <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-cyan-500/20 blur-[120px] rounded-full" />
    <h1 className="relative text-6xl font-black bg-gradient-to-r from-violet-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]">TimeVault</h1>
    <p className="relative opacity-70 mt-4 text-lg">Your past, remembered among the stars ✨</p>
    <div className="relative flex gap-3 mt-8">
      <a href="/timeline" className="bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded-full font-bold shadow-[0_0_20px_rgba(168,85,247,0.6)]">Open Timeline</a>
      <a href="/chat" className="bg-white/10 backdrop-blur border border-white/20 px-8 py-3 rounded-full">Ask Past</a>
    </div>
  </main>
 )
}
