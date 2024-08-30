import { SectionAdmin } from '@/components/shared';
import { prisma } from '@/lib/prisma';

export default async function Page() {
  const users = await prisma.crm_users.findMany({});

  return (
    <SectionAdmin users={users} />
  );
}
