import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
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
    <article className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-2">{caseItem.title}</h1>
      <div className="text-gray-600 mb-4">
        <span>{caseItem.category} · {caseItem.location}</span>
        <span className="mx-2">·</span>
        <span>Incident: {new Date(caseItem.dateOfIncident).toLocaleDateString()}</span>
      </div>
      <div className="prose lg:prose-xl mb-6">
        <p className="text-lg">{caseItem.summary}</p>
        <div dangerouslySetInnerHTML={{ __html: caseItem.detailedSummary }} />
      </div>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Legal Status</h2>
        <p>{caseItem.legalStatus}</p>
        {caseItem.compensationAnnounced && (
          <p>Compensation announced: {caseItem.compensationAnnounced}</p>
        )}
        <p>Status: <span className="font-medium">{caseItem.status.replace('-', ' ')}</span></p>
      </section>

      <GovernmentResponse responses={caseItem.governmentResponses} />
      <Timeline events={caseItem.timeline} />
    </article>
  );
}
