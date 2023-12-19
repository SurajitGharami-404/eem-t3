import { type PrismaClient } from "@prisma/client"
import { TRPCError } from "@trpc/server"
import { type Session } from "next-auth"
import { assertSchoolAdmin } from "~/utils/assertions/assertSchoolAdmin"


type FindAllStudentsHandler = {
    ctx:{
        db:PrismaClient,
        session:Session | null
    }
}

export const findAllStudentsHandler = async({ctx}:FindAllStudentsHandler)=>{
    assertSchoolAdmin(ctx)
    try {
        const school = await ctx.db.schoolAdmin.findUnique({
            where:{
                userId:ctx.session?.user.id
            },
        })

        if(!school){
            throw new TRPCError({code:"UNAUTHORIZED"})
        }

        const students = await ctx.db.student.findMany({
            where:{
                schoolId:school?.schoolId
            },
            include:{
                grade:{
                    select:{
                        name:true
                    }
                }
            }
        })
        return students
    } catch (error) {
        throw new TRPCError({code:"INTERNAL_SERVER_ERROR"})
    }
}