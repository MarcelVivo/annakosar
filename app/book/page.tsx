import MyAppointments from './my-appointments';

export default async function BookPage() {
  return (
    <div className="container-width py-10">
      <h1 className="text-3xl font-semibold mb-6">Termin buchen</h1>
      <MyAppointments />
    </div>
  );
}
