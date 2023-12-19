/* eslint-disable @typescript-eslint/consistent-type-imports */

import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { AddGradeSchema } from "~/schemas/grade.schema";

type GradeRouterHandlerCache = {
    addGrade?:typeof import("./addGrade.handler").addGradeHandler;
    findAllGrades?:typeof import("./findAllGrades.handler").findAllGradesHandler;
    getGradesCount?:typeof import("./getGradesCount.handler").getGradesCountHandler;
  };

  const UNSTABLE_HANDLER_CACHE: GradeRouterHandlerCache = {};

export const gradeRouter = createTRPCRouter({
    addGrade:protectedProcedure
    .input(AddGradeSchema)
    .mutation(async({ctx,input})=>{
        if (!UNSTABLE_HANDLER_CACHE.addGrade) {
            UNSTABLE_HANDLER_CACHE.addGrade = (
              await import("./addGrade.handler")
            ).addGradeHandler;
          }
    
          // Unreachable code but required for type safety
          if (!UNSTABLE_HANDLER_CACHE.addGrade) {
            throw new Error("Failed to load handler");
          }
    
          return UNSTABLE_HANDLER_CACHE.addGrade({ input, ctx });
    }),
    findAllGrades: protectedProcedure
    .query(async({ctx})=>{
        if (!UNSTABLE_HANDLER_CACHE.findAllGrades) {
            UNSTABLE_HANDLER_CACHE.findAllGrades = (
              await import("./findAllGrades.handler")
            ).findAllGradesHandler;
          }
    
          // Unreachable code but required for type safety
          if (!UNSTABLE_HANDLER_CACHE.findAllGrades) {
            throw new Error("Failed to load handler");
          }
    
          return UNSTABLE_HANDLER_CACHE.findAllGrades({ ctx });
    }),
    getGradesCount: protectedProcedure
    .query(async({ctx})=>{
        if (!UNSTABLE_HANDLER_CACHE.getGradesCount) {
            UNSTABLE_HANDLER_CACHE.getGradesCount = (
              await import("./getGradesCount.handler")
            ).getGradesCountHandler;
          }
    
          // Unreachable code but required for type safety
          if (!UNSTABLE_HANDLER_CACHE.getGradesCount) {
            throw new Error("Failed to load handler");
          }
    
          return UNSTABLE_HANDLER_CACHE.getGradesCount({ ctx });
    }),
})