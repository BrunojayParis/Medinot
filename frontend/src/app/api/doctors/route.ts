import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from '@/lib/supabaseServer';

export async function GET() {
  // Public endpoint: list doctors without requiring auth
  const doctors = await prisma.user.findMany({
    where: { role: 'doctor' },
    select: { id: true, name: true, email: true },
    orderBy: { name: 'asc' },
  });

  return NextResponse.json({ doctors });
}


