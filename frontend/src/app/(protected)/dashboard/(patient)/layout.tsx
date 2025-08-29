import DashboardShell, { DashboardNavItem } from '@/components/dashboard/DashboardShell';

const nav: DashboardNavItem[] = [
  { label: 'Inicio', href: '/dashboard/patient', icon: 'home' },
  { label: 'Mis turnos', href: '/dashboard/appointments', icon: 'calendar' },
  { label: 'Profesionales', href: '/dashboard/doctors', icon: 'users' },
  { label: 'Historia clínica', href: '/dashboard/medical-records', icon: 'file' },
];

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell nav={nav} title="Panel del paciente">
      {children}
    </DashboardShell>
  );
}


