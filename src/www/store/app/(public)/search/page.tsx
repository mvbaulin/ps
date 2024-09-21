'use client';

import { useSearchParams } from 'next/navigation';
import { useSearchResults } from '@/hooks/use-search-result';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams?.get('q');
  const { results, loading, error } = useSearchResults(searchQuery);

  return (
    <main>
      <h1>Search Results for: {searchQuery}</h1>

      {loading && <p>Загрузка...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && results.length === 0 && <p>Ничего не найдено</p>}

      <ul>
        {results.map((product: any) => (
          <li key={product.id}>
            {product.title}
          </li>
        ))}
      </ul>
    </main>
  );
}
