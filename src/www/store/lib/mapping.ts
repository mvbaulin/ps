import { IGenre, IProductType } from '@/types/filters';
import { ITitle } from '@/types/title';

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

  let res = {
    id: genre?.genre,
    name: genre?.genre,
    translation: genre?.translation,
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
    translation: productType?.translation
  }
}
