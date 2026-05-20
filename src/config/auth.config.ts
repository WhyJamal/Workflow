import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { PAGES } from "@/config/pages.config";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: PAGES.SIGN_IN,
    error: PAGES.SIGN_IN,
  },
  providers: [Google],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;
      const role = auth?.user?.role as string | undefined;

      const isLandingPage = pathname === PAGES.HOME;
      const isAuthPage =
        pathname.startsWith(PAGES.SIGN_IN) ||
        pathname.startsWith(PAGES.SIGN_UP);

      // Login bo'lgan va auth/landing sahifasida — rolga qarab yo'naltir
      if (isLoggedIn && (isLandingPage || isAuthPage)) {
        const dest = role === "CLIENT" ? PAGES.CLIENT_APP : PAGES.APP;
        return Response.redirect(new URL(dest, nextUrl));
      }

      // /cl — faqat CLIENT
      if (pathname.startsWith("/cl")) {
        if (!isLoggedIn) return false;
        if (role === "MASTER") {
          return Response.redirect(new URL(PAGES.APP, nextUrl));
        }
        return true;
      }

      // /c — faqat MASTER
      if (pathname.startsWith(PAGES.APP)) {
        if (!isLoggedIn) return false;
        if (role === "CLIENT") {
          return Response.redirect(new URL(PAGES.CLIENT_APP, nextUrl));
        }
        return true;
      }

      return true;
    },
  },
};