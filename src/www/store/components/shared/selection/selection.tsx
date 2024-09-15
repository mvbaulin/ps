'use client';

import React, { useRef } from 'react';
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
  const sliderRef = useRef<HTMLDivElement>(null);

  return (
    <Section title={title} container={false}>
      <div
        ref={sliderRef}
        className={styles.slider}
      >
        {items.map((item) => (
          <div key={item.id} className={classNames(styles.item)}>
            <TitleCard title={item} />
          </div>
        ))}
      </div>
    </Section>
  );
};
