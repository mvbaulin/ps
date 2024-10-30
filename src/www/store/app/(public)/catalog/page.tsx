'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { debounce } from 'lodash';
import { Container } from '@/components/shared';
import { Filters } from '@/components/shared/';
import classNames from 'classnames';
import styles from './page.module.scss';
import { CatalogGrid } from '@/components/layouts/';
import { fetchFilteredProducts } from '@/lib/api';
import { ITitle } from '@/types/title';

export default function Page() {
  const [titles, setTitles] = useState<ITitle[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [tempGenres, setTempGenres] = useState<string[]>([]);
  const [tempProductTypes, setTempProductTypes] = useState<string[]>([]);

  const loadProducts = useCallback(async (pageNum: number = 1, genres = selectedGenres, productTypes = selectedProductTypes) => {
    const filteredProducts = await fetchFilteredProducts(genres, productTypes, pageNum);

    if (pageNum === 1) {
      setTitles(filteredProducts);
    } else {
      setTitles((prev) => [...prev, ...filteredProducts]);
    }

    if (filteredProducts.length < 20) {
      setHasMore(false);
    }
  }, [selectedGenres, selectedProductTypes]);

  const debouncedLoadProducts = useCallback(
    debounce((genres, productTypes) => {
      setSelectedGenres(genres);
      setSelectedProductTypes(productTypes);
      setPage(1);
      setHasMore(true);

      loadProducts(1, genres, productTypes);
    }, 3000),
    [loadProducts]
  );

  const handleFiltersChange = (newGenres: string[], newProductTypes: string[]) => {
    setTempGenres(newGenres);
    setTempProductTypes(newProductTypes);

    const genreParam = newGenres.length ? `genres=${encodeURIComponent(newGenres.join(','))}` : '';
    const productTypeParam = newProductTypes.length ? `productTypes=${encodeURIComponent(newProductTypes.join(','))}` : '';
    const query = `?${[genreParam, productTypeParam].filter(Boolean).join('&')}`;

    window.history.pushState({}, '', query);

    debouncedLoadProducts(newGenres, newProductTypes);
  };

  useEffect(() => {
    const { searchParams } = new URL(window.location.href);
    const genresFromUrl = searchParams.get('genres')?.split(',') || [];
    const productTypesFromUrl = searchParams.get('productTypes')?.split(',') || [];

    setTempGenres(genresFromUrl);
    setTempProductTypes(productTypesFromUrl);
    setPage(1);
    setHasMore(true);

    loadProducts(1, genresFromUrl, productTypesFromUrl);
  }, []);

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
              selectedGenres={tempGenres}
              selectedProductTypes={tempProductTypes}
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
