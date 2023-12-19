import { type PrismaClient, Role } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { type Session } from "next-auth";

type AssertSuperAdminOrSchoolAdmin = {
  ctx: {
    db: PrismaClient;
    session: Session | null;
  };
  id: string;
};

export const assertSuperAdminOrSchoolAdmin = async ({
  ctx,
  id,
}: AssertSuperAdminOrSchoolAdmin) => {
  if (ctx.session) {
    if (ctx.session?.user.role === Role.SUPER_ADMIN) {
      return;
    }
    if (ctx.session?.user.role === Role.SCHOOL_ADMIN) {
      const school = await ctx.db.schoolAdmin.findUnique({
        where: {
          userId: ctx.session.user.id,
        },
      });
      if (id === school?.schoolId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      return;
    }

    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
};
