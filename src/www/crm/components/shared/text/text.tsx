import React from 'react';
import classNames from 'classnames';
import styles from './text.module.scss';

interface Props {
  children?: React.ReactNode;
  type?: 'default' | 'contrast';
}

export const Text: React.FC<Props> = ({ children, type = 'default' }) => {
  return (
    <p className={classNames(styles.text, styles[`text--${type}`])}>
      {children}
    </p>
  );
};
