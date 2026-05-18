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

      const isLandingPage = pathname === PAGES.HOME;
      const isAuthPage =
        pathname.startsWith(PAGES.SIGN_IN) ||
        pathname.startsWith(PAGES.SIGN_UP);

      if (isLoggedIn && (isLandingPage || isAuthPage)) {
        return Response.redirect(new URL(PAGES.APP, nextUrl));
      }

      if (!isLoggedIn && pathname.startsWith(PAGES.APP)) {
        return false;
      }

      return true;
    },
  },
};