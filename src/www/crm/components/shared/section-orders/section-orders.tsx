import React from 'react';
import classNames from 'classnames';
import styles from './section-orders.module.scss';
import { Section } from '@/components/shared';
import { Table } from '@/components/ui/table/table';

export const SectionOrders: React.FC = () => {
  const columns = [
    { label: 'ID' },
  ];

  const data = [
    {
      id: 1
    }
  ];

  return (
    <Section title="Заказы">
      <div className={classNames(styles.wrapper)}>
        <div className={classNames(styles.inner)}>
          <Table columns={columns} data={data} />
        </div>
      </div>
    </Section>
  );
};
