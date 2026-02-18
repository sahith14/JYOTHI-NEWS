import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { caseSchema } from '@/lib/validations/case';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const json = await request.json();
    const data = caseSchema.parse(json);

    // Delete existing relations and recreate (simplified)
    await prisma.$transaction([
      prisma.timelineEvent.deleteMany({ where: { caseId: params.id } }),
      prisma.governmentResponse.deleteMany({ where: { caseId: params.id } }),
      prisma.case.update({
        where: { id: params.id },
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
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update case' }, { status: 500 });
  }
}
