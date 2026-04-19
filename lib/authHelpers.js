import { auth } from './auth.js';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

export async function requireAuth() {
  const session = await auth();
  if (!session?.user) redirect('/auth/signin');
  return session;
}

export async function requireAdmin() {
  const session = await auth();
  if (!session?.user) redirect('/auth/signin');
  if (session.user.role !== 'ADMIN') redirect('/');
  return session;
}

export async function requireAuthApi() {
  const session = await auth();
  if (!session?.user) {
    return {
      session: null,
      error: NextResponse.json({ error: 'Authentication required.' }, { status: 401 }),
    };
  }
  return { session, error: null };
}

export async function requireAdminApi() {
  const session = await auth();
  if (!session?.user) {
    return {
      session: null,
      error: NextResponse.json({ error: 'Authentication required.' }, { status: 401 }),
    };
  }
  if (session.user.role !== 'ADMIN') {
    return {
      session: null,
      error: NextResponse.json({ error: 'Admin access required.' }, { status: 403 }),
    };
  }
  return { session, error: null };
}

export function isUnlimited(role) {
  return role === 'VIP' || role === 'ADMIN';
}