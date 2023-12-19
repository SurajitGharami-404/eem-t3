
import { createTRPCRouter } from "~/server/api/trpc";
import { schoolRouter } from "./routers/school/_router";
import { teacherRouter } from "./routers/teacher/_router";
import { subjectRouter } from "./routers/subject/_router";
import { gradeRouter } from "./routers/grade/_router";
import { studentRouter } from "./routers/student/_router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  school: schoolRouter,
  teacher: teacherRouter,
  subject:subjectRouter,
  grade:gradeRouter,
  student:studentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
