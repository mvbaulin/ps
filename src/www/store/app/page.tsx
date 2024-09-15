import { SectionPromo, Selection } from '@/components/shared';
import { prisma } from '@/lib/prisma';

export default async function Page() {
  const promo = await prisma.titles.findMany({
    take: 20
  });

  return (
    <main>
      {/* {
        promo.length > 0 &&
        <section>
          <SectionPromo titles={promo} />
        </section>
      } */}

      <Selection title="Рекомендуемые" items={promo} />
    </main>
  );
}
