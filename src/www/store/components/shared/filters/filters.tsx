// Filters.tsx
'use client';

import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './filters.module.scss';
import { Toggle, Dropdown, Button } from '@/components/ui';
import { useGenres, useProductTypes } from '@/storage/zustand';

interface Props {
  className?: string;
  onFiltersChange: (selectedGenres: string[], selectedProductTypes: string[]) => void;
}

export const Filters: React.FC<Props> = ({ className, onFiltersChange }) => {
  const { genres, fetchGenres } = useGenres();
  const { productTypes, fetchProductTypes } = useProductTypes();

  const [tempSelectedGenres, setTempSelectedGenres] = useState<string[]>([]);
  const [tempSelectedProductTypes, setTempSelectedProductTypes] = useState<string[]>([]);

  React.useEffect(() => {
    fetchGenres();
    fetchProductTypes();
  }, [fetchGenres, fetchProductTypes]);

  const handleGenreToggle = (id: string) => {
    setTempSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((genre) => genre !== id) : [...prev, id]
    );
  };

  const handleProductTypeToggle = (id: string) => {
    setTempSelectedProductTypes((prev) =>
      prev.includes(id) ? prev.filter((type) => type !== id) : [...prev, id]
    );
  };

  const applyFilters = () => {
    onFiltersChange(tempSelectedGenres, tempSelectedProductTypes);
  };

  return (
    <div className={classNames(styles.filters, className)}>
      <form onSubmit={(e) => e.preventDefault()}>
        {productTypes.length > 0 && (
          <Dropdown title="Тип" className={styles.dropdown}>
            {productTypes.map((type) => (
              <Toggle
                key={type.id}
                label={type.name}
                className={styles.toggle}
                onToggle={() => handleProductTypeToggle(type.id)}
                isChecked={tempSelectedProductTypes.includes(type.id)}
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
                isChecked={tempSelectedGenres.includes(genre.id)}
              />
            ))}
          </Dropdown>
        )}

        <Button
          type="button"
          onClick={applyFilters}
          className={classNames(styles.button)}
          color="secondary"
          bordered
        >
          Применить
        </Button>
      </form>
    </div>
  );
};
