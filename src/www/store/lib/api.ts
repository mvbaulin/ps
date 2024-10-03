import { IGenre, IProductType } from '@/types/filters';
import { mappingGenre, mappingProductType } from '@/lib/mapping';

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
