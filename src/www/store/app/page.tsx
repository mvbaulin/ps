import { GenreCard, Section, SectionPromo, Selection } from '@/components/shared';
import classNames from 'classnames';
import styles from './page.module.scss';
import { getPromo } from '@/lib/promo';
import { getGenres } from '@/lib/genres';

export default async function Page() {
  const promo = await getPromo();
  const genres = await getGenres();

  return (
    <main className={classNames(styles.main)}>
      {
        promo.length > 0 &&
        <section>
          <SectionPromo titles={promo} interval={30000} />
        </section>
      }

      <Selection title="Рекомендуемые" items={promo} />

      {
        genres.length > 0 &&
        <Section title="Жанры">
          <div className={classNames(styles.genre_wrapper)}>
            {genres.map((genre) => (
              <GenreCard
                key={genre.title}
                genre={genre}
                className={styles.genre}
              />)
            )}
          </div>
        </Section>
      }
    </main>
  );
}
