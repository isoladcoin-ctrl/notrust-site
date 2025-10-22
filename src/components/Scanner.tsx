'use client';

import { useState } from 'react';

export default function Scanner() {
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');

  function handleScan() {
    const v = (value || '').trim();

    const flags = [
      { l: '🚩 Team wallets concentrated', h: v.length % 2 === 0 },
      { l: '🟢 LP burn detected',       h: v.length % 3 === 0 },
      { l: '⚠️ Contract not verified',  h: v.length % 5 === 0 },
    ];

    const score = flags.filter(f => f.h).length;

    setResult(
      `Score: ${score}/3\n` +
      flags.map(f => (f.h ? f.l : '')).filter(Boolean).join('\n')
    );
  }

  return (
    <section id="scanner" className="p-6 md:p-12">
      <h2 className="text-3xl font-bold mb-4">Red-Flag Scanner (Mock)</h2>

      <div className="flex gap-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Paste token address or tweet URL"
          className="flex-1 px-3 py-2 rounded bg-zinc-900 border border-white/10"
        />
        <button
          onClick={handleScan}
          className="px-4 py-2 rounded bg-white text-black"
        >
          Scan
        </button>
      </div>

      <pre className="mt-4 p-4 bg-zinc-950 border border-white/10 rounded text-sm whitespace-pre-wrap">
        {result}
      </pre>
    </section>
  );
}
