import type { NextAuthOptions } from "next-auth";
import type { Provider } from "next-auth/providers/index";
import AzureADProvider from "next-auth/providers/azure-ad";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { getVerifiedUserByEmail } from "@/lib/opensearch-auth-store";

if (!process.env.NEXTAUTH_URL && process.env.NODE_ENV !== "production") {
  process.env.NEXTAUTH_URL = "http://127.0.0.1:3010";
}

const hasGoogleCredentials = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
const hasMicrosoftCredentials = Boolean(process.env.AZURE_AD_CLIENT_ID && process.env.AZURE_AD_CLIENT_SECRET);
const authSecret = process.env.NEXTAUTH_SECRET || (process.env.NODE_ENV !== "production" ? "teleaon-local-auth-secret" : undefined);

const providers: Provider[] = [
  ...(hasGoogleCredentials
    ? [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
          authorization: {
            params: {
              prompt: "select_account",
              access_type: "offline",
              response_type: "code"
            }
          }
        })
      ]
    : []),
  ...(hasMicrosoftCredentials
    ? [
        AzureADProvider({
          clientId: process.env.AZURE_AD_CLIENT_ID as string,
          clientSecret: process.env.AZURE_AD_CLIENT_SECRET as string,
          tenantId: process.env.AZURE_AD_TENANT_ID || "common",
          authorization: {
            params: {
              prompt: "select_account"
            }
          }
        })
      ]
    : []),
  CredentialsProvider({
    id: "email",
    name: "Email",
    credentials: {
      email: { label: "Email", type: "email" },
      name: { label: "Name", type: "text" }
    },
    async authorize(credentials) {
      const email = credentials?.email?.trim().toLowerCase();

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return null;
      }

      return getVerifiedUserByEmail(email);
    }
  })
];

export const authOptions: NextAuthOptions = {
  providers,
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/start-building"
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.name = session.user.name || token.name;
        session.user.email = session.user.email || token.email;
      }

      return session;
    }
  },
  secret: authSecret
};
