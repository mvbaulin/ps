import { Promo, Selection } from '@/components/layouts';
import classNames from 'classnames';
import styles from './page.module.scss';
import { getPromo } from '@/lib/promo';

export default async function Page() {
  const promo = await getPromo();

  return (
    <main className={classNames(styles.main)}>
      <Promo titles={promo} />

      <Selection title="Рекомендуемые" items={promo} />
    </main>
  );
}
