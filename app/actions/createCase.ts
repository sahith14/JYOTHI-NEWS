'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { caseSchema } from '@/lib/validations/case';
import { z } from 'zod';

export async function createCase(formData: z.infer<typeof caseSchema>) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error('Unauthorized');

  const data = caseSchema.parse(formData);

  await prisma.case.create({
    data: {
      title: data.title,
      slug: data.slug,
      category: data.category,
      location: data.location,
      dateOfIncident: new Date(data.dateOfIncident),
      summary: data.summary,
      detailedSummary: data.detailedSummary,
      status: data.status,
      legalStatus: data.legalStatus,
      compensationAnnounced: data.compensationAnnounced,
      isClosed: data.isClosed,
      images: data.images || [],
      tags: data.tags || [],
      internalNotes: data.internalNotes,
      sources: data.sources ? JSON.stringify(data.sources) : null,
      timeline: {
        create: data.timeline?.map(event => ({
          date: new Date(event.date),
          title: event.title,
          description: event.description,
          source: event.source,
        })) || [],
      },
      governmentResponses: {
        create: data.governmentResponses?.map(resp => ({
          announcements: resp.announcements || [],
          compensation: resp.compensation,
          officialStatements: resp.officialStatements || [],
          filedFIR: resp.filedFIR,
          arrests: resp.arrests,
          chargesheetFiled: resp.chargesheetFiled,
        })) || [],
      },
    },
  });

  revalidatePath('/admin/dashboard');
}
