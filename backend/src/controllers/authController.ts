import type { Request, Response } from 'express';
import { createUser, validateUser } from '../services/authService.js';
import { signJwt } from '../utils/jwt.js';
import { Role } from '@prisma/client';

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Faltan campos requeridos' });
    }
    if (!['doctor', 'patient'].includes(role)) {
      return res.status(400).json({ message: 'Rol inválido' });
    }
    const user = await createUser({ name, email, password, role });
    const token = signJwt({ id: user.id, role: user.role });
    res.status(201).json({ user, token });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Faltan campos requeridos' });
    }
    const user = await validateUser(email, password);
    const token = signJwt({ id: user.id, role: user.role });
    res.json({ user, token });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
}
