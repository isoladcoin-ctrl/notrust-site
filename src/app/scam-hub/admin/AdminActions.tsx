'use client';

import { useState } from 'react';

type Props = {
  postId: string;
  adminKey: string;
  status?: string | null;
};

export default function AdminActions({ postId, adminKey, status }: Props) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const alreadyApproved = status === 'approved' || done;

  async function approve() {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/scam-hub/admin/approve?key=${encodeURIComponent(adminKey)}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: postId }),
        }
      );
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || 'Approve failed');
      setDone(true);
    } catch (e: any) {
      alert(e.message || 'Approve failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-3 flex items-center gap-3">
      <button
        type="button"
        onClick={approve}
        disabled={loading || alreadyApproved}
        className={`px-3 py-2 rounded-lg ${
          alreadyApproved
            ? 'bg-gray-600 cursor-not-allowed text-white/80'
            : 'bg-emerald-600 hover:bg-emerald-700 text-white'
        }`}
        title={alreadyApproved ? 'Already approved' : 'Approve this post'}
      >
        {alreadyApproved ? 'Approved' : loading ? 'Approving…' : 'Approve'}
      </button>
    </div>
  );
}
