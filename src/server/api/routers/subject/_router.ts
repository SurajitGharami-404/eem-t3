/* eslint-disable @typescript-eslint/consistent-type-imports */

import { AddSubjectSchema } from "~/schemas/subject.schema";
import { createTRPCRouter, protectedProcedure } from "../../trpc";

type SchoolRouterHandlerCache = {
    addSubject?:typeof import("./addSubject.handler").addSubjectHandler;
    findAllSubjects?:typeof import("./findAllSubjects.handler").findAllSubjectsHandler;
  };

  const UNSTABLE_HANDLER_CACHE: SchoolRouterHandlerCache = {};

export const subjectRouter = createTRPCRouter({
    addSubject:protectedProcedure
    .input(AddSubjectSchema)
    .mutation(async({ctx,input})=>{
        if (!UNSTABLE_HANDLER_CACHE.addSubject) {
            UNSTABLE_HANDLER_CACHE.addSubject = (
              await import("./addSubject.handler")
            ).addSubjectHandler;
          }
    
          // Unreachable code but required for type safety
          if (!UNSTABLE_HANDLER_CACHE.addSubject) {
            throw new Error("Failed to load handler");
          }
    
          return UNSTABLE_HANDLER_CACHE.addSubject({ input, ctx });
    }),
    findAllSubjects: protectedProcedure
    .query(async({ctx})=>{
        if (!UNSTABLE_HANDLER_CACHE.findAllSubjects) {
            UNSTABLE_HANDLER_CACHE.findAllSubjects = (
              await import("./findAllSubjects.handler")
            ).findAllSubjectsHandler;
          }
    
          // Unreachable code but required for type safety
          if (!UNSTABLE_HANDLER_CACHE.findAllSubjects) {
            throw new Error("Failed to load handler");
          }
    
          return UNSTABLE_HANDLER_CACHE.findAllSubjects({ ctx });
    })
})