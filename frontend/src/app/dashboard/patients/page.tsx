'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  Users,
  User,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Phone,
  Mail,
  Calendar,
  Heart,
  MapPin,
  XCircle,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [_filterSpecialty, _setFilterSpecialty] = useState('all');
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);

  const patients = [
    {
      id: 1,
      name: 'Juan Pérez',
      email: 'juan.perez@email.com',
      phone: '+54 9 11 1234-5678',
      dateOfBirth: '1985-03-15',
      gender: 'male',
      address: 'Av. Corrientes 1234, CABA',
      bloodType: 'O+',
      emergencyContact: {
        name: 'María Pérez',
        phone: '+54 9 11 1234-5679',
        relationship: 'Esposa'
      },
      status: 'active',
      lastVisit: '2024-12-01',
      nextAppointment: '2024-12-15',
      totalAppointments: 12,
      medicalConditions: ['Hipertensión', 'Diabetes tipo 2'],
      allergies: ['Penicilina'],
      medications: ['Metformina', 'Losartán'],
      notes: 'Paciente con buen control de la presión arterial. Mantener seguimiento mensual.'
    },
    {
      id: 2,
      name: 'María García',
      email: 'maria.garcia@email.com',
      phone: '+54 9 11 2345-6789',
      dateOfBirth: '1990-07-22',
      gender: 'female',
      address: 'Belgrano 567, CABA',
      bloodType: 'A+',
      emergencyContact: {
        name: 'Carlos García',
        phone: '+54 9 11 2345-6790',
        relationship: 'Hermano'
      },
      status: 'active',
      lastVisit: '2024-11-28',
      nextAppointment: '2024-12-20',
      totalAppointments: 8,
      medicalConditions: ['Dermatitis atópica'],
      allergies: ['Polen', 'Ácaros'],
      medications: ['Cremas tópicas'],
      notes: 'Mejora significativa en la dermatitis. Continuar con tratamiento tópico.'
    },
    {
      id: 3,
      name: 'Carlos López',
      email: 'carlos.lopez@email.com',
      phone: '+54 9 11 3456-7890',
      dateOfBirth: '1978-11-08',
      gender: 'male',
      address: 'Palermo 890, CABA',
      bloodType: 'B-',
      emergencyContact: {
        name: 'Ana López',
        phone: '+54 9 11 3456-7891',
        relationship: 'Hija'
      },
      status: 'inactive',
      lastVisit: '2024-10-15',
      nextAppointment: null,
      totalAppointments: 5,
      medicalConditions: ['Dolor en el pecho'],
      allergies: ['Ninguna'],
      medications: ['Aspirina'],
      notes: 'Paciente canceló última cita. Requiere seguimiento urgente.'
    },
    {
      id: 4,
      name: 'Ana Martínez',
      email: 'ana.martinez@email.com',
      phone: '+54 9 11 4567-8901',
      dateOfBirth: '2019-05-12',
      gender: 'female',
      address: 'Vicente López 234, CABA',
      bloodType: 'O+',
      emergencyContact: {
        name: 'Roberto Martínez',
        phone: '+54 9 11 4567-8902',
        relationship: 'Padre'
      },
      status: 'active',
      lastVisit: '2024-12-05',
      nextAppointment: '2024-12-16',
      totalAppointments: 3,
      medicalConditions: ['Fiebre recurrente'],
      allergies: ['Ninguna'],
      medications: ['Paracetamol'],
      notes: 'Niña de 5 años con fiebre recurrente. Evaluar causas subyacentes.'
    },
    {
      id: 5,
      name: 'Roberto Silva',
      email: 'roberto.silva@email.com',
      phone: '+54 9 11 5678-9012',
      dateOfBirth: '1965-12-03',
      gender: 'male',
      address: 'San Telmo 456, CABA',
      bloodType: 'AB+',
      emergencyContact: {
        name: 'Lucía Silva',
        phone: '+54 9 11 5678-9013',
        relationship: 'Hija'
      },
      status: 'active',
      lastVisit: '2024-11-20',
      nextAppointment: '2024-12-16',
      totalAppointments: 15,
      medicalConditions: ['Artritis', 'Hipertensión'],
      allergies: ['Sulfamidas'],
      medications: ['Ibuprofeno', 'Enalapril'],
      notes: 'Paciente post-operatorio de rodilla. Recuperación favorable.'
    }
  ];

  const _specialties = [] as string[];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'inactive':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'inactive':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Activo';
      case 'inactive':
        return 'Inactivo';
      case 'pending':
        return 'Pendiente';
      default:
        return 'Desconocido';
    }
  };

  const getGenderText = (gender: string) => {
    switch (gender) {
      case 'male':
        return 'Masculino';
      case 'female':
        return 'Femenino';
      case 'other':
        return 'Otro';
      default:
        return 'No especificado';
    }
  };

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.phone.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || patient.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (patient: any) => {
    setSelectedPatient(patient);
    setShowDetails(true);
  };

  const handleEditPatient = (patient: any) => {
    // TODO: Implement edit functionality
    console.log('Edit patient:', patient);
  };

  const handleDeletePatient = (patient: any) => {
    // TODO: Implement delete functionality
    console.log('Delete patient:', patient);
  };

  const handleNewAppointment = (patient: any) => {
    // TODO: Implement new appointment functionality
    console.log('New appointment for:', patient);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            Gestión de Pacientes
          </h1>
          <p className="text-neutral-600 dark:text-neutral-300">
            Administra la información de tus pacientes
          </p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Paciente
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Total Pacientes
              </p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                {patients.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Pacientes Activos
              </p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                {patients.filter(p => p.status === 'active').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Citas Hoy
              </p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                3
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Nuevos este Mes
              </p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                2
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <Input
                placeholder="Buscar por nombre, email o teléfono..."
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
              <option value="active">Activos</option>
              <option value="inactive">Inactivos</option>
              <option value="pending">Pendientes</option>
            </select>
            <Button variant="outline">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Patients List */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-700">
                <th className="text-left py-3 px-4 font-medium text-neutral-700 dark:text-neutral-300">
                  Paciente
                </th>
                <th className="text-left py-3 px-4 font-medium text-neutral-700 dark:text-neutral-300">
                  Contacto
                </th>
                <th className="text-left py-3 px-4 font-medium text-neutral-700 dark:text-neutral-300">
                  Edad/Género
                </th>
                <th className="text-left py-3 px-4 font-medium text-neutral-700 dark:text-neutral-300">
                  Estado
                </th>
                <th className="text-left py-3 px-4 font-medium text-neutral-700 dark:text-neutral-300">
                  Última Visita
                </th>
                <th className="text-left py-3 px-4 font-medium text-neutral-700 dark:text-neutral-300">
                  Próxima Cita
                </th>
                <th className="text-left py-3 px-4 font-medium text-neutral-700 dark:text-neutral-300">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="border-b border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div>
                        <p className="font-medium text-neutral-900 dark:text-neutral-100">
                          {patient.name}
                        </p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          ID: {patient.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-sm">
                        <Mail className="w-4 h-4 text-neutral-400" />
                        <span className="text-neutral-600 dark:text-neutral-400">
                          {patient.email}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Phone className="w-4 h-4 text-neutral-400" />
                        <span className="text-neutral-600 dark:text-neutral-400">
                          {patient.phone}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <p className="text-sm text-neutral-900 dark:text-neutral-100">
                        {calculateAge(patient.dateOfBirth)} años
                      </p>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {getGenderText(patient.gender)}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(patient.status)}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(patient.status)}`}>
                        {getStatusText(patient.status)}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-neutral-900 dark:text-neutral-100">
                    {patient.lastVisit ? new Date(patient.lastVisit).toLocaleDateString('es-ES') : 'N/A'}
                  </td>
                  <td className="py-4 px-4">
                    {patient.nextAppointment ? (
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-primary-600" />
                        <span className="text-sm text-neutral-900 dark:text-neutral-100">
                          {new Date(patient.nextAppointment).toLocaleDateString('es-ES')}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-neutral-500 dark:text-neutral-400">
                        Sin cita programada
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetails(patient)}
                        title="Ver detalles"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditPatient(patient)}
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleNewAppointment(patient)}
                        title="Nueva cita"
                      >
                        <Calendar className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeletePatient(patient)}
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

      {/* No Results */}
      {filteredPatients.length === 0 && (
        <Card className="text-center py-12">
          <Users className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
            No se encontraron pacientes
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            Intenta ajustar tus filtros de búsqueda
          </p>
        </Card>
      )}

      {/* Patient Details Modal */}
      {showDetails && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                Detalles del Paciente
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
              {/* Patient Header */}
              <div className="flex items-center space-x-4 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                    {selectedPatient.name}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    ID: {selectedPatient.id} • {calculateAge(selectedPatient.dateOfBirth)} años • {getGenderText(selectedPatient.gender)}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    {getStatusIcon(selectedPatient.status)}
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedPatient.status)}`}>
                      {getStatusText(selectedPatient.status)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Patient Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                    Información Personal
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-neutral-400" />
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">
                        {selectedPatient.email}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-neutral-400" />
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">
                        {selectedPatient.phone}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-neutral-400" />
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">
                        {selectedPatient.address}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-neutral-400" />
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">
                        Fecha de nacimiento: {new Date(selectedPatient.dateOfBirth).toLocaleDateString('es-ES')}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Heart className="w-4 h-4 text-neutral-400" />
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">
                        Grupo sanguíneo: {selectedPatient.bloodType}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Medical Information */}
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                    Información Médica
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        Condiciones médicas:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {selectedPatient.medicalConditions.map((condition: string, index: number) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400 rounded-full"
                          >
                            {condition}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        Alergias:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {selectedPatient.allergies.map((allergy: string, index: number) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400 rounded-full"
                          >
                            {allergy}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        Medicamentos actuales:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {selectedPatient.medications.map((medication: string, index: number) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded-full"
                          >
                            {medication}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div>
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                  Contacto de Emergencia
                </h3>
                <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900 dark:text-neutral-100">
                        {selectedPatient.emergencyContact.name}
                      </p>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {selectedPatient.emergencyContact.relationship}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="w-4 h-4 text-neutral-400" />
                    <span className="text-neutral-600 dark:text-neutral-400">
                      {selectedPatient.emergencyContact.phone}
                    </span>
                  </div>
                </div>
              </div>

              {/* Appointment History */}
              <div>
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                  Historial de Citas
                </h3>
                <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                        {selectedPatient.totalAppointments}
                      </p>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        Total de citas
                      </p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                        {selectedPatient.lastVisit ? new Date(selectedPatient.lastVisit).toLocaleDateString('es-ES') : 'N/A'}
                      </p>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        Última visita
                      </p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                        {selectedPatient.nextAppointment ? new Date(selectedPatient.nextAppointment).toLocaleDateString('es-ES') : 'N/A'}
                      </p>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        Próxima cita
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                  Notas Médicas
                </h3>
                <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4">
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {selectedPatient.notes}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-2 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                <Button variant="outline" onClick={() => setShowDetails(false)}>
                  Cerrar
                </Button>
                <Button variant="outline" onClick={() => handleNewAppointment(selectedPatient)}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Nueva Cita
                </Button>
                <Button onClick={() => handleEditPatient(selectedPatient)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Editar Paciente
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
} 