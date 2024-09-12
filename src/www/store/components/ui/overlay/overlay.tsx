'use client';

import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import styles from './overlay.module.scss';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

export const Overlay: React.FC<Props> = ({
  isVisible,
  onClose
}) => {
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <>
      {isVisible && (
        <div
          className={classNames(styles.overlay)}
          onClick={handleOverlayClick}
        ></div>
      )}
    </>
  );
};
