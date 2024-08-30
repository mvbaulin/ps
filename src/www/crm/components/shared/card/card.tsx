import React, { PropsWithChildren } from 'react';
import classNames from 'classnames';
import styles from './card.module.scss';
import { Layout, Title, Text } from '@/components/shared';

interface Props {
  type?: 'default' | 'contrast';
  title: string;
  text: string;
}

export const Card: React.FC<PropsWithChildren<Props>> = (
  {
    type = 'default',
    title,
    text
  }
) => {
  return (
    <Layout type={type}>
      <div className={classNames(styles.wrapper)}>
        <Title size="small" color={type}>{title}</Title>
        <Text type={type}>{text}</Text>
      </div>
    </Layout>
  );
};
