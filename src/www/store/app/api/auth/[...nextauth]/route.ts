import NextAuth from "next-auth"
import Yandex from "next-auth/providers/yandex"

export const authOptions = {
  providers: [
    Yandex({
      clientId: process.env.AUTH_YANDEX_ID || '',
      clientSecret: process.env.AUTH_YANDEX_SECRET || '',
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
