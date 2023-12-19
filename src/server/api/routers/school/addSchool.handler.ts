import { Role, type PrismaClient } from "@prisma/client";
import { type AddSchoolRequest, type AddSchoolInput } from "~/schemas/school.schema";
import * as auth from "~/lib/auth";
import { TRPCError } from "@trpc/server";
import { assertSuperAdmin } from "~/utils/assertions/assertSuperAdmin";
import { type Session } from "next-auth";

type AddSchoolHandler = {
  ctx: {
    session: Session | null;
    db: PrismaClient;
  };
  input: AddSchoolInput;
};
export const addSchoolHandler = async ({ ctx, input }: AddSchoolHandler) => {
  assertSuperAdmin(ctx);

  try {
    const foundSchool = await ctx.db.school.findUnique({
      where: {
        email: input.email,
      },
    });

    if (foundSchool)
      throw new TRPCError({
        code: "CONFLICT",
      });
    const hashedPassword = await auth.hashPassword(input.password);

    const addSchoolService = (school: AddSchoolRequest) => {
      return ctx.db.$transaction(async (tx) => {
        try {
          const user = await tx.user.create({
            data: {
              name: school.name,
              email: school.email,
              role: Role.SCHOOL_ADMIN,
              password: hashedPassword,
            },
          });

          const address = await tx.address.create({
            data: {
              address: school.address,
              city: school.city,
              pinCode: school.pinCode,
              state: school.state,
              country: school.country,
            },
          });

          const newSchool = await tx.school.create({
            data: {
              name: school.name,
              email: school.email,
              contactNumber: school.contactNumber,
              addressId: address.id,
            },
          });

          await tx.schoolAdmin.create({
            data: {
              userId: user.id,
              schoolId: newSchool.id,
            },
          });
        } catch (error) {
          throw new TRPCError({ code: "BAD_REQUEST" });
        }
      });
    };
    await addSchoolService(input);
    
  } catch (error) {
    throw new TRPCError({ code: "BAD_REQUEST" });
  }
};
