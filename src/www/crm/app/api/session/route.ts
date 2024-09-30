import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const sessionToken = url.searchParams.get('sessionToken');

    if (!sessionToken) {
      return NextResponse.json({ error: 'Токен не найден' }, { status: 401 });
    }

    const session = await prisma.crm_sessions.findFirst({
      where: { session_token: sessionToken },
      include: { crm_users: true },
    });

    if (!session) {
      return NextResponse.json({ error: 'SESSION: Сессия не найдена' }, { status: 401 });
    }

    const currentDate = new Date();
    const currentUTCDate = new Date(currentDate.toUTCString());

    if (session.expires < currentUTCDate) {
      return NextResponse.json({ error: 'Сессия истекла' }, { status: 401 });
    }

    return NextResponse.json({ session });
  } catch (error) {
    console.error('Ошибка получения сессии:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
