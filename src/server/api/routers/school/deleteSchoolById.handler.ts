import { type PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { type Session } from "next-auth";
import { type FindSchoolByIdInput } from "~/schemas/school.schema";
import { assertSuperAdminOrSchoolAdmin } from "~/utils/assertions/assertSuperAdminOrSchoolAdmin";

type DeleteSchoolByIdHandler = {
  ctx: {
    db: PrismaClient;
    session: Session | null;
  };
  input: FindSchoolByIdInput;
};

export const deleteSchoolByIdHandler = async ({
  ctx,
  input,
}: DeleteSchoolByIdHandler) => {
  await assertSuperAdminOrSchoolAdmin({ ctx, id: input.id });

  try {
    const deleteSchoolByIdService = () => {
      return ctx.db.$transaction(async (tx) => {
        try {
          const school = await tx.school.findUnique({
            where: {
              id: input.id,
            },
            select: {
              schoolAdmins: {
                select: {
                  userId: true,
                },
              },
              addressId: true,
            },
          });

          const userIds = school?.schoolAdmins.map((admins) => admins.userId);
          await tx.school.delete({
            where: {
              id: input.id,
            },
          });

          await tx.user.deleteMany({
            where: {
              id: {
                in: userIds,
              },
            },
          });

          const deladdress = await tx.address.delete({
            where: {
              id: school?.addressId,
            },
          });

          console.log({ deladdress });

          return;
        } catch (error) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        }
      });
    };

    await deleteSchoolByIdService();
    return { success: true };
  } catch (error) {
    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
  }
};
