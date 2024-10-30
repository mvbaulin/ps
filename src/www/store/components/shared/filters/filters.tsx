'use client';

import React, { useEffect } from 'react';
import classNames from 'classnames';
import styles from './filters.module.scss';
import { Toggle, Dropdown, Button } from '@/components/ui';
import { useGenres, useProductTypes } from '@/storage/zustand';
import { redirect } from 'next/navigation';

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

  const clearFilters = () => {
    onFiltersChange([], []);
    redirect('/catalog');
  };

  return (
    <div className={classNames(styles.filters, className)}>
      <form onSubmit={(e) => e.preventDefault()}>
        {productTypes.length > 0 && (
          <Dropdown
            title="Тип"
            className={styles.dropdown}
            >
            {productTypes.map((type) => (
              <Toggle
                key={type.id}
                label={type.translation || type.name}
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
                label={genre.translation || genre.name}
                className={styles.toggle}
                onToggle={() => handleGenreToggle(genre.id)}
                isChecked={selectedGenres.includes(genre.id)}
              />
            ))}
          </Dropdown>
        )}

        <Button
          bordered
          className={classNames(styles.clear)}
          color="secondary"
          onClick={clearFilters}
        >
          Очистить
        </Button>
      </form>
    </div>
  );
};
