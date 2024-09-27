import { IGenre } from '@/types/filters';
import { useState, useEffect } from 'react';

export const useGenres = () => {
  const [results, setResults] = useState<IGenre[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/genres`);

        if (!response.ok) {
          throw new Error('Ошибка при получении жанров');
        }

        const data = await response.json();
        setResults(data);
      } catch (err: any) {
        setError(err.message || 'Что-то пошло не так');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  return { results, loading, error };
};
