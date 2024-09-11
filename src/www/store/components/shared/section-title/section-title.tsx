import React from 'react';
import styles from './section-title.module.scss';
import classNames from 'classnames';

interface Props {
  children: string;
}

export const SectionTitle: React.FC<Props> = ({
  children,
}) => {
  return (
    <h2 className={classNames(styles.section_title)}>
      {children}
    </h2>
  );
};
