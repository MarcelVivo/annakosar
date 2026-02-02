import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import MyAppointments from './my-appointments';

export default async function BookPage() {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="container-width py-10">
      <h1 className="text-3xl font-semibold mb-6">Termin buchen</h1>
      <MyAppointments userId={user.id} />
    </div>
  );
}
