import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
/*import { getUserByEmail } from "@/db/user/user";
import { User } from "@/lib/generated/prisma/client";*/
const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 6, // 7 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ account, profile }: any) {
      if (account.provider === "google" && profile.email_verified) {
        return true;
      }
      return false;
    },
    async jwt({ token }) {
      if (token.email) {
        /*const findUser: User | null = await getUserByEmail(token.email);
        if (findUser) {
          token.role = "admin";
        } else {
          token.role = "user";
        }*/
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
