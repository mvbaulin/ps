import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const genres = await prisma.v_genres.findMany();

  return NextResponse.json(genres);
}
