import { prisma } from '@/lib/prisma';
import { mappingGenre } from '@/lib/mapping';

export async function getGenres() {
  const genres = await prisma.v_genres.findMany()
    .then((data) => data.map((item) => mappingGenre(item)));

  return genres;
}
