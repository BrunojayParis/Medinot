import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServer } from '@/lib/supabaseServer';
import prisma from '@/lib/prisma';
import { hashPassword } from '@/lib/hash';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { email, password } = body as { email?: string; password?: string };
  if (!email || !password) {
    return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
  }

  const supabase = await createSupabaseServer();
  let { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error && /Email not confirmed/i.test(error.message)) {
    // Try to confirm email via admin as a convenience for demo/dev
    try {
      const admin = getSupabaseAdmin();
      const listRes = await admin.auth.admin.listUsers({ page: 1, perPage: 200 });
      const found = listRes?.data?.users?.find(u => (u.email || '').toLowerCase() === email.toLowerCase());
      if (found) {
        await admin.auth.admin.updateUserById(found.id, { email_confirm: true });
        // Retry sign-in
        const retry = await supabase.auth.signInWithPassword({ email, password });
        data = retry.data;
        error = retry.error;
      }
    } catch (_e) {
      // ignore if admin not set
    }
  }
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  const session = data.session;
  const sbUser = data.user;

  if (sbUser?.email) {
    const nameFromMeta = (sbUser.user_metadata?.name as string) || sbUser.email.split('@')[0];
    const roleFromMeta = ((sbUser.user_metadata?.role as 'doctor' | 'patient') || 'patient');

    // Ensure Prisma user exists and is up to date
    const hashed = await hashPassword('supabase');
    await prisma.user
      .upsert({
        where: { email: sbUser.email },
        update: {
          name: nameFromMeta,
          role: roleFromMeta,
        },
        create: {
          id: sbUser.id,
          email: sbUser.email,
          name: nameFromMeta,
          role: roleFromMeta,
          password: hashed,
        },
      })
      .catch(() => null);
  }

  return NextResponse.json({ user: sbUser, session });
}

