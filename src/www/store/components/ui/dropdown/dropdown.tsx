'use client';

import React from 'react';
import classNames from 'classnames';
import styles from './dropdown.module.scss';

interface Props {
  title?: string;
  className?: string;
  children?: React.ReactNode;
  defaultOpen?: boolean;
}

export const Dropdown: React.FC<Props> = ({
  className,
  title,
  children,
  defaultOpen = false
}) => {
  const [active, setActive] = React.useState(defaultOpen);

  return (
    <div className={classNames(
      styles.dropdown,
      { [styles['dropdown--active']]: active && children },
      className
    )}>
      <button
        className={classNames(styles.title)}
        onClick={() => setActive((prev) => !prev)}
      >
        {title}
      </button>

      <div className={classNames(styles.list, className)}>
        {children}
      </div>
    </div>
  );
};
