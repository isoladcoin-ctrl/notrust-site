// src/app/scam-hub/submit/page.tsx
'use client';

import { useState } from 'react';

type FormState = {
  type: 'experience' | 'curation';
  title: string;
  summary: string;
  category: string;
  country: string;
  source_url: string;
  media_type: '' | 'youtube' | 'x' | 'image' | 'link';
  media_url: string;
  evidence_urls: string;        // space-separated in the UI; we’ll split it
  submitter_wallet: string;     // user types this
  submitter_email: string;      // user types this
};

export default function SubmitPage() {
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<FormState>({
    type: 'experience',
    title: '',
    summary: '',
    category: '',
    country: '',
    source_url: '',
    media_type: '',
    media_url: '',
    evidence_urls: '',
    submitter_wallet: '',
    submitter_email: ''
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      // Build the payload the API expects
      const payload = {
        type: form.type,
        title: form.title.trim(),
        summary: form.summary.trim(),
        category: form.category.trim(),
        country: form.country.trim(),
        source_url: form.source_url.trim(),
        media_type: form.media_type,
        media_url: form.media_url.trim(),
        evidence_urls: form.evidence_urls
          ? form.evidence_urls.trim().split(/\s+/)
          : [],
        // 👇 map UI fields to API fields
        wallet: form.submitter_wallet?.trim() || null,
        email: form.submitter_email?.trim() || null,
      };

      const res = await fetch('/api/scam-hub/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const msg = await res.text().catch(() => '');
        alert(`Submit failed (${res.status}): ${msg || 'Unknown error'}`);
        return;
        }
      setOk(true);
    } catch (err: any) {
      alert(`Submit error: ${err?.message || String(err)}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">Share a Scam Alert</h1>
      <p className="text-gray-500 mb-6">
        Post your experience (eligible for $NOTRUST on BSC) or share a trusted news link.
      </p>

      {ok ? (
        <div className="p-4 rounded-xl bg-green-50">
          Thanks! Your post is pending review.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <label className="block">
            <span className="text-sm font-medium">Type</span>
            <select
              className="w-full border rounded p-2"
              value={form.type}
              onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as FormState['type'] }))}
            >
              <option value="experience">Experience (eligible)</option>
              <option value="curation">Curation (external news link)</option>
            </select>
          </label>

          <input
            required
            className="w-full border rounded p-2"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          />

          <textarea
            className="w-full border rounded p-2"
            rows={4}
            placeholder="Summary"
            value={form.summary}
            onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              className="border rounded p-2"
              placeholder="Category (phishing, rug-pull, job-scam)"
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            />
            <input
              className="border rounded p-2"
              placeholder="Country (UK, US, NG...)"
              value={form.country}
              onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
            />
          </div>

          <input
            className="w-full border rounded p-2"
            placeholder="Source URL (for curated news)"
            value={form.source_url}
            onChange={(e) => setForm((f) => ({ ...f, source_url: e.target.value }))}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <select
              className="border rounded p-2"
              value={form.media_type}
              onChange={(e) => setForm((f) => ({ ...f, media_type: e.target.value as FormState['media_type'] }))}
            >
              <option value="">auto</option>
              <option value="youtube">YouTube</option>
              <option value="x">X (Twitter)</option>
              <option value="image">Image</option>
              <option value="link">Link</option>
            </select>

            <input
              className="border rounded p-2"
              placeholder="Media URL"
              value={form.media_url}
              onChange={(e) => setForm((f) => ({ ...f, media_url: e.target.value }))}
            />
          </div>

          <input
            className="w-full border rounded p-2"
            placeholder="Evidence URLs (space-separated)"
            value={form.evidence_urls}
            onChange={(e) => setForm((f) => ({ ...f, evidence_urls: e.target.value }))}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              className="border rounded p-2"
              placeholder="0x… BSC wallet (MetaMask)"
              value={form.submitter_wallet}
              onChange={(e) => setForm((f) => ({ ...f, submitter_wallet: e.target.value }))}
            />
            <input
              className="border rounded p-2"
              placeholder="Email (optional)"
              value={form.submitter_email}
              onChange={(e) => setForm((f) => ({ ...f, submitter_email: e.target.value }))}
            />
          </div>

          <button disabled={loading} className="px-4 py-2 rounded-xl bg-black text-white">
            {loading ? 'Submitting…' : 'Submit'}
          </button>
        </form>
      )}
    </main>
  );
}
