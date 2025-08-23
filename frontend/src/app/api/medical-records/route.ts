import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from '@/lib/supabaseServer';

export async function GET() {
  const { session, error } = await getServerSession();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const email = session.user.email ?? '';
  const prismaUser = await prisma.user.findUnique({ where: { email } }).catch(() => null);
  if (!prismaUser) {
    return NextResponse.json({ records: [] });
  }

  const records = await prisma.medicalRecord.findMany({
    where: {
      OR: [{ doctorId: prismaUser.id }, { patientId: prismaUser.id }],
    },
    include: {
      patient: { select: { id: true, name: true, email: true } },
    },
    orderBy: { date: 'desc' },
  });

  return NextResponse.json({ records });
}


