import { cookies, headers } from 'next/headers';
import { createBrowserClient, createServerClient, type CookieOptions } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const createCookieAdapter = (cookieStore: ReturnType<typeof cookies>) => ({
  get(name: string) {
    return cookieStore.get(name)?.value;
  },
  set(name: string, value: string, options: CookieOptions) {
    cookieStore.set({ name, value, ...options });
  },
  remove(name: string, options: CookieOptions) {
    cookieStore.set({ name, value: '', ...options, maxAge: 0 });
  }
});

export const getSupabaseBrowserClient = () =>
  createBrowserClient(supabaseUrl, supabaseAnonKey);

export const getSupabaseRouteClient = () =>
  createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: createCookieAdapter(cookies()),
    headers: {
      get(name: string) {
        return headers().get(name) ?? undefined;
      }
    }
  });

export const getSupabaseServerComponentClient = () =>
  createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: createCookieAdapter(cookies()),
    headers: {
      get(name: string) {
        return headers().get(name) ?? undefined;
      }
    }
  });

export const getSupabaseServiceRoleClient = () => {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) return null;
  return createClient(
    supabaseUrl,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: { autoRefreshToken: false, persistSession: false }
    }
  );
};
