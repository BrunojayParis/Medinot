import DashboardShell, { DashboardNavItem } from '@/components/dashboard/DashboardShell';

const nav: DashboardNavItem[] = [
  { label: 'Inicio', href: '/dashboard/doctor', icon: 'home' },
  { label: 'Turnos', href: '/dashboard/doctor/appointments', icon: 'calendar' },
  { label: 'Pacientes', href: '/dashboard/doctor/patients', icon: 'users' },
  { label: 'Historias clínicas', href: '/dashboard/doctor/medical-records', icon: 'file' },
];

export default function DoctorLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell nav={nav} title="Panel del profesional">
      {children}
    </DashboardShell>
  );
}


