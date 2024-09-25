'use client';

import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './menu-mobile.module.scss';
import { IconButton, Sheet, Overlay } from '@/components/ui';
import Link from 'next/link';

interface Props {}

export const MenuMobile: React.FC<Props> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [overlayIsVisible, setOverlayIsVisible] = useState(false);

  const clickHandler = (toggle: boolean) => {
    setIsOpen(toggle);
    setOverlayIsVisible(toggle);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        clickHandler(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen]);

  return (
    <div className={classNames(styles.menuMobile)}>
      <IconButton type="menu" onClick={() => clickHandler(true)}>
        Меню
      </IconButton>

      <Overlay isVisible={overlayIsVisible} onClose={() => clickHandler(false)} />

      <Sheet isOpen={isOpen} onClose={() => clickHandler(false)}>
        <nav className={classNames(styles.nav)}>
          <ul className={classNames(styles.list)}>
            <li className={classNames(styles.item)}>
              <Link
                href="/catalog"
                onClick={() => clickHandler(false)}>
                  Каталог
              </Link>
            </li>
          </ul>
        </nav>
      </Sheet>
    </div>
  );
};
