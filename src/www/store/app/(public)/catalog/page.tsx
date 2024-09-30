import { Container, Selection } from '@/components/shared';
import { Filters } from '@/components/shared/';
import classNames from 'classnames';
import styles from './page.module.scss';

export default function Page() {
  return (
    <main>
      <Container>
        <h1 className="visually-hidden">Каталог</h1>

        <div className={classNames(styles.catalog)}>
          <div className={styles.wrapper}>
            <Filters
              className={classNames(styles.filters)}
            />

            {/* <Selection
              items={[]}
            /> */}

            <div>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum, repellat!
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
