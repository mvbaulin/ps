import React, { PropsWithChildren, useState } from 'react';
import classNames from 'classnames';
import styles from './sheet.module.scss';

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
    <div className={classNames(styles.sheet, { [styles.open]: isOpen })}>

    </div>
  );
};
