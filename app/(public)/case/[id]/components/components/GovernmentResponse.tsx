import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface GovResponse {
  id: string;
  announcements: string[];
  compensation?: string | null;
  officialStatements: string[];
  filedFIR?: boolean | null;
  arrests?: number | null;
  chargesheetFiled?: boolean | null;
}

export default function GovernmentResponse({ responses }: { responses: GovResponse[] }) {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Government Response</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {responses.map((resp, index) => (
          <div key={resp.id}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resp.filedFIR !== null && (
                <div>
                  <h3 className="font-semibold">FIR Filed</h3>
                  <p>{resp.filedFIR ? 'Yes' : 'No'}</p>
                </div>
              )}
              {resp.arrests !== null && (
                <div>
                  <h3 className="font-semibold">Arrests Made</h3>
                  <p>{resp.arrests}</p>
                </div>
              )}
              {resp.chargesheetFiled !== null && (
                <div>
                  <h3 className="font-semibold">Chargesheet Filed</h3>
                  <p>{resp.chargesheetFiled ? 'Yes' : 'No'}</p>
                </div>
              )}
              {resp.compensation && (
                <div>
                  <h3 className="font-semibold">Compensation</h3>
                  <p>{resp.compensation}</p>
                </div>
              )}
            </div>

            {resp.announcements.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold">Announcements</h3>
                <ul className="list-disc list-inside">
                  {resp.announcements.map((a, i) => <li key={i}>{a}</li>)}
                </ul>
              </div>
            )}

            {resp.officialStatements.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold">Official Statements</h3>
                <ul className="list-disc list-inside">
                  {resp.officialStatements.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            )}

            {index < responses.length - 1 && <Separator className="my-4" />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
