'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { 
  Calendar, 
  Clock, 
  User, 
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Stethoscope,
  MapPin,
  Phone,
  Mail,
  FileText,
  Eye
} from 'lucide-react';

export default function AppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);

  const appointments = [
    {
      id: 1,
      patient: 'Juan Pérez',
      patientEmail: 'juan.perez@email.com',
      patientPhone: '+54 9 11 1234-5678',
      doctor: 'Dr. María González',
      doctorEmail: 'maria.gonzalez@medinot.com',
      doctorPhone: '+54 9 11 9876-5432',
      date: '2024-12-15',
      time: '09:00',
      duration: 30,
      type: 'Consulta',
      status: 'confirmed',
      specialty: 'Cardiología',
      notes: 'Control de presión arterial. Paciente refiere dolores de cabeza ocasionales.',
      symptoms: 'Dolor de cabeza, fatiga',
      location: 'Consultorio 3 - Piso 2',
      price: 5000
    },
    {
      id: 2,
      patient: 'María García',
      patientEmail: 'maria.garcia@email.com',
      patientPhone: '+54 9 11 2345-6789',
      doctor: 'Dr. Carlos Rodríguez',
      doctorEmail: 'carlos.rodriguez@medinot.com',
      doctorPhone: '+54 9 11 8765-4321',
      date: '2024-12-15',
      time: '10:30',
      duration: 45,
      type: 'Control',
      status: 'pending',
      specialty: 'Dermatología',
      notes: 'Revisión de medicación para dermatitis atópica.',
      symptoms: 'Erupciones en la piel',
      location: 'Consultorio 1 - Piso 1',
      price: 3500
    },
    {
      id: 3,
      patient: 'Carlos López',
      patientEmail: 'carlos.lopez@email.com',
      patientPhone: '+54 9 11 3456-7890',
      doctor: 'Dr. María González',
      doctorEmail: 'maria.gonzalez@medinot.com',
      doctorPhone: '+54 9 11 9876-5432',
      date: '2024-12-15',
      time: '14:00',
      duration: 60,
      type: 'Emergencia',
      status: 'cancelled',
      specialty: 'Cardiología',
      notes: 'Dolor en el pecho. Paciente canceló por emergencia familiar.',
      symptoms: 'Dolor en el pecho, falta de aire',
      location: 'Consultorio 3 - Piso 2',
      price: 8000
    },
    {
      id: 4,
      patient: 'Ana Martínez',
      patientEmail: 'ana.martinez@email.com',
      patientPhone: '+54 9 11 4567-8901',
      doctor: 'Dra. Ana Martínez',
      doctorEmail: 'ana.martinez@medinot.com',
      doctorPhone: '+54 9 11 7654-3210',
      date: '2024-12-16',
      time: '16:30',
      duration: 30,
      type: 'Consulta',
      status: 'confirmed',
      specialty: 'Pediatría',
      notes: 'Primera consulta. Niño de 5 años con fiebre.',
      symptoms: 'Fiebre, tos',
      location: 'Consultorio 2 - Piso 1',
      price: 4000
    },
    {
      id: 5,
      patient: 'Roberto Silva',
      patientEmail: 'roberto.silva@email.com',
      patientPhone: '+54 9 11 5678-9012',
      doctor: 'Dr. Luis Fernández',
      doctorEmail: 'luis.fernandez@medinot.com',
      doctorPhone: '+54 9 11 6543-2109',
      date: '2024-12-16',
      time: '11:00',
      duration: 45,
      type: 'Control',
      status: 'confirmed',
      specialty: 'Ortopedia',
      notes: 'Control post-operatorio de rodilla.',
      symptoms: 'Dolor en rodilla derecha',
      location: 'Consultorio 4 - Piso 2',
      price: 4500
    }
  ];

  const appointmentTypes = [
    'Consulta',
    'Control',
    'Emergencia',
    'Seguimiento',
    'Examen'
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-blue-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmado';
      case 'pending':
        return 'Pendiente';
      case 'cancelled':
        return 'Cancelado';
      case 'completed':
        return 'Completado';
      default:
        return 'Desconocido';
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus;
    const matchesType = filterType === 'all' || appointment.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleViewDetails = (appointment: any) => {
    setSelectedAppointment(appointment);
    setShowDetails(true);
  };

  const handleEditAppointment = (appointment: any) => {
    // TODO: Implement edit functionality
    console.log('Edit appointment:', appointment);
  };

  const handleCancelAppointment = (appointment: any) => {
    // TODO: Implement cancel functionality
    console.log('Cancel appointment:', appointment);
  };

  const handleDeleteAppointment = (appointment: any) => {
    // TODO: Implement delete functionality
    console.log('Delete appointment:', appointment);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            Gestión de Turnos
          </h1>
          <p className="text-neutral-600 dark:text-neutral-300">
            Administra las citas médicas de forma eficiente
          </p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <Button
            variant={viewMode === 'list' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            Lista
          </Button>
          <Button
            variant={viewMode === 'calendar' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setViewMode('calendar')}
          >
            Calendario
          </Button>
          <Button className="ml-2">
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Turno
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <Input
                placeholder="Buscar paciente, doctor o especialidad..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-dark-surface text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">Todos los estados</option>
              <option value="confirmed">Confirmados</option>
              <option value="pending">Pendientes</option>
              <option value="cancelled">Cancelados</option>
              <option value="completed">Completados</option>
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-dark-surface text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">Todos los tipos</option>
              {appointmentTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <Button variant="outline">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Appointments List */}
      {viewMode === 'list' && (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-700">
                  <th className="text-left py-3 px-4 font-medium text-neutral-700 dark:text-neutral-300">
                    Paciente
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-neutral-700 dark:text-neutral-300">
                    Doctor
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-neutral-700 dark:text-neutral-300">
                    Fecha
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-neutral-700 dark:text-neutral-300">
                    Hora
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-neutral-700 dark:text-neutral-300">
                    Tipo
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-neutral-700 dark:text-neutral-300">
                    Estado
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-neutral-700 dark:text-neutral-300">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment.id} className="border-b border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                        </div>
                        <div>
                          <p className="font-medium text-neutral-900 dark:text-neutral-100">
                            {appointment.patient}
                          </p>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            {appointment.specialty}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Stethoscope className="w-4 h-4 text-secondary-600" />
                        <span className="text-neutral-900 dark:text-neutral-100">
                          {appointment.doctor}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-neutral-900 dark:text-neutral-100">
                      {new Date(appointment.date).toLocaleDateString('es-ES')}
                    </td>
                    <td className="py-4 px-4 text-neutral-900 dark:text-neutral-100">
                      {appointment.time}
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full">
                        {appointment.type}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(appointment.status)}
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                          {getStatusText(appointment.status)}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetails(appointment)}
                          title="Ver detalles"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditAppointment(appointment)}
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCancelAppointment(appointment)}
                          title="Cancelar"
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteAppointment(appointment)}
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Calendar View */}
      {viewMode === 'calendar' && (
        <Card>
          <div className="p-6 text-center">
            <Calendar className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
              Vista de Calendario
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              La vista de calendario estará disponible próximamente
            </p>
            <Button onClick={() => setViewMode('list')}>
              Volver a Lista
            </Button>
          </div>
        </Card>
      )}

      {/* No Results */}
      {filteredAppointments.length === 0 && (
        <Card className="text-center py-12">
          <Calendar className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
            No se encontraron turnos
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            Intenta ajustar tus filtros de búsqueda
          </p>
        </Card>
      )}

      {/* Appointment Details Modal */}
      {showDetails && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                Detalles del Turno
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDetails(false)}
              >
                <XCircle className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-6">
              {/* Appointment Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                    Información del Turno
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-neutral-400" />
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">
                        {new Date(selectedAppointment.date).toLocaleDateString('es-ES', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-neutral-400" />
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">
                        {selectedAppointment.time} ({selectedAppointment.duration} min)
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-neutral-400" />
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">
                        {selectedAppointment.location}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedAppointment.status)}`}>
                        {getStatusText(selectedAppointment.status)}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                    Información Médica
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Stethoscope className="w-4 h-4 text-neutral-400" />
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">
                        {selectedAppointment.specialty}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-neutral-400" />
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">
                        {selectedAppointment.type}
                      </span>
                    </div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">
                      <strong>Síntomas:</strong> {selectedAppointment.symptoms}
                    </div>
                  </div>
                </div>
              </div>

              {/* Patient Info */}
              <div>
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                  Información del Paciente
                </h3>
                <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900 dark:text-neutral-100">
                        {selectedAppointment.patient}
                      </p>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        Paciente
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-neutral-400" />
                      <span className="text-neutral-600 dark:text-neutral-400">
                        {selectedAppointment.patientEmail}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-neutral-400" />
                      <span className="text-neutral-600 dark:text-neutral-400">
                        {selectedAppointment.patientPhone}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Doctor Info */}
              <div>
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                  Información del Doctor
                </h3>
                <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-secondary-100 dark:bg-secondary-900 rounded-full flex items-center justify-center">
                      <Stethoscope className="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900 dark:text-neutral-100">
                        {selectedAppointment.doctor}
                      </p>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {selectedAppointment.specialty}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-neutral-400" />
                      <span className="text-neutral-600 dark:text-neutral-400">
                        {selectedAppointment.doctorEmail}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-neutral-400" />
                      <span className="text-neutral-600 dark:text-neutral-400">
                        {selectedAppointment.doctorPhone}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                  Notas
                </h3>
                <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4">
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {selectedAppointment.notes}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-2 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                <Button variant="outline" onClick={() => setShowDetails(false)}>
                  Cerrar
                </Button>
                <Button onClick={() => handleEditAppointment(selectedAppointment)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Editar Turno
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}