// src/app/api/mock-scan/route.ts
import { NextRequest, NextResponse } from "next/server";

type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

function mockEvaluate(input: string) {
  const normalized = input.toLowerCase();

  let riskScore = 35;
  const flags: string[] = [];
  const tips: string[] = [
    "Always verify the contract from the official website or socials.",
    "Check if liquidity is locked and contracts are renounced where appropriate.",
    "Avoid sending funds directly to strangers on Telegram or X.",
  ];

  if (normalized.includes("inu") || normalized.includes("pepe")) {
    riskScore += 20;
    flags.push("Meme-style naming pattern detected (high degen zone).");
  }

  if (normalized.includes("presale") || normalized.includes("airdrop")) {
    riskScore += 20;
    flags.push("Presale / airdrop keyword detected. Common scam vector.");
  }

  if (normalized.startsWith("0x") && normalized.length < 42) {
    riskScore += 15;
    flags.push("Short / malformed contract-style input.");
  }

  if (normalized.includes("cex") || normalized.includes("listing")) {
    riskScore += 10;
    flags.push("Exchange / listing language – often used in spoofing scams.");
  }

  if (flags.length === 0) {
    flags.push("No obvious scam patterns detected in this mock scan.");
  }

  if (riskScore > 100) riskScore = 100;

  let riskLevel: RiskLevel = "LOW";
  if (riskScore >= 75) riskLevel = "HIGH";
  else if (riskScore >= 50) riskLevel = "MEDIUM";

  return { riskScore, riskLevel, flags, tips };
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => null)) as
      | { input?: string }
      | null;

    const input = body?.input?.trim();
    if (!input) {
      return NextResponse.json(
        { error: "Missing 'input' field" },
        { status: 400 }
      );
    }

    const evaluation = mockEvaluate(input);

    return NextResponse.json(
      {
        input,
        ...evaluation,
      },
      { status: 200 }
    );
  } catch (e) {
    console.error("mock-scan error", e);
    return NextResponse.json(
      { error: "Internal error" },
      { status: 500 }
    );
  }
}
