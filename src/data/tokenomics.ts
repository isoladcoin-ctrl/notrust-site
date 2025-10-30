// src/data/tokenomics.ts
export type Allocation = { name: string; value: number };

export const ALLOCATIONS: Allocation[] = [
  // ✏️ Replace with your real numbers (should sum ≈ 100)
  { name: "Liquidity", value: 45 },
  { name: "Community/Rewards", value: 25 },
  { name: "Marketing", value: 10 },
  { name: "Team (Vested)", value: 10 },
  { name: "Treasury/R&D", value: 10 },
];

export const TOKENOMICS_PARAMS: { label: string; value: string }[] = [
  { label: "Total Supply", value: "1,000,000,000" },
  { label: "Chain", value: "BNB / Solana" },
  { label: "Liquidity", value: "45% (locked)" },
  { label: "Team Vesting", value: "12 mo cliff, 24 mo linear" },
  { label: "Taxes", value: "0 / 0" },
  { label: "Treasury/R&D", value: "10%" },
];
