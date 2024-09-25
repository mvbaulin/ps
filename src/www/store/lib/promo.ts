import { prisma } from '@/lib/prisma';
import { mappingTitle } from './mapping';

export async function getPromo() {
  const promo = await prisma.v_promo.findMany({
    take: 10,
  }).then((data) => data.map((item) => mappingTitle(item)));

  return promo;
}
