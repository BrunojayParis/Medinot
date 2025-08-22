"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import {
  Calendar,
  Stethoscope,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  MapPin
} from 'lucide-react';

export default function PatientDashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace('/login');
      return;
    }
    if (user.role !== 'patient') {
      router.replace('/dashboard');
    }
  }, [user, isLoading, router]);

  const upcomingAppointments = [
    {
      id: 1,
      doctor: 'Dra. María González',
      specialty: 'Cardiología',
      date: '2024-12-15',
      time: '14:30',
      status: 'confirmed',
      location: 'Consultorio 3 - Piso 2'
    },
    {
      id: 2,
      doctor: 'Dr. Carlos Rodríguez',
      specialty: 'Dermatología',
      date: '2024-12-20',
      time: '10:00',
      status: 'pending',
      location: 'Consultorio 1 - Piso 1'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          Mi Salud
        </h1>
        <p className="text-neutral-600 dark:text-neutral-300">
          Bienvenido/a a tu panel del paciente
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/dashboard/appointments">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <p className="font-semibold text-neutral-900 dark:text-neutral-100">Mis Turnos</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Consulta y gestiona tus citas</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/dashboard/medical-records">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-lg bg-accent-100 dark:bg-accent-900/20 flex items-center justify-center">
                <FileText className="w-6 h-6 text-accent-600" />
              </div>
              <div>
                <p className="font-semibold text-neutral-900 dark:text-neutral-100">Historia Clínica</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Revisa tu información médica</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/dashboard/doctors">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-lg bg-secondary-100 dark:bg-secondary-900/20 flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-secondary-600" />
              </div>
              <div>
                <p className="font-semibold text-neutral-900 dark:text-neutral-100">Profesionales</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Encuentra y agenda con especialistas</p>
              </div>
            </div>
          </Card>
        </Link>
      </div>

      {/* Upcoming appointments */}
      <Card title="Próximos Turnos">
        <div className="space-y-4">
          {upcomingAppointments.map(app => (
            <div key={app.id} className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
              <div className="flex items-center space-x-3">
                {getStatusIcon(app.status)}
                <div>
                  <p className="font-medium text-neutral-900 dark:text-neutral-100">
                    {app.doctor}
                  </p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {app.specialty} • {new Date(app.date).toLocaleDateString('es-ES')} {app.time}
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-neutral-600 dark:text-neutral-400">
                    <MapPin className="w-3 h-3" />
                    <span>{app.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Link href={`/dashboard/appointments`}>
                  <Button size="sm" variant="outline">Ver</Button>
                </Link>
                <Button size="sm">Reprogramar</Button>
              </div>
            </div>
          ))}

          {upcomingAppointments.length === 0 && (
            <div className="text-center py-6 text-neutral-600 dark:text-neutral-400">
              No tienes turnos próximos.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}


