import { Container, Selection } from '@/components/shared';
import classNames from 'classnames';
import styles from './page.module.scss';
import { Filters } from '@/components/shared/filters/filters';

export default function Page() {

  const items = (
    <Selection
      items={[]}
    />
  );

  return (
    <main>
      <Container>
        <h1 className="visually-hidden">Каталог</h1>

        <div className={classNames(
          styles.catalog,
          classNames(styles['catalog--mobile']))}
        >
          <div className={styles.wrapper}>
            <Filters />
          </div>
        </div>

        <div className={classNames(
          styles.catalog,
          classNames(styles['catalog--tablet']))}
        >
          <div className={styles.wrapper}>

            <Filters />
          </div>
        </div>

        <div className={classNames(
          styles.catalog,
          classNames(styles['catalog--desktop']))}
        >
          <div className={styles.wrapper}>

            <Filters />
          </div>
        </div>
      </Container>
    </main>
  );
}
