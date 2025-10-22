// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10">
      <div className="mx-auto max-w-5xl px-6 py-10 grid gap-6 md:grid-cols-3">
        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <a
            href="mailto:contact@notrust.fun"
            className="text-[#00FF88] hover:underline"
          >
            contact@notrust.fun 
          </a>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Socials</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="https://x.com/NotrustCoin"
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                X (Twitter)
              </a>
            </li>
            <li>
              <a
                href="https://t.me/notrustcoin"
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                Telegram
              </a>
            </li>
          </ul>
        </div>

        <div className="text-sm text-white/60 md:text-right">
          © {new Date().getFullYear()} NOTRUST. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
