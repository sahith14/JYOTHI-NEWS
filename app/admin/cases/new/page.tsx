'use client';

import { useRouter } from 'next/navigation';
import { CaseForm } from '@/components/admin/CaseForm';
import { createCase } from '@/app/actions/createCase';

export default function NewCasePage() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    await createCase(data);
    router.push('/admin/dashboard');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Create New Case</h2>
      <CaseForm onSubmit={handleSubmit} />
    </div>
  );
}
