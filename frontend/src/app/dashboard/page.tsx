"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function DashboardIndexRedirect() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace('/login');
      return;
    }
    const destination = user.role === 'doctor' ? '/dashboard/doctor' : '/dashboard/patient';
    router.replace(destination);
  }, [user, isLoading, router]);

  return null;
}