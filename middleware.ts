import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: [
    "/", 
    "/api/webhook",
    "/api/get-wallpaper"
  ],
  
  async afterAuth(auth, req) {
    if (!auth.userId && !auth.isPublicRoute) {
      if (auth.isApiRoute) {
        return NextResponse.json(
          { code: -2, message: "no auth" },
          { status: 401 }
        );
      } else {
        return NextResponse.redirect(new URL("/sign-in", req.url));
      }
    }

    return NextResponse.next();
  },
});

export const config = {
  matcher: [
    '/((?!.+\\.[\\w]+$|_next).*)', '/',
    '/(api|trpc)(.*)'
  ]
};