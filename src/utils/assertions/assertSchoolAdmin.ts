import { type PrismaClient, Role } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { type Session } from "next-auth";

type ctx = {
  db: PrismaClient;
  session: Session | null;
};

export const assertSchoolAdmin = (ctx: ctx) => {
    console.log(ctx.session?.user)
    if(ctx.session){
        if (ctx.session?.user.role !== Role.SCHOOL_ADMIN) {
          throw new TRPCError({ code: "UNAUTHORIZED" });
        }
    }
};
