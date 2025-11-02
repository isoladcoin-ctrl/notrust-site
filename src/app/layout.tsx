// src/app/layout.tsx
import './globals.css'
import Link from 'next/link'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white">
        {/* Header / Nav */}
        <header className="border-b border-white/10">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link href="/" className="text-lg font-bold tracking-wide">
              $NOTRUST
            </Link>

            <div className="flex items-center gap-4 text-sm">
              <Link href="/scam-hub" className="hover:text-emerald-300">Scam Hub</Link>
              <Link href="/tokenomics" className="hover:text-emerald-300">Tokenomics</Link>
              <Link href="/roadmap" className="hover:text-emerald-300">Roadmap</Link>
              {/* keep your existing buttons e.g. Buy, Scan, Receipts if any */}
            </div>
          </nav>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>

        {/* (Optional) Footer */}
        <footer className="mt-20 border-t border-white/10">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-sm text-white/70">
            <p>© {new Date().getFullYear()} NOTRUST</p>
            <div className="flex gap-4">
              <Link href="/scam-hub" className="hover:text-emerald-300">Scam Hub</Link>
              <Link href="/tokenomics" className="hover:text-emerald-300">Tokenomics</Link>
              <Link href="/roadmap" className="hover:text-emerald-300">Roadmap</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
