export interface ITitle {
  id: string;
  title: string | null;
  conceptId: number | null;
  url: string | null;
  cover?: string | null;
  background?: string | null;
  rating?: number | null;
  description?: string | null;
  legal?: string | null;
  users?: number | null;
  platforms?: string | null;
  releaseDate?: Date | null;
  publisher?: string | null;
  genres?: string | null;
  voice?: string | null;
  screenLanguages?: string | null;
  content?: string | null;
  shortId?: string | null;
  productType?: string | null;
  hasOfferNone?: boolean | null;
  hasPsPlus?: boolean | null;
  hasEaPlay?: boolean | null;
  hasUbisoftPlus?: boolean | null;
  hasGtaPlus?: boolean | null;
  offerNoneOriginalPrice?: number | null;
  offerNoneDiscountPrice?: number | null;
  psPlusOriginalPrice?: number | null;
  psPlusDiscountPrice?: number | null;
  ubisoftPlusOriginalPrice?: number | null;
  ubisoftPlusDiscountPrice?: number | null;
  eaPlayOriginalPrice?: number | null;
  eaPlayDiscountPrice?: number | null;
  gtaPlusOriginalPrice?: number | null;
  gtaPlusDiscountPrice?: number | null;
  onSale?: boolean | null;
  updatedAt?: Date | null;
  createdAt?: Date | null;
}

export interface IFormattedData {
  offers: {
    offerNone: boolean;
    psPlus: boolean;
    eaPlay: boolean;
    gtaPlus: boolean;
    ubisoftPlus: boolean;
  };
  platforms: {
    ps4: boolean;
    ps5: boolean;
  };
  genres: string[];
  voiceActors: string[];
  screenLanguages: string[];
  releaseDate: string;
  editionContent: string[];
}
