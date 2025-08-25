import Link from 'next/link';

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-12 gap-6">
      <aside className="col-span-12 md:col-span-3 lg:col-span-2 space-y-2">
        <nav className="space-y-1">
          <Link href="/dashboard/patient" className="block">Inicio</Link>
          <Link href="/dashboard/appointments" className="block">Mis turnos</Link>
          <Link href="/dashboard/doctors" className="block">Profesionales</Link>
          <Link href="/dashboard/medical-records" className="block">Historia clínica</Link>
        </nav>
      </aside>
      <main className="col-span-12 md:col-span-9 lg:col-span-10">{children}</main>
    </div>
  );
}


