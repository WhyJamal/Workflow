import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "CLIENT" | "MASTER";
      firstName: string | null;
      lastName: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: "CLIENT" | "MASTER";
    firstName: string | null;
    lastName: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role?: "CLIENT" | "MASTER";
    firstName?: string | null;
    lastName?: string | null;
  }
}