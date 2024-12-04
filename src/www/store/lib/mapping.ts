import { IGenre, IProductType } from '@/types/filters';
import { ITitle } from '@/types/title';
import { ISubscription } from '@/types/subscription';
import { genreTranslations, productTypeTranslations, subscriptionTermTranslations } from '@/lib/translation';
import { SubscriptionTypes } from '@/constants/constants';
import { toCamelCase, toUpperSnakeCase } from './common';

export function mappingTitle(title: any): ITitle {
  return {
    id: title?.id,
    title: title?.title,
    conceptId: title?.concept_id,
    url: title?.url,
    cover: title?.cover,
    background: title?.background,
    rating: title?.rating,
    description: title?.description,
    legal: title?.legal,
    users: title?.users,
    platforms: title?.platforms,
    releaseDate: title?.release_date,
    publisher: title?.publisher,
    genres: title?.genres,
    voice: title?.voice,
    screenLanguages: title?.screen_languages,
    content: title?.content,
    shortId: title?.short_id,
    productType: title?.product_type,
    hasOfferNone: title?.has_offer_none,
    hasPsPlus: title?.has_ps_plus,
    hasEaPlay: title?.has_ea_play,
    hasUbisoftPlus: title?.has_ubisoft_plus,
    hasGtaPlus: title?.has_gta_plus,
    offerNoneOriginalPrice: title?.offer_none_original_price,
    offerNoneDiscountPrice: title?.offer_none_discount_price,
    psPlusOriginalPrice: title?.ps_plus_original_price,
    psPlusDiscountPrice: title?.ps_plus_discount_price,
    ubisoftPlusOriginalPrice: title?.ubisoft_plus_original_price,
    ubisoftPlusDiscountPrice: title?.ubisoft_plus_discount_price,
    eaPlayOriginalPrice: title?.ea_play_original_price,
    eaPlayDiscountPrice: title?.ea_play_discount_price,
    gtaPlusOriginalPrice: title?.gta_plus_original_price,
    gtaPlusDiscountPrice: title?.gta_plus_discount_price,
    onSale: title?.on_sale,
    updatedAt: title?.updated_at,
    createdAt: title?.created_at
  }
}

export function mappingGenre(genre: any): IGenre {
  const pictureName = genre?.genre?.toLowerCase()
    .replace(/ /g, '-')
    .replace(/\//g, '-');

  const translation = genreTranslations[genre?.genre] || genre?.genre;

  let res: IGenre = {
    id: genre?.genre,
    name: genre?.genre,
    translation: translation,
    image: `/genres/genre-${pictureName}.jpeg`,
    link: `/catalog?genres=${encodeURIComponent(genre?.genre)}`
  };

  if (res?.id === 'Role Playing Games') {
    res.name = 'RPG';
  }

  return res;
}

export function mappingProductType(productType: any): IProductType {
  return {
    id: productType?.product_type,
    name: productType?.product_type,
    translation: productTypeTranslations[productType?.product_type] || productType?.product_type
  }
}

export function mappingSubscription(subscription: any): ISubscription {
  const result = {
    id: subscription?.id,
    category: subscription.category,
    title: subscription?.title,
    name: subscription?.name,
    term: subscription?.term,
    termDescription: subscription?.term_description,
    translation: subscription?.translation,
    originalPrice: subscription?.original_price,
    discountPrice: subscription?.discount_price,
    type: toUpperSnakeCase(subscription?.category),
    link: `/catalog/subscriptions/${subscription.category}`,

    logo: `/subscriptions/logo-${subscription?.category}.svg`,
    background: [SubscriptionTypes.EA_PLAY].includes(subscription?.category)
      ? null : `/subscriptions/bg-${subscription?.category}.png`,

    onSale: subscription?.on_sale,
    updatedAt: subscription?.updated_at,
    createdAt: subscription?.created_at
  };

  result.translation = subscriptionTermTranslations[result?.termDescription];

  return result;
}
