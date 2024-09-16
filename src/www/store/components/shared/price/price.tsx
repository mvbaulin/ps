import React from 'react';
import classNames from 'classnames';
import styles from './price.module.scss';
import IPrice from '@/types/price';

interface Props {
  price: IPrice,
  className?: string,
  showDiscount?: boolean
}

export const Price: React.FC<Props> = ({
  price,
  className,
  showDiscount = true
}) => {
  const hasDiscount = price.discount < price.price;

  return (
    <div className={classNames(styles.price, className)}>
      <p className={classNames(styles.price_box)}>
        <span className={classNames(styles.price)}>{price.discount}</span>
        <span className={classNames(styles.currency)}>{`\u00A0${price.currency}`}</span>
      </p>

      {showDiscount && hasDiscount && (
        <p className={classNames(styles.discount_box)}>
          <span className={classNames(styles.discount)}>{price.price}</span>
          <span className={classNames(styles.currency)}>{`\u00A0${price.currency}`}</span>
        </p>
      )}
    </div>
  );
};
