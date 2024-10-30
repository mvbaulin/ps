'use client';

import React, { useEffect } from 'react';
import classNames from 'classnames';
import styles from './filters.module.scss';
import { Toggle, Dropdown } from '@/components/ui';
import { useGenres, useProductTypes } from '@/storage/zustand';

interface Props {
  className?: string;
  onFiltersChange: (selectedGenres: string[], selectedProductTypes: string[]) => void;
  selectedGenres: string[];
  selectedProductTypes: string[];
}

export const Filters: React.FC<Props> = ({
  className,
  onFiltersChange,
  selectedGenres,
  selectedProductTypes,
}) => {
  const { genres, fetchGenres } = useGenres();
  const { productTypes, fetchProductTypes } = useProductTypes();

  useEffect(() => {
    fetchGenres();
    fetchProductTypes();
  }, [fetchGenres, fetchProductTypes]);

  const handleGenreToggle = (id: string) => {
    const updatedGenres = selectedGenres.includes(id)
      ? selectedGenres.filter((genre) => genre !== id)
      : [...selectedGenres, id];

    onFiltersChange(updatedGenres, selectedProductTypes);
  };

  const handleProductTypeToggle = (id: string) => {
    const updatedProductTypes = selectedProductTypes.includes(id)
      ? selectedProductTypes.filter((type) => type !== id)
      : [...selectedProductTypes, id];

    onFiltersChange(selectedGenres, updatedProductTypes);
  };

  return (
    <div className={classNames(styles.filters, className)}>
      <form onSubmit={(e) => e.preventDefault()}>
        {productTypes.length > 0 && (
          <Dropdown
            title="Тип"
            className={styles.dropdown}
            defaultOpen
            >
            {productTypes.map((type) => (
              <Toggle
                key={type.id}
                label={type.name}
                className={styles.toggle}
                onToggle={() => handleProductTypeToggle(type.id)}
                isChecked={selectedProductTypes.includes(type.id)}
              />
            ))}
          </Dropdown>
        )}

        {genres.length > 0 && (
          <Dropdown title="Жанр" className={styles.dropdown}>
            {genres.map((genre) => (
              <Toggle
                key={genre.id}
                label={genre.name}
                className={styles.toggle}
                onToggle={() => handleGenreToggle(genre.id)}
                isChecked={selectedGenres.includes(genre.id)}
              />
            ))}
          </Dropdown>
        )}
      </form>
    </div>
  );
};
