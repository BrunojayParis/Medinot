'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface AppUser {
  id: string;
  name: string;
  email: string;
  role: 'doctor' | 'patient';
  createdAt: string;
}

interface AuthContextType {
  user: AppUser | null;
  token: string | null;
  login: (_email: string, _password: string) => Promise<void>;
  register: (_data: any) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function mapSupabaseUserToAppUser(session: NonNullable<Awaited<ReturnType<typeof supabase.auth.getSession>>['data']['session']>): AppUser {
  const sbUser = session.user;
  const role = (sbUser.user_metadata?.role as 'doctor' | 'patient') || 'patient';
  const name = (sbUser.user_metadata?.name as string) || (sbUser.email ? sbUser.email.split('@')[0] : 'Usuario');
  return {
    id: sbUser.id,
    name,
    email: sbUser.email || '',
    role,
    createdAt: sbUser.created_at || new Date().toISOString(),
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error getting session', error);
      }
      if (!isMounted) return;
      if (data.session) {
        setToken(data.session.access_token ?? null);
        setUser(mapSupabaseUserToAppUser(data.session));
      } else {
        setUser(null);
        setToken(null);
      }
      setIsLoading(false);
    };

    init();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return;
      if (session) {
        setToken(session.access_token ?? null);
        setUser(mapSupabaseUserToAppUser(session));
      } else {
        setUser(null);
        setToken(null);
      }
    });

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      throw new Error(error.message);
    }
    if (data.session) {
      setToken(data.session.access_token ?? null);
      setUser(mapSupabaseUserToAppUser(data.session));
    }
  };

  const register = async (data: any) => {
    const { email, password, name, role, phone, specialty, license } = data;
    const { data: signUpData, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, role, phone, specialty, license },
      },
    });
    if (error) {
      throw new Error(error.message);
    }
    if (signUpData.session) {
      setToken(signUpData.session.access_token ?? null);
      setUser(mapSupabaseUserToAppUser(signUpData.session));
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
    setUser(null);
    setToken(null);
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}