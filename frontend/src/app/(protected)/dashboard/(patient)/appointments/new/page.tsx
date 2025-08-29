import { redirect } from 'next/navigation';
import { getServerSession } from '@/lib/supabaseServer';
import { absoluteUrl, authHeaders } from '@/lib/request';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default async function Page() {
  const { session } = await getServerSession();
  if (!session) redirect('/login');

  const doctorsRes = await fetch(await absoluteUrl('/api/doctors'), { cache: 'no-store', headers: await authHeaders() });
  if (!doctorsRes.ok) {
    if (doctorsRes.status === 401) redirect('/login');
    throw new Error('Error cargando doctores');
  }
  const { doctors } = await doctorsRes.json();

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Solicitar nuevo turno</h1>
      <Card>
        <form action="/api/appointments" method="post" className="space-y-3">
          <div className="space-y-1">
            <label className="block text-sm">Profesional</label>
            <select name="doctorId" className="border rounded p-2 w-full" required>
              <option value="">Seleccione un profesional</option>
              {doctors.map((d: any) => (
                <option key={d.id} value={d.id}>{d.name} ({d.email})</option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="block text-sm">Fecha y hora</label>
            <input className="border rounded p-2 w-full" type="datetime-local" name="datetime" required />
          </div>
          <Button type="submit" className="px-4" formAction={async (formData: FormData) => {
          'use server';
          const { getServerSession } = await import('@/lib/supabaseServer');
          const prisma = (await import('@/lib/prisma')).default;
          const { session } = await getServerSession();
          if (!session) return redirect('/login');

          const email = session.user.email ?? '';
          const prismaUser = await prisma.user.findUnique({ where: { email } }).catch(() => null);
          if (!prismaUser) return;

          const doctorId = String(formData.get('doctorId') || '');
          const datetime = String(formData.get('datetime') || '');
          if (!doctorId || !datetime) return;

          await prisma.appointment.create({
            data: {
              doctorId,
              patientId: prismaUser.id,
              datetime: new Date(datetime),
              status: 'pending',
            },
          });
          redirect('/dashboard/appointments');
        }}>Crear turno</Button>
        </form>
      </Card>
    </div>
  );
}


