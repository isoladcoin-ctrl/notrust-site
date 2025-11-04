// src/supabase.ts
import { createClient } from '@supabase/supabase-js';

// Use these factories INSIDE your route/page functions only.
// Do NOT create clients at module top-level (that triggers at build time).

export function supabaseServer() {
  const url = process.env.SUPABASE_URL;
  const anon = process.env.SUPABASE_ANON_KEY;
  if (!url || !anon) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_ANON_KEY');
  }
  return createClient(url, anon, { auth: { persistSession: false } });
}

export function supabaseService() {
  const url = process.env.SUPABASE_URL;
  const service = process.env.SUPABASE_SERVICE_ROLE;
  if (!url || !service) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE');
  }
  return createClient(url, service, { auth: { persistSession: false } });
}
