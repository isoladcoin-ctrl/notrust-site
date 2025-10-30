// src/app/api/scam-hub/payout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ethers } from 'ethers';

// ---- ENV ----
const RPC_URL = process.env.RPC_URL!;
const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS!;
const PAYOUT_PRIVATE_KEY = process.env.PAYOUT_PRIVATE_KEY!;
const PAYOUT_FROM_ADDRESS = process.env.PAYOUT_FROM_ADDRESS!;
const ADMIN_KEY = process.env.ADMIN_KEY!;

const REWARD_AMOUNT = Number(process.env.REWARD_AMOUNT ?? '10');
const REWARD_DECIMALS = Number(process.env.REWARD_DECIMALS ?? '18');

// Minimal ERC-20 ABI
const ERC20_ABI = [
  'function decimals() view returns (uint8)',
  'function balanceOf(address) view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)',
];

export async function POST(req: NextRequest) {
  try {
    // Parse body and accept either `key` or `admin_key`
    const body = await req.json().catch(() => ({} as any));
    const wallet: string | undefined = body?.wallet;
    const key: string | undefined = body?.key ?? body?.admin_key;

    if (!wallet || !key) {
      return NextResponse.json(
        { ok: false, error: 'Missing wallet or key' },
        { status: 400 }
      );
    }

    // Admin key check
    if (key !== ADMIN_KEY) {
      return NextResponse.json(
        { ok: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Basic address validation
    if (!ethers.isAddress(wallet)) {
      return NextResponse.json(
        { ok: false, error: 'Invalid wallet address' },
        { status: 400 }
      );
    }

    // Provider & signer (ethers v6)
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const signer = new ethers.Wallet(PAYOUT_PRIVATE_KEY, provider);

    // Optional safety: ensure signer address matches the env one
    const signerAddr = await signer.getAddress();
    if (PAYOUT_FROM_ADDRESS && signerAddr.toLowerCase() !== PAYOUT_FROM_ADDRESS.toLowerCase()) {
      return NextResponse.json(
        { ok: false, error: 'Signer address does not match PAYOUT_FROM_ADDRESS' },
        { status: 400 }
      );
    }

    // Contract
    const token = new ethers.Contract(TOKEN_ADDRESS, ERC20_ABI, signer);

    // Calculate amount (REWARD_AMOUNT * 10**REWARD_DECIMALS)
    const amount = ethers.parseUnits(REWARD_AMOUNT.toString(), REWARD_DECIMALS);

    // Optional balance check
    const balance: bigint = await token.balanceOf(signerAddr);
    if (balance < amount) {
      return NextResponse.json(
        { ok: false, error: 'Insufficient token balance' },
        { status: 400 }
      );
    }

    // Send transfer
    const tx = await token.transfer(wallet, amount);
    const receipt = await tx.wait();

    return NextResponse.json({
      ok: true,
      txHash: receipt?.hash ?? tx?.hash,
      to: wallet,
      amount: REWARD_AMOUNT,
      decimals: REWARD_DECIMALS,
    });
  } catch (err: any) {
    console.error('[payout] error:', err);
    return NextResponse.json(
      { ok: false, error: err?.message ?? 'Server error' },
      { status: 500 }
    );
  }
}

// For GET (direct browser hits), nudge to POST
export async function GET() {
  return NextResponse.json({ ok: false, error: 'Use POST' }, { status: 405 });
}
