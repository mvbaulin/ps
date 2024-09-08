import React from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import styles from './activity-bar-item.module.scss';

type ButtonType = 'orders' | 'statistics' | 'admin' | 'profile';

interface Props {
  type: ButtonType;
  active: boolean;
  href: string;
  onClick?: () => void;
}

export const ActivityBarItem: React.FC<Props> = ({
  type,
  active = false,
  href,
  onClick
}) => {
  return (
    <Link
      href={href}
      passHref
      className={classNames(
        styles.button,
        styles[`button--${type}`],
        { [styles['button--active']]: active }
      )}
      aria-current={active ? 'page' : undefined}
      onClick={onClick}
    >
    </Link>
  );
};
