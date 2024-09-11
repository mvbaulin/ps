import React from 'react';
import classNames from 'classnames';
import classes from './icon-button.module.scss';
import Link from 'next/link';

interface Props {
  children: string;
  type: 'cart' | 'favorites' | 'menu';
}

export const IconButton: React.FC<Props> = ({
  type,
  children,
}) => {
  return (
    <div
      className={classNames(classes.button, classes[`button--${type}`])}
    >
      <Link href="/cart">
        <span className="visually-hidden">
          {children}
        </span>
      </Link>
    </div>
  );
};
