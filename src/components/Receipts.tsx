'use client';
import React from 'react';

type Row = { title: string; value: string };

const rows: Row[] = [
  { title: 'Token Address',  value: 'https://bscscan.com/token/PUT_TOKEN_ADDRESS' },
  { title: 'Verified Source', value: 'https://bscscan.com/address/PUT_CONTRACT_ADDRESS#code' },
  { title: 'LP Proof',        value: 'https://bscscan.com/tx/PUT_LP_BURN_OR_LOCK_TX' },
  { title: 'Deployer',        value: 'https://bscscan.com/address/PUT_DEPLOYER_ADDRESS' },
  { title: 'Multisig',        value: 'https://bscscan.com/address/PUT_MULTISIG_ADDRESS' },
];

function isUrl(v: string) {
  return /^https?:\/\//i.test(v);
}

export default function Receipts() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {rows.map((r, i) => (
        <div
          key={i}
          className="rounded-xl border border-white/10 bg-zinc-950 p-4"
        >
          <h3 className="font-semibold mb-1">{r.title}</h3>
          {isUrl(r.value) ? (
            <a
              className="text-[#00FF88] underline break-all"
              href={r.value}
              target="_blank"
              rel="noreferrer"
            >
              {r.value}
            </a>
          ) : (
            <span className="text-white/80 break-all">{r.value}</span>
          )}
        </div>
      ))}
    </div>
  );
}
