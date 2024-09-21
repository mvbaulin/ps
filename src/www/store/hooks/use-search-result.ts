import { useState, useEffect } from 'react';
import { ITitle } from '@/types/title';

export const useSearchResults = (searchQuery: string | null) => {
  const [results, setResults] = useState<ITitle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!searchQuery) {
        setResults([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);

        if (!response.ok) {
          throw new Error('Ошибка при поиске');
        }

        const data: ITitle[] = await response.json();
        setResults(data);
      } catch (err: any) {
        setError(err.message || 'Что-то пошло не так');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchQuery]);

  return { results, loading, error };
};
