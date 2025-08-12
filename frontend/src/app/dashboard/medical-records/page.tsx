'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  FileText,
  User,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Stethoscope,
  Pill,
  Heart,
  Activity,
  Download,
  Upload,
  Printer,
  AlertCircle,
  CheckCircle,
  Clock,
  Phone,
  Mail
} from 'lucide-react';

export default function MedicalRecordsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPatient, setFilterPatient] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);

  const medicalRecords = [
    {
      id: 1,
      patientId: 1,
      patientName: 'Juan Pérez',
      patientEmail: 'juan.perez@email.com',
      patientPhone: '+54 9 11 1234-5678',
      doctorId: 1,
      doctorName: 'Dr. María González',
      doctorSpecialty: 'Cardiología',
      appointmentId: 1,
      date: '2024-12-01',
      diagnosis: 'Hipertensión arterial controlada',
      symptoms: ['Dolor de cabeza', 'Fatiga', 'Presión elevada'],
      treatment: 'Mantener medicación actual y control de presión arterial',
      prescription: [
        {
          id: 1,
          medication: 'Losartán',
          dosage: '50mg',
          frequency: '1 vez al día',
          duration: '30 días',
          instructions: 'Tomar por la mañana con el desayuno'
        },
        {
          id: 2,
          medication: 'Metformina',
          dosage: '500mg',
          frequency: '2 veces al día',
          duration: '30 días',
          instructions: 'Tomar con las comidas principales'
        }
      ],
      vitalSigns: {
        bloodPressure: '130/85 mmHg',
        heartRate: '72 bpm',
        temperature: '36.8°C',
        weight: '75 kg',
        height: '175 cm'
      },
      notes: 'Paciente presenta mejor control de la presión arterial. Mantener seguimiento mensual. Recomendar dieta baja en sodio y ejercicio regular.',
      followUpDate: '2024-12-15',
      status: 'completed',
      attachments: ['analisis_sangre.pdf', 'ecg_resultado.pdf']
    },
    {
      id: 2,
      patientId: 2,
      patientName: 'María García',
      patientEmail: 'maria.garcia@email.com',
      patientPhone: '+54 9 11 2345-6789',
      doctorId: 2,
      doctorName: 'Dr. Carlos Rodríguez',
      doctorSpecialty: 'Dermatología',
      appointmentId: 2,
      date: '2024-11-28',
      diagnosis: 'Dermatitis atópica en mejora',
      symptoms: ['Erupciones en la piel', 'Picazón', 'Enrojecimiento'],
      treatment: 'Continuar con tratamiento tópico y evitar factores desencadenantes',
      prescription: [
        {
          id: 3,
          medication: 'Hidrocortisona 1%',
          dosage: 'Crema',
          frequency: '2 veces al día',
          duration: '14 días',
          instructions: 'Aplicar en las zonas afectadas'
        },
        {
          id: 4,
          medication: 'Cetirizina',
          dosage: '10mg',
          frequency: '1 vez al día',
          duration: '7 días',
          instructions: 'Tomar por la noche'
        }
      ],
      vitalSigns: {
        bloodPressure: '120/80 mmHg',
        heartRate: '68 bpm',
        temperature: '36.5°C',
        weight: '60 kg',
        height: '165 cm'
      },
      notes: 'Significativa mejora en la dermatitis. Las erupciones han disminuido notablemente. Continuar con el tratamiento y evitar contacto con alérgenos.',
      followUpDate: '2024-12-20',
      status: 'completed',
      attachments: ['biopsia_piel.pdf']
    },
    {
      id: 3,
      patientId: 3,
      patientName: 'Carlos López',
      patientEmail: 'carlos.lopez@email.com',
      patientPhone: '+54 9 11 3456-7890',
      doctorId: 1,
      doctorName: 'Dr. María González',
      doctorSpecialty: 'Cardiología',
      appointmentId: 3,
      date: '2024-10-15',
      diagnosis: 'Dolor torácico de origen musculoesquelético',
      symptoms: ['Dolor en el pecho', 'Falta de aire', 'Ansiedad'],
      treatment: 'Tratamiento conservador y seguimiento cardiológico',
      prescription: [
        {
          id: 5,
          medication: 'Aspirina',
          dosage: '100mg',
          frequency: '1 vez al día',
          duration: '30 días',
          instructions: 'Tomar por la mañana'
        }
      ],
      vitalSigns: {
        bloodPressure: '140/90 mmHg',
        heartRate: '85 bpm',
        temperature: '37.0°C',
        weight: '80 kg',
        height: '180 cm'
      },
      notes: 'Paciente canceló última cita. Requiere seguimiento urgente para evaluar evolución del dolor torácico. Considerar estudios adicionales.',
      followUpDate: null,
      status: 'pending',
      attachments: ['radiografia_torax.pdf', 'ecg_urgencia.pdf']
    },
    {
      id: 4,
      patientId: 4,
      patientName: 'Ana Martínez',
      patientEmail: 'ana.martinez@email.com',
      patientPhone: '+54 9 11 4567-8901',
      doctorId: 3,
      doctorName: 'Dra. Ana Martínez',
      doctorSpecialty: 'Pediatría',
      appointmentId: 4,
      date: '2024-12-05',
      diagnosis: 'Fiebre recurrente de origen viral',
      symptoms: ['Fiebre', 'Tos', 'Decaimiento'],
      treatment: 'Tratamiento sintomático y observación',
      prescription: [
        {
          id: 6,
          medication: 'Paracetamol',
          dosage: '250mg',
          frequency: 'Cada 6 horas',
          duration: '5 días',
          instructions: 'Solo si hay fiebre mayor a 38°C'
        }
      ],
      vitalSigns: {
        bloodPressure: '90/60 mmHg',
        heartRate: '95 bpm',
        temperature: '38.2°C',
        weight: '18 kg',
        height: '110 cm'
      },
      notes: 'Niña de 5 años con fiebre recurrente. Evaluar causas subyacentes. Mantener hidratación adecuada y reposo.',
      followUpDate: '2024-12-16',
      status: 'completed',
      attachments: ['analisis_sangre_nino.pdf']
    },
    {
      id: 5,
      patientId: 5,
      patientName: 'Roberto Silva',
      patientEmail: 'roberto.silva@email.com',
      patientPhone: '+54 9 11 5678-9012',
      doctorId: 4,
      doctorName: 'Dr. Luis Fernández',
      doctorSpecialty: 'Ortopedia',
      appointmentId: 5,
      date: '2024-11-20',
      diagnosis: 'Artritis de rodilla derecha post-operatoria',
      symptoms: ['Dolor en rodilla', 'Rigidez', 'Limitación de movimiento'],
      treatment: 'Fisioterapia y medicación antiinflamatoria',
      prescription: [
        {
          id: 7,
          medication: 'Ibuprofeno',
          dosage: '400mg',
          frequency: '3 veces al día',
          duration: '10 días',
          instructions: 'Tomar con las comidas'
        },
        {
          id: 8,
          medication: 'Enalapril',
          dosage: '10mg',
          frequency: '1 vez al día',
          duration: '30 días',
          instructions: 'Tomar por la mañana'
        }
      ],
      vitalSigns: {
        bloodPressure: '135/85 mmHg',
        heartRate: '70 bpm',
        temperature: '36.7°C',
        weight: '78 kg',
        height: '172 cm'
      },
      notes: 'Paciente post-operatorio de rodilla. Recuperación favorable. Continuar con fisioterapia y ejercicios de rehabilitación.',
      followUpDate: '2024-12-16',
      status: 'completed',
      attachments: ['radiografia_rodilla.pdf', 'informe_fisioterapia.pdf']
    }
  ];

  const patients = [
    { id: 1, name: 'Juan Pérez' },
    { id: 2, name: 'María García' },
    { id: 3, name: 'Carlos López' },
    { id: 4, name: 'Ana Martínez' },
    { id: 5, name: 'Roberto Silva' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'cancelled':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completado';
      case 'pending':
        return 'Pendiente';
      case 'cancelled':
        return 'Cancelado';
      default:
        return 'Desconocido';
    }
  };

  const filteredRecords = medicalRecords.filter(record => {
    const matchesSearch = record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.doctorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPatient = filterPatient === 'all' || record.patientId.toString() === filterPatient;
    const matchesDate = filterDate === 'all' || record.date.includes(filterDate);
    return matchesSearch && matchesPatient && matchesDate;
  });

  const handleViewDetails = (record: any) => {
    setSelectedRecord(record);
    setShowDetails(true);
  };

  const handleEditRecord = (record: any) => {
    // TODO: Implement edit functionality
    console.log('Edit record:', record);
  };

  const handleDeleteRecord = (record: any) => {
    // TODO: Implement delete functionality
    console.log('Delete record:', record);
  };

  const handleDownloadRecord = (record: any) => {
    // TODO: Implement download functionality
    console.log('Download record:', record);
  };

  const handlePrintRecord = (record: any) => {
    // TODO: Implement print functionality
    console.log('Print record:', record);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            Historias Clínicas
          </h1>
          <p className="text-neutral-600 dark:text-neutral-300">
            Gestiona el historial médico completo de tus pacientes
          </p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Importar
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nueva Historia
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Total Historias
              </p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                {medicalRecords.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Completadas
              </p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                {medicalRecords.filter(r => r.status === 'completed').length}
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
                Pendientes
              </p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                {medicalRecords.filter(r => r.status === 'pending').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Este Mes
              </p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                {medicalRecords.filter(r => r.date.startsWith('2024-12')).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
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
                placeholder="Buscar por paciente, diagnóstico o doctor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filterPatient}
              onChange={(e) => setFilterPatient(e.target.value)}
              className="px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-dark-surface text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">Todos los pacientes</option>
              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.name}
                </option>
              ))}
            </select>
            <select
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-dark-surface text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">Todas las fechas</option>
              <option value="2024-12">Diciembre 2024</option>
              <option value="2024-11">Noviembre 2024</option>
              <option value="2024-10">Octubre 2024</option>
            </select>
            <Button variant="outline">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Medical Records List */}
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
                  Diagnóstico
                </th>
                <th className="text-left py-3 px-4 font-medium text-neutral-700 dark:text-neutral-300">
                  Estado
                </th>
                <th className="text-left py-3 px-4 font-medium text-neutral-700 dark:text-neutral-300">
                  Seguimiento
                </th>
                <th className="text-left py-3 px-4 font-medium text-neutral-700 dark:text-neutral-300">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => (
                <tr key={record.id} className="border-b border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div>
                        <p className="font-medium text-neutral-900 dark:text-neutral-100">
                          {record.patientName}
                        </p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          ID: {record.patientId}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <Stethoscope className="w-4 h-4 text-secondary-600" />
                      <div>
                        <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                          {record.doctorName}
                        </p>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400">
                          {record.doctorSpecialty}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-neutral-900 dark:text-neutral-100">
                    {new Date(record.date).toLocaleDateString('es-ES')}
                  </td>
                  <td className="py-4 px-4">
                    <div className="max-w-xs">
                      <p className="text-sm text-neutral-900 dark:text-neutral-100 truncate">
                        {record.diagnosis}
                      </p>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400">
                        {record.symptoms.length} síntomas
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(record.status)}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(record.status)}`}>
                        {getStatusText(record.status)}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    {record.followUpDate ? (
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-primary-600" />
                        <span className="text-sm text-neutral-900 dark:text-neutral-100">
                          {new Date(record.followUpDate).toLocaleDateString('es-ES')}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-neutral-500 dark:text-neutral-400">
                        Sin seguimiento
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetails(record)}
                        title="Ver detalles"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditRecord(record)}
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownloadRecord(record)}
                        title="Descargar"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handlePrintRecord(record)}
                        title="Imprimir"
                      >
                        <Printer className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteRecord(record)}
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
      {filteredRecords.length === 0 && (
        <Card className="text-center py-12">
          <FileText className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
            No se encontraron historias clínicas
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            Intenta ajustar tus filtros de búsqueda
          </p>
        </Card>
      )}

      {/* Medical Record Details Modal */}
      {showDetails && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                Historia Clínica - {selectedRecord.patientName}
              </h2>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => handlePrintRecord(selectedRecord)}>
                  <Printer className="w-4 h-4 mr-2" />
                  Imprimir
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDownloadRecord(selectedRecord)}>
                  <Download className="w-4 h-4 mr-2" />
                  Descargar
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDetails(false)}
                >
                  <AlertCircle className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              {/* Header Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4">
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                    Información del Paciente
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-neutral-400" />
                      <span className="text-neutral-600 dark:text-neutral-400">
                        {selectedRecord.patientName}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-neutral-400" />
                      <span className="text-neutral-600 dark:text-neutral-400">
                        {selectedRecord.patientEmail}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-neutral-400" />
                      <span className="text-neutral-600 dark:text-neutral-400">
                        {selectedRecord.patientPhone}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4">
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                    Información del Doctor
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Stethoscope className="w-4 h-4 text-neutral-400" />
                      <span className="text-neutral-600 dark:text-neutral-400">
                        {selectedRecord.doctorName}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-neutral-600 dark:text-neutral-400">
                        {selectedRecord.doctorSpecialty}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-neutral-400" />
                      <span className="text-neutral-600 dark:text-neutral-400">
                        {new Date(selectedRecord.date).toLocaleDateString('es-ES', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4">
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                    Estado y Seguimiento
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(selectedRecord.status)}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedRecord.status)}`}>
                        {getStatusText(selectedRecord.status)}
                      </span>
                    </div>
                    {selectedRecord.followUpDate && (
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-neutral-400" />
                        <span className="text-neutral-600 dark:text-neutral-400">
                          Seguimiento: {new Date(selectedRecord.followUpDate).toLocaleDateString('es-ES')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Diagnosis and Symptoms */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                    Diagnóstico
                  </h3>
                  <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4">
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {selectedRecord.diagnosis}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                    Síntomas
                  </h3>
                  <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4">
                    <div className="flex flex-wrap gap-2">
                      {selectedRecord.symptoms.map((symptom: string, index: number) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400 rounded-full"
                        >
                          {symptom}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Treatment and Prescription */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                    Tratamiento
                  </h3>
                  <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4">
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {selectedRecord.treatment}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                    Prescripción
                  </h3>
                  <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4">
                    <div className="space-y-3">
                      {selectedRecord.prescription.map((med: any) => (
                        <div key={med.id} className="border-b border-neutral-200 dark:border-neutral-700 pb-2 last:border-b-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <Pill className="w-4 h-4 text-blue-600" />
                            <span className="font-medium text-sm text-neutral-900 dark:text-neutral-100">
                              {med.medication}
                            </span>
                          </div>
                          <div className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
                            <p>Dosis: {med.dosage}</p>
                            <p>Frecuencia: {med.frequency}</p>
                            <p>Duración: {med.duration}</p>
                            <p>Instrucciones: {med.instructions}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Vital Signs */}
              <div>
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                  Signos Vitales
                </h3>
                <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="text-center">
                      <Heart className="w-6 h-6 text-red-600 mx-auto mb-1" />
                      <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                        Presión Arterial
                      </p>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400">
                        {selectedRecord.vitalSigns.bloodPressure}
                      </p>
                    </div>
                    <div className="text-center">
                      <Activity className="w-6 h-6 text-green-600 mx-auto mb-1" />
                      <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                        Frecuencia Cardíaca
                      </p>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400">
                        {selectedRecord.vitalSigns.heartRate}
                      </p>
                    </div>
                    <div className="text-center">
                      <Activity className="w-6 h-6 text-orange-600 mx-auto mb-1" />
                      <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                        Temperatura
                      </p>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400">
                        {selectedRecord.vitalSigns.temperature}
                      </p>
                    </div>
                    <div className="text-center">
                      <Activity className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                      <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                        Peso
                      </p>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400">
                        {selectedRecord.vitalSigns.weight}
                      </p>
                    </div>
                    <div className="text-center">
                      <Activity className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                      <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                        Altura
                      </p>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400">
                        {selectedRecord.vitalSigns.height}
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
                    {selectedRecord.notes}
                  </p>
                </div>
              </div>

              {/* Attachments */}
              {selectedRecord.attachments && selectedRecord.attachments.length > 0 && (
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                    Archivos Adjuntos
                  </h3>
                  <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4">
                    <div className="flex flex-wrap gap-2">
                      {selectedRecord.attachments.map((attachment: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 px-3 py-2 bg-white dark:bg-neutral-700 rounded-lg border border-neutral-200 dark:border-neutral-600"
                        >
                          <FileText className="w-4 h-4 text-neutral-400" />
                          <span className="text-sm text-neutral-600 dark:text-neutral-400">
                            {attachment}
                          </span>
                          <Button variant="ghost" size="sm">
                            <Download className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end space-x-2 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                <Button variant="outline" onClick={() => setShowDetails(false)}>
                  Cerrar
                </Button>
                <Button variant="outline" onClick={() => handlePrintRecord(selectedRecord)}>
                  <Printer className="w-4 h-4 mr-2" />
                  Imprimir
                </Button>
                <Button onClick={() => handleEditRecord(selectedRecord)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Editar Historia
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
} 