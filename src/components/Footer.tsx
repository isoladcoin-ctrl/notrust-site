// src/components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-zinc-800 py-10">
      <div className="mx-auto max-w-6xl px-4 md:px-6 grid gap-8 md:grid-cols-3">
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
          <h3 className="font-semibold mb-2">Social</h3>
          <ul className="space-y-2 text-zinc-400">
            <li>
              <a
                href="https://twitter.com/yourhandle" // update
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                X (Twitter)
              </a>
            </li>
            {/* add Telegram, etc. */}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Site</h3>
          <ul className="space-y-2 text-zinc-400">
            <li>
              <Link href="/tokenomics" className="hover:text-white">
                Tokenomics
              </Link>
            </li>
            <li>
              <Link href="/roadmap" className="hover:text-white">
                Roadmap
              </Link>
            </li>
            <li>
              <Link href="/scam-hub" className="hover:text-white">
                Scam Hub
              </Link>
            </li>
            {/* keep admin hidden: don’t link it here */}
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 md:px-6 mt-8 text-xs text-zinc-500">
        © {new Date().getFullYear()} NOTRUST. All rights reserved.
      </div>
    </footer>
  );
}
