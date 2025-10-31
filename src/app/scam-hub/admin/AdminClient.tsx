"use client";

import React from "react";

export default function AdminClient() {
  // put your real admin UI here (tables, forms, buttons, etc.)
  return (
    <main className="container mx-auto px-6 py-10 space-y-6">
      <h1 className="text-3xl font-bold">Scam Hub Admin</h1>
      <p className="text-zinc-400">Protected admin loaded. Build your tools here.</p>

      {/* Example placeholder actions */}
      <div className="mt-6 rounded-xl border border-zinc-800 p-4">
        <p className="text-sm text-zinc-300">This is where your admin controls go.</p>
      </div>
    </main>
  );
}
