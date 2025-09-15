import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import ClientToaster from '@/components/ClientToaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Medinot - Gestión Médica',
  description: 'Plataforma para gestión de turnos médicos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body suppressHydrationWarning className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            {children}
            <ClientToaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
} 