import { useState, useEffect } from 'react';

export function useUser() {
  const [user, setUser] = useState<{
    id: string;
    name: string;
    login: string;
    role: string;
    rate: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/user');
        if (!res.ok) {
          throw new Error('Ошибка при получении данных пользователя');
        }

        const data = await res.json();
        setUser(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Неизвестная ошибка');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  return { user, loading, error };
}
