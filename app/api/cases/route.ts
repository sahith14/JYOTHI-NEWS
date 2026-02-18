import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const cases = await prisma.case.findMany({
      include: {
        timeline: {
          orderBy: { date: 'desc' },
          take: 1, // just the latest update for summary
        },
        governmentResponses: true,
      },
      orderBy: { lastUpdated: 'desc' },
    });
    return NextResponse.json(cases);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch cases' }, { status: 500 });
  }
}
