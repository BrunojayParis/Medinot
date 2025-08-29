import { headers, cookies } from 'next/headers';

export async function getBaseUrl(): Promise<string> {
  const envUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_BASE_URL;
  if (envUrl) return envUrl.replace(/\/$/, '');
  const h = await headers();
  const proto = h.get('x-forwarded-proto') || 'http';
  const host = h.get('host') || 'localhost:3000';
  return `${proto}://${host}`;
}

export async function absoluteUrl(path: string): Promise<string> {
  const base = await getBaseUrl();
  if (/^https?:\/\//i.test(path)) return path;
  return `${base}${path.startsWith('/') ? '' : '/'}${path}`;
}

export async function authHeaders(): Promise<HeadersInit> {
  const ck = await cookies();
  const all = ck.getAll();
  if (!all.length) return {};
  const value = all.map(c => `${c.name}=${c.value}`).join('; ');
  return { cookie: value };
}


