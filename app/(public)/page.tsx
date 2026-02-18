import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export default async function Home() {
  const cases = await prisma.case.findMany({
    include: {
      timeline: {
        orderBy: { date: 'desc' },
        take: 1,
      },
    },
    orderBy: { lastUpdated: 'desc' },
  });

  const grouped = cases.reduce((acc, c) => {
    if (!acc[c.category]) acc[c.category] = [];
    acc[c.category].push(c);
    return acc;
  }, {} as Record<string, typeof cases>);

  const categoryOrder = [
    'Farmers',
    'Political Accountability',
    'Violent Crime',
    'Accidents',
    'Drunk Driving',
    'Corruption',
    'Social Justice',
    'Governance Failure'
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Telangana Accountability Tracker</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Documenting and tracking criminal cases, government responses, and social justice issues across Telangana.
        </p>
      </section>

      {categoryOrder.map(category => {
        const items = grouped[category];
        if (!items || items.length === 0) return null;

        return (
          <section key={category} className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map(caseItem => (
                <Card key={caseItem.id} className="hover:shadow-lg transition">
                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">{caseItem.title}</CardTitle>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="outline">{caseItem.location}</Badge>
                      <Badge className={
                        caseItem.status === 'closed' ? 'bg-green-100' :
                        caseItem.status === 'unresolved' ? 'bg-red-100' : 'bg-yellow-100'
                      }>
                        {caseItem.status.replace('-', ' ')}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 line-clamp-3">{caseItem.summary}</p>
                    {caseItem.timeline[0] && (
                      <p className="text-sm text-gray-500 mt-2">
                        Latest: {caseItem.timeline[0].title} ({format(new Date(caseItem.timeline[0].date), 'PPP')})
                      </p>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Link href={`/case/${caseItem.id}`} className="text-primary hover:underline">
                      Read more →
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
