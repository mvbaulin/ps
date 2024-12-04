import { IGenre, IProductType } from '@/types/filters';
import { mappingGenre, mappingProductType, mappingSubscription, mappingTitle } from '@/lib/mapping';

export const getGenres = async (): Promise<IGenre[]> => {
  const response = await fetch('/api/genres');

  if (!response.ok) {
    throw new Error('Failed to fetch genres');
  }

  const genres = await response.json();

  return genres
    .map((genre: any) => mappingGenre(genre))
    .sort((a: IGenre, b: IGenre) => a.name.localeCompare(b.name));
};

export const getProductTypes = async (): Promise<IProductType[]> => {
  const response = await fetch('/api/product-types');

  const disabled = [
    'Trial',
    'Demo',
    'Full Game Trial',
    'Theme',
    'Playable',
    'Full Game Upgrade',
    'Beta',
    'STOREFRONT_CLASS.PS1_CLASSIC',
    'STOREFRONT_CLASS.PS2_CLASSIC',
  ];

  if (!response.ok) {
    throw new Error('Failed to fetch product types');
  }

  const productTypes = await response.json();

  return productTypes
    .map((productType: any) => mappingProductType(productType))
    .filter((productType: IProductType) => !disabled.includes(productType.name))
    .sort((a: IProductType, b: IProductType) => a.name.localeCompare(b.name));
};

export async function fetchFilteredProducts(
  selectedGenres: string[],
  selectedProductTypes: string[],
  page: number
) {
  const genreParam = selectedGenres.length
    ? `genres=${encodeURIComponent(selectedGenres.join(','))}`
    : '';
  const productTypeParam = selectedProductTypes.length
    ? `productTypes=${encodeURIComponent(selectedProductTypes.join(','))}`
    : '';
  const query = `?${[genreParam, productTypeParam, `page=${page}`, `limit=20`]
    .filter(Boolean)
    .join('&')}`;

  const result = await fetch(`/api/filters${query}`);

  if (!result.ok) {
    throw new Error('Failed to fetch filtered products');
  }

  const data = await result.json();

  return data.map((title: any) => mappingTitle(title));
}

export async function getSubscriptions() {
  const subscriptions = await fetch('/api/subscriptions');

  if (!subscriptions.ok) {
    throw new Error('Failed to fetch subscriptions');
  }

  const data = await subscriptions.json();

  return data.map((item: any) => mappingSubscription(item));
}
