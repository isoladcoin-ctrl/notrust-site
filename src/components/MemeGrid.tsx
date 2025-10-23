export default function MemeGrid() {
  const memes = [
    "/memes/meme1.png","/memes/meme2.png","/memes/meme3.png","/memes/meme4.png",
    "/memes/meme5.png","/memes/meme6.png","/memes/meme7.png","/memes/meme8.png","/memes/meme9.png",
    "/memes/meme10.png",
  ];

  return (
    <section id="meme-grid" className="p-6 md:p-12">
      <h2 className="text-3xl font-bold mb-2">Community Meme Wall 🧱</h2>
      <p className="text-white/70 mb-6">Learn from the LOLs. Verify before you ape.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {memes.map((src, i) => (
          <figure key={i} className="overflow-hidden rounded-xl border border-white/10 bg-zinc-950">
            {/* plain <img> is fine for /public files */}
            <img src={src} alt={`NOTRUST meme ${i + 1}`} className="w-full h-auto object-cover" />
            <figcaption className="p-3 text-sm text-white/80 border-t border-white/10">
              DYOR. Trust nobody. Verify everything.
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
