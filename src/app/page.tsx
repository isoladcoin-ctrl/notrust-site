// src/app/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import Receipts from '@/components/Receipts';
import Scanner from '@/components/Scanner';
import Marquee from '@/components/Marquee';
import MemeGrid from '@/components/MemeGrid';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-black/70 px-6 py-4 backdrop-blur">
        <div className="flex items-center gap-3">
          <Link href="/" aria-label="$NOTRUST home">
            <Image
              src="/branding/logo.png"
              alt="$NOTRUST logo"
              width={120}
              height={120}
              priority
            />
          </Link>
        </div>

        {/* ✅ Simple nav (no hero CTAs) */}
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/scam-hub" className="opacity-90 hover:opacity-100">
            Scam Hub
          </Link>
          <Link href="/tokenomics" className="opacity-90 hover:opacity-100">
            Tokenomics
          </Link>
          <Link href="/roadmap" className="opacity-90 hover:opacity-100">
            Roadmap
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="px-6 py-20 text-center">
        <h1 className="text-5xl font-bold tracking-tight md:text-6xl">
          TRUST NOBODY. VERIFY EVERYTHING.
        </h1>
        <p className="mt-3 text-lg opacity-80">
          $NOTRUST is the meme coin for the professionally paranoid.
        </p>
      </section>

      {/* Warning tape marquee */}
      <Marquee />

      {/* Receipts section (linked by footer if needed) */}
      <section id="receipts" className="p-6 md:p-12">
        <h2 className="mb-4 text-3xl font-bold">Receipts</h2>
        <Receipts />
      </section>

      {/* Provide #scan alias so older links still work */}
      <span id="scan" aria-hidden="true" style={{ position: 'relative', top: '-80px', display: 'block' }} />

      {/* Scanner section */}
      <section id="scanner" className="p-6 md:p-12">
        <h2 className="mb-4 text-3xl font-bold">Scan a Token</h2>
        <Scanner />
      </section>

      {/* Meme wall */}
      <MemeGrid />
      {/* ⛔️ Footer is no longer rendered here (it’s in layout.tsx) */}
    </main>
  );
}
