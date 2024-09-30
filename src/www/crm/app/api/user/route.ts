import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const sessionToken = req.cookies.get('sessionToken')?.value;

    if (!sessionToken) {
      return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
    }

    const session = await prisma.crm_sessions.findUnique({
      where: { session_token: sessionToken },
      include: { crm_users: true },
    });

    if (!session) {
      return NextResponse.json({ error: 'USER: Сессия не найдена' }, { status: 401 });
    }

    const user = session.crm_users;
    return NextResponse.json({
      id: user.id,
      name: user.name,
      login: user.login,
      role: user.role,
      rate: user.rate,
    });

  } catch (error) {
    console.error('Ошибка получения информации о пользователе:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
