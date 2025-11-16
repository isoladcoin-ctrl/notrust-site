// src/app/components/AboutMe.tsx
"use client";

import React from "react";

type AboutMeProps = {
  telegramUrl: string;
};

export default function AboutMe({ telegramUrl }: AboutMeProps) {
  return (
    <section className="border border-zinc-800 rounded-2xl p-6 md:p-8 bg-black/60 space-y-4">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
        About the Creator
      </h2>

      <p className="text-sm md:text-base text-zinc-200 leading-relaxed">
        I&apos;m building <span className="font-semibold">$NOTRUST</span> and the
        Scam Hub as a practical tool for founders and degen traders who are
        tired of getting rugged. I use real receipts, real patterns, and a
        builder-first lens to document scams and train the next wave of smarter
        survivors.
      </p>

      <p className="text-sm md:text-base text-zinc-300">
        This is a community-driven vision, and we welcome anyone who wants to contribute.
        If you align with the mission, join our Telegram. Help track scams, share receipts, 
        and keep someone else from repeating the same mistake.

        Founder.
      </p>

      <div className="pt-2">
        <a
          href={telegramUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-sky-500 hover:bg-sky-400 text-black font-semibold px-5 py-2 text-sm md:text-base transition-colors"
        >
          🚪 Join the Survivors (Telegram)
        </a>
      </div>
    </section>
  );
}
