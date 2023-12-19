import { type PrismaClient } from "@prisma/client"
import { TRPCError } from "@trpc/server"
import { type Session } from "next-auth"
import { assertSchoolAdmin } from "~/utils/assertions/assertSchoolAdmin"


type FindAllGradesHandler = {
    ctx:{
        db:PrismaClient,
        session:Session | null
    }
}

export const findAllGradesHandler = async({ctx}:FindAllGradesHandler)=>{
    assertSchoolAdmin(ctx)
    try {
        const school = await ctx.db.schoolAdmin.findUnique({
            where:{
                userId:ctx.session?.user.id
            }
        })

        if(!school){
            throw new TRPCError({code:"UNAUTHORIZED"})
        }

        const grades = await ctx.db.grade.findMany({
            where:{
                schoolId:school?.schoolId
            },
            include:{
                createdBy:{
                    select:{
                        name:true
                    }
                }
            }
        })
        return grades
    } catch (error) {
        throw new TRPCError({code:"INTERNAL_SERVER_ERROR"})
    }
}