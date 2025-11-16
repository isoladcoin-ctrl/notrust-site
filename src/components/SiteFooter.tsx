// src/components/SiteFooter.tsx
import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-black/60">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <div className="font-bold text-white">$NOTRUST</div>
          <p className="mt-2 text-sm text-gray-400">
            DYOR. Trust nobody. Verify everything.
          </p>
        </div>

        <div>
          <div className="mb-2 font-semibold text-white">Social</div>
          <ul className="space-y-1 text-sm">
            <li>
              <a
                href="https://twitter.com/NotrustCoin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
              >
                Follow X (Twitter)
              </a>
            </li>
            <a
               href="https://t.me/notrustcode"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white">
              Join Telegram
            </a>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <a
            href="mailto:contact@notrust.fun"
            className="text-zinc-400 hover:text-white"
          >
            contact@notrust.fun
          </a>
        </div>

        <div>
          <div className="mb-2 font-semibold text-white">Site</div>
          <ul className="space-y-1 text-sm">
            <li>
              <Link href="/tokenomics" className="text-gray-300 hover:text-white">
                Tokenomics
              </Link>
            </li>
            <li>
              <Link href="/roadmap" className="text-gray-300 hover:text-white">
                Roadmap
              </Link>
            </li>
            <li>
              <Link href="/scam-hub" className="text-gray-300 hover:text-white">
                Scam Hub
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 text-xs text-gray-400">
          <span>© {new Date().getFullYear()} NOTRUST. All rights reserved.</span>
          <span>
            <Link href="/#receipts" className="hover:text-white">
              Receipts
            </Link>
            {' · '}
            <Link href="/#scan" className="hover:text-white">
              Scan
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
