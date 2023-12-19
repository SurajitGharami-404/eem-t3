/* eslint-disable @typescript-eslint/consistent-type-imports */
import { AddTeacherInput } from "~/schemas/teacher.schema";
import { createTRPCRouter, protectedProcedure } from "../../trpc";

type SchoolRouterHandlerCache = {
    addTeacher?:typeof import("./addTeacher.handler").addTeacherHandler;
    findAllTeachers?:typeof import("./findAllTeachers.handler").findAllTeachersHandler;
    getTeachersCount?:typeof import("./getTeachersCount.handler").getTeachersCountHandler;
}
  const UNSTABLE_HANDLER_CACHE: SchoolRouterHandlerCache = {};

export const teacherRouter = createTRPCRouter({
    addTeacher:protectedProcedure
    .input(AddTeacherInput)
    .mutation(async({ctx,input})=>{
        if (!UNSTABLE_HANDLER_CACHE.addTeacher) {
            UNSTABLE_HANDLER_CACHE.addTeacher = (
              await import("./addTeacher.handler")
            ).addTeacherHandler;
          }
    
          // Unreachable code but required for type safety
          if (!UNSTABLE_HANDLER_CACHE.addTeacher) {
            throw new Error("Failed to load handler");
          }
    
          return UNSTABLE_HANDLER_CACHE.addTeacher({ input, ctx });
    }),
    findAllTeachers: protectedProcedure
    .query(async({ctx})=>{
        if (!UNSTABLE_HANDLER_CACHE.findAllTeachers) {
            UNSTABLE_HANDLER_CACHE.findAllTeachers = (
              await import("./findAllTeachers.handler")
            ).findAllTeachersHandler;
          }
    
          // Unreachable code but required for type safety
          if (!UNSTABLE_HANDLER_CACHE.findAllTeachers) {
            throw new Error("Failed to load handler");
          }
    
          return UNSTABLE_HANDLER_CACHE.findAllTeachers({ ctx });
    }),
    getTeachersCount: protectedProcedure
    .query(async({ctx})=>{
        if (!UNSTABLE_HANDLER_CACHE.getTeachersCount) {
            UNSTABLE_HANDLER_CACHE.getTeachersCount = (
              await import("./getTeachersCount.handler")
            ).getTeachersCountHandler;
          }
    
          // Unreachable code but required for type safety
          if (!UNSTABLE_HANDLER_CACHE.getTeachersCount) {
            throw new Error("Failed to load handler");
          }
    
          return UNSTABLE_HANDLER_CACHE.getTeachersCount({ ctx });
    }),
})