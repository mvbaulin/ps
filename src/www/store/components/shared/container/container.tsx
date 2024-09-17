import React from 'react';
import classNames from 'classnames';
import styles from './container.module.scss';

interface Props {
  children: React.ReactNode;
  noMobile?: boolean;
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  noMobile = false
}) => {
  return (
    <div
      className={classNames(
        styles.container,
        noMobile ? styles['container--no-mobile'] : ''
      )}
    >
      {children}
    </div>
  );
};
