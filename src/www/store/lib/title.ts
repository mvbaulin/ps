import { currency } from '@/constants/currency';
import IPrice from '@/types/price';
import { ITitle, IFormattedData } from '@/types/title';

function getOffers(title: ITitle) {
  let offers = {
    offerNone: false,
    psPlus: false,
    eaPlay: false,
    gtaPlus: false,
    ubisoftPlus: false
  };

  if (title.hasOfferNone) {
    offers.offerNone = true;
  }

  if (title.hasPsPlus) {
    offers.psPlus = true;
  }

  if (title.hasEaPlay) {
    offers.eaPlay = true;
  }

  if (title.hasGtaPlus) {
    offers.gtaPlus = true;
  }

  if (title.hasUbisoftPlus) {
    offers.ubisoftPlus = true;
  }

  return offers;
}

function getPlatforms(title: ITitle) {
  let platforms = {
    ps4: false,
    ps5: false,
  };

  if (title?.platforms?.includes('PS4')) {
    platforms.ps4 = true;
  }

  if (title?.platforms?.includes('PS5')) {
    platforms.ps5 = true;
  }

  return platforms;
}

function getGenres(title: ITitle) {
  return title.genres ? title.genres.split(',') : [];
}

function getVoiceActors(title: ITitle) {
  return title.voice ? title.voice.split(',') : [];
}

function getScreenLanguages(title: ITitle) {
  return title.screenLanguages ? title.screenLanguages.split(',') : [];
}

function getEditionContent(title: ITitle) {
  return title.content ? title.content.split(';').filter(item => item) : [];
}

function getReleaseDate(title: ITitle) {
  if (title.releaseDate) {
    const day = String(title.releaseDate.getDate()).padStart(2, '0');
    const month = String(title.releaseDate.getMonth() + 1).padStart(2, '0');
    const year = title.releaseDate.getFullYear();

    return `${day}.${month}.${year}`;
  }

  return '';
}

export function getFormatedData(title: ITitle): IFormattedData {
  return {
    offers: getOffers(title),
    platforms: getPlatforms(title),
    genres: getGenres(title),
    voiceActors: getVoiceActors(title),
    screenLanguages: getScreenLanguages(title),
    releaseDate: getReleaseDate(title),
    editionContent: getEditionContent(title),
  };
}

export function getBadges(formatedData: IFormattedData): string[] {
  let res = [];

  if (formatedData?.platforms?.ps4) {
    res.push('ps4');
  }

  if (formatedData?.platforms?.ps5) {
    res.push('ps5');
  }

  if (formatedData?.offers?.psPlus) {
    res.push('ps-plus');
  }

  if (formatedData?.offers?.eaPlay) {
    res.push('ea-play');
  }

  if (formatedData?.offers?.ubisoftPlus) {
    res.push('ubisoft-plus');
  }

  if (formatedData?.offers?.gtaPlus) {
    res.push('gta-plus');
  }

  return res;
}

export function getPrice(price: number | undefined | null, discount: number | undefined | null): IPrice {
  if (price == null || discount == null || price === 0) {
    return {
      price: price || 0,
      discount: discount || 0,
      percent: 0,
      currency: currency.RUB
    };
  }

  let res = {
    price: price,
    discount: discount,
    percent: 0,
    currency: currency.RUB
  };

  if (price !== discount) {
    res.percent = -(100 - parseFloat(((discount / price) * 100).toFixed(0)));
  }

  return res;
}
