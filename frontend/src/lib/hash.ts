import bcrypt from 'bcryptjs';

const DEFAULT_SALT_ROUNDS = 10;

export async function hashPassword(plainTextPassword: string, saltRounds: number = DEFAULT_SALT_ROUNDS) {
  return bcrypt.hash(plainTextPassword, saltRounds);
}

export async function verifyPassword(plainTextPassword: string, hashedPassword: string) {
  return bcrypt.compare(plainTextPassword, hashedPassword);
}


