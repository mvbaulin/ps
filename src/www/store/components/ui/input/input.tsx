import React from 'react';
import classNames from 'classnames';
import styles from './input.module.scss';

interface Props {
  type?: 'text' | 'password' | 'email' | 'number' | 'search';
  color?: 'default' | 'darker';
  placeholder: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  name?: string;
}

export const Input: React.FC<Props> = ({
  type = 'text',
  color = 'default',
  placeholder = '',
  value,
  onChange,
  disabled = false,
  name,
}) => {
  const classes = classNames(
    styles.input,
    styles[`input--${type}`],
    styles[`input--${color}`],
  );

  return (
    <input
      type={type}
      placeholder={placeholder}
      aria-label={placeholder}
      className={classes}
      value={value}
      onChange={onChange}
      disabled={disabled}
      name={name}
    />
  );
};
