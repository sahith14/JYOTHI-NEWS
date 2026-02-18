import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface TimelineEvent {
  id: string;
  date: Date;
  title: string;
  description: string;
  source?: string | null;
}

export default function Timeline({ events }: { events: TimelineEvent[] }) {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Timeline of Events</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {events.map((event, index) => (
            <div key={event.id}>
              <div className="flex gap-4">
                <div className="min-w-[100px] font-semibold text-gray-600">
                  {format(new Date(event.date), 'PPP')}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{event.title}</h3>
                  <p className="text-gray-700 mt-1">{event.description}</p>
                  {event.source && (
                    <a href={event.source} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline mt-1 inline-block">
                      Source
                    </a>
                  )}
                </div>
              </div>
              {index < events.length - 1 && <Separator className="my-4" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
