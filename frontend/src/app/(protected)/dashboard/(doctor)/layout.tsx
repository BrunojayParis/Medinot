import Link from 'next/link';

export default function DoctorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-12 gap-6">
      <aside className="col-span-12 md:col-span-3 lg:col-span-2 space-y-2">
        <nav className="space-y-1">
          <Link href="/dashboard/doctor" className="block">Inicio</Link>
          <Link href="/dashboard/doctor/appointments" className="block">Turnos</Link>
          <Link href="/dashboard/doctor/patients" className="block">Pacientes</Link>
          <Link href="/dashboard/doctor/medical-records" className="block">Historias clínicas</Link>
        </nav>
      </aside>
      <main className="col-span-12 md:col-span-9 lg:col-span-10">{children}</main>
    </div>
  );
}


