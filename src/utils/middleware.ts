import { Role } from "@prisma/client";
import { withAuth, type NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const path = req.nextUrl.pathname;
    const role = req.nextauth.token?.role;

    if (path.startsWith("/super-admin") && role !== Role.SUPER_ADMIN) {
      const url = new URL(`/`, req.url);
      url.searchParams.set("callbackUrl ", encodeURI(req.url));
      return NextResponse.rewrite(url);
    }
    if (path.startsWith("/school-admin") && role !== Role.SCHOOL_ADMIN) {
      const url = new URL(`/`, req.url);
      url.searchParams.set("callbackUrl ", encodeURI(req.url));
      return NextResponse.rewrite(url);
    }
    if (path.startsWith("/teacher") && role !== Role.TEACHER) {
      const url = new URL(`/`, req.url);
      url.searchParams.set("callbackUrl ", encodeURI(req.url));
      return NextResponse.rewrite(url);
    }
  },
  {
    callbacks: {
      authorized: ({ token,req }) => req.nextUrl.pathname.startsWith("/api") || !!token,
    },
   pages:{
    signIn:"/auth/login"
   }
  },
);

