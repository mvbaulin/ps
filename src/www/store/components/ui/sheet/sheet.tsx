'use client';

import React, { PropsWithChildren } from 'react';
import classNames from 'classnames';
import styles from './sheet.module.scss';
import { IconButton } from '@/components/ui';

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
  return (
    <div className={classNames(styles.sheet, { [styles['sheet--open']]: isOpen })}>
      <div className={styles.close_wrapper}>
        <IconButton
          type="close"
          onClick={onClose}
        >Закрыть</IconButton>
      </div>

      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};
