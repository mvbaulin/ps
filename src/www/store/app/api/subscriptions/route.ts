import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const subscriptions = await prisma.subscriptions.findMany();

  return NextResponse.json(subscriptions);
}
