import { SubjectType, type PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { type Session } from "next-auth";
import { assertSchoolAdmin } from "~/utils/assertions/assertSchoolAdmin";
import { type AddSubjectRequest } from "~/schemas/subject.schema";

type AddSubjectHandler = {
  ctx: {
    db: PrismaClient;
    session: Session | null;
  };
  input: AddSubjectRequest;
};
export const addSubjectHandler = async ({ ctx, input }: AddSubjectHandler) => {
  assertSchoolAdmin(ctx);

  try {
    const addSubjectService = (subject: AddSubjectRequest) => {
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

          const subjectType = subject.type=== "THEORY" ? SubjectType.THEORY: SubjectType.PRACTICAL

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

          
          await tx.subject.create({
            data:{
                name:subject.name.toLowerCase(),
                type:subjectType,
                schoolId:school.schoolId,
                creatorId:school.userId
            }
          })        
        } catch (error) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        }
      });
    };

    await addSubjectService(input);

    return input.name;
  } catch (error) {
    throw new TRPCError({ code: "BAD_REQUEST" });
  }
};
