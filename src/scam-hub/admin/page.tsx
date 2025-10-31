// src/app/scam-hub/admin/page.tsx

// Ensure this route is evaluated on every request (no static HTML)
export const dynamic = "force-dynamic";
export const revalidate = 0;

// Minimal helper for reading search params type-safely
type SearchParams = { [k: string]: string | string[] | undefined };

export default async function AdminPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  // Read ?key=... from URL
  const keyFromUrl =
    typeof searchParams?.key === "string" ? searchParams.key.trim() : "";

  // Scam Hub uses ADMIN_KEY (different from ADMIN_TOKEN used by roadmap)
  const adminKey = (process.env.ADMIN_KEY ?? "").trim();

  const authorized = adminKey.length > 0 && keyFromUrl === adminKey;

  if (!authorized) {
    // Server-render a simple unauthorized screen
    return (
      <main style={{ padding: 24 }}>
        <h1>Unauthorized</h1>
        <p>
          Use <code>/scam-hub/admin?key=YOUR_ADMIN_KEY</code>
        </p>
      </main>
    );
  }

  // ✅ Import the client component ONLY after authorization succeeds
  const AdminClient = (await import("./AdminClient")).default;
  return <AdminClient />;
}
