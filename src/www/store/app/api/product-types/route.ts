import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const productTypes = await prisma.v_product_types.findMany();

  return NextResponse.json(productTypes);
}
