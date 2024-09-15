import React from 'react';
import classNames from 'classnames';
import styles from './carousel.module.scss';

interface Props {
  children: React.ReactNode;
  rows?: number;
}

export const Carousel: React.FC<Props> = ({
  children,
  rows = 1
}) => {
  if (rows > 4) {
    rows = 4;
  }

  return (
    <div className={classNames(styles.wrapper)}>
      <div className={classNames(styles.carousel, styles[`rows-${rows}`])}>
        {React.Children.map(children, (child, index) => (
          <div key={index} className={classNames(styles.item)}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};
