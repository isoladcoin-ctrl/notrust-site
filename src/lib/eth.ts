// src/lib/eth.ts
import { ethers } from 'ethers';

export const provider = new ethers.JsonRpcProvider(process.env.RPC_URL!);

export function getPayoutSigner() {
  const pk = process.env.PAYOUT_PRIVATE_KEY!;
  return new ethers.Wallet(pk, provider);
}

// Minimal ERC20 ABI (balance, decimals, transfer)
export const ERC20_ABI = [
  "function decimals() view returns (uint8)",
  "function balanceOf(address) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)"
];

export function tokenContract() {
  return new ethers.Contract(process.env.TOKEN_ADDRESS!, ERC20_ABI, getPayoutSigner());
}

export function toUnits(n: number) {
  const dec = Number(process.env.REWARD_DECIMALS || 18);
  return ethers.parseUnits(String(n), dec);
}
