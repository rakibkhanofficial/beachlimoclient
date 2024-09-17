import NextAuth from "next-auth";
import type { NextAuthOptions, Session, User as NextAuthUser } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { AdapterUser } from "next-auth/adapters";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import AzureADProvider from "next-auth/providers/azure-ad";
import CredentialsProvider from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";
import { postMethod } from "../../../utils/api/postMethod/index";
import { endPoints } from "~@/utils/api/route";
import { reFreshToken } from "~@/utils/lib/refreshToken";

interface User extends NextAuthUser {
  id: string;
  _id: string;
  username: string;
  role?: string | null;
  phone?: string | null;
  accessToken?: string | null;
  refreshToken?: string | null;
  access_tokenExpiresIn?: string | null;
  refresh_tokenExpiresIn?: string | null;
}

interface CustomSession extends Session {
  user: User;
  token?: string | null;
}

interface CustomSessionOptions {
  jwt: boolean;
  maxAge: number;
}

const sessionConfig: Partial<CustomSessionOptions> = {
  jwt: true,
  maxAge: 30 * 24 * 60 * 60,
};

const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID!,
      clientSecret: process.env.FACEBOOK_SECRET!,
    }),
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        const user = { ...credentials } as User;
        if (user) {
          return user;
        } else {
          console.log("check your credentials");
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  session: sessionConfig,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "facebook" || account?.provider === "google") {
        const { id, name, email, image, phone } = user;
        const RegisterData = {
          name: name,
          role: "Customer",
          email: email,
          image: image,
          phone: phone ? phone : "",
          password: id,
        };
        try {
          const registerResponse = await postMethod({
            route: endPoints.auth.register,
            postData: RegisterData,
          });
          if (registerResponse?.data?.statusCode === 200) {
            await postMethod({
              route: endPoints.auth.login,
              postData: { email, password: id },
            });
          } else {
            await postMethod({
              route: endPoints.auth.login,
              postData: { email, password: id },
            });
          }
        } catch (error) {
          console.error("Error during sign in:", error);
          await postMethod({
            route: endPoints.auth.login,
            postData: { email, password: id },
          });
        }
      }
      return true;
    },

    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session?.user) {
        return { ...token, ...session.user };
      }
      if (user) {
        token = { ...token, ...user };
      }
      if (
        typeof token.access_tokenExpiresIn === "string" &&
        typeof token.refreshToken === "string"
      ) {
        const currentTime = new Date();
        const expirationDate = new Date(token.access_tokenExpiresIn);
        console.log("Current time: ", currentTime);
        console.log("Expiration date: ", expirationDate);
        // const expirationDate = new Date(token.strAccess_token_expiresIn);
        if (currentTime >= expirationDate) {
          console.log("Token is expired, attempting to refresh.");
          try {
            const {
              newaccessToken,
              newrefreshToken,
              newAccesstokenExpiresin,
              newRefreshTokenExpiresIn,
            } = await reFreshToken(token.refreshToken);

            if (newaccessToken && newrefreshToken) {
              console.log("Successfully refreshed token.");
              return {
                ...token,
                accessToken: newaccessToken,
                refreshToken: newrefreshToken,
                access_tokenExpiresIn: newAccesstokenExpiresin,
                refresh_tokenExpiresIn: newRefreshTokenExpiresIn,
              };
            }
          } catch (error) {
            console.error("Error refreshing token:", error);
            return token;
          }
        } else {
          console.log("Token is still valid.");
          return token;
        }
      }

      return token;
    },

    async session({
      session,
      token,
      user,
    }: {
      session: Session;
      token: JWT;
      user: AdapterUser;
    }): Promise<CustomSession> {
      return {
        ...session,
        user: {
          ...session.user,
          userId: token.userId as string,
          id: token.sub as string,
          _id: (token._id as string) || "",
          username: (token.username as string) || "",
          role: token.role as string | null,
          phone: token.phone as string | null,
          image: token.image as string | null,
          accessToken: token.accessToken as string | null,
          refreshToken: token.refreshToken as string | null,
          access_tokenExpiresIn: token.access_tokenExpiresIn as string | null,
          refresh_tokenExpiresIn: token.refresh_tokenExpiresIn as string | null,
        } as User,
      };
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

export default NextAuth(authOptions);
