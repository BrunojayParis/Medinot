import { NextResponse } from 'next/server';
import { getServerSession } from '@/lib/supabaseServer';
import prisma from '@/lib/prisma';

export async function GET() {
  const { session, error } = await getServerSession();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Try to map to our Prisma user if exists, otherwise return supabase profile
  const email = session.user.email ?? '';
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      return NextResponse.json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        source: 'prisma',
      });
    }
  } catch (e: any) {
    // fall through to supabase user response
  }

  return NextResponse.json({
    id: session.user.id,
    name: (session.user.user_metadata?.name as string) || email.split('@')[0] || 'Usuario',
    email,
    role: (session.user.user_metadata?.role as string) || 'patient',
    createdAt: session.user.created_at,
    source: 'supabase',
  });
}

