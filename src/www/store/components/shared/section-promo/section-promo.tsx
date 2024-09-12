import React from 'react';
import classNames from 'classnames';
import styles from './section-promo.module.scss';
import { Image } from '@/components/shared';

export const SectionPromo: React.FC = () => {
  return (
    <div className={classNames(styles.promo)}>
      <ul className={classNames(styles.list)}>
        <li className={classNames(styles.item)}>
          <Image
            src="/promo.jpeg"
            alt="promo"
            width={1920}
            height={1080}
            className={classNames(styles.image)}
          >
          </Image>
        </li>
      </ul>
    </div>
  );
};
