'use client';

import React from 'react';
import { Section, TitleCard, Carousel } from '@/components/shared';
import { ITitle } from '@/types/title';
import classNames from 'classnames';
import styles from './selection.module.scss';
import useDeviceInfo from '@/hooks/use-device';
import { DEVICE_CODES } from '@/constants/device-width';

interface Props {
  title?: string;
  items: ITitle[];
}

export const Selection: React.FC<Props> = ({ items, title }) => {
  const { generalDeviceType } = useDeviceInfo();

  if (!items?.length) {
    return null;
  }

  return (
    <>
      {[DEVICE_CODES.MOBILE].includes(generalDeviceType) && (
        <Section
          title={title}
          container={false}
          className={classNames(styles.selection, styles['selection--mobile'])}
        >
          <Carousel rows={1}>
            {items.map((item, index) => (
              <TitleCard
                key={index}
                title={item}
              />
            ))}
          </Carousel>
        </Section>
      )}

      {[DEVICE_CODES.TABLET].includes(generalDeviceType) && (
        <Section
          title={title}
          container={false}
          className={classNames(styles.selection, styles['selection--tablet'])}
          titleAlign="center"
        >
          <Carousel rows={2}>
            {items.map((item, index) => (
              <TitleCard
                key={index}
                title={item}
              />
            ))}
          </Carousel>
        </Section>
      )}

      {[DEVICE_CODES.DESKTOP].includes(generalDeviceType) && (
        <Section
          title={title}
          container={true}
          className={classNames(styles.selection, styles['selection--desktop'])}
        >
          <div className={styles.list}>
            {items.map((item, index) => (
              <TitleCard
                key={index}
                title={item}
              />
            ))}
          </div>
        </Section>
      )}
    </>
  );
};
