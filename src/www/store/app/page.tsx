import { SectionPromo, Selection } from '@/components/shared';
import { prisma } from '@/lib/prisma';

export default async function Page() {
  const promo = await prisma.v_promo.findMany({});

  return (
    <main>
      {
        promo.length > 0 &&
        <section>
          <SectionPromo titles={promo} />
        </section>
      }

      <Selection title="Рекомендуемые" items={promo} />
    </main>
  );
}
