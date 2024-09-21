'use client';

import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './header.module.scss';
import { IconButton, Button } from '@/components/ui';
import { Container, Logo, MenuMobile, ProfileButton, ScrollUpButton, Search } from '@/components/shared';

export const Header: React.FC = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);
  const [showScrollUpButton, setShowScrollUpButton] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    const screenHeight = window.innerHeight;

    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    const newTimeout = setTimeout(() => {
      if (currentScrollY > scrollPosition && currentScrollY > 300) {
        setIsHidden(true);
      } else if (currentScrollY < scrollPosition) {
        setIsHidden(false);
      }

      if (currentScrollY > screenHeight) {
        setShowScrollUpButton(true);
      } else {
        setShowScrollUpButton(false);
      }

      setScrollPosition(currentScrollY);
    }, 300);

    setScrollTimeout(newTimeout);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [scrollPosition]);

  return (
    <>
      <header className={classNames(
        styles.header,
        styles['header--mobile'],
        { [styles['header--focused']]: isSearchFocused }
      )}>
        <Container>
          <nav className={classNames(styles.inner)}>
            <Logo />
            <Search
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            <MenuMobile />
          </nav>
        </Container>
      </header>

      <header className={classNames(
        styles.header,
        styles['header--tablet'],
      )}>
        <Container>
          <nav className={classNames(styles.inner)}>
            <Logo />
            <Search
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            <MenuMobile />
          </nav>
        </Container>
      </header>

      <header className={classNames(
        styles.header,
        styles['header--desktop'],
      )}>
        <Container>
          <nav className={classNames(styles.inner)}>
            <div className={classNames(styles.left)}>
              <Logo />
            </div>

            <div className={classNames(styles.center)}>
              <Button type="link" href="/catalog">Каталог</Button>
              <Search
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>

            <div className={classNames(styles.right)}>
              <ProfileButton />
              <IconButton type="favorites">Избранное</IconButton>
              <IconButton type="cart">Корзина</IconButton>
            </div>
          </nav>
        </Container>
      </header>
    </>
  );
};
