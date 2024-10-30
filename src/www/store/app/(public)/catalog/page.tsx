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

  const handleFiltersChange = async (newGenres: string[], newProductTypes: string[]) => {
    setSelectedGenres(newGenres);
    setSelectedProductTypes(newProductTypes);
    setPage(1);
    setHasMore(true);

    console.log('Selected Genres:', newGenres);
    console.log('Selected Product Types:', newProductTypes);

    await loadProducts(1, newGenres, newProductTypes);

    const genreParam = newGenres.length ? `genres=${encodeURIComponent(newGenres.join(','))}` : '';
    const productTypeParam = newProductTypes.length ? `productTypes=${encodeURIComponent(newProductTypes.join(','))}` : '';
    const query = `?${[genreParam, productTypeParam].filter(Boolean).join('&')}`;

    window.history.pushState({}, '', query);
  };

  useEffect(() => {
    const { searchParams } = new URL(window.location.href);
    const genresFromUrl = searchParams.get('genres')?.split(',') || [];
    const productTypesFromUrl = searchParams.get('productTypes')?.split(',') || [];

    setSelectedGenres(genresFromUrl);
    setSelectedProductTypes(productTypesFromUrl);
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
              selectedGenres={selectedGenres}
              selectedProductTypes={selectedProductTypes}
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
