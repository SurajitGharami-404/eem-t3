import { type PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { type Session } from "next-auth";
import { assertSchoolAdmin } from "~/utils/assertions/assertSchoolAdmin";
import { type AddGradeRequest } from "~/schemas/grade.schema";

type AddGradeHandler = {
  ctx: {
    db: PrismaClient;
    session: Session | null;
  };
  input: AddGradeRequest;
};
export const addGradeHandler = async ({ ctx, input }: AddGradeHandler) => {
  assertSchoolAdmin(ctx);

  try {
    const addGradeService = (grade: AddGradeRequest) => {
      return ctx.db.$transaction(async (tx) => {
        try {
          const school = await tx.schoolAdmin.findUnique({
            where: {
              userId: ctx.session?.user.id,
            },
          });

          if (!school) {
            throw new TRPCError({ code: "UNAUTHORIZED" });
          }

          

        //   const subjectExists = await tx.subject.findUnique({
        //     where: {
        //       schoolId: school.schoolId,
        //       name: subject.name,
        //       type:subjectType
        //     },
        //   });

        //   if (subjectExists) {
        //     throw new TRPCError({ code: "CONFLICT" });
        //   }

          
          await tx.grade.create({
            data:{
                name:`${grade.class}${grade.section}`.toUpperCase(),
                section:grade.section,
                class:grade.class,
                schoolId:school.schoolId,
                creatorId:school.userId
            }
          })        
        } catch (error) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        }
      });
    };

    await addGradeService(input);

    return `${input.class}${input.section}`;
  } catch (error) {
    throw new TRPCError({ code: "BAD_REQUEST" });
  }
};
