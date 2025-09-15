import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { absoluteUrl } from '@/lib/request';

export default async function PublicNewAppointmentPage() {
  const doctorsRes = await fetch(await absoluteUrl('/api/doctors'), { cache: 'no-store' });
  if (!doctorsRes.ok) {
    throw new Error('Error cargando doctores');
  }
  const { doctors } = await doctorsRes.json();

  async function createPublicAppointment(formData: FormData) {
    'use server';
    const doctorId = String(formData.get('doctorId') || '');
    const datetime = String(formData.get('datetime') || '');
    const name = String(formData.get('name') || '');
    const email = String(formData.get('email') || '');
    if (!doctorId || !datetime || !name || !email) return;

    await fetch(await absoluteUrl('/api/public/appointments'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ doctorId, datetime, name, email }),
    });

    redirect('/login?afterBooking=1');
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4 p-4">
      <h1 className="text-xl font-semibold">Solicitar nuevo turno</h1>
      <Card className="p-4">
        <form action={createPublicAppointment} className="space-y-3">
          <div className="space-y-1">
            <label className="block text-sm">Profesional</label>
            <select name="doctorId" className="border rounded p-2 w-full" required>
              <option value="">Seleccione un profesional</option>
              {doctors?.map((d: any) => (
                <option key={d.id} value={d.id}>{d.name} ({d.email})</option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="block text-sm">Fecha y hora</label>
            <input className="border rounded p-2 w-full" type="datetime-local" name="datetime" required />
          </div>
          <div className="space-y-1">
            <label className="block text-sm">Tu nombre</label>
            <input className="border rounded p-2 w-full" type="text" name="name" required />
          </div>
          <div className="space-y-1">
            <label className="block text-sm">Tu email</label>
            <input className="border rounded p-2 w-full" type="email" name="email" required />
          </div>
          <div className="flex items-center gap-2">
            <Button type="submit" className="px-4">Solicitar turno</Button>
            <Link href="/" className="text-sm text-neutral-600">Cancelar</Link>
          </div>
        </form>
      </Card>
    </div>
  );
}


