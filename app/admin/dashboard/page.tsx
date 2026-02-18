import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export default async function AdminDashboard() {
  const cases = await prisma.case.findMany({
    orderBy: { lastUpdated: 'desc' },
    select: {
      id: true,
      title: true,
      category: true,
      status: true,
      lastUpdated: true,
      location: true,
    },
  });

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    investigation: 'bg-blue-100 text-blue-800',
    'court-proceedings': 'bg-purple-100 text-purple-800',
    closed: 'bg-green-100 text-green-800',
    'compensation-paid': 'bg-teal-100 text-teal-800',
    unresolved: 'bg-red-100 text-red-800',
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Cases</h2>
        <Link href="/admin/cases/new">
          <Button>Add New Case</Button>
        </Link>
      </div>
      <div className="grid gap-4">
        {cases.map((c) => (
          <Card key={c.id}>
            <CardContent className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-lg">{c.title}</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  <Badge variant="outline">{c.category}</Badge>
                  <Badge className={statusColors[c.status]}>{c.status.replace('-', ' ')}</Badge>
                  <span className="text-sm text-gray-500">{c.location}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Last updated: {format(new Date(c.lastUpdated), 'PPP')}
                </p>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/cases/${c.id}/edit`}>
                  <Button variant="outline" size="sm">Edit</Button>
                </Link>
                <form action={`/api/admin/cases/${c.id}`} method="POST">
                  <input type="hidden" name="_method" value="DELETE" />
                  <Button variant="destructive" size="sm" type="submit">Delete</Button>
                </form>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
