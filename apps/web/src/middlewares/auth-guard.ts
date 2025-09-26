/** biome-ignore-all lint/suspicious/useAwait: <explanation> */
import { NextResponse } from "next/server";
import { PROTECTED_ROUTES } from "@/middleware";
import type { MiddlewareFunction } from "@/shared/types/middleware";

export const authGuard: MiddlewareFunction = async ({ req, session }) => {
  const pathname = req.nextUrl.pathname;
  const isProtected = PROTECTED_ROUTES.some((r) => pathname.startsWith(r));

  if (isProtected && (!session?.expiresAt || session.expiresAt < Date.now())) {
    const response = NextResponse.redirect(new URL("/login", req.nextUrl));

    return response;
  }
};
