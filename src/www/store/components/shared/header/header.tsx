import React from 'react';
import classNames from 'classnames';
import styles from './header.module.scss';
import { Button } from '@/components/ui/button/button';

export const Header: React.FC = () => {
  return (
    <header className={classNames(styles.header)}>
      <div className={classNames(styles.inner)}>
        <Button>Войти</Button>
      </div>
    </header>
  );
};
