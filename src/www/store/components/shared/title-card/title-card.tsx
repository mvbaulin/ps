import React from 'react';
import classNames from 'classnames';
import styles from './title-card.module.scss';
import ITitle from '@/types/title';
import { Image, Price, TitleBadge } from '@/components/shared';
import { Button } from '@/components/ui';
import Link from 'next/link';
import { getBadges, getFormatedData, getPrice } from '@/lib/title';

interface Props {
  title: ITitle;
}

export const TitleCard: React.FC<Props> = ({
  title
}) => {

  const formatedData = getFormatedData(title);
  const badges = getBadges(formatedData);
  const price = getPrice(title.offer_none_original_price, title.offer_none_discount_price);

  return (
    <article className={classNames(styles.card)}>
      <Link href={`/store/category/titles/${title.id}`}>
        <div className={classNames(styles.image_wrapper)}>
          <Image
            className={classNames(styles.image)}
            src={title?.cover || '#'}
            alt={title?.title || title.id}
          />
        </div>

        <div className={classNames(styles.container)}>
          <h3 className={classNames(styles.title)}>
            {title.title}
          </h3>

          <p className={classNames(styles.developer)}>
            {title.publisher}
          </p>

          <ul className={classNames(styles.badges)}>
            {badges && badges.map((b, i) => (
              <li className={classNames(styles.badge)} key={b}>
                <TitleBadge type={b} />
              </li>
            ))}
          </ul>

          <div className={classNames(styles.price)}>
            <Price price={price} />
          </div>

          <Button wide>
            В корзину
          </Button>
        </div>
      </Link>
    </article>
  );
};
