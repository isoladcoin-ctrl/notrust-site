// src/app/tokenomics/page.tsx
"use client";

import React from "react";
import HeroBanner from "../../components/HeroBanner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

// ───────────────────────────────────────────────────────────
// DATA — edit anytime
// ───────────────────────────────────────────────────────────
type AllocationRow = {
  name: string;
  percent: number;
  purpose: string;
  vesting: string;
};

const DISTRIBUTION: AllocationRow[] = [
  {
    name: "Liquidity",
    percent: 50,
    purpose:
      "To provide strong liquidity on decentralized and centralized exchanges, ensuring price stability and investor confidence.",
    vesting: "Locked for 12 months via a verifiable smart-contract locker.",
  },
  {
    name: "Research & Development (R&D)",
    percent: 15,
    purpose:
      "Fund ongoing technical innovation, ecosystem upgrades, and product expansion.",
    vesting: "Gradual quarterly release tied to development milestones.",
  },
  {
    name: "Development Team",
    percent: 10,
    purpose: "Core contributors allocation.",
    vesting: "Will be sent to a dead wallet (burn).",
  },
  {
    name: "Marketing & Partnerships",
    percent: 10,
    purpose:
      "Strategic campaigns, influencer partnerships, exchange listings, and community events.",
    vesting: "Released progressively based on phases and KPI achievements.",
  },
  {
    name: "Community Rewards & Incentives",
    percent: 15,
    purpose:
      "Rewards for early adopters, staking participants, DAO contributors, and initiatives.",
    vesting:
      "Distributed via reward programs and staking pools to maintain price stability.",
  },
];

const PIE_DATA = DISTRIBUTION.map((d) => ({ name: d.name, value: d.percent }));
const COLORS = ["#06b6d4", "#22c55e", "#f59e0b", "#a78bfa", "#ef4444"]; // cyan/green/amber/purple/red

const NETWORK_META = [
  { label: "Chain", value: "BSC (Binance Smart Chain)" },
  { label: "Buy Tax", value: "3%" },
  { label: "Sell Tax", value: "4%" },
];

const SELL_TAX_BREAKDOWN = [
  { label: "Burn", value: "1%" },
  { label: "Auto-Liquidity", value: "1%" },
  { label: "Aggressive Marketing", value: "2%" },
];

// ───────────────────────────────────────────────────────────

export default function TokenomicsPage() {
  return (
    <main className="container mx-auto px-4 py-10 space-y-10">
      <HeroBanner
  title="$NOTRUST Tokenomics"
  subtitle="Built for trust, stability, and long-term value."
  ctaText="Buy $NOTRUST"
  onCtaClick={() => window.open("https://pancakeswap.finance/swap?outputCurrency=0xa5406FCa4413B95a13c5Cc58E1764a239ee0DfdA&inputCurrency=BNB", "_blank")}
  imageUrl="/media/hero-tokenomics.jpg"   // ← points to public/media/hero-tokenomics.jpg
  allowUpload={false}                     // ← hides upload UI for visitors
/>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie chart */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Allocation Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="h-[360px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PIE_DATA}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={120}
                  innerRadius={60}
                >
                  {PIE_DATA.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Network + taxes */}
        <div className="grid gap-6">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Network & Taxes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {NETWORK_META.map((m) => (
                  <li
                    key={m.label}
                    className="p-3 rounded-xl bg-zinc-900/50 flex items-center justify-between"
                  >
                    <span className="text-zinc-400">{m.label}</span>
                    <b>{m.value}</b>
                  </li>
                ))}
              </ul>

              <div className="mt-5">
                <div className="text-sm font-medium mb-2">Sell Tax Breakdown (4%)</div>
                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                  {SELL_TAX_BREAKDOWN.map((t) => (
                    <li key={t.label} className="p-3 rounded-xl bg-zinc-900/50 flex items-center justify-between">
                      <span className="text-zinc-400">{t.label}</span>
                      <b>{t.value}</b>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-zinc-500">
                  Taxes and allocations are subject to on-chain verification and community governance.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Distribution table */}
      <section>
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Token Distribution Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-zinc-400">
                  <tr className="border-b border-zinc-800">
                    <th className="py-3 pr-4">Allocation</th>
                    <th className="py-3 pr-4">Percentage</th>
                    <th className="py-3 pr-4">Purpose</th>
                    <th className="py-3 pr-4">Vesting / Lock</th>
                  </tr>
                </thead>
                <tbody>
                  {DISTRIBUTION.map((row) => (
                    <tr key={row.name} className="border-b border-zinc-900/60 last:border-0">
                      <td className="py-3 pr-4 font-medium">{row.name}</td>
                      <td className="py-3 pr-4">{row.percent}%</td>
                      <td className="py-3 pr-4 text-zinc-300">{row.purpose}</td>
                      <td className="py-3 pr-4 text-zinc-300">{row.vesting}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
