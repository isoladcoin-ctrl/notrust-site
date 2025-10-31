// src/lib/kv.ts
import { kv } from "@vercel/kv";

export type ScamItem = {
  id: string;                  // uuid or any string
  title: string;
  address?: string;
  description?: string;
  status: "pending" | "approved" | "rejected" | "featured";
  createdAt: number;           // Date.now()
};

const KEY = "scamhub:items";   // list of item ids
const ITEM = (id: string) => `scamhub:item:${id}`;

export async function getAllIds(): Promise<string[]> {
  return (await kv.lrange<string>(KEY, 0, -1)) ?? [];
}

export async function getItem(id: string): Promise<ScamItem | null> {
  const obj = await kv.get<ScamItem>(ITEM(id));
  return obj ?? null;
}

export async function setItem(item: ScamItem) {
  await kv.set(ITEM(item.id), item);
  // ensure id is in list
  const ids = await getAllIds();
  if (!ids.includes(item.id)) {
    await kv.rpush(KEY, item.id);
  }
}

export async function deleteItem(id: string) {
  await kv.del(ITEM(id));
  await kv.lrem(KEY, 0, id);
}

export async function listItems(): Promise<ScamItem[]> {
  const ids = await getAllIds();
  const out: ScamItem[] = [];
  for (const id of ids) {
    const it = await getItem(id);
    if (it) out.push(it);
  }
  // newest first
  out.sort((a, b) => b.createdAt - a.createdAt);
  return out;
}
