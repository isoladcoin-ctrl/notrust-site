export default function MemeGrid() {
  const memes = [
    "/memes/meme1.jpg","/memes/meme2.jpg","/memes/meme3.jpg","/memes/meme4.jpg",
    "/memes/meme5.jpg","/memes/meme6.jpg","/memes/meme7.jpg","/memes/meme8.jpg","/memes/meme9.jpg",
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
