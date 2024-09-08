import React from 'react';
import classNames from 'classnames';
import styles from './button.module.scss';

interface Props {
  children: string;
  color?: 'primary' | 'secondary';
  wide?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit';
  uppercase?: boolean;
  onClick?: () => void;
}

export const Button: React.FC<Props> = ({
  children,
  color = 'primary',
  disabled = false,
  wide = false,
  type = 'button',
  uppercase = true,
  onClick
}) => {
  const buttonClass = classNames(
    styles.button,
    styles[`button--${color}`],
    {
      [styles['button--disabled']]: disabled,
      [styles['button--wide']]: wide,
      [styles['button--uppercase']]: uppercase
    }
  );

  return (
    <button
      className={buttonClass}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
