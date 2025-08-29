import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from '@/lib/supabaseServer';

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ recordId: string }> }
) {
  const { session } = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { recordId } = await context.params;
  if (!recordId) {
    return NextResponse.json({ error: 'Falta recordId' }, { status: 400 });
  }

  const record = await prisma.medicalRecord.findUnique({
    where: { id: recordId },
    include: {
      patient: { select: { id: true, name: true, email: true } },
    },
  });

  if (!record) {
    return NextResponse.json({ error: 'Historia clínica no encontrada' }, { status: 404 });
  }

  return NextResponse.json({ record });
}


