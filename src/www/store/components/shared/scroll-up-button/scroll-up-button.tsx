import React from 'react';
import classNames from 'classnames';
import styles from './scroll-up-button.module.scss';
import { IconButton } from '@/components/ui';
import { ICON_SIZES } from '@/constants/icon-sizes';

export const ScrollUpButton: React.FC = () => {
  return (
    <div className={classNames(styles.wrapper)}>
      <IconButton
        type="scroll-up"
        ariaLabel="Наверх"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        size={ICON_SIZES.MOBILE}
      >
        Наверх
      </IconButton>
    </div>
  );
};
