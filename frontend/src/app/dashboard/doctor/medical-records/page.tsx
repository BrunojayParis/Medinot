'use client';

import React, { useEffect, useMemo, useState } from 'react';
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
import { useAuth } from '@/context/AuthContext';

export default function MedicalRecordsPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPatient, setFilterPatient] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [medicalRecords, setMedicalRecords] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingData(true);
        setFetchError(null);
        const res = await fetch('/api/medical-records');
        if (!res.ok) {
          const j = await res.json().catch(() => null);
          throw new Error(j?.error || 'Error obteniendo historias clínicas');
        }
        const j = await res.json();
        setMedicalRecords(Array.isArray(j.records) ? j.records : []);
      } catch (e: any) {
        setFetchError(e.message || 'Error inesperado');
      } finally {
        setLoadingData(false);
      }
    };
    fetchData();
  }, []);

  const doctorRecords = useMemo(() => medicalRecords.filter((r: any) => r.doctorId === user?.id), [medicalRecords, user?.id]);

  const patients = useMemo(() => {
    const set = new Map<string, string>();
    doctorRecords.forEach((r: any) => {
      if (r.patient) set.set(r.patient.id, r.patient.name || r.patient.email || 'Paciente');
    });
    return Array.from(set.entries()).map(([id, name]) => ({ id, name }));
  }, [doctorRecords]);

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

  const getStatusForRecord = (_record: any): 'completed' | 'pending' | 'cancelled' => 'completed';

  const filteredRecords = doctorRecords.filter((record: any) => {
    const patientName = (record.patient?.name || '').toLowerCase();
    const matchesSearch = patientName.includes(searchTerm.toLowerCase()) ||
      (record.diagnosis || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPatient = filterPatient === 'all' || record.patientId === filterPatient;
    const dateStr = typeof record.date === 'string' ? record.date : new Date(record.date).toISOString();
    const matchesDate = filterDate === 'all' || dateStr.startsWith(filterDate);
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
                {filteredRecords.length}
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
                {filteredRecords.filter((r: any) => getStatusForRecord(r) === 'completed').length}
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
                {filteredRecords.filter((r: any) => getStatusForRecord(r) === 'pending').length}
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
                {filteredRecords.filter((r: any) => (typeof r.date === 'string' ? r.date : new Date(r.date).toISOString()).startsWith('2024-12')).length}
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
              {loadingData && (
                <tr>
                  <td colSpan={7} className="py-6 text-center text-neutral-600 dark:text-neutral-400">Cargando...</td>
                </tr>
              )}
              {fetchError && !loadingData && (
                <tr>
                  <td colSpan={7} className="py-6 text-center text-red-600 dark:text-red-400">{fetchError}</td>
                </tr>
              )}
              {!loadingData && !fetchError && filteredRecords.map((record: any) => (
                <tr key={record.id} className="border-b border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div>
                        <p className="font-medium text-neutral-900 dark:text-neutral-100">
                          {record.patient?.name ?? 'Paciente'}
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
                          {user?.name}
                        </p>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400">
                          —
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
                        {(record.symptoms || []).length} síntomas
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(getStatusForRecord(record))}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(getStatusForRecord(record))}`}>
                        {getStatusText(getStatusForRecord(record))}
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