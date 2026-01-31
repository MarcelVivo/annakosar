import { cookies } from 'next/headers';
import {
  createRouteHandlerClient,
  createServerComponentClient,
  createMiddlewareClient
} from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';

export const getSupabaseRouteClient = () =>
  createRouteHandlerClient({ cookies });

export const getSupabaseServerComponentClient = () =>
  createServerComponentClient({ cookies });

export const getSupabaseMiddlewareClient = (req: any, res: any) =>
  createMiddlewareClient({ req, res });

export const getSupabaseServiceRoleClient = () => {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) return null;
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: { autoRefreshToken: false, persistSession: false }
    }
  );
};
