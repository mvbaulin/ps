import { IGenre, IProductType } from '@/types/filters';
import { mappingGenre, mappingProductType } from '@/lib/mapping';

export const getGenres = async (): Promise<IGenre[]> => {
  const response = await fetch('/api/genres');

  if (!response.ok) {
    throw new Error('Failed to fetch genres');
  }

  const genres = await response.json();

  return genres.map((genre: any) => mappingGenre(genre));
};

export const getProductTypes = async (): Promise<IProductType[]> => {
  const response = await fetch('/api/product-types');

  if (!response.ok) {
    throw new Error('Failed to fetch product types');
  }

  const productTypes = await response.json();

  return productTypes.map((productType: any) => mappingProductType(productType));
};
