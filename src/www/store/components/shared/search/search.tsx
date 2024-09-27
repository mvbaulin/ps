'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui';
import classNames from 'classnames';
import styles from './search.module.scss';
import { useSearchResults } from '@/hooks/use-search-result';
import { useRouter } from 'next/navigation';
import { ITitle } from '@/types/title';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
  onFocus?: () => void;
  onBlur?: () => void;
}

export const Search: React.FC<Props> = ({
  onFocus, onBlur
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const { results, loading, error } = useSearchResults(debouncedQuery);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchQuery.length >= 1) {
        setDebouncedQuery(searchQuery);
        setShowResults(true);
      } else {
        setDebouncedQuery('');
        setShowResults(false);
      }
    }, 500);

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
        router.push(`/catalog/${results[highlightedIndex].id}`);
        setSearchQuery('');
        setShowResults(false);
      }
      event.preventDefault();
    }
  };

  const handleItemClick = (id: string) => {
    router.push(`/catalog/titles/${id}`);
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
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </form>

      {results?.length > 0 &&
        <div className={
          classNames(styles.result, { [styles['result--show']]: showResults })}
        >
          {loading && <p>...</p>}
          {error && <p>{error}</p>}

          <ul className={classNames(styles.list)}>
            {results.map((title: ITitle, index: number) => (
              <li
                key={title.id}
                className={classNames(
                  styles.item,
                  { [styles['item--highlighted']]: index === highlightedIndex })
                }
                onMouseEnter={() => setHighlightedIndex(index)}
                onClick={() => handleItemClick(title.id)}
              >
                <Link
                  href={`/catalog/titles/${title.id}`}
                  className={classNames(styles.link)}
                >
                  <Image
                    src={title.cover + '?w=64&h=36' || ''}
                    alt={title.title || title.id}
                    width={64}
                    height={36}
                    className={classNames(styles.cover)}
                    loading="eager"
                  />

                  <span className={classNames(styles.title)}>
                    {title.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      }
    </div>
  );
};
