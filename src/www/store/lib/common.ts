import { Currency } from '@/constants/constants';
import IPrice from '@/types/price';

export function toCamelCase(str: string) {
  return str.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
}

export function toUpperSnakeCase(str: string) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toUpperCase().replace(/-/g, '_');
}

export function getPrice(price: number | undefined | null, discount: number | undefined | null): IPrice {
  if (price == null || discount == null || price === 0) {
    return {
      price: price || 0,
      discount: discount || 0,
      percent: 0,
      currency: Currency.RUB
    };
  }

  let res = {
    price: price,
    discount: discount,
    percent: 0,
    currency: Currency.RUB
  };

  if (price !== discount) {
    res.percent = -(100 - parseFloat(((discount / price) * 100).toFixed(0)));
  }

  return res;
}
