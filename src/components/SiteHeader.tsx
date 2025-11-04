// src/components/SiteHeader.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

function NavItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const active =
    href === '/'
      ? pathname === '/'
      : pathname.startsWith(href) || pathname + '/' === href + '/';

  return (
    <Link
      href={href}
      className={clsx(
        'px-3 py-2 rounded-lg text-sm',
        active ? 'bg-white/10 text-white' : 'text-gray-300 hover:text-white'
      )}
    >
      {children}
    </Link>
  );
}

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo / Brand — always links back home */}
        <Link href="/" className="font-extrabold tracking-tight text-white">
          $NOTRUST
        </Link>

        {/* Primary nav */}
        <nav className="hidden gap-2 md:flex">
          <NavItem href="/scam-hub">Scam Hub</NavItem>
          <NavItem href="/tokenomics">Tokenomics</NavItem>
          <NavItem href="/roadmap">Roadmap</NavItem>
        </nav>

        {/* Quick actions */}
        <div className="hidden items-center gap-2 md:flex">
          {/* These jump to sections on the home page */}
          <Link
            href="/#receipts"
            className="rounded-lg border border-white/20 px-3 py-2 text-sm text-white hover:bg-white/10"
          >
            Read Receipts
          </Link>
          <Link
            href="/#scan"
            className="rounded-lg border border-white/20 px-3 py-2 text-sm text-white hover:bg-white/10"
          >
            Scan a Token
          </Link>
          <Link
            href="https://pancakeswap.finance/swap?outputCurrency=&chain=bsc" 
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-emerald-500 px-3 py-2 text-sm font-semibold text-black hover:bg-emerald-400"
          >
            Buy $NOTRUST
          </Link>
        </div>
      </div>
    </header>
  );
}
