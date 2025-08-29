import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from '@/lib/supabaseServer';

export async function GET(
  _req: NextRequest,
  { params }: { params: { patientId: string } }
) {
  const { session } = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { patientId } = params;
  if (!patientId) {
    return NextResponse.json({ error: 'Falta patientId' }, { status: 400 });
  }

  const patient = await prisma.user.findUnique({
    where: { id: patientId },
    select: { id: true, name: true, email: true, role: true },
  });

  if (!patient || patient.role !== 'patient') {
    return NextResponse.json({ error: 'Paciente no encontrado' }, { status: 404 });
  }

  return NextResponse.json({ patient });
}


