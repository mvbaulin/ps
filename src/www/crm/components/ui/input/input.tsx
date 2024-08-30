import React from 'react';
import classes from './input.module.scss';

interface Props {
  type?: string;
  placeholder: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  id?: string;
  name?: string;
  autoComplete?: string;
}

export const Input: React.FC<Props> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  className,
  id,
  name,
  autoComplete,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`${classes.input} ${className || ''}`}
      id={id}
      name={name}
      autoComplete={autoComplete}
    />
  );
};
