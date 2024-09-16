import { SectionPromo, Selection } from '@/components/shared';
import { prisma } from '@/lib/prisma';
import classNames from 'classnames';
import styles from './page.module.scss';

export default async function Page() {
  const promo = await prisma.v_promo.findMany({
    take: 10,
  });

  return (
    <main className={classNames(styles.main)}>
      {
        promo.length > 0 &&
        <section>
          <SectionPromo titles={promo} interval={30000} />
        </section>
      }

      <Selection title="Рекомендуемые" items={promo} />

      <Selection title="Новинки" items={promo} />
      <Selection title="Новинки" items={promo} />
      <Selection title="Новинки" items={promo} />
      <Selection title="Новинки" items={promo} />
    </main>
  );
}
