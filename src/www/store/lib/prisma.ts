import { ProductTypes } from '@/constants/product-types';
import { PrismaClient } from "@prisma/client"
import { mappingTitle } from './mapping';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export async function getTitleById(id: string) {
  try {
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

    if (!title) {
      throw new Error(`Title with id ${id} not found`);
    }

    const result = await prisma.titles.findMany({
      where: {
        concept_id: title.conceptId || 0,
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
      throw new Error(`Title with id ${id} not found`);
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
