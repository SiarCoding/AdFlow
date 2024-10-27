import { NextResponse } from "next/server";
import config from "./config";

let clerkMiddleware: (arg0: (auth: any, req: any) => any) => any, createRouteMatcher;

if (config.auth.enabled) {
  try {
    const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
    const secretKey = process.env.CLERK_SECRET_KEY;
    
    if (!publishableKey || !secretKey) {
      throw new Error(`Missing Clerk keys: ${!publishableKey ? 'publishableKey' : ''} ${!secretKey ? 'secretKey' : ''}`);
    }
    ({ clerkMiddleware, createRouteMatcher } = require("@clerk/nextjs/server"));
  } catch (error: any) {
    console.warn("Clerk authentication disabled:", error.message);
    config.auth.enabled = false;
  }
}
const isProtectedRoute = config.auth.enabled
  ? createRouteMatcher(["/dashboard(.*)"])
  : () => false;

export default function middleware(req: any) {
  if (config.auth.enabled) {
    return clerkMiddleware((auth, req) => {
      if (!auth().userId && isProtectedRoute(req)) {
        return auth().redirectToSignIn();
      } else {
        return NextResponse.next();
      }
    })(req);
  } else {
    return NextResponse.next();
  }
}

export const middlewareConfig = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
