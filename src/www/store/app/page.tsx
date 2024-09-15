import { SectionPromo, Selection } from '@/components/shared';
import { prisma } from '@/lib/prisma';

export default async function Page() {
  const promo = await prisma.v_promo.findMany({
    take: 6,
  });

  return (
    <main>
      {
        promo.length > 0 &&
        <section>
          <SectionPromo titles={promo} interval={30000} />
        </section>
      }

      <Selection title="Рекомендуемые" items={promo} />

      <Selection title="Новинки" items={promo} />
    </main>
  );
}
