import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { 
  Calendar, 
  UserCheck, 
  FileText, 
  Shield, 
  Clock, 
  Heart,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: Calendar,
      title: 'Agenda de Turnos',
      description: 'Sistema intuitivo para agendar y gestionar citas médicas de forma rápida y eficiente.',
      color: 'text-primary-600'
    },
    {
      icon: UserCheck,
      title: 'Gestión de Pacientes',
      description: 'Administra información de pacientes y mantén un registro completo de cada consulta.',
      color: 'text-secondary-600'
    },
    {
      icon: FileText,
      title: 'Historias Clínicas',
      description: 'Acceso seguro y organizado a historias clínicas con toda la información médica relevante.',
      color: 'text-accent-600'
    },
    {
      icon: Shield,
      title: 'Seguridad Total',
      description: 'Protección de datos médicos con encriptación avanzada y cumplimiento de normativas.',
      color: 'text-green-600'
    },
    {
      icon: Clock,
      title: 'Disponibilidad 24/7',
      description: 'Acceso a la plataforma en cualquier momento para gestionar citas y consultar información.',
      color: 'text-purple-600'
    },
    {
      icon: Heart,
      title: 'Cuidado Personalizado',
      description: 'Atención médica personalizada con seguimiento continuo del estado de salud.',
      color: 'text-red-600'
    }
  ];

  const benefits = [
    'Agenda de turnos en tiempo real',
    'Historial médico completo',
    'Notificaciones automáticas',
    'Interfaz intuitiva y moderna',
    'Acceso desde cualquier dispositivo',
    'Cumplimiento de normativas médicas'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-dark-bg dark:to-dark-surface">
      {/* Header */}
      <header className="bg-white/80 dark:bg-dark-surface/80 backdrop-blur-sm border-b border-neutral-200 dark:border-dark-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                Medinot
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost">Iniciar Sesión</Button>
              </Link>
              <Link href="/register">
                <Button>Registrarse</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
            Gestión Médica
            <span className="text-primary-600 dark:text-primary-400"> Simplificada</span>
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8 max-w-3xl mx-auto">
            Plataforma integral para agendar turnos médicos y gestionar historias clínicas 
            de forma segura, eficiente y amigable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8 py-4">
                Comenzar Ahora
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                Conocer Más
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-dark-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Características Principales
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
              Todo lo que necesitas para una gestión médica eficiente y profesional
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <div className={`w-12 h-12 mx-auto mb-4 rounded-lg bg-gray-100 dark:bg-neutral-800 flex items-center justify-center`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                ¿Por qué elegir Medinot?
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8">
                Nuestra plataforma está diseñada específicamente para profesionales de la salud 
                y pacientes, ofreciendo una experiencia completa y segura.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-neutral-700 dark:text-neutral-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <Card className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                        Turno Confirmado
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-300">
                        Dr. María González - Cardiología
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4">
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">
                      Tu turno ha sido confirmado para el 15 de Diciembre a las 14:30
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary-600 dark:bg-primary-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            ¿Listo para comenzar?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Únete a miles de profesionales de la salud que ya confían en Medinot
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button variant="secondary" size="lg" className="text-lg px-8 py-4">
                Registrarse Gratis
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary-600">
                Iniciar Sesión
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 dark:bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Medinot</span>
              </div>
              <p className="text-neutral-400">
                Plataforma integral para la gestión médica moderna.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Producto</h3>
              <ul className="space-y-2 text-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors">Características</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Precios</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Seguridad</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Soporte</h3>
              <ul className="space-y-2 text-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors">Ayuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentación</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacidad</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Términos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-neutral-400">
            <p>&copy; 2024 Medinot. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 