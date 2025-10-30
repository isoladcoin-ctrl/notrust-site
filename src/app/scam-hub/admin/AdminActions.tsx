// src/app/scam-hub/admin/AdminActions.tsx
'use client';

import { useState } from 'react';

type Props = {
  postId: string;
  adminKey: string;
  wallet?: string | null;
  status?: string | null;        // 'pending' | 'approved' | 'rewarded' | ...
  rewarded_at?: string | null;   // ISO string or null
};

export default function AdminActions({
  postId,
  adminKey,
  wallet = null,
  status = null,
  rewarded_at = null,
}: Props) {
  const [busy, setBusy] = useState<'approve' | 'reward' | null>(null);
  const [msg, setMsg] = useState<string>('');

  // Client-side flag to render/hide the reward UI
  const rewardsOn = process.env.NEXT_PUBLIC_REWARDS_ENABLED === 'true';

  async function doApprove() {
    try {
      setBusy('approve');
      setMsg('');
      const res = await fetch('/api/scam-hub/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: postId, key: adminKey }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error(data?.error || 'Approve failed');
      setMsg('Approved ✅');
      // Optional: refresh the page
      window.location.reload();
    } catch (e: any) {
      setMsg(e?.message || 'Approve error');
    } finally {
      setBusy(null);
    }
  }

  async function doReward() {
    try {
      setBusy('reward');
      setMsg('');
      const res = await fetch('/api/scam-hub/payout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet, key: adminKey }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error(data?.error || 'Payout failed');
      setMsg(`Reward sent ✅ tx: ${String(data.txHash).slice(0, 12)}...`);
      // Optional: refresh to reflect rewarded state
      window.location.reload();
    } catch (e: any) {
      setMsg(e?.message || 'Reward error');
    } finally {
      setBusy(null);
    }
  }

  const alreadyRewarded = Boolean(rewarded_at) || status === 'rewarded';
  const canApprove = status !== 'approved';
  const canReward =
    rewardsOn && !alreadyRewarded && status === 'approved' && Boolean(wallet);

  return (
    <div className="flex items-center gap-3">
      {/* Approve button (always visible) */}
      <button
        onClick={doApprove}
        disabled={!canApprove || busy !== null}
        className={`px-4 py-2 rounded-md text-white ${
          !canApprove || busy
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-emerald-600 hover:bg-emerald-700'
        }`}
      >
        {busy === 'approve' ? 'Approving…' : 'Approve'}
      </button>

      {/* Reward button: hidden completely if rewards are disabled */}
      {rewardsOn && (
        <button
          onClick={doReward}
          disabled={!canReward || busy !== null}
          className={`px-4 py-2 rounded-md text-white ${
            !canReward || busy
              ? 'bg-purple-300 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700'
          }`}
          title={
            !rewardsOn
              ? 'Rewards disabled'
              : alreadyRewarded
              ? 'Already rewarded'
              : status !== 'approved'
              ? 'Approve first'
              : !wallet
              ? 'No wallet on this post'
              : ''
          }
        >
          {busy === 'reward' ? 'Sending…' : 'Send Reward'}
        </button>
      )}

      {/* Tiny status message */}
      {msg && <span className="text-sm text-gray-500">{msg}</span>}
      {alreadyRewarded && (
        <span className="text-xs px-2 py-1 rounded bg-emerald-100 text-emerald-700">
          Rewarded
        </span>
      )}
      {status === 'approved' && !alreadyRewarded && (
        <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700">
          Approved
        </span>
      )}
    </div>
  );
}
