// src/app/scanner/page.tsx
import Scanner from "@/components/Scanner"; // or "@/components/scanner" if lowercase

export default function ScannerPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Scanner />
      </div>
    </main>
  );
}
