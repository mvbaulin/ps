'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Container } from '@/components/shared';
import { Filters } from '@/components/shared/';
import classNames from 'classnames';
import styles from './page.module.scss';
import { CatalogGrid } from '@/components/layouts/catalog-grid/catalog-grid';
import { fetchFilteredProducts } from '@/lib/api';
import { ITitle } from '@/types/title';

export default function Page() {
  const [titles, setTitles] = useState<ITitle[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadProducts = useCallback(async (pageNum: number = 1) => {
    const filteredProducts = await fetchFilteredProducts(selectedGenres, selectedProductTypes, pageNum);
    setTitles((prev) => (pageNum === 1 ? filteredProducts : [...prev, ...filteredProducts]));

    if (filteredProducts.length < 20) {
      setHasMore(false);
    }
  }, [selectedGenres, selectedProductTypes]);

  const handleFiltersChange = (newGenres: string[], newProductTypes: string[]) => {
    setSelectedGenres(newGenres);
    setSelectedProductTypes(newProductTypes);
    setPage(1);
    setHasMore(true);
  };

  useEffect(() => {
    loadProducts(1);
  }, [loadProducts]);

  const loadMoreProducts = async () => {
    const nextPage = page + 1;
    await loadProducts(nextPage);
    setPage(nextPage);
  };

  return (
    <main className={classNames('inner-page')}>
      <Container>
        <h1 className="visually-hidden">Каталог</h1>

        <div className={classNames(styles.catalog)}>
          <div className={styles.wrapper}>
            <Filters
              className={classNames(styles.filters)}
              onFiltersChange={handleFiltersChange}
            />

            <CatalogGrid
              titles={titles}
              onLoadMore={loadMoreProducts}
              hasMore={hasMore}
            />
          </div>
        </div>
      </Container>
    </main>
  );
}
