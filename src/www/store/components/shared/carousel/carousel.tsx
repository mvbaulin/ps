import React from 'react';
import classNames from 'classnames';
import styles from './carousel.module.scss';

interface Props {
  children: React.ReactNode;
}

export const Carousel: React.FC<Props> = ({
  children
}) => {
  return (
    <div
      className={styles.carousel}
    >
      {React.Children.map(children, (child, index) => (
        <div key={index} className={classNames(styles.item)}>
          {child}
        </div>
      ))}
    </div>
  );
};
