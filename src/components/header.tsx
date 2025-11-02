// src/components/Header.tsx
import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-white/10">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-bold tracking-wide">
          $NOTRUST
        </Link>

        <div className="flex items-center gap-4 text-sm">
          <Link href="/scam-hub" className="hover:text-emerald-300">Scam Hub</Link>
          <Link href="/tokenomics" className="hover:text-emerald-300">Tokenomics</Link>
          <Link href="/roadmap" className="hover:text-emerald-300">Roadmap</Link>
        </div>
      </nav>
    </header>
  )
}
