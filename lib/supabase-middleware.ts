import { createClient } from '@supabase/supabase-js';
import { NextRequest } from 'next/server';

export function createSupabaseMiddlewareClient(req: NextRequest) {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Cookie: req.headers.get('cookie') ?? '',
        },
      },
    }
  );
}
