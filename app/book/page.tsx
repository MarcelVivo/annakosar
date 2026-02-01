import { createSupabaseServerClient } from '@/lib/supabase-server'

export default async function BookPage() {
  const supabase = createSupabaseServerClient()

  const { data } = await supabase
    .from('appointments')
    .select('*')

  return (
    <div>
      <h1>Termin buchen</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}