'use client';

import React from 'react';
import { Section, TitleCard, Carousel } from '@/components/shared';
import { ITitle } from '@/types/title';
import classNames from 'classnames';
import styles from './selection.module.scss';
import useDeviceInfo from '@/hooks/use-device';
import { DeviceCodes } from '@/constants/constants';

interface Props {
  title?: string;
  items: ITitle[];
  className?: string;
}

export const Selection: React.FC<Props> = ({
  items,
  title,
  className
}) => {
  const { generalDeviceType } = useDeviceInfo();

  if (!items?.length) {
    return null;
  }

  return (
    <>
      {[DeviceCodes.MOBILE].includes(generalDeviceType) && (
        <Section
          title={title}
          container={false}
          className={classNames(
            styles.selection,
            styles['selection--mobile'],
            className
          )}
        >
          <Carousel rows={1}>
            {items.map((item) => (
              <TitleCard
                key={item.id}
                title={item}
              />
            ))}
          </Carousel>
        </Section>
      )}

      {[DeviceCodes.TABLET].includes(generalDeviceType) && (
        <Section
          title={title}
          container={false}
          className={classNames(styles.selection, styles['selection--tablet'])}
        >
          <Carousel rows={1}>
            {items.map((item) => (
              <TitleCard
                key={item.id}
                title={item}
              />
            ))}
          </Carousel>
        </Section>
      )}

      {[DeviceCodes.DESKTOP].includes(generalDeviceType) && (
        <Section
          title={title}
          container={true}
          className={classNames(styles.selection, styles['selection--desktop'])}
        >
          <div className={styles.list}>
            {items.map((item) => (
              <TitleCard
                key={item.id}
                title={item}
                responsive
              />
            ))}
          </div>
        </Section>
      )}
    </>
  );
};
