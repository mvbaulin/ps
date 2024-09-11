import React from 'react';
import classNames from 'classnames';
import styles from './header.module.scss';
import { IconButton, Input, Button } from '@/components/ui';
import { Logo, ProfileButton, Search } from '@/components/shared';

export const Header: React.FC = () => {
  return (
    <>
      <header className={classNames(styles.header, styles.header__mobile)}>
        <nav className={styles.nav}>
          <Logo height={24} width={24} />

          <Search />

          <IconButton type="menu">Меню</IconButton>
        </nav>
      </header>

      <header className={classNames(styles.header, styles.header__tablet)}>
        <nav className={styles.nav}>
          <Logo width={32} height={32} />

          <Search />

          <IconButton type="menu">Меню</IconButton>
        </nav>
      </header>

      <header className={classNames(styles.header, styles.header__desktop)}>
        <nav className={styles.nav}>
          <Logo width={36} height={36} />

          <Button
            type="link"
            color="secondary"
            href="/catalog"
          >
              Каталог
          </Button>

          <Search />

          <div>
            <ProfileButton/>
            <IconButton type="favorites">Избранное</IconButton>
            <IconButton type="cart">Корзина</IconButton>
          </div>
        </nav>
      </header>
    </>
  );
};
