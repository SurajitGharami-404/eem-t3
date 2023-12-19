import { type PrismaClient } from "@prisma/client";
import {
  type AddStudentInput,
} from "~/schemas/student.schema";
import { TRPCError } from "@trpc/server";
import { type Session } from "next-auth";
import { assertSchoolAdmin } from "~/utils/assertions/assertSchoolAdmin";

type AddStudentHandler = {
  ctx: {
    db: PrismaClient;
    session: Session | null;
  };
  input: AddStudentInput;
};
export const addStudentHandler = async ({ ctx, input }: AddStudentHandler) => {
  assertSchoolAdmin(ctx)

  try {

    const addStudentService = (student: AddStudentInput) => {
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

          const sutdentExists = await tx.student.findMany({
            where:{
                schoolId:school.schoolId,
                gradeId:student.grade,
                rollNumber:student.rollNumber,
            }
          }) 


          if(sutdentExists.length>0){
            throw new TRPCError({code:"CONFLICT"})
          }

          const address = await tx.address.create({
            data: {
              city: student.city,
              address:student.address,
              state: student.state,
              pinCode: student.pinCode,
              country: student.country,
            },
          });

          await tx.student.create({
            data: {
              firstName: student.firstName,
              lastName: student.lastName,
              gradeId: student.grade,
              rollNumber: student.rollNumber,
              contactNumber: student.contactNumber,
              gender: student.gender,
              dateOfBirth:student.dateOfBirth,
              admissionDate: student.admissionDate,
              addressId:address.id,
              schoolId:school?.schoolId
            },
          });

          return
        } catch (error) {
          throw new TRPCError({code:"INTERNAL_SERVER_ERROR"})
        }
      });
    };

    await addStudentService(input)

    return ;
  } catch (error) {
    console.log(error)
    throw new TRPCError({ code: "BAD_REQUEST" });
  }
};
