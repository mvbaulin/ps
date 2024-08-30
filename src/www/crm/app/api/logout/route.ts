import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const cookies = request.headers.get('cookie') || '';
  const sessionToken = cookies.split(';').find(c => c.trim().startsWith('sessionToken='));

  if (!sessionToken) {
    return NextResponse.json({ error: 'Нет активной сессии' }, { status: 401 });
  }

  const token = sessionToken.split('=')[1];

  try {
    await prisma.crm_sessions.deleteMany({
      where: { session_token: token },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Ошибка удаления сессии:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
