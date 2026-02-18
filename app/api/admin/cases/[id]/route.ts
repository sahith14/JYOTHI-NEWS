import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    // Validate and transform data (e.g., convert dates)
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
        // Relations (timeline, govResponse) can be created separately or nested
      },
    });
    return NextResponse.json(caseItem);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create case' }, { status: 500 });
  }
}
