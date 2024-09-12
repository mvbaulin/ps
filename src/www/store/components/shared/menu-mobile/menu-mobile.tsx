'use client';

import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './menu-mobile.module.scss';
import { IconButton, Sheet, Overlay } from '@/components/ui';
import { DEVICE_CODES } from '@/constants/device-width';
import useDeviceInfo from '@/hooks/use-viewport-width';
import { ICON_SIZES } from '@/constants/icon-sizes';

interface Props {}

export const MenuMobile: React.FC<Props> = () => {
  const { deviceType } = useDeviceInfo();

  const deviceSizeMap = {
    [DEVICE_CODES.MOBILE]: ICON_SIZES.MOBILE,
    [DEVICE_CODES.MOBILE_LARGE]: ICON_SIZES.MOBILE,
    [DEVICE_CODES.TABLET]: ICON_SIZES.TABLET,
    [DEVICE_CODES.TABLET_LARGE]: ICON_SIZES.TABLET,
    [DEVICE_CODES.DESKTOP]: ICON_SIZES.DESKTOP,
    [DEVICE_CODES.DESKTOP_LARGE]: ICON_SIZES.DESKTOP,
  };

  let buttonSize = deviceSizeMap[deviceType] || ICON_SIZES.MOBILE;

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
      <IconButton type="menu" size={buttonSize} onClick={() => clickHandler(true)}>
        Меню
      </IconButton>

      <Overlay isVisible={overlayIsVisible} onClose={() => clickHandler(false)} />

      <Sheet isOpen={isOpen} onClose={() => clickHandler(false)}>
        <nav className={classNames(styles.nav)}>
          <ul className={classNames(styles.list)}>
            <li className={classNames(styles.item)}>
              Элемент
            </li>
          </ul>
        </nav>
      </Sheet>
    </div>
  );
};
