import { type PrismaClient } from "@prisma/client"
import { TRPCError } from "@trpc/server"
import { type Session } from "next-auth"
import { type FindSchoolByIdInput } from "~/schemas/school.schema"
import { assertSuperAdminOrSchoolAdmin } from "~/utils/assertions/assertSuperAdminOrSchoolAdmin"

type FindSchoolByIdHandler = {
    ctx:{
        db:PrismaClient,
        session:Session | null
    },
    input:FindSchoolByIdInput
}

export const findSchoolByIdHandler = async({ctx,input}:FindSchoolByIdHandler)=>{
    await assertSuperAdminOrSchoolAdmin({ctx,id:input.id})
    try {
        const school = await ctx.db.school.findUnique({
            where:{
                id:input.id
            },
            include:{
                address:{
                    select:{
                        address:true,
                        city:true,
                        state:true,
                        country:true,
                        pinCode:true,
                    }
                }
            }
        })
        return school
    } catch (error) {
        throw new TRPCError({code:"INTERNAL_SERVER_ERROR"})
    }
}