import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('q');

  if (!title) {
    return NextResponse.json({ error: 'No search query provided' }, { status: 400 });
  }

  const products = await prisma.v_titles.findMany({
    where: {
      title: {
        contains: title,
        mode: 'insensitive',
      },
    },
    take: 10,
  });

  return NextResponse.json(products);
}
