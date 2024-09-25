import { Container, Selection } from '@/components/shared';
import classNames from 'classnames';
import styles from './page.module.scss';
import { IconButton } from '@/components/ui';

export default function Page() {

  const items = (
    <Selection
      items={[]}
    />
  );

  const filters = (
    <div className={classNames(styles.filters)}>

    </div>
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
            <IconButton type="filters">Фильтры</IconButton>

            {items}
          </div>

        </div>

        <div className={classNames(
          styles.catalog,
          classNames(styles['catalog--tablet']))}
        >
          <div className={styles.wrapper}>
            <IconButton type="filters">Фильтры</IconButton>

            {items}
          </div>

        </div>

        <div className={classNames(
          styles.catalog,
          classNames(styles['catalog--desktop']))}
        >
          <div className={styles.wrapper}>
            {filters}
            {items}
          </div>

        </div>


      </Container>
    </main>
  );
}
