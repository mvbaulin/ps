import React from 'react';
import classNames from 'classnames';
import styles from './button.module.scss';

interface Props {
  children: string;
  wide?: boolean;
  type?: 'button' | 'submit';
  onClick?: () => void;
}

export const Button: React.FC<Props> = ({
  children,
  wide = false,
  type = 'button',
  onClick
}) => {
  const buttonClass = classNames(
    styles.button,
    {[styles['button--wide']]: wide}
  );

  return (
    <button
      className={buttonClass}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
