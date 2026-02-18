import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { caseSchema } from '@/lib/validations/case';
import { z } from 'zod';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const json = await request.json();
    const data = caseSchema.parse(json);

    const caseItem = await prisma.case.create({
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

    return NextResponse.json(caseItem, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create case' }, { status: 500 });
  }
}
