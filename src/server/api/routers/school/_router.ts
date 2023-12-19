/* eslint-disable @typescript-eslint/consistent-type-imports */
import { AddSchoolInput, FindSchoolByIdSchema } from "~/schemas/school.schema";
import { createTRPCRouter, protectedProcedure } from "../../trpc";


type SchoolRouterHandlerCache = {
    addSchool?:typeof import("./addSchool.handler").addSchoolHandler;
    getSchoolAllCount?: typeof import("./getSchoolCount.handler").getSchoolAllCountHandler;
    getSchoolTotalCount?: typeof import("./getSchoolCount.handler").getSchoolTotalCountHandler;
    getAllSchool?: typeof import("./getAllSchool.handler").getAllSchoolHandler;
    findSchoolById?: typeof import("./findSchoolById.handler").findSchoolByIdHandler;
    deleteSchoolById?: typeof import("./deleteSchoolById.handler").deleteSchoolByIdHandler;
  };
  
  const UNSTABLE_HANDLER_CACHE: SchoolRouterHandlerCache = {};

export const schoolRouter = createTRPCRouter({
    addSchool:protectedProcedure
    .input(AddSchoolInput)
    .mutation(async({ctx,input})=>{
        if (!UNSTABLE_HANDLER_CACHE.addSchool) {
            UNSTABLE_HANDLER_CACHE.addSchool = (
              await import("./addSchool.handler")
            ).addSchoolHandler;
          }
    
          // Unreachable code but required for type safety
          if (!UNSTABLE_HANDLER_CACHE.addSchool) {
            throw new Error("Failed to load handler");
          }
    
          return UNSTABLE_HANDLER_CACHE.addSchool({ input, ctx });
    }),


    getSchoolAllCount:protectedProcedure
    .query(async({ctx})=>{
        if (!UNSTABLE_HANDLER_CACHE.getSchoolAllCount) {
            UNSTABLE_HANDLER_CACHE.getSchoolAllCount = (
              await import("./getSchoolCount.handler")
            ).getSchoolAllCountHandler;
          }
    
          // Unreachable code but required for type safety
          if (!UNSTABLE_HANDLER_CACHE.getSchoolAllCount) {
            throw new Error("Failed to load handler");
          }
    
          return UNSTABLE_HANDLER_CACHE.getSchoolAllCount({ ctx });
    }),
    
    getSchoolTotalCount:protectedProcedure
    .query(async({ctx})=>{
        if (!UNSTABLE_HANDLER_CACHE.getSchoolTotalCount) {
            UNSTABLE_HANDLER_CACHE.getSchoolTotalCount = (
              await import("./getSchoolCount.handler")
            ).getSchoolTotalCountHandler;
          }
    
          // Unreachable code but required for type safety
          if (!UNSTABLE_HANDLER_CACHE.getSchoolTotalCount) {
            throw new Error("Failed to load handler");
          }
    
          return UNSTABLE_HANDLER_CACHE.getSchoolTotalCount({ ctx });
    }),

    getAllSchool:protectedProcedure
    .query(async({ctx})=>{
        if (!UNSTABLE_HANDLER_CACHE.getAllSchool) {
            UNSTABLE_HANDLER_CACHE.getAllSchool = (
              await import("./getAllSchool.handler")
            ).getAllSchoolHandler;
          }
    
          // Unreachable code but required for type safety
          if (!UNSTABLE_HANDLER_CACHE.getAllSchool) {
            throw new Error("Failed to load handler");
          }
    
          return UNSTABLE_HANDLER_CACHE.getAllSchool({ ctx });
    }),

    findSchoolByIdHandler : protectedProcedure
    .input(FindSchoolByIdSchema)
    .query(async({ctx,input})=>{
      if (!UNSTABLE_HANDLER_CACHE.findSchoolById) {
        UNSTABLE_HANDLER_CACHE.findSchoolById = (
          await import("./findSchoolById.handler")).findSchoolByIdHandler
      }

      // Unreachable code but required for type safety
      if (!UNSTABLE_HANDLER_CACHE.findSchoolById) {
        throw new Error("Failed to load handler");
      }

      return UNSTABLE_HANDLER_CACHE.findSchoolById({ ctx,input });
    }),

    deleteSchoolByIdHandler : protectedProcedure
    .input(FindSchoolByIdSchema)
    .mutation(async({ctx,input})=>{
      if (!UNSTABLE_HANDLER_CACHE.deleteSchoolById) {
        UNSTABLE_HANDLER_CACHE.deleteSchoolById = (
          await import("./deleteSchoolById.handler")).deleteSchoolByIdHandler
      }

      // Unreachable code but required for type safety
      if (!UNSTABLE_HANDLER_CACHE.deleteSchoolById) {
        throw new Error("Failed to load handler");
      }

      return UNSTABLE_HANDLER_CACHE.deleteSchoolById({ ctx,input });
    })
})