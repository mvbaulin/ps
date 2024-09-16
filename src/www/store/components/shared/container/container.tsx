import React from 'react';
import classNames from 'classnames';
import styles from './container.module.scss';

interface Props {
  children: React.ReactNode;
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({
  children,
}) => {
  return (
    <div
      className={classNames(
        styles.container
      )}
    >
      {children}
    </div>
  );
};
