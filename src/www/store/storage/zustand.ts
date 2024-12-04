import { getGenres, getProductTypes, getSubscriptions } from '@/lib/api';
import { IGenre, IProductType } from '@/types/filters';
import { ISubscription } from '@/types/subscription';
import { create } from 'zustand';

interface GenreState {
  genres: IGenre[];
  fetchGenres: () => Promise<void>;
}

interface ProductTypeState {
  productTypes: IProductType[];
  fetchProductTypes: () => Promise<void>;
}

interface SubscriptionState {
  subscriptions: ISubscription[];
  fetchSubscriptions: () => Promise<void>;
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

export const useSubscriptions = create<SubscriptionState>((set) => ({
  subscriptions: [],
  fetchSubscriptions: async () => {
    const subscriptions = await getSubscriptions();
    set({ subscriptions });
  }
}));
