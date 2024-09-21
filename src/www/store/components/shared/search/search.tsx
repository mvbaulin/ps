'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui';
import classNames from 'classnames';
import styles from './search.module.scss';
import { useSearchResults } from '@/hooks/use-search-result';
import { useRouter } from 'next/navigation';
import { ITitle } from '@/types/title';

export const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const { results, loading, error } = useSearchResults(debouncedQuery);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchQuery.length >= 3) {
        setDebouncedQuery(searchQuery);
        setShowResults(true);
      } else {
        setDebouncedQuery('');
        setShowResults(false);
      }
    }, 300);

    return () => {
      clearTimeout(handler);
      setHighlightedIndex(-1);
    };
  }, [searchQuery]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      setHighlightedIndex(prevIndex =>
        prevIndex < results.length - 1 ? prevIndex + 1 : prevIndex
      );
      event.preventDefault();
    } else if (event.key === 'ArrowUp') {
      setHighlightedIndex(prevIndex =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
      event.preventDefault();
    } else if (event.key === 'Enter') {
      if (highlightedIndex >= 0) {
        router.push(`/store/titles/${results[highlightedIndex].id}`);
        setSearchQuery('');
        setShowResults(false);
      }
      event.preventDefault();
    }
  };

  const handleItemClick = (id: string) => {
    router.push(`/store/titles/${id}`);
    setSearchQuery('');
    setShowResults(false);
  };

  return (
    <div className={styles.wrapper}>
      <form className={classNames(styles.form)} onKeyDown={handleKeyDown}>
        <Input
          type="search"
          placeholder="Поиск..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </form>

      {showResults && results.length > 0 && (
        <div className={classNames(styles.result)}>
          {loading && <p>Загрузка...</p>}
          {error && <p>{error}</p>}

          <ul>
            {results.map((product: ITitle, index: number) => (
              <li
                key={product.id}
                className={classNames({ [styles.highlighted]: index === highlightedIndex })}
                onMouseEnter={() => setHighlightedIndex(index)}
                onClick={() => handleItemClick(product.id)}
              >
                {product.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
