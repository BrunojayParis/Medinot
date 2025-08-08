import { prisma } from '../config.js';
import { hashPassword, comparePassword } from '../utils/hash.js';
import { Role } from '@prisma/client';
import type { User } from '@prisma/client';

export async function createUser({ name, email, password, role }: { name: string; email: string; password: string; role: Role }): Promise<Omit<User, 'password'>> {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error('Email ya registrado');
  const hashed = await hashPassword(password);
  const user = await prisma.user.create({
    data: { name, email, password: hashed, role },
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...userSafe } = user;
  return userSafe;
}

export async function validateUser(email: string, password: string): Promise<Omit<User, 'password'>> {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Usuario no encontrado');
  const valid = await comparePassword(password, user.password);
  if (!valid) throw new Error('Contraseña incorrecta');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...userSafe } = user;
  return userSafe;
}
