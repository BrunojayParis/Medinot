import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from '@/lib/supabaseServer';
import { absoluteUrl, authHeaders } from '@/lib/request';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default async function Page() {
  const { session } = await getServerSession();
  if (!session) redirect('/login');

  const res = await fetch(await absoluteUrl('/api/medical-records'), { cache: 'no-store', headers: await authHeaders() });
  if (!res.ok) {
    if (res.status === 401) redirect('/login');
    throw new Error('Error cargando historias clínicas');
  }
  const { records } = await res.json();

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Historias clínicas</h1>
      {records?.length ? (
        <div className="grid grid-cols-1 gap-3">
          {records.map((r: any) => (
            <Card key={r.id} className="transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{new Date(r.date).toLocaleDateString('es-AR')}</div>
                  <div className="text-sm text-gray-600">Paciente: {r.patient?.name}</div>
                </div>
                <Link href={`/dashboard/doctor/medical-records/${r.id}`}>
                  <Button size="sm" variant="outline">Ver</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-sm text-neutral-600">No hay historias clínicas.</Card>
      )}
    </div>
  );
}


