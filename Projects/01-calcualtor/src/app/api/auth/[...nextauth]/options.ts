import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConnect";
import userModel from "../../../../../models/userModel";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<string, string> | undefined
      ): Promise<any> {
        await dbConnect();
        if (!credentials || !credentials.identifier || !credentials.password) {
          throw new Error("Credentials are required");
        }
        try {
          const user = await userModel.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          });
          if (!user) {
            throw new Error("No user found with this email or username.");
          }
          if (!user.isVerified) {
            throw new Error("Please verify your account first.");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error("Password did not match.");
          }
        } catch (error: unknown) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
          throw new Error("An unexpected error occurred.");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.username = user.username;
      }
      return token; // Always return the token object
    },

    async session({ session, token }) {
      if (token) {
        // Initialize session.user if undefined
        session.user = session.user ?? {};

        session.user._id = token._id as string;
        session.user.isVerified = token.isVerified as boolean;
        session.user.username = token.username as string;
      }
      return session; // Always return the session object
    },
  },

  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
