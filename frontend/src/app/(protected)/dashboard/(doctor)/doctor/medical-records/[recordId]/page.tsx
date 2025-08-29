import { redirect } from 'next/navigation';
import { getServerSession } from '@/lib/supabaseServer';
import { absoluteUrl, authHeaders } from '@/lib/request';
import { Card } from '@/components/ui/Card';

export default async function Page({ params }: { params: { recordId: string } }) {
  const { session } = await getServerSession();
  if (!session) redirect('/login');

  const res = await fetch(await absoluteUrl(`/api/medical-records/${params.recordId}`), { cache: 'no-store', headers: await authHeaders() });
  if (!res.ok) {
    if (res.status === 401) redirect('/login');
    if (res.status === 404) return <div>Historia clínica no encontrada</div>;
    throw new Error('Error cargando historia clínica');
  }
  const { record } = await res.json();

  return (
    <div className="space-y-3">
      <h1 className="text-xl font-semibold">Historia clínica</h1>
      <Card className="space-y-2">
        <div><span className="font-medium">Fecha:</span> {new Date(record.date).toLocaleDateString('es-AR')}</div>
        <div><span className="font-medium">Paciente:</span> {record.patient?.name}</div>
        <div><span className="font-medium">Diagnóstico:</span> {record.diagnosis}</div>
        <div><span className="font-medium">Tratamiento:</span> {record.treatment}</div>
        <div><span className="font-medium">Notas:</span> {record.notes}</div>
      </Card>
    </div>
  );
}


