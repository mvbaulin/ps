import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  const { login, password } = await request.json();

  const user = await prisma.crm_users.findFirst({
    where: { login },
  });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    const session = await prisma.crm_sessions.findFirst({
      where: { user_id: user?.id },
    });

    if (session) {
      await prisma.crm_sessions.delete({
        where: { session_token: session.session_token },
      });
    }

    return NextResponse.json({ error: 'Неверный логин или пароль' }, { status: 401 });
  }

  try {
    await prisma.crm_sessions.deleteMany({
      where: { user_id: user.id },
    });

    const sessionToken = uuidv4();
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await prisma.crm_sessions.create({
      data: {
        session_token: sessionToken,
        user_id: user.id,
        expires: expires,
      },
    });

    const response = NextResponse.json({ success: true });
    response.cookies.set('sessionToken', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error('Ошибка создания сессии:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
