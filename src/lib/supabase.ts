// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

// env
const url = process.env.SUPABASE_URL!;
const anon = process.env.SUPABASE_ANON_KEY!;
const service = process.env.SUPABASE_SERVICE_ROLE!;

// Public client (browser-safe)
export const supabase = createClient(url, anon, {
  auth: { persistSession: false },
});

// Server-only client (bypasses RLS)
export const supabaseService = createClient(url, service, {
  auth: { persistSession: false },
});

// A tiny helper for server components (same as service but named for clarity)
export const supabaseServer = supabaseService;
