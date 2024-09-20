import React from 'react';
import classNames from 'classnames';
import styles from './star-rating.module.scss';
import { Icon } from '@/components/ui';

interface Props {
  rating?: number | null;
  size?: number;
  className?: string;
}

export const StarRating: React.FC<Props> = ({
  rating = 0,
  size = 24,
  className,
}) => {
  if (rating == null) {
    return null;
  }

  if (rating > 5) {
    rating = 5;
  }

  const fullStarsCount = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStarsCount = 5 - fullStarsCount - (halfStar ? 1 : 0);

  return (
    <ul className={classNames(styles.stars, className)}>
      {Array.from({ length: fullStarsCount }, (_, idx) => (
        <li key={`full-${idx}`} className={styles.full}>
          <Icon name="star-full" size={size} />
        </li>
      ))}

      {halfStar && (
        <li key="half" className={styles.half}>
          <Icon name="star-half" size={size} />
        </li>
      )}

      {Array.from({ length: emptyStarsCount }, (_, idx) => (
        <li key={`empty-${idx}`} className={styles.empty}>
          <Icon name="star-empty" size={size} />
        </li>
      ))}
    </ul>
  );
};
