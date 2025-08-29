import { redirect } from 'next/navigation';
import { getServerSession } from '@/lib/supabaseServer';
import { absoluteUrl, authHeaders } from '@/lib/request';
import { Card } from '@/components/ui/Card';

export default async function Page({ params }: { params: { patientId: string } }) {
  const { session } = await getServerSession();
  if (!session) redirect('/login');

  const res = await fetch(await absoluteUrl(`/api/patients/${params.patientId}`), { cache: 'no-store', headers: await authHeaders() });
  if (!res.ok) {
    if (res.status === 401) redirect('/login');
    if (res.status === 404) return <div>Paciente no encontrado</div>;
    throw new Error('Error cargando paciente');
  }
  const { patient } = await res.json();

  return (
    <div className="space-y-3">
      <h1 className="text-xl font-semibold">Paciente</h1>
      <Card className="space-y-2">
        <div><span className="font-medium">Nombre:</span> {patient.name}</div>
        <div><span className="font-medium">Email:</span> {patient.email}</div>
        <div><span className="font-medium">ID:</span> {patient.id}</div>
      </Card>
    </div>
  );
}


