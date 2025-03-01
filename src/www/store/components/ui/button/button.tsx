import React from 'react';
import classNames from 'classnames';
import styles from './button.module.scss';
import Link from 'next/link';
import { Color } from '@/types/color';

interface Props {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'link';
  href?: string;
  color?: Color
  bordered?: boolean;
  uppercase?: boolean;
  disabled?: boolean;
  wide?: boolean;
  transparent?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Button: React.FC<Props> = ({
  children,
  type = 'button',
  href = '',
  color = 'primary',
  bordered = false,
  uppercase = true,
  disabled = false,
  wide = false,
  transparent = false,
  className,
  onClick,
}) => {
  const classes = classNames(
    styles.button,
    styles[`button--${color}`],
    bordered && styles['button--bordered'],
    uppercase && styles['button--uppercase'],
    disabled && styles['button--disabled'],
    wide && styles['button--wide'],
    transparent && styles['button--transparent'],
    className,
  );

  if (type === 'link') {
    return (
      <Link
        className={classes}
        href={href}
        onClick={disabled ? (e) => e.preventDefault() : undefined}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
