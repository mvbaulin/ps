import { currency } from '@/constants/currency';
import IPrice from '@/types/price';
import { ITitle, IFormattedData } from '@/types/title';
import { prisma } from '@/lib//prisma';
import { ProductTypes } from '@/constants/product-types';
import { mappingTitle } from '@/lib/mapping';

export async function getTitleById(id: string) {
  try {
    if (!id) {
      return null;
    }

    const result = await prisma.v_titles.findUnique({
      where: {
        id
      }
    });

    return mappingTitle(result);
  } catch (error) {
    console.error('Error fetching title:', error);
    throw error;
  }
};

export async function getRelatedTitlesByConcept(id: string, productType: string) {
  try {
    const title = await getTitleById(id);

    const result = await prisma.titles.findMany({
      where: {
        concept_id: title?.conceptId || 0,
        product_type: productType,
        id: {
          not: id
        }
      }
    });

    return result.map((item) => mappingTitle(item));
  } catch (error) {
    console.error('Error fetching related titles:', error);
    throw error;
  }
};

export async function getTitle(id: string) {
  try {
    const title = await getTitleById(id);

    if (!title) {
      return null;
    }

    const [
      fullGameUpgrade,
      addons,
      avatars,
      bundles,
      gameSubscriptions,
      gameCurrency,
      games,
      gamePacks
    ] = await Promise.all([
      getRelatedTitlesByConcept(title.id, ProductTypes.FULL_GAME_UPGRADE),
      getRelatedTitlesByConcept(title.id, ProductTypes.ADD_ON),
      getRelatedTitlesByConcept(title.id, ProductTypes.AVATAR),
      getRelatedTitlesByConcept(title.id, ProductTypes.BUNDLE),
      getRelatedTitlesByConcept(title.id, ProductTypes.SUBSCRIPTION),
      getRelatedTitlesByConcept(title.id, ProductTypes.VIRTUAL_CURRENCY),
      getRelatedTitlesByConcept(title.id, ProductTypes.GAME),
      getRelatedTitlesByConcept(title.id, ProductTypes.GAME_PACK),
    ]);

    return {
      title,
      fullGameUpgrade,
      addons,
      avatars,
      bundles,
      gameSubscriptions,
      gameCurrency,
      games,
      gamePacks
    };
  } catch (error) {
    console.error('Error fetching title and related data:', error);
    throw error;
  }
}

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
