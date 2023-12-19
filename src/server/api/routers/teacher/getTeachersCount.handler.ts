
import { type PrismaClient } from "@prisma/client"
import { TRPCError } from "@trpc/server"
import { type Session } from "next-auth"
import { assertSchoolAdmin } from "~/utils/assertions/assertSchoolAdmin"


type GetTeachersCountHandler = {
    ctx:{
        db:PrismaClient,
        session:Session | null
    }
}

export const getTeachersCountHandler = async({ctx}:GetTeachersCountHandler)=>{
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

        const count = await ctx.db.teacher.count({
            where:{
                schoolId:school.schoolId
            }
        })
        return count
    } catch (error) {
        throw new TRPCError({code:"INTERNAL_SERVER_ERROR"})
    }
}