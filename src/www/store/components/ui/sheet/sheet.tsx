'use client';

import React, { PropsWithChildren } from 'react';
import classNames from 'classnames';
import styles from './sheet.module.scss';
import { IconButton } from '@/components/ui';
import { ICON_SIZES } from '@/constants/icon-sizes';
import useDeviceInfo from '@/hooks/use-device';
import { DEVICE_CODES } from '@/constants/device-width';

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const Sheet: React.FC<PropsWithChildren<Props>> = ({
  children,
  isOpen,
  onClose
}) => {
  const { deviceType } = useDeviceInfo();

  const deviceSizeMap = {
    [DEVICE_CODES.MOBILE]: ICON_SIZES.MOBILE,
    [DEVICE_CODES.MOBILE_LARGE]: ICON_SIZES.MOBILE,
    [DEVICE_CODES.TABLET]: ICON_SIZES.TABLET,
    [DEVICE_CODES.TABLET_LARGE]: ICON_SIZES.TABLET,
    [DEVICE_CODES.DESKTOP]: ICON_SIZES.DESKTOP,
    [DEVICE_CODES.DESKTOP_LARGE]: ICON_SIZES.DESKTOP
  };

  let buttonSize = deviceSizeMap[deviceType] || ICON_SIZES.MOBILE;

  return (
    <div className={classNames(styles.sheet, { [styles['sheet--open']]: isOpen })}>
      <div className={styles.close_wrapper}>
        <IconButton
          type="close"
          size={buttonSize}
          onClick={onClose}
        >Закрыть</IconButton>
      </div>

      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};
