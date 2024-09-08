import React, { PropsWithChildren } from 'react';
import classNames from 'classnames';
import styles from './layout.module.scss';

interface Props {
  children: React.ReactNode
  type?: 'default' | 'contrast'
}

export const Layout: React.FC<PropsWithChildren<Props>> = (
  {
    type = 'default',
    children
  }
) => {
  return (
    <div className={classNames(styles.layout, styles[`layout--${type}`])}>
      {children}
    </div>
  );
};
