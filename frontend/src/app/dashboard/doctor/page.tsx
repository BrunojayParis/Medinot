"use client";
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import {
  Calendar,
  Users,
  FileText,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

export default function DoctorDashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [loadingData, setLoadingData] = useState(true);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace('/login');
      return;
    }
    if (user.role !== 'doctor') {
      router.replace('/dashboard');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      setLoadingData(true);
      setFetchError(null);
      try {
        const res = await fetch('/api/appointments');
        if (!res.ok) {
          const j = await res.json().catch(() => null);
          throw new Error(j?.error || 'Error obteniendo turnos');
        }
        const j = await res.json();
        setAppointments(Array.isArray(j.appointments) ? j.appointments : []);
      } catch (e: any) {
        setFetchError(e.message || 'Error inesperado');
      } finally {
        setLoadingData(false);
      }
    };
    fetchData();
  }, [user]);

  const doctorAppointments = useMemo(() => {
    return appointments.filter((a: any) => a.doctorId === user?.id);
  }, [appointments, user?.id]);

  const stats = [
    {
      title: 'Turnos Totales',
      value: String(doctorAppointments.length),
      change: '+0',
      changeType: 'positive',
      icon: Calendar,
      color: 'text-primary-600',
      bgColor: 'bg-primary-100 dark:bg-primary-900/20',
      to: '/dashboard/appointments'
    },
    {
      title: 'Pacientes Atendidos',
      value: String(new Set(doctorAppointments.map((a: any) => a.patientId)).size),
      change: '+0',
      changeType: 'positive',
      icon: Users,
      color: 'text-secondary-600',
      bgColor: 'bg-secondary-100 dark:bg-secondary-900/20',
      to: '/dashboard/patients'
    },
    {
      title: 'Historias Clínicas',
      value: '—',
      change: '+0',
      changeType: 'positive',
      icon: FileText,
      color: 'text-accent-600',
      bgColor: 'bg-accent-100 dark:bg-accent-900/20',
      to: '/dashboard/doctor/medical-records'
    },
    {
      title: 'Confirmados',
      value: String(doctorAppointments.filter((a: any) => a.status === 'confirmed').length),
      change: '+0%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
      to: '/dashboard/reports'
    }
  ];

  const recentAppointments = useMemo(() => {
    return doctorAppointments
      .slice()
      .sort((a: any, b: any) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime())
      .slice(0, 5);
  }, [doctorAppointments]);

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
          Dashboard del Doctor
        </h1>
        <p className="text-neutral-600 dark:text-neutral-300">
          Bienvenida de vuelta, Dr.{user?.name}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Link href={stat.to} key={index} >
            <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                  {stat.value}
                </p>
                <p className={`text-sm ${
                  stat.changeType === 'positive' 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {stat.change} desde ayer
                </p>
              </div>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Próximos Turnos">
          <div className="space-y-4">
            {loadingData && (
              <div className="text-center py-6 text-neutral-600 dark:text-neutral-400">Cargando turnos...</div>
            )}
            {fetchError && !loadingData && (
              <div className="text-center py-6 text-red-600 dark:text-red-400">{fetchError}</div>
            )}
            {!loadingData && !fetchError && recentAppointments.map((appointment: any) => (
              <div key={appointment.id} className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(appointment.status)}
                  <div>
                    <p className="font-medium text-neutral-900 dark:text-neutral-100">
                      {appointment.patient?.name ?? 'Paciente'}
                    </p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {new Date(appointment.datetime).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                      {' '}• {new Date(appointment.datetime).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  appointment.status === 'confirmed' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                  appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                  appointment.status === 'completed' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                  'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                }`}>
                  {appointment.status === 'confirmed' ? 'Confirmado' : 
                   appointment.status === 'pending' ? 'Pendiente' :
                   appointment.status === 'completed' ? 'Completado' : 'Cancelado'}
                </span>
              </div>
            ))}
            <Link href="/dashboard/doctor/appointments">
              <Button variant="outline" className="w-full" >
                Ver todos los turnos
              </Button>
              </Link>
          </div>
        </Card>

        <Card title="Actividad Reciente">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  Turno confirmado
                </p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  Juan Pérez - 09:00
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  Historia clínica actualizada
                </p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  María García - Hace 2 horas
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  Nuevo turno solicitado
                </p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  Carlos López - Mañana 14:00
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card title="Acciones Rápidas">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button variant="outline" className="h-20 flex-col space-y-2">
            <Calendar className="w-6 h-6" />
            <span>Nuevo Turno</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col space-y-2">
            <Users className="w-6 h-6" />
            <span>Nuevo Paciente</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col space-y-2">
            <FileText className="w-6 h-6" />
            <span>Historia Clínica</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col space-y-2">
            <TrendingUp className="w-6 h-6" />
            <span>Reportes</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}


