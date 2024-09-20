import React from 'react';
import classNames from 'classnames';
import styles from './scroll-up-button.module.scss';
import { IconButton } from '@/components/ui';

export const ScrollUpButton: React.FC = () => {
  return (
    <div className={classNames(styles.wrapper)}>
      <IconButton
        type="scroll-up"
        ariaLabel="Наверх"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        Наверх
      </IconButton>
    </div>
  );
};
