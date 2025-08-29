import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from '@/lib/supabaseServer';

export async function GET(
  _req: NextRequest,
  { params }: { params: { doctorId: string } }
) {
  const { session } = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { doctorId } = params;
  if (!doctorId) {
    return NextResponse.json({ error: 'Falta doctorId' }, { status: 400 });
  }

  const doctor = await prisma.user.findUnique({
    where: { id: doctorId },
    select: { id: true, name: true, email: true, role: true },
  });

  if (!doctor || doctor.role !== 'doctor') {
    return NextResponse.json({ error: 'Doctor no encontrado' }, { status: 404 });
  }

  return NextResponse.json({ doctor });
}


