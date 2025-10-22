export default function Marquee() {
  return (
    <>
      <section
        aria-label="warning-tape"
        className="relative overflow-hidden border-y border-white/10 bg-black"
      >
        <div className="whitespace-nowrap py-3 animate-[tape_18s_linear_infinite] text-[#FFFF00] font-semibold">
          <span className="mx-6">🚨 DO NOT TRUST — VERIFY EVERYTHING — DYOR — NO TRUST 🛡️</span>
          <span className="mx-6">🚨 DO NOT TRUST — VERIFY EVERYTHING — DYOR — NO TRUST 🛡️</span>
          <span className="mx-6">🚨 DO NOT TRUST — VERIFY EVERYTHING — DYOR — NO TRUST 🛡️</span>
        </div>
      </section>

      {/* keyframes (scoped here for convenience) */}
      <style>{`@keyframes tape{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
    </>
  );
}
