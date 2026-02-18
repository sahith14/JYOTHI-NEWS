import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const caseItem = await prisma.case.findUnique({
      where: { id: params.id },
      include: {
        timeline: { orderBy: { date: 'desc' } },
        governmentResponses: true,
      },
    });
    if (!caseItem) {
      return NextResponse.json({ error: 'Case not found' }, { status: 404 });
    }
    return NextResponse.json(caseItem);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch case' }, { status: 500 });
  }
}
