import { prisma } from '@/lib/prisma';
import { mappingSubscription } from '@/lib/mapping';
import { ISubscriptions } from '@/types/subscription';
import { SubscriptionTypes } from '@/constants/constants';

export async function getSubscriptions(): Promise<ISubscriptions> {
  const data = await prisma.subscriptions.findMany({})
    .then((data) => data.map((item) => mappingSubscription(item)));

  const result: ISubscriptions = {
    psPlus: data.filter((item) => item.category === SubscriptionTypes.PS_PLUS),
    ubisoftPlus: data.filter((item) => item.category === SubscriptionTypes.UBISOFT_PLUS),
    gtaPlus: data.filter((item) => item.category === SubscriptionTypes.GTA_PLUS),
    eaPlay: data.filter((item) => item.category === SubscriptionTypes.EA_PLAY),
  };

  return result;
}

export async function getSubscriptionByCategory(category: string) {
  try {
    if (!category) {
      return null;
    }

    const result = await prisma.subscriptions.findMany({
      where: {
        category: category
      }
    });

    return result.map((item) => mappingSubscription(item));
  } catch (error) {
    console.error('Error fetching subscription:', error);
    throw error;
  }
};
