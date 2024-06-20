import NextAuth from 'next-auth'
import type { NextAuthOptions, Session } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import AzureADProvider from 'next-auth/providers/azure-ad'
import CredentialsProvider from 'next-auth/providers/credentials'
import DiscordProvider from "next-auth/providers/discord";
import { endPoints } from '~@/utils/api/route'
import { postMethod } from '../../../utils/api/postMethod/index';

interface User {
  name?: string | null;
  id: string;
  _id: string;
  username: string
  email?: string | null;
  role?: string | null;
  accessToken?: string | null;
}


interface CustomSession extends Session {
  user: User;
  token: string
}

// Define a custom type for session configuration
interface CustomSessionOptions {
  jwt: boolean;
  maxAge: number;
  // Add other session properties as needed
}

// Define the session configuration explicitly with the correct type
const sessionConfig: Partial<CustomSessionOptions> = {
  jwt: true,
  maxAge: 30 * 24 * 60 * 60,
};

const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    DiscordProvider({
      clientId: `${process.env.DISCORD_CLIENT_ID}`,
      clientSecret: `${process.env.DISCORD_CLIENT_SECRET}`,
    }),
    GithubProvider({
      clientId: `${process.env.GITHUB_ID}`,
      clientSecret: `${process.env.GITHUB_SECRET}`,
    }),
    FacebookProvider({
      clientId: `${process.env.FACEBOOK_ID}`,
      clientSecret: `${process.env.FACEBOOK_SECRET}`,
    }),
    AzureADProvider({
      clientId: `${process.env.AZURE_AD_CLIENT_ID}`,
      clientSecret: `${process.env.AZURE_AD_CLIENT_SECRET}`,
      tenantId: `${process.env.AZURE_AD_TENANT_ID}`,
    }),
    GoogleProvider({
      clientId: `${process.env.GOOGLE_ID}`,
      clientSecret: `${process.env.GOOGLE_SECRET}`,
    }),

    CredentialsProvider({
      type: "credentials",
      credentials: {},
      // @ts-expect-error type error is not solved
      async authorize(credentials) {
        const user = {
          ...credentials,
        };
        if (user) {
          return user;
        } else {
          console.log("check your credentials");
          return null;
        }
      },
    }),
  ],

  session: sessionConfig,

  callbacks: {
    async signIn(params) {
      const { user, account } = params;
      // console.log('signIn callback triggered:', user, account);
      if (
        (user && account && account.provider === "github") ||
        (account && account.provider === "google")
      ) {
        const { id, name, email, image } = user;
        // console.log(name, email, image, id);
        const RegisterData = {
          email: email,
          password: id,
          username: name,
          phone: "0123456",
          image: image,
          role: "Customer"
        };
        try {
          const response = await postMethod({route: endPoints.auth.register, postData: RegisterData})
          if (response?.data?.statusCode === 200) {
            const response = await postMethod({route: endPoints.auth.login, postData: { email: email, password: id}});
          } else {
            const response = await postMethod({route: endPoints.auth.login, postData: { email: email, password: id}});
            console.error(
              "Error sending data to endpoint:",
              response.data,
            );
          }
        } catch (error) {
          const response = await postMethod({route: endPoints.auth.login, postData: { email: email, password: id}});
          console.error("Error:", error);
        }
      }

      return true;
    },

    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return {
          ...token,
          ...session.user,
        };
      }

      return { ...token, ...user };
    },
// @ts-expect-error type error is not solved
    async session({
      session,
      token,
    }: {
      session: CustomSession;
      token: Partial<User>;
    }) {
      session.user = token as User;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// Export the default handler function
export default NextAuth(authOptions);


