// src/app/api/scam-hub/payout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ethers } from 'ethers';

// ---- ENV (server-side) ----
const REWARDS_ENABLED = process.env.REWARDS_ENABLED === 'true';
const ADMIN_KEY = process.env.ADMIN_KEY || '';

const RPC_URL = process.env.RPC_URL || '';
const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS || '';
const PAYOUT_PRIVATE_KEY = process.env.PAYOUT_PRIVATE_KEY || '';
const PAYOUT_FROM_ADDRESS = process.env.PAYOUT_FROM_ADDRESS || '';

const REWARD_AMOUNT = Number(process.env.REWARD_AMOUNT ?? '10');
const REWARD_DECIMALS = Number(process.env.REWARD_DECIMALS ?? '18');

// Minimal ERC-20 ABI
const ERC20_ABI = [
  'function transfer(address to, uint256 value) public returns (bool)',
  'function decimals() view returns (uint8)',
];

export async function POST(req: NextRequest) {
  try {
    // --- Safety gate: block if disabled for production launch ---
    if (!REWARDS_ENABLED) {
      return NextResponse.json(
        { ok: false, error: 'Payouts disabled' },
        { status: 403 }
      );
    }

    // Parse body
    const body = await req.json().catch(() => ({}));
    const wallet: string | undefined = body?.wallet;
    const key: string | undefined = body?.key;

    if (!wallet || !key) {
      return NextResponse.json(
        { ok: false, error: 'Missing wallet or key' },
        { status: 400 }
      );
    }

    if (key !== ADMIN_KEY) {
      return NextResponse.json(
        { ok: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Basic env checks (helps with clear errors)
    if (!RPC_URL || !TOKEN_ADDRESS || !PAYOUT_PRIVATE_KEY || !PAYOUT_FROM_ADDRESS) {
      return NextResponse.json(
        { ok: false, error: 'Payout configuration incomplete on server' },
        { status: 500 }
      );
    }

    // --- Ethers payout flow (v6) ---
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const signer = new ethers.Wallet(PAYOUT_PRIVATE_KEY, provider);

    // sanity: signer must match configured from-address
    if (signer.address.toLowerCase() !== PAYOUT_FROM_ADDRESS.toLowerCase()) {
      return NextResponse.json(
        { ok: false, error: 'Signer address does not match PAYOUT_FROM_ADDRESS' },
        { status: 500 }
      );
    }

    const token = new ethers.Contract(TOKEN_ADDRESS, ERC20_ABI, signer);
    const amount = ethers.parseUnits(REWARD_AMOUNT.toString(), REWARD_DECIMALS);

    const tx = await token.transfer(wallet, amount);
    const receipt = await tx.wait();

    return NextResponse.json({
      ok: true,
      txHash: receipt?.hash ?? tx.hash,
      to: wallet,
      amount: REWARD_AMOUNT,
      decimals: REWARD_DECIMALS,
    });
  } catch (err: any) {
    console.error('payout error:', err);
    return NextResponse.json(
      { ok: false, error: err?.message || 'Server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Helpful hint if someone loads the endpoint in the browser
  return NextResponse.json({ ok: false, error: 'Use POST' }, { status: 405 });
}
