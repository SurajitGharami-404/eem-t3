import { type PrismaClient } from "@prisma/client"
import { TRPCError } from "@trpc/server"
import { type Session } from "next-auth"
import { assertSchoolAdmin } from "~/utils/assertions/assertSchoolAdmin"


type FindAllTeachersHandler = {
    ctx:{
        db:PrismaClient,
        session:Session | null
    }
}

export const findAllTeachersHandler = async({ctx}:FindAllTeachersHandler)=>{
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

        const teachers = await ctx.db.teacher.findMany({
            where:{
                schoolId:school?.schoolId
            }
        })
        return teachers
    } catch (error) {
        throw new TRPCError({code:"INTERNAL_SERVER_ERROR"})
    }
}