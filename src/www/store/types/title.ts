import { Decimal } from '@prisma/client/runtime/library';

export interface ITitle {
  id: string;
  title: string | null;
  concept_id: number | null;
  url: string | null;
  cover?: string | null;
  background?: string | null;
  rating?: number | null;
  description?: string | null;
  legal?: string | null;
  users?: number | null;
  platforms?: string | null;
  release_date?: Date | null;
  publisher?: string | null;
  genres?: string | null;
  voice?: string | null;
  screen_languages?: string | null;
  content?: string | null;
  short_id?: string | null;
  product_type?: string | null;
  has_offer_none?: boolean | null;
  has_ps_plus?: boolean | null;
  has_ea_play?: boolean | null;
  has_ubisoft_plus?: boolean | null;
  has_gta_plus?: boolean | null;
  offer_none_original_price?: number | null;
  offer_none_discount_price?: number | null;
  ps_plus_original_price?: number | null;
  ps_plus_discount_price?: number | null;
  ubisoft_plus_original_price?: number | null;
  ubisoft_plus_discount_price?: number | null;
  ea_play_original_price?: number | null;
  ea_play_discount_price?: number | null;
  gta_plus_original_price?: number | null;
  gta_plus_discount_price?: number | null;
  on_sale?: boolean | null;
  updated_at?: Date | null;
  created_at?: Date | null;
}

export interface IFormattedData {
  offers: {
    offer_none: boolean;
    ps_plus: boolean;
    ea_play: boolean;
    gta_plus: boolean;
    ubisoft_plus: boolean;
  };
  platforms: {
    ps4: boolean;
    ps5: boolean;
  };
  genres: string[];
  voice_actors: string[];
  screen_languages: string[];
  release_date: string;
}
