// src/app/scam-hub/admin/page.tsx

// Ensure this route is evaluated on every request (no static HTML)
export const dynamic = "force-dynamic";
export const revalidate = 0;

import AdminClient from "../../app/scam-hub/admin/AdminClient";
 // ✅ correct import

type SearchParams = Record<string, string | string[] | undefined>;

interface AdminPageProps {
  searchParams?: SearchParams;
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const keyRaw = searchParams?.key;
  const keyFromUrl = typeof keyRaw === "string" ? keyRaw.trim() : "";

  const adminKey = (process.env.ADMIN_KEY ?? "").trim();

  const authorized = adminKey.length > 0 && keyFromUrl === adminKey;

  if (!authorized) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Unauthorized</h1>
        <p>
          Use <code>/scam-hub/admin?key=YOUR_ADMIN_KEY</code>
        </p>
      </main>
    );
  }

  return <AdminClient />;
}
