import { createSupabaseServerClient } from '@/lib/supabase-server'

export default async function DashboardPage() {
  const supabase = createSupabaseServerClient()

  const { data, error } = await supabase
    .from('appointments')
    .select('*')

  if (error) {
    return (
      <div>
        <h1>Dashboard</h1>
        <p>Fehler: {error.message}</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
};