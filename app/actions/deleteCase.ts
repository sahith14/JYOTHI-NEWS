'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function deleteCase(id: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error('Unauthorized');
  await prisma.case.delete({ where: { id } });
  revalidatePath('/admin/dashboard');
}
