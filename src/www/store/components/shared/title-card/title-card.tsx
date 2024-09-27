import React from 'react';
import classNames from 'classnames';
import styles from './title-card.module.scss';
import { ITitle } from '@/types/title';
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
  const price = getPrice(title.offerNoneOriginalPrice, title.offerNoneDiscountPrice);

  return (
    <article className={classNames(styles.card)}>
      <Link href={`/catalog/titles/${title.id}`} className={classNames(styles.link)}>
        <div className={classNames(styles.wrapper)}>
          <div className={classNames(styles.image_wrapper)}>
            <Image
              className={classNames(styles.image)}
              src={title?.cover + '?w=420&h=270' || '#'}
              alt={title?.title || title.id}
              width={420}
              height={270}
            />
          </div>

          <div className={classNames(styles.top)}>
            <div className={classNames(styles.inner)}>
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
            </div>
          </div>

          <div className={classNames(styles.bottom)}>
            <div className={classNames(styles.price)}>
              {title.hasOfferNone &&
                <Price price={price} />
              }
            </div>


            <div className={classNames(styles.button)}>
              <Button>
                В корзину
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};
