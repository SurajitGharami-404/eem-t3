/* eslint-disable @typescript-eslint/consistent-type-imports */
import { AddStudentInput } from "~/schemas/student.schema";
import { createTRPCRouter, protectedProcedure } from "../../trpc";

type SchoolRouterHandlerCache = {
    addStudent?:typeof import("./addStudent.handler").addStudentHandler;
    findAllStudents?:typeof import("./findAllStudents.handler").findAllStudentsHandler;
    getStudentsCount?:typeof import("./getStudentsCount.handler").getStudentsCountHandler;
  };

  const UNSTABLE_HANDLER_CACHE: SchoolRouterHandlerCache = {};

export const studentRouter = createTRPCRouter({
    addStudent:protectedProcedure
    .input(AddStudentInput)
    .mutation(async({ctx,input})=>{
        if (!UNSTABLE_HANDLER_CACHE.addStudent) {
            UNSTABLE_HANDLER_CACHE.addStudent = (
              await import("./addStudent.handler")
            ).addStudentHandler;
          }
    
          // Unreachable code but required for type safety
          if (!UNSTABLE_HANDLER_CACHE.addStudent) {
            throw new Error("Failed to load handler");
          }
    
          return UNSTABLE_HANDLER_CACHE.addStudent({ input, ctx });
    }),
    findAllStudents: protectedProcedure
    .query(async({ctx})=>{
        if (!UNSTABLE_HANDLER_CACHE.findAllStudents) {
            UNSTABLE_HANDLER_CACHE.findAllStudents = (
              await import("./findAllStudents.handler")
            ).findAllStudentsHandler;
          }
    
          // Unreachable code but required for type safety
          if (!UNSTABLE_HANDLER_CACHE.findAllStudents) {
            throw new Error("Failed to load handler");
          }
    
          return UNSTABLE_HANDLER_CACHE.findAllStudents({ ctx });
    }),
    getStudentsCount: protectedProcedure
    .query(async({ctx})=>{
        if (!UNSTABLE_HANDLER_CACHE.getStudentsCount) {
            UNSTABLE_HANDLER_CACHE.getStudentsCount = (
              await import("./getStudentsCount.handler")
            ).getStudentsCountHandler;
          }
    
          // Unreachable code but required for type safety
          if (!UNSTABLE_HANDLER_CACHE.getStudentsCount) {
            throw new Error("Failed to load handler");
          }
    
          return UNSTABLE_HANDLER_CACHE.getStudentsCount({ ctx });
    }),

})