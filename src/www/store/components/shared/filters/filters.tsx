'use client';

import React from 'react';
import classNames from 'classnames';
import styles from './filters.module.scss';
import { useGenres } from '@/hooks/use-genres';
import { Toggle, Dropdown } from '@/components/ui';
import { IGenre } from '@/types/filters';
import { useProductTypes } from '@/hooks/use-product-types';

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({
  className
}) => {
  const genres = useGenres();
  const productTypes = useProductTypes();

  const genresNode = (
    genres.results.map((genre) => (
      <Toggle
        key={genre.genre}
        label={genre.genre}
        className={styles.toggle}
      />
    ))
  );

  const productTypesNode = (
    productTypes.results.map((productType) => (
      <Toggle
        key={productType.productType}
        label={productType.productType}
        className={styles.toggle}
      />
    ))
  );

  return (
    <div className={classNames(styles.filters, className)}>
      {genres && (
        <Dropdown
          title="Жанр"
          className={styles.dropdown}
        >
          {genresNode}
        </Dropdown>
      )}

      {productTypes && (
        <Dropdown
          title="Тип"
          className={styles.dropdown}
        >
          {productTypesNode}
        </Dropdown>
      )}
    </div>
  );
};
