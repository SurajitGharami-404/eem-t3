import { type PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";

type getSchoolAllCountHandler = {
  ctx: {
    db: PrismaClient;
  };
};

type getSchoolTotalCountHandler = {
  ctx: {
    db: PrismaClient;
  };
};

export const getSchoolAllCountHandler = async ({
  ctx,
}: getSchoolAllCountHandler) => {
  try {
    const totalCount = await ctx.db.school.count();
    const activeCount = await ctx.db.school.count({
      where: {
        active: true,
      },
    });
    const inActiveCount = await ctx.db.school.count({
      where: {
        active: false,
      },
    });

    return { totalCount, activeCount, inActiveCount };
  } catch (error) {
    if (error instanceof TRPCError) {
      throw new TRPCError({ message: error.message, code: error.code });
    }
    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
  }
};
export const getSchoolTotalCountHandler = async ({
  ctx,
}: getSchoolTotalCountHandler) => {
  try {
    const totalCount = await ctx.db.school.count();

    return totalCount;
  } catch (error) {
    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
  }
};
