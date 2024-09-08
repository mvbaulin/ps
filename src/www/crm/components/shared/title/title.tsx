import React from 'react';
import styles from './title.module.scss';
import classNames from 'classnames';


interface Props {
  children: string;
  size?: 'small' | 'large';
  color?: 'default' | 'contrast';
}

export const Title: React.FC<Props> = (
  {
    children,
    size = 'large',
    color = 'default'
  }
) => {
  return (
    <h2
      className={classNames(
        styles.section_title ,
        styles[`title--${size}`],
        styles[`title--${color}`]
        )}>
      {children}
    </h2>
  );
};
