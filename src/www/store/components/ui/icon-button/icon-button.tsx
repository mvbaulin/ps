import React from 'react';
import classNames from 'classnames';
import styles from './icon-button.module.scss';
import Link from 'next/link';
import Icon from '@/components/ui/icon/icon';

interface Props {
  children: string;
  type: 'cart' | 'favorites' | 'menu' | 'close' | 'scroll-up' | 'like';
  href?: string;
  size: number;
  onClick?: () => void;
  ariaLabel?: string;
}

export const IconButton: React.FC<Props> = ({
  type,
  children,
  href,
  size,
  onClick,
  ariaLabel
}) => {
  const content = (
    <>
      <span className="visually-hidden">{children}</span>
      <Icon name={type} size={size} />
    </>
  );

  return href ? (
    <Link
      href={href}
      className={styles.button}
    >
      <a aria-label={ariaLabel ||children}>
        {content}
      </a>
    </Link>
  ) : (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
      aria-label={ariaLabel || children}
    >
      {content}
    </button>
  );
};
