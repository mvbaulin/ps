import React from 'react';
import classNames from 'classnames';
import styles from './icon-button.module.scss';
import Link from 'next/link';
import Icon from '@/components/ui/icon/icon';
import { IconNames } from '@/types/icon';

interface Props {
  children: string;
  type: IconNames
  href?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

export const IconButton: React.FC<Props> = ({
  type,
  children,
  href,
  onClick,
  ariaLabel
}) => {
  const content = (
    <>
      <span className="visually-hidden">{children}</span>
      <Icon name={type} size={36} />
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
