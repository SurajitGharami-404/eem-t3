import { Role, type PrismaClient } from "@prisma/client";
import {
  type AddTeacherInput,
} from "~/schemas/teacher.schema";
import * as auth from "~/lib/auth";
import { TRPCError } from "@trpc/server";
import { type Session } from "next-auth";
import { assertSchoolAdmin } from "~/utils/assertions/assertSchoolAdmin";

type AddTeacherHandler = {
  ctx: {
    db: PrismaClient;
    session: Session | null;
  };
  input: AddTeacherInput;
};
export const addTeacherHandler = async ({ ctx, input }: AddTeacherHandler) => {
  assertSchoolAdmin(ctx)
  const foundUser = await ctx.db.user.findUnique({
    where: {
      email: input.email,
    },
  });

  if (foundUser) throw new TRPCError({ code: "CONFLICT" });

  try {
    const hashedPassword = await auth.hashPassword(input.password);

    const addTeacherService = (teacher: AddTeacherInput) => {
      return ctx.db.$transaction(async (tx) => {
        try {
          const school = await tx.schoolAdmin.findUnique({
            where: {
              userId: ctx.session?.user.id,
            },
          });

          if(!school){
            throw new TRPCError({code:"UNAUTHORIZED"})
          }

          const user = await tx.user.create({
            data: {
              email: input.email,
              password: hashedPassword,
              name: `${input.firstName} ${input.lastName}`,
              role: Role.TEACHER,
            },
          });

          const address = await tx.address.create({
            data: {
              city: teacher.city,
              address: teacher.address,
              state: teacher.state,
              pinCode: teacher.pinCode,
              country: teacher.country,
            },
          });

          await tx.teacher.create({
            data: {
              firstName: teacher.firstName,
              lastName: teacher.lastName,
              grades: teacher.grades.toLowerCase(),
              subjects: teacher.subjects.toLowerCase(),
              email: teacher.email,
              contactNumber: teacher.contactNumber,
              gender: teacher.gender,
              dateOfBirth:teacher.dateOfBirth,
              joiningDate: teacher.joiningDate,
              addressId:address.id,
              userId: user.id,
              schoolId:school?.schoolId
            },
          });
        } catch (error) {
          throw new TRPCError({code:"INTERNAL_SERVER_ERROR"})
        }
      });
    };

    await addTeacherService(input)

    return ;
  } catch (error) {
    throw new TRPCError({ code: "BAD_REQUEST" });
  }
};
