import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from '@/lib/supabaseServer';

export async function GET() {
  const { session } = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Return appointments where the user is doctor or patient (by matching Prisma user via email if exists)
  const email = session.user.email ?? '';
  const prismaUser = await prisma.user.findUnique({ where: { email } }).catch(() => null);

  if (!prismaUser) {
    return NextResponse.json({ appointments: [] });
  }

  const appointments = await prisma.appointment.findMany({
    where: {
      OR: [{ doctorId: prismaUser.id }, { patientId: prismaUser.id }],
    },
    orderBy: { datetime: 'desc' },
  });

  return NextResponse.json({ appointments });
}

export async function POST(req: NextRequest) {
  const { session } = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { doctorId, patientId, datetime, status } = body as {
    doctorId: string;
    patientId: string;
    datetime: string;
    status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  };

  if (!doctorId || !patientId || !datetime) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const appointment = await prisma.appointment.create({
    data: {
      doctorId,
      patientId,
      datetime: new Date(datetime),
      status: status ?? 'pending',
    },
  });

  return NextResponse.json({ appointment }, { status: 201 });
}

