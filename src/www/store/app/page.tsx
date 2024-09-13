import { SectionPromo } from '@/components/shared';
import { prisma } from '@/lib/prisma';

export default async function Page() {
  const promo = await prisma.v_promo.findMany({});

  return (
    <main>
      {promo.length > 0 && <SectionPromo titles={promo} />}
    </main>
  );
}
