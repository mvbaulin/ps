import { Genres, Promo, Selection, Subscriptions } from '@/components/layouts';
import classNames from 'classnames';
import styles from './page.module.scss';
import { getPromo } from '@/lib/promo';
import { getSubscriptions } from '@/lib/subscription';
import { getGenres } from '@/lib/genre';

export default async function Page() {
  const promo = await getPromo();
  const subscriptions = await getSubscriptions();
  const genres = await getGenres();

  return (
    <main className={classNames(styles.main)}>
      <Promo titles={promo} />

      <Selection title="Рекомендуемые" items={promo} />

      <Subscriptions items={subscriptions} />

      <Genres items={genres} />
    </main>
  );
}
