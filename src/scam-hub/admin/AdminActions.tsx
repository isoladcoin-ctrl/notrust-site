'use client';

import { useState } from 'react';

type Props = {
  postId: string;
  adminKey: string;
  wallet?: string | null; // not used while rewards are off
};

export default function AdminActions({ postId, adminKey }: Props) {
  const [approving, setApproving] = useState(false);
  const [approved, setApproved] = useState(false);

  async function handleApprove() {
    try {
      setApproving(true);
      const res = await fetch('/api/scam-hub/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: postId, key: adminKey }),
      });
      if (!res.ok) {
        const txt = await res.text().catch(() => '');
        throw new Error(txt || `HTTP ${res.status}`);
      }
      setApproved(true);
    } catch (err) {
      console.error('approve error:', err);
      alert('Approve failed. Check server logs.');
    } finally {
      setApproving(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      {/* Approve stays fully functional */}
      <button
        onClick={handleApprove}
        disabled={approving || approved}
        className={`px-3 py-2 rounded-lg text-white ${
          approved
            ? 'bg-gray-400 cursor-default'
            : 'bg-emerald-600 hover:bg-emerald-700'
        }`}
      >
        {approved ? 'Approved' : approving ? 'Approving…' : 'Approve'}
      </button>

      {/* Rewards intentionally disabled for now */}
      <button
        type="button"
        disabled
        title="Rewards are temporarily disabled"
        className="px-3 py-2 rounded-lg bg-purple-400 text-white opacity-60 cursor-not-allowed"
      >
        Send Reward (disabled)
      </button>
    </div>
  );
}
