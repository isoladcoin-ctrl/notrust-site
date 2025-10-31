'use client';

type Props = {
  postId: string;
  adminKey: string;
  wallet?: string | null;
};

export default function AdminActions(_props: Props) {
  // Rewards temporarily disabled site-wide.
  return (
    <button
      type="button"
      disabled
      title="Rewards are temporarily disabled"
      className="px-3 py-2 rounded-lg bg-purple-400 text-white opacity-60 cursor-not-allowed"
    >
      Send Reward (disabled)
    </button>
  );
}
