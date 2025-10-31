import { supabaseServer } from '@/lib/supabase';
export const metadata = { title: 'Scam Hub – Latest Scam Alerts & Experiences' };
export default async function ScamHubPage() {
  const sb = supabaseServer();
  const { data: posts, error } = await sb
    .from('posts')
    .select('*')
    .eq('status','approved')
    .order('created_at',{ascending:false})
    .limit(50);
 return (
    <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold">Scam Hub</h1>
      <p className="text-gray-500">Curated scam alerts worldwide + real user experiences.</p>
      <div className="grid md:grid-cols-2 gap-4">
        {(posts||[]).map((p:any) => (
          <article key={p.id} className="rounded-2xl border p-4 shadow-sm space-y-2">
            <div className="text-xs text-gray-500">
              {p.type} • {new Date(p.created_at).toLocaleDateString()}
            </div>
            <h3 className="text-lg font-semibold">{p.title}</h3>
            {p.summary && <p className="text-gray-700">{p.summary}</p>}
            {p.source_url && (
              <a className="text-blue-600 hover:underline" href={p.source_url} target="_blank" rel="noopener noreferrer">
                Read full story {p.source_domain ? `on ${p.source_domain}` : ''}
              </a>
            )}
          </article>
        ))}
      </div>
    </main>
  );
}
