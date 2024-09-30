import { getGenres, getProductTypes } from '@/lib/api';
import { IGenre, IProductType } from '@/types/filters';
import { create } from 'zustand';

interface GenreState {
  genres: IGenre[];
  fetchGenres: () => Promise<void>;
}

interface ProductTypeState {
  productTypes: IProductType[];
  fetchProductTypes: () => Promise<void>;
}

export const useGenres = create<GenreState>((set) => ({
  genres: [],
  fetchGenres: async () => {
    const genres = await getGenres();
    set({ genres });
  }
}));

export const useProductTypes = create<ProductTypeState>((set) => ({
  productTypes: [],
  fetchProductTypes: async () => {
    const productTypes = await getProductTypes();
    set({ productTypes });
  }
}));
