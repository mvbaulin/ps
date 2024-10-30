import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const selectedGenres = searchParams.get('genres')?.toLowerCase().split(',') || [];
    const selectedProductTypes = searchParams.get('productTypes')?.toLowerCase().split(',') || [];
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);

    const filteredResult = await prisma.v_titles.findMany({
      where: {
        AND: [
          {
            OR: selectedGenres.map((genre) => ({
              genres: {
                contains: genre,
                mode: 'insensitive',
              },
            })),
          },
          {
            OR: selectedProductTypes.map((type) => ({
              product_type: {
                contains: type,
                mode: 'insensitive',
              },
            })),
          },
        ],
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    if (filteredResult.length === 0) {
      const allData = await prisma.v_titles.findMany({
        skip: (page - 1) * limit,
        take: limit,
      });
      return NextResponse.json(allData);
    }

    return NextResponse.json(filteredResult);
  } catch (error) {
    console.error('Error fetching titles:', error);
    return NextResponse.json({ error: 'Ошибка при получении данных.' }, { status: 500 });
  }
}
