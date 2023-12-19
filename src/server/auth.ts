import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
  type DefaultUser,
  type User,

} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { env } from "~/env";

import { db } from "~/server/db";
import * as auth from "~/lib/auth"
import { z } from "zod";
import { type Role } from "@prisma/client";



/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      name?: string | null;
      role?: Role;
      image?: string | null;
    };
  }

  interface User extends DefaultUser {
    id: string;
    name?: string | null;
    role?: Role;
    image?: string | null;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    /**
     * OAuth Providers
     * @Google_Provider will be added below later
     * ...add more providers here.
     * @see https://next-auth.js.org/providers/github
     */

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials,_):Promise<User|null> {
        
        const validation = z.object({
          email: z
            .string()
            .email("Please provide a valid email")
            .trim(),
          password: z.string().min(1,"Password is required").trim(),
        });

        const hash = await auth.hashPassword("12345678")
        console.log(hash)

        const { email, password } = validation.parse(credentials);

        const user = (await db.user.findUnique({
          where: {
            email,
          },
        }));

        if (!user) {
          return null;
        }

        const checkPassword = await auth.verifyPassword(
          password,
          user.password,
        );

        if (!checkPassword) {
          return null;
        }


        const session = {
          id: user.id,
          name: user.name,
          role: user.role ,
        };

        return session;
      }
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        return{
          ...user
        }
      }
      return token;
    },

    session({ session, token }) {
      return {
        ...session,
        user: {
          ...token,
        },
      };
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 60*30,
  },
  pages: {
    signIn: "/auth/login",
  },
  secret: env.NEXTAUTH_SECRET,
  debug: env.NODE_ENV === "development",
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
