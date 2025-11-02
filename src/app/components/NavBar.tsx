// src/components/NavBar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      className={
        "text-sm md:text-base transition-colors " +
        (active
          ? "text-white"
          : "text-zinc-400 hover:text-white")
      }
    >
      {children}
    </Link>
  );
}

export default function NavBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800 bg-black/60 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex h-14 items-center justify-between">
          {/* left: logo/brand */}
          <Link href="/" className="font-bold tracking-tight">
            NOTRUST
          </Link>

          {/* right: links */}
          <nav className="flex items-center gap-5">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/tokenomics">Tokenomics</NavLink>
            <NavLink href="/roadmap">Roadmap</NavLink>
            <NavLink href="/scam-hub">Scam Hub</NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}
