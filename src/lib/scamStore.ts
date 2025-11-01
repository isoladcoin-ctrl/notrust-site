// src/lib/scamStore.ts
export type ScamItem = {
  id: string;
  title: string;
  address?: string;
  description?: string;
  status: "pending" | "approved" | "rejected" | "featured";
  createdAt: number;
};

// A single global map that survives HMR in dev
const g = globalThis as unknown as { __SCAM_STORE?: Map<string, ScamItem> };
if (!g.__SCAM_STORE) g.__SCAM_STORE = new Map<string, ScamItem>();
export const store = g.__SCAM_STORE!;

export function list(): ScamItem[] {
  return Array.from(store.values()).sort((a, b) => b.createdAt - a.createdAt);
}

export function put(item: ScamItem) {
  store.set(item.id, item);
}

export function setStatus(id: string, status: ScamItem["status"]) {
  const it = store.get(id);
  if (!it) return false;
  it.status = status;
  return true;
}

export function hardDelete(id: string) {
  return store.delete(id);
}

export function seed(n = 5) {
  for (let i = 1; i <= n; i++) {
    const id = crypto.randomUUID();
    put({
      id,
      title: `Demo #${i}`,
      address: `0x${(Math.random() * 1e16).toString(16).padStart(16, "0")}`,
      description: "Seeded example item.",
      status: "pending",
      createdAt: Date.now() - i * 1000,
    });
  }
}
