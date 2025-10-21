import Image from "next/image";
export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/70 sticky top-0 backdrop-blur z-20">
        <div className="flex items-center gap-3">
          <Image
  src="/branding/logo.png"
  alt="$NOTRUST logo"
  width={100}
  height={120}
  priority
/>

        </div>
        <a
          className="px-4 py-2 rounded-lg bg-[#00FF88] text-black font-semibold"
          href="https://pancakeswap.finance/swap?outputCurrency=YOUR_TOKEN_ADDRESS"
          target="_blank"
          rel="noreferrer"
        >
          Buy $NOTRUST
        </a>
      </header>

  <section className="py-20 px-6 text-center">
    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
      Trust Nobody. Verify Everything.
    </h1>
    <p className="mt-3 text-lg opacity-80">
      $NOTRUST is the meme coin for the professionally paranoid.
    </p>

    <div className="mt-6 flex items-center justify-center gap-3">
      <a
        className="px-4 py-2 bg-[#00FF88] text-black rounded-lg"
        href="https://pancakeswap.finance/swap?outputCurrency=YOUR_TOKEN_ADDRESS"
        target="_blank"
        rel="noreferrer"
      >
        Buy $NOTRUST
      </a>

      <a className="px-4 py-2 border border-white/20 rounded-lg" href="#receipts">
        Read Receipts
      </a>

      <a className="px-4 py-2 border border-white/20 rounded-lg" href="#scanner">
        Scan a Token
      </a>
    </div>
  </section>


      <section aria-label="warning-tape" className="relative overflow-hidden border-y border-white/10 bg-black">
  <div className="whitespace-nowrap py-3 animate-[tape_18s_linear_infinite] text-[#FFFF00] font-semibold">
    <span className="mx-6">🚨 DO NOT TRUST — VERIFY EVERYTHING — DYOR — NO TRUST 🛡️</span>
    <span className="mx-6">🚨 DO NOT TRUST — VERIFY EVERYTHING — DYOR — NO TRUST 🛡️</span>
    <span className="mx-6">🚨 DO NOT TRUST — VERIFY EVERYTHING — DYOR — NO TRUST 🛡️</span>
  </div>
  <style>{`@keyframes tape{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
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
        <div
  id="receiptsCards"
  className="grid gap-4 md:grid-cols-2"
  suppressHydrationWarning={true}
></div>

      </section>

      <section id="scanner" className="p-6 md:p-12">
        <h2 className="text-3xl font-bold mb-4">Red-Flag Scanner (Mock)</h2>
        <div className="flex gap-2">
          <input id="scanInput" placeholder="Paste token address or tweet URL" className="flex-1 px-3 py-2 rounded bg-zinc-900 border border-white/10" />
          <button id="scanBtn" className="px-4 py-2 rounded bg-white text-black">Scan</button>
        </div>
        <pre id="scanOut" className="mt-4 p-4 bg-zinc-950 border border-white/10 rounded text-sm"></pre>
      </section>

      <section id="meme-grid" className="p-6 md:p-12">
  <h2 className="text-3xl font-bold mb-2">Community Meme Wall 🧱</h2>
  <p className="text-white/70 mb-6">Learn from the LOLs. Verify before you ape.</p>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {[
      "/memes/meme1.jpg","/memes/meme2.jpg","/memes/meme4.jpg","/memes/meme5.jpg",
      "/memes/meme6.jpg","/memes/meme7.jpg","/memes/meme8.jpg","/memes/meme9.jpg","/memes/meme10.jpg"
    ].map((src, i) => (
      <figure key={i} className="overflow-hidden rounded-xl border border-white/10 bg-zinc-950">
        <img src={src} alt={`NOTRUST meme ${i+1}`} className="w-full h-auto object-cover" />
        <figcaption className="p-3 text-sm text-white/80 border-t border-white/10">
          DYOR. Trust nobody. Verify everything.
        </figcaption>
      </figure>
    ))}
  </div>
</section>


      <footer className="p-6 text-center text-white/60">We don’t trust cookies either.</footer>

      <style>{`@keyframes scroll{0%{transform:translateX(0)}100%{transform:translateX(-100%)}}`}</style>
      <script
  dangerouslySetInnerHTML={{
    __html: `
      (function () {
        function onReady(fn){ 
          if (document.readyState === 'complete' || document.readyState === 'interactive') {
            setTimeout(fn, 0);
          } else {
            window.addEventListener('DOMContentLoaded', fn, { once: true });
          }
        }

        onReady(function () {
          fetch('/receipts.json')
            .then(r => {
              if (!r.ok) throw new Error('HTTP ' + r.status);
              return r.json();
            })
            .then(d => {
              const el = document.getElementById('receiptsCards');
              if (!el) return;
              el.innerHTML = [
                ['Token Address', d.tokenAddress, true],
                ['Verified Source', d.verifiedLink, true],
                ['LP Proof', d.lpTx, true],
                ['Deployer', d.deployer, true],
                ['Multisig', d.multisig || 'N/A', false]
              ].map(([t,v,isLink]) => \`
                <div class="rounded-xl border border-white/10 bg-zinc-950 p-4">
                  <h3 class="font-semibold mb-1">\${t}</h3>
                  \${isLink
                    ? '<a class="text-[#00FF88]" href="' + v + '" target="_blank" rel="noreferrer">' + v + '</a>'
                    : '<span>' + v + '</span>'}
                </div>\`
              ).join('');
            })
            .catch(err => {
              const el = document.getElementById('receiptsCards');
              if (!el) return;
              el.innerHTML = '<div class="rounded-xl border border-red-500/30 bg-red-950/20 p-4 text-red-300">Failed to load receipts: ' + (err && err.message ? err.message : err) + '</div>';
              console.error('Receipts load error:', err);
            });

          const btn = document.getElementById('scanBtn');
          if (!btn) return;
          btn.onclick = () => {
            const v = (document.getElementById('scanInput').value || '').trim();
            const flags = [
              { l: '🚩 Team wallets concentrated', h: v.length % 2 === 0 },
              { l: '🟢 LP burn detected',          h: v.length % 3 === 0 },
              { l: '⚠️ Contract not verified',     h: v.length % 5 === 0 }
            ];
            const score = flags.filter(f => f.h).length;
            const out = document.getElementById('scanOut');
            if (out) {
              out.textContent =
                'Score: ' + score + '/3\\n' +
                flags.map(f => (f.h ? f.l : ''))
                     .filter(Boolean)
                     .join('\\n');
            }
          };
        });
      })();
    `,
  }}
/>
</main>
);
}
