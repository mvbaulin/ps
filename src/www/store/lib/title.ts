import { currency } from '@/constants/currency';
import IPrice from '@/types/price';
import { ITitle, IFormattedData } from '@/types/title';

function getOffers(title: ITitle) {
  let offers = {
    offer_none: false,
    ps_plus: false,
    ea_play: false,
    gta_plus: false,
    ubisoft_plus: false
  };

  if (title.has_offer_none) {
    offers.offer_none = true;
  }

  if (title.has_ps_plus) {
    offers.ps_plus = true;
  }

  if (title.has_ea_play) {
    offers.ea_play = true;
  }

  if (title.has_gta_plus) {
    offers.gta_plus = true;
  }

  if (title.has_ubisoft_plus) {
    offers.ubisoft_plus = true;
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
  return title.screen_languages ? title.screen_languages.split(',') : [];
}

function getReleaseDate(title: ITitle) {
  if (title.release_date) {
    const day = String(title.release_date.getDate()).padStart(2, '0');
    const month = String(title.release_date.getMonth() + 1).padStart(2, '0');
    const year = title.release_date.getFullYear();

    return `${day}.${month}.${year}`;
  }

  return '';
}

export function getFormatedData(title: ITitle): IFormattedData {
  return {
    offers: getOffers(title),
    platforms: getPlatforms(title),
    genres: getGenres(title),
    voice_actors: getVoiceActors(title),
    screen_languages: getScreenLanguages(title),
    release_date: getReleaseDate(title)
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

  if (formatedData?.offers?.ps_plus) {
    res.push('ps-plus');
  }

  if (formatedData?.offers?.ea_play) {
    res.push('ea-play');
  }

  if (formatedData?.offers?.ubisoft_plus) {
    res.push('ubisoft-plus');
  }

  if (formatedData?.offers?.gta_plus) {
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
