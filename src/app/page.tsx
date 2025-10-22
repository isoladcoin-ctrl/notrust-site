import Image from 'next/image';
import Receipts from '@/components/Receipts';
import Scanner from '@/components/Scanner';
import Footer from '@/components/Footer';
import Marquee from '@/components/Marquee';
import MemeGrid from '@/components/MemeGrid';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/10 sticky top-0 bg-black/70 backdrop-blur z-20">
        <div className="flex items-center gap-3">
          <Image
            src="/branding/logo.png"   // <-- update if your file is different
            alt="$NOTRUST logo"
            width={80}
            height={80}
            priority
          />
        </div>
        <nav className="flex items-center gap-2">
          <a className="px-4 py-2 border border-white/20 rounded-lg" href="#receipts">Read Receipts</a>
          <a className="px-4 py-2 border border-white/20 rounded-lg" href="#scanner">Scan a Token</a>
          <a
            className="px-4 py-2 rounded-lg bg-[#00FF88] text-black font-semibold"
            href="https://pancakeswap.finance/swap?outputCurrency=YOUR_TOKEN_ADDRESS"
            target="_blank"
            rel="noreferrer"
          >
            Buy $NOTRUST
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="py-20 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
          TRUST NOBODY. VERIFY EVERYTHING.
        </h1>
        <p className="mt-3 text-lg opacity-80">
          $NOTRUST is the meme coin for the professionally paranoid.
        </p>
      </section>

      {/* Warning tape marquee */}
      <Marquee />

      {/* Receipts */}
      <section id="receipts" className="p-6 md:p-12">
        <h2 className="text-3xl font-bold mb-4">Receipts</h2>
        <Receipts />
      </section>

      {/* Scanner (client component) */}
      <Scanner />

      {/* Meme wall */}
      <MemeGrid />

      {/* Footer */}
      <Footer />
    </main>
  );
}
