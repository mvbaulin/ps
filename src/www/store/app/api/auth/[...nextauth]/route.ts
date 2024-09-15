import NextAuth, { AuthOptions } from "next-auth";
import YandexProvider from "next-auth/providers/yandex";

const authOptions: AuthOptions = {
  providers: [
    YandexProvider({
      clientId: process.env.AUTH_YANDEX_ID || '',
      clientSecret: process.env.AUTH_YANDEX_SECRET || '',
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
