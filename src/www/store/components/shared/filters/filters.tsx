'use client';

import React, { useEffect } from 'react';
import classNames from 'classnames';
import styles from './filters.module.scss';
import { Toggle, Dropdown } from '@/components/ui';
import { useGenres, useProductTypes } from '@/storage/zustand';
import { IGenre, IProductType } from '@/types/filters';

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { genres, fetchGenres } = useGenres();
  const { productTypes, fetchProductTypes } = useProductTypes();

  useEffect(() => {
    fetchGenres();
    fetchProductTypes();
  }, [fetchGenres, fetchProductTypes]);

  const renderToggles = (items: Array<IGenre | IProductType>) =>
    items.map((item) => (
      <Toggle
        key={item.id}
        label={item.name}
        className={styles.toggle}
      />
    ));

  return (
    <div className={classNames(styles.filters, className)}>
      {genres.length > 0 && (
        <Dropdown title="Жанр" className={styles.dropdown}>
          {renderToggles(genres)}
        </Dropdown>
      )}

      {productTypes.length > 0 && (
        <Dropdown title="Тип" className={styles.dropdown}>
          {renderToggles(productTypes)}
        </Dropdown>
      )}
    </div>
  );
};
