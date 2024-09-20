'use client';

import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './header.module.scss';
import { IconButton, Button } from '@/components/ui';
import { Logo, MenuMobile, ProfileButton, ScrollUpButton, Search } from '@/components/shared';

export const Header: React.FC = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);
  const [showScrollUpButton, setShowScrollUpButton] = useState(false);

  // const handleScroll = () => {
  //   const currentScrollY = window.scrollY;
  //   const screenHeight = window.innerHeight;

  //   if (scrollTimeout) {
  //     clearTimeout(scrollTimeout);
  //   }

  //   const newTimeout = setTimeout(() => {
  //     if (currentScrollY > scrollPosition && currentScrollY > 300) {
  //       setIsHidden(true);
  //     } else if (currentScrollY < scrollPosition) {
  //       setIsHidden(false);
  //     }

  //     if (currentScrollY > screenHeight) {
  //       setShowScrollUpButton(true);
  //     } else {
  //       setShowScrollUpButton(false);
  //     }

  //     setScrollPosition(currentScrollY);
  //   }, 300);

  //   setScrollTimeout(newTimeout);
  // };

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //     if (scrollTimeout) {
  //       clearTimeout(scrollTimeout);
  //     }
  //   };
  // }, [scrollPosition]);

  return (
    <>
      <header
        className={classNames(
          styles.header,
          styles.header__mobile,
          styles.header__tablet,
          { [styles['header--hidden']]: isHidden }
        )}
      >
        <nav className={styles.nav}>
          <Logo />
          <Search />
          <MenuMobile />
        </nav>
      </header>

      <header
        className={classNames(
          styles.header,
          styles.header__desktop,
          { [styles['header--hidden']]: isHidden }
        )}
      >
        <nav className={styles.nav}>
          <Logo />
          <Button type="link" color="secondary" href="/catalog">
            Каталог
          </Button>
          <Search />
          <div className={styles.inner}>
            <ProfileButton />
            <IconButton type="favorites">
              Избранное
            </IconButton>
            <IconButton type="cart">
              Корзина
            </IconButton>
          </div>
        </nav>
      </header>

      <div className={classNames(styles.scrollUpButton, { [styles['scrollUpButton--visible']]: showScrollUpButton })}>
        <ScrollUpButton />
      </div>
    </>
  );
};
