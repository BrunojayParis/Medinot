import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServer } from '@/lib/supabaseServer';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import prisma from '@/lib/prisma';
import { hashPassword } from '@/lib/hash';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { email, password, name, role, ...metadata } = body as {
    email?: string;
    password?: string;
    name?: string;
    role?: 'doctor' | 'patient';
    [k: string]: unknown;
  };

  if (!email || !password) {
    return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
  }

  const supabase = await createSupabaseServer();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name, role: role ?? 'patient', ...metadata },
    },
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const sbUser = data.user;

  if (sbUser?.email) {
    const nameFinal = name ?? (sbUser.user_metadata?.name as string) ?? email.split('@')[0];
    const roleFinal = (role ?? (sbUser.user_metadata?.role as 'doctor' | 'patient')) ?? 'patient';

    // Create or update Prisma user (store hashed password)
    const passwordToStore = password || 'supabase';
    const hashed = await hashPassword(passwordToStore);
    await prisma.user
      .upsert({
        where: { email: email },
        update: {
          name: nameFinal,
          role: roleFinal,
        },
        create: {
          id: sbUser.id,
          email,
          name: nameFinal,
          role: roleFinal,
          password: hashed,
        },
      })
      .catch(() => null);

    // If email confirmation is required in Supabase project, confirm immediately via admin
    try {
      const admin = getSupabaseAdmin();
      await admin.auth.admin.updateUserById(sbUser.id, { email_confirm: true });
    } catch (_e) {
      // ignore if admin not configured
    }
  }

  // Attempt to sign in after registration to ensure session is active
  const supabaseAfter = await createSupabaseServer();
  const { data: signInData } = await supabaseAfter.auth.signInWithPassword({ email, password });

  return NextResponse.json({ user: signInData?.user ?? data.user, session: signInData?.session ?? data.session }, { status: 201 });
}

