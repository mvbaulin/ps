import React from 'react';
import styles from './section-title.module.scss';
import classNames from 'classnames';

interface Props {
  children: string;
  position?: 'left' | 'center' | 'right';
  className?: string
}

export const SectionTitle: React.FC<Props> = ({
  children,
  position = 'left',
  className
}) => {
  return (
    <h2 className={
      classNames(styles.section_title, styles[`section_title--${position}`], className)
    }>
      {children}
    </h2>
  );
};
