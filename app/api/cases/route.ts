import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const cases = await prisma.case.findMany({
      include: {
        timeline: true,
        governmentResponses: true,
      },
      orderBy: { lastUpdated: 'desc' },
    });
    return NextResponse.json(cases);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch cases' }, { status: 500 });
  }
}
