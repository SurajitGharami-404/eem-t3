import { type PrismaClient } from "@prisma/client"
import { TRPCError } from "@trpc/server"
import { type Session } from "next-auth"
import { assertSuperAdmin } from "~/utils/assertions/assertSuperAdmin"

type getAllSchoolHandler = {
    ctx:{
        db:PrismaClient,
        session:Session | null
    }
}

export const getAllSchoolHandler = async({ctx}:getAllSchoolHandler)=>{
    assertSuperAdmin(ctx)
    try {
        const schools = await ctx.db.school.findMany()
        return schools
    } catch (error) {
        throw new TRPCError({code:"INTERNAL_SERVER_ERROR"})
    }
}