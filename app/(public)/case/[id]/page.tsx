import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Timeline from '@/components/Timeline';
import GovernmentResponse from '@/components/GovernmentResponse';

export default async function CasePage({ params }: { params: { id: string } }) {
  const caseItem = await prisma.case.findUnique({
    where: { id: params.id },
    include: {
      timeline: { orderBy: { date: 'desc' } },
      governmentResponses: true,
    },
  });

  if (!caseItem) notFound();

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{caseItem.title}</h1>
        <div className="flex flex-wrap gap-2 items-center text-gray-600">
          <Badge variant="outline">{caseItem.category}</Badge>
          <span>•</span>
          <span>{caseItem.location}</span>
          <span>•</span>
          <span>Incident: {format(new Date(caseItem.dateOfIncident), 'PPP')}</span>
          <span>•</span>
          <span>Last updated: {format(new Date(caseItem.lastUpdated), 'PPP')}</span>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-8">
        <p className="text-xl leading-relaxed">{caseItem.summary}</p>
        <div dangerouslySetInnerHTML={{ __html: caseItem.detailedSummary }} />
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Legal Status & Response</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold">Current Status</h3>
            <p>{caseItem.status.replace('-', ' ')}</p>
          </div>
          <div>
            <h3 className="font-semibold">Legal Status</h3>
            <p>{caseItem.legalStatus}</p>
          </div>
          {caseItem.compensationAnnounced && (
            <div>
              <h3 className="font-semibold">Compensation Announced</h3>
              <p>{caseItem.compensationAnnounced}</p>
            </div>
          )}
          <Badge className={caseItem.isClosed ? 'bg-green-100' : 'bg-yellow-100'}>
            {caseItem.isClosed ? 'Closed' : 'Pending'}
          </Badge>
        </CardContent>
      </Card>

      {caseItem.governmentResponses.length > 0 && (
        <GovernmentResponse responses={caseItem.governmentResponses} />
      )}

      {caseItem.timeline.length > 0 && (
        <Timeline events={caseItem.timeline} />
      )}
    </article>
  );
}
