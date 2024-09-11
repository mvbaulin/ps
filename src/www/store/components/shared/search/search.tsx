import React from 'react';
import { Input } from '@/components/ui';

export const Search: React.FC = () => {
  return (
    <Input
      type="search"
      placeholder="Поиск..."
      value=""
    />
  );
};
