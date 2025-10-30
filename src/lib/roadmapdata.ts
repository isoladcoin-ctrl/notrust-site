// src/lib/roadmapData.ts
export type Step = { id: string; icon?: string; title: string; objective: string; action: string };
export type Phase = { title: string; steps: Step[] };

export const PHASES: Phase[] = [
  {
    title: "Phase 1 — Foundation",
    steps: [
      { id: "p1-website", icon: "🖥️", title: "Website Launch", objective: "Brand credibility", action: "Update the live site with memes, warnings, and receipts section." },
      { id: "p1-twitter", icon: "🐦", title: "X (Twitter)", objective: "Virality & culture", action: "2–3 posts daily: scam alerts, meme threads, “red flag” humor." },
      { id: "p1-telegram", icon: "💬", title: "Telegram", objective: "Community identity", action: "Introduce “Scam Slayer” ranks (Rookie → Legend). Create active discussions." },
      { id: "p1-launch", icon: "💰", title: "Token Launch + Liquidity", objective: "Market entry", action: "PancakeSwap listing, fair launch, immediate contract transparency (0 hidden functions)." },
      { id: "p1-tax", icon: "🧾", title: "Tax Routing Setup (Sell 4%)", objective: "Automate tokenomics", action: "Configure & verify: 1% Burn, 1% Auto-Liquidity, 2% Aggressive Marketing. Publish wallets & proofs." },
      { id: "p1-lock", icon: "🔒", title: "Liquidity Lock", objective: "Price stability & trust", action: "Lock LP 12 months; share locker tx/link publicly." },
    ],
  },
  {
    title: "Phase 2 — Utility",
    steps: [
      { id: "p2-hub", icon: "🕵️", title: "Scam Hub Launch", objective: "Community contribution", action: "MVP form/dApp for scam reports & earn $NOTRUST." },
      { id: "p2-rewards", icon: "💰", title: "Reward System", objective: "Retention loop", action: "“Expose-to-Earn.” Weekly leaderboard for verified reporters." },
      { id: "p2-analytics", icon: "📊", title: "Analytics Dashboard", objective: "Transparency", action: "Live tax metrics (burn total, auto-LP adds, marketing wallet flows) + scam stats." },
      { id: "p2-partners", icon: "🤝", title: "Partnerships", objective: "Legitimacy & trust", action: "De.Fi, RugDoc, DEXTools, reputable influencers." },
      { id: "p2-listings", icon: "📰", title: "Listings", objective: "Liquidity & credibility", action: "Apply CG/CMC; outreach to MEXC/Bitmart." },
    ],
  },
  {
    title: "Phase 3 — Scale",
    steps: [
      { id: "p3-dao", icon: "🗳️", title: "DAO Launch", objective: "Governance", action: "Holders vote on verification, partnerships, bounties." },
      { id: "p3-app", icon: "📱", title: "Scam Slayer App (Beta)", objective: "Accessibility", action: "Web/mobile app — wallet scanner, scam alerts, reward tracker." },
      { id: "p3-cex", icon: "🏦", title: "CEX Listings", objective: "Liquidity & visibility", action: "Pursue Bitmart, MEXC, Gate.io." },
      { id: "p3-expansion", icon: "🌍", title: "Expansion", objective: "Virality & recognition", action: "Scale content globally — languages & regional meme strategies." },
    ],
  },
];
