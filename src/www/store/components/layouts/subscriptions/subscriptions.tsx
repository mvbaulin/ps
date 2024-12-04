import { Section, SubscriptionCard } from '@/components/shared';
import { ISubscriptions } from '@/types/subscription';
import classNames from 'classnames';
import styles from './subscriptions.module.scss';
import React from 'react';

interface Props {
  items: ISubscriptions;
  className?: string;
}

export const Subscriptions: React.FC<Props> = ({
  items,
  className
}) => {
  return (

    <Section
      id="subscriptions"
      className={className}
      title="Подписки"
    >
      <div className={styles.wrapper}>
        <SubscriptionCard subscription={items.psPlus} />
        <SubscriptionCard subscription={items.ubisoftPlus} />
        <SubscriptionCard subscription={items.gtaPlus} />
        <SubscriptionCard subscription={items.eaPlay} />
      </div>
    </Section>
  );
};
