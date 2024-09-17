// types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

// Extend the User interface
declare module "next-auth" {
  interface User extends DefaultUser {
    // Add any additional user fields here
    name?: string | null;
    userId: string;
    _id: string;
    id: string | null;
    username: string;
    email?: string | null;
    phone?: string | null;
    image?: string | null;
    role?: string | null;
    accessToken?: string | null;
    refreshToken?: string | null;
    access_tokenExpiresIn?: string | null;
    refresh_tokenExpiresIn?: string | null;
  }

  interface Session extends DefaultSession {
    // Add custom fields to the session
    user: {
        name?: string | null;
        userId: string;
        _id: string;
        id: string | null;
        username: string;
        email?: string | null;
        phone?: string | null;
        image?: string | null;
        role?: string | null;
        accessToken?: string | null;
        refreshToken?: string | null;
        access_tokenExpiresIn?: string | null;
        refresh_tokenExpiresIn?: string | null;
    } & DefaultSession["user"]; // Extend with the default user
  }
}

// Optionally extend the JWT interface for token manipulation
declare module "next-auth/jwt" {
  interface JWT {
    name?: string | null;
    userId: string;
    _id: string;
    id: string | null;
    username: string;
    email?: string | null;
    phone?: string | null;
    image?: string | null;
    role?: string | null;
    accessToken?: string | null;
    refreshToken?: string | null;
    access_tokenExpiresIn?: string | null;
    refresh_tokenExpiresIn?: string | null;
  }
}
