import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hashPassword } from '@/lib/hash';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { doctorId, datetime, name, email } = body as {
    doctorId?: string;
    datetime?: string;
    name?: string;
    email?: string;
  };

  if (!doctorId || !datetime || !name || !email) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  // If a patient exists with this email, use it; otherwise create a minimal patient
  const existingPatient = await prisma.user.findUnique({ where: { email } }).catch(() => null);

  const patient = existingPatient ?? (await (async () => {
    const hashed = await hashPassword('supabase');
    return prisma.user.create({
      data: {
        email,
        name,
        role: 'patient',
        password: hashed,
      },
    });
  })().catch(() => null));

  if (!patient) {
    return NextResponse.json({ error: 'Unable to create patient' }, { status: 400 });
  }

  const appointment = await prisma.appointment.create({
    data: {
      doctorId,
      patientId: patient.id,
      datetime: new Date(datetime),
      status: 'pending',
    },
  });

  return NextResponse.json({ appointment }, { status: 201 });
}


