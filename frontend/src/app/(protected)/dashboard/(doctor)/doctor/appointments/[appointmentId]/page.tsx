import { redirect } from 'next/navigation';
import { getServerSession } from '@/lib/supabaseServer';
import { absoluteUrl, authHeaders } from '@/lib/request';
import { Card } from '@/components/ui/Card';

export default async function Page({ params }: { params: { appointmentId: string } }) {
  const { session } = await getServerSession();
  if (!session) redirect('/login');

  const res = await fetch(await absoluteUrl(`/api/appointments/${params.appointmentId}`), { cache: 'no-store', headers: await authHeaders() });
  if (!res.ok) {
    if (res.status === 401) redirect('/login');
    if (res.status === 404) return (
      <div className="space-y-2">
        <h1 className="text-xl font-semibold">Turno no encontrado</h1>
      </div>
    );
    throw new Error('Error cargando turno');
  }
  const { appointment } = await res.json();

  return (
    <div className="space-y-3">
      <h1 className="text-xl font-semibold">Detalle del turno</h1>
      <Card className="space-y-2">
        <div><span className="font-medium">Fecha:</span> {new Date(appointment.datetime).toLocaleString('es-AR')}</div>
        <div><span className="font-medium">Estado:</span> {appointment.status}</div>
        <div><span className="font-medium">Doctor:</span> {appointment.doctor?.name}</div>
        <div><span className="font-medium">Paciente:</span> {appointment.patient?.name}</div>
      </Card>
    </div>
  );
}


