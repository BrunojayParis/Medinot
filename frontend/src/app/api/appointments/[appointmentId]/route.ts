import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from '@/lib/supabaseServer';

export async function GET(
  _req: NextRequest,
  { params }: { params: { appointmentId: string } }
) {
  const { session } = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { appointmentId } = params;
  if (!appointmentId) {
    return NextResponse.json({ error: 'Falta appointmentId' }, { status: 400 });
  }

  const appt = await prisma.appointment.findUnique({
    where: { id: appointmentId },
    include: {
      doctor: { select: { id: true, name: true, email: true } },
      patient: { select: { id: true, name: true, email: true } },
    },
  });

  if (!appt) {
    return NextResponse.json({ error: 'Turno no encontrado' }, { status: 404 });
  }

  return NextResponse.json({ appointment: appt });
}


