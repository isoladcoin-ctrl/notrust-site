export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="py-20 px-6 text-center">
        <h1 className="text-5xl font-extrabold">Trust Nobody. Verify Everything.</h1>
        <p className="mt-3 text-lg opacity-80">
          $NOTRUST is the meme coin for the professionally paranoid.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <a className="px-4 py-2 bg-[#00FF88] text-black rounded-lg" href="#">Buy $NOTRUST</a>
          <a className="px-4 py-2 border border-white/20 rounded-lg" href="#receipts">Read Receipts</a>
          <a className="px-4 py-2 border border-white/20 rounded-lg" href="#scanner">Scan a Token</a>
        </div>
      </section>

      <section aria-label="marquee" className="border-y border-white/10 bg-black py-3 overflow-hidden">
        <div className="whitespace-nowrap animate-[scroll_18s_linear_infinite]">
          <span className="mx-6 text-[#00FF88]">We don’t trust the dev.</span>
          <span className="mx-6 text-[#00FF88]">We don’t trust the pump.</span>
          <span className="mx-6 text-[#00FF88]">Verify before you buy.</span>
          <span className="mx-6 text-[#00FF88]">LP or lies?</span>
        </div>
      </section>

      <section id="receipts" className="p-6 md:p-12">
        <h2 className="text-3xl font-bold mb-4">Receipts</h2>
        <div id="receiptsCards" className="grid gap-4 md:grid-cols-2"></div>
      </section>

      <section id="scanner" className="p-6 md:p-12">
        <h2 className="text-3xl font-bold mb-4">Red-Flag Scanner (Mock)</h2>
        <div className="flex gap-2">
          <input id="scanInput" placeholder="Paste token address or tweet URL" className="flex-1 px-3 py-2 rounded bg-zinc-900 border border-white/10" />
          <button id="scanBtn" className="px-4 py-2 rounded bg-white text-black">Scan</button>
        </div>
        <pre id="scanOut" className="mt-4 p-4 bg-zinc-950 border border-white/10 rounded text-sm"></pre>
      </section>

      <footer className="p-6 text-center text-white/60">We don’t trust cookies either.</footer>

      <style>{`@keyframes scroll{0%{transform:translateX(0)}100%{transform:translateX(-100%)}}`}</style>
      <script dangerouslySetInnerHTML={{__html:`
        fetch('/receipts.json').then(r=>r.json()).then(d=>{
          const el=document.getElementById('receiptsCards');
          el.innerHTML = [
            ['Token Address', d.tokenAddress, true],
            ['Verified Source', d.verifiedLink, true],
            ['LP Proof', d.lpTx, true],
            ['Deployer', d.deployer, true],
            ['Multisig', d.multisig||'N/A', false]
          ].map(([t,v,isLink])=>\`
            <div class="rounded-xl border border-white/10 bg-zinc-950 p-4">
              <h3 class="font-semibold mb-1">\${t}</h3>
              \${isLink?'<a class="text-[#00FF88]" href="'+v+'" target="_blank" rel="noreferrer">'+v+'</a>':'<span>'+v+'</span>'}
            </div>\`).join('');
        });
        document.getElementById('scanBtn').onclick=()=>{
          const v=(document.getElementById('scanInput').value||'').trim();
          const flags=[
            {l:'🚩 Team wallets concentrated', h:v.length%2===0},
            {l:'🟢 LP burn detected', h:v.length%3===0},
            {l:'⚠️ Contract not verified', h:v.length%5===0}
          ];
          const score=flags.filter(f=>f.h).length;
          document.getElementById('scanOut').textContent =
            'Score: '+score+'/3\\n'+flags.map(f=>(f.h?'[x] ':'[ ] ')+f.l).join('\\n');
        };
      `}} />
    </main>
  );
}
