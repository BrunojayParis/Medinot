'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Heart, Eye, EyeOff, ArrowLeft, User, Stethoscope } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
 

const registerSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmPassword: z.string(),
  role: z.enum(['patient', 'doctor']),
  phone: z.string().optional(),
  specialty: z.string().optional(),
  license: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
}).refine((data) => {
  if (data.role === 'doctor') {
    return data.specialty && data.license;
  }
  return true;
}, {
  message: "Los campos especialidad y licencia son requeridos para doctores",
  path: ["specialty"],
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'patient',
    },
  });

  const selectedRole = watch('role');

  const onSubmit = async (data: RegisterForm) => {
    setIsLoading(true);
    try {
      const { confirmPassword: _confirmPassword, ...registerData } = data;
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(json?.error || 'Error al registrarse');
      }
      toast.success('Registro exitoso');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Error al registrarse');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-dark-bg dark:to-dark-surface flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al inicio</span>
          </Link>
          
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              Medinot
            </span>
          </div>
          
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
            Crear Cuenta
          </h1>
          <p className="text-neutral-600 dark:text-neutral-300">
            Únete a nuestra plataforma médica
          </p>
        </div>

        {/* Register Form */}
        <Card className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Role Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Tipo de cuenta
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="relative">
                  <input
                    type="radio"
                    value="patient"
                    className="sr-only"
                    {...register('role')}
                  />
                  <div className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedRole === 'patient'
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-neutral-300 dark:border-neutral-600 hover:border-primary-300'
                  }`}>
                    <User className={`w-5 h-5 ${
                      selectedRole === 'patient' ? 'text-primary-600' : 'text-neutral-400'
                    }`} />
                    <span className={`font-medium ${
                      selectedRole === 'patient' ? 'text-primary-600' : 'text-neutral-700 dark:text-neutral-300'
                    }`}>
                      Paciente
                    </span>
                  </div>
                </label>
                
                <label className="relative">
                  <input
                    type="radio"
                    value="doctor"
                    className="sr-only"
                    {...register('role')}
                  />
                  <div className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedRole === 'doctor'
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-neutral-300 dark:border-neutral-600 hover:border-primary-300'
                  }`}>
                    <Stethoscope className={`w-5 h-5 ${
                      selectedRole === 'doctor' ? 'text-primary-600' : 'text-neutral-400'
                    }`} />
                    <span className={`font-medium ${
                      selectedRole === 'doctor' ? 'text-primary-600' : 'text-neutral-700 dark:text-neutral-300'
                    }`}>
                      Doctor
                    </span>
                  </div>
                </label>
              </div>
            </div>

            <Input
              label="Nombre completo"
              placeholder="Tu nombre completo"
              error={errors.name?.message}
              {...register('name')}
            />

            <Input
              label="Email"
              type="email"
              placeholder="tu@email.com"
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              label="Teléfono (opcional)"
              type="tel"
              placeholder="+54 9 11 1234-5678"
              error={errors.phone?.message}
              {...register('phone')}
            />

            {selectedRole === 'doctor' && (
              <>
                <Input
                  label="Especialidad"
                  placeholder="Cardiología, Pediatría, etc."
                  error={errors.specialty?.message}
                  {...register('specialty')}
                />

                <Input
                  label="Número de licencia"
                  placeholder="MP-12345"
                  error={errors.license?.message}
                  {...register('license')}
                />
              </>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="block w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 pr-10 text-sm text-neutral-900 placeholder-neutral-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-neutral-600 dark:bg-dark-surface dark:text-neutral-100 dark:placeholder-neutral-400 dark:focus:border-primary-400 dark:focus:ring-primary-400"
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Confirmar contraseña
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="block w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 pr-10 text-sm text-neutral-900 placeholder-neutral-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-neutral-600 dark:bg-dark-surface dark:text-neutral-100 dark:placeholder-neutral-400 dark:focus:border-primary-400 dark:focus:ring-primary-400"
                  {...register('confirmPassword')}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                required
                className="w-4 h-4 mt-1 text-primary-600 border-neutral-300 rounded focus:ring-primary-500 dark:border-neutral-600 dark:bg-dark-surface"
              />
              <span className="text-sm text-neutral-700 dark:text-neutral-300">
                Acepto los{' '}
                <Link
                  href="/terms"
                  className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  términos y condiciones
                </Link>{' '}
                y la{' '}
                <Link
                  href="/privacy"
                  className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  política de privacidad
                </Link>
              </span>
            </div>

            <Button
              type="submit"
              className="w-full"
              loading={isLoading}
            >
              Crear Cuenta
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-600 dark:text-neutral-300">
              ¿Ya tienes una cuenta?{' '}
              <Link
                href="/login"
                className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
              >
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
} 