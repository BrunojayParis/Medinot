import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from '@/lib/supabaseServer';
import { absoluteUrl, authHeaders } from '@/lib/request';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default async function Page() {
  const { session } = await getServerSession();
  if (!session) redirect('/login');

  const res = await fetch(await absoluteUrl('/api/doctors'), { cache: 'no-store', headers: await authHeaders() });
  if (!res.ok) {
    if (res.status === 401) redirect('/login');
    throw new Error('Error cargando profesionales');
  }
  const { doctors } = await res.json();

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Profesionales</h1>
      {doctors?.length ? (
        <div className="grid grid-cols-1 gap-3">
          {doctors.map((d: any) => (
            <Card key={d.id} className="transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{d.name}</div>
                  <div className="text-sm text-gray-600">{d.email}</div>
                </div>
                <Link href={`/dashboard/doctors/${d.id}`}>
                  <Button size="sm" variant="outline">Ver</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-sm text-neutral-600">No hay profesionales.</Card>
      )}
    </div>
  );
}


