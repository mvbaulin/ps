import { IGenre, IProductType } from '@/types/filters';
import { useState, useEffect } from 'react';

export const useProductTypes = () => {
  const [results, setResults] = useState<IProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/product-types`);

        if (!response.ok) {
          throw new Error('Ошибка при получении типов продуктов');
        }

        const data = await response.json();
        setResults(data.map((type: any) => {
          return {
            productType: type.product_type,
          }
        }));
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
