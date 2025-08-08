import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function createDemoUsers() {
  const hashedPassword = await bcrypt.hash('123456', 10);
  
  try {
    // Create demo patient
    await prisma.user.upsert({
      where: { email: 'paciente@demo.com' },
      update: {},
      create: {
        name: 'Juan Pérez',
        email: 'paciente@demo.com',
        password: hashedPassword,
        role: 'patient',
      },
    });

    // Create demo doctor
    await prisma.user.upsert({
      where: { email: 'doctor@demo.com' },
      update: {},
      create: {
        name: 'Dr. María González',
        email: 'doctor@demo.com',
        password: hashedPassword,
        role: 'doctor',
      },
    });

    console.log('Demo users created successfully!');
    console.log('Patient: paciente@demo.com / 123456');
    console.log('Doctor: doctor@demo.com / 123456');
  } catch (error) {
    console.error('Error creating demo users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createDemoUsers(); 