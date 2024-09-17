import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/app/lib/db";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
    })
  ],
  secret: process.env.NEXTAUTH_SECRET ?? "secret",
  callbacks: {
    async signIn(params) {
      if (!params.user.email) {
        return false;
      }

      try {
        const existingUser = await prisma.user.findUnique({
          where: {
            email: params.user.email,
          },
        });
        if (existingUser) {
          return true;
        }
        await prisma.user.create({
          data: {
            email: params.user.email,
            provider: "Google",
          },
        });
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    async jwt({ token, user }) {
      // Only called when user first signs in so requiring less prisma calls
      if (user && user.email) {
        const prismaUser = await prisma.user.findUnique({
          where: {
            email: user.email,
          },
        });

        // This will not happen as we are storing the user in prisma on sign in callback
        if (!prismaUser) {
          return token;
        }

        return {
          ...token,
          id: prismaUser.id,
        };
      }

      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
        },
      };
    }
  }
}
