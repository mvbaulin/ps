import React from 'react';
import classNames from 'classnames';
import styles from './selection.module.scss';
import { Section, TitleCard } from '@/components/shared';
import ITitle from '@/types/title';

interface Props {
  title: string;
  items: ITitle[];
}

export const Selection: React.FC<Props> = ({
  items,
  title
}) => {
  return (
    <section className={classNames(styles.section)}>
      <Section title={title}>
        {items.map((item) => (
          <TitleCard key={item.id} title={item} />
        ))}
      </Section>
    </section>
  );
};
