import React, { PropsWithChildren } from 'react';
import classNames from 'classnames';
import styles from './section.module.scss';
import { Title } from '@/components/shared';

interface Props {
  title: string;
  children: React.ReactNode;
}

export const Section: React.FC<PropsWithChildren<Props>> = (
  {
    title,
    children
  }
) => {
  return (
    <section className={classNames(styles.section)}>
      <div className={classNames(styles.inner)}>
        <Title>{title}</Title>
        {children}
      </div>
    </section>
  );
};
