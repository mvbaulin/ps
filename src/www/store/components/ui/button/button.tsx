import React from 'react';
import classNames from 'classnames';
import styles from './button.module.scss';
import Link from 'next/link';

interface Props {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'link';
  href?: string;
  color?: 'primary' | 'secondary' | 'tetriary';
  bordered?: boolean;
  uppercase?: boolean;
  disabled?: boolean;
  wide?: boolean;
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
  onClick,
}) => {
  const classes = classNames(
    styles.button,
    styles[`button--${color}`],
    bordered && styles['button--bordered'],
    uppercase && styles['button--uppercase'],
    disabled && styles['button--disabled'],
    wide && styles['button--wide']
  );

  if (type === 'link') {
    return (
      <Link
        className={classes}
        href={href}
        onClick={disabled ? (e) => e.preventDefault() : undefined}
      >
        <span>
          {children}
        </span>
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
