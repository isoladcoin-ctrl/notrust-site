'use client';
import React from 'react';

type Row = { title: string; value: string };

const rows: Row[] = [
  { title: 'Token Address',  value: 'https://bscscan.com/token/0xa5406FCa4413B95a13c5Cc58E1764a239ee0DfdA' },
  { title: 'Verified Source', value: 'https://bscscan.com/address/0xa5406FCa4413B95a13c5Cc58E1764a239ee0DfdA#code' },
  { title: 'LP Proof',        value: 'https://bscscan.com/tx/0x109bdb42788da6c6d9027cb08e91bd3f3ed736ec5ad4598ffc721732926ecbb9' },
  { title: 'Deployer',        value: 'https://bscscan.com/address/0x08E3dD0CD1cCE9E2403e66779424C6378B613190' },
  { title: 'Research&Development',value: 'https://bscscan.com/address/0x8e51bb1caf0aed8ce147d37613850bf457f0eb51' },
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
