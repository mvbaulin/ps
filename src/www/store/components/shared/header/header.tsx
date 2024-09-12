import React from 'react';
import classNames from 'classnames';
import styles from './header.module.scss';
import { IconButton, Button, Sheet } from '@/components/ui';
import { Logo, MenuMobile, ProfileButton, Search } from '@/components/shared';
import { ICON_SIZES } from '@/constants/icon-sizes';

export const Header: React.FC = () => {
  return (
    <>
      <header className={classNames(
        styles.header, styles.header__mobile, styles.header__tablet)}>
        <nav className={styles.nav}>
          <Logo />

          <Search />

          <MenuMobile />
        </nav>
      </header>

      <header className={classNames(styles.header, styles.header__desktop)}>
        <nav className={styles.nav}>
          <Logo />

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

            <IconButton
              type="favorites"
              size={ICON_SIZES.DESKTOP}
            >Избранное
            </IconButton>

            <IconButton
              type="cart"
              size={ICON_SIZES.DESKTOP}
            >Корзина
            </IconButton>
          </div>
        </nav>
      </header>
    </>
  );
};
